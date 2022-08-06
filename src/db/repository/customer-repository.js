const { CustomerModel, AddressModel } = require('./models');
const { APIError, BadRequestError, STATUS_CODES } = require('../../utils/app-errors');

class CustomerRepository {
  async CreateCustomer({ email, password, phone, salt }) {
    try {
      const customer = await CustomerModel.create({
        email,
        password,
        salt,
        phone,
        address: [],
      });
      const customerResult = await customer.save();
      return customerResult;
    } catch (error) {
      throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Customer');
    }
  }

  async CreateAddress({ _id, street, postalCode, city, country }) {
    try {
      const profile = await CustomerModel.findById(_id);
      if (profile) {
        const newAddress = new AddressModel({
          street,
          postalCode,
          city,
          country,
        });
        await newAddress.save();
        profile.address.push(newAddress);
      }
      return await profile.save();
    } catch (error) {
      throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Create Address');
    }
  }

  async FindCustomerByEmail({email}) {
    try {
      const customer = await CustomerModel.findOne({email});
      return customer;
    } catch (error) {
      throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Find Customer By Email');
    }
  }

  async FindCustomerById({id}) {
    try {
      const customer = await CustomerModel.findById(id)
        .populate('address')
        .populate('wishlist')
        .populate('orders')
        .populate('cart.product');  
      return customer;
    } catch (error) {
      throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Find Customer By Id');
    }
  }

  async Wishlist(customerId) {
    try {
      const profile = await CustomerModel.findById(customerId).populate('wishlist');
      return profile.wishlist;
    } catch (error) {
      throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Wishlist');
    }
  } 

  async AddWishlistItem(customerId, product) {
    try {
      const profile = await CustomerModel.findById(customerId).populate('wishlist');
      if (profile) {
        let wishlist = profile.wishlist;
        if (wishlist.length > 0) {
          let isExist = false;
          wishlist.map(item => {
            if (item._id.toString() === product._id.toString()) {
              const index = wishlist.indexOf(item);
              wishlist.splice(index, 1);
              isExist = true;
            };
          });
          if (!isExist) {
            wishlist.push(product);
          }
        } else {
          wishlist.push(product);
        }
        profile.wishlist = wishlist;
      }
      const profileResult = await profile.save();
      return profileResult.wishlist;
    } catch (error) {
      throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Add To Wishlist');
    }
  }

  async AddCartItem(customerId, product, qty, isRemove) {
    try {
      const profile = await CustomerModel.findById(customerId).populate('cart.product');

      if (profile) {
        const cartItem = {
          product,
          unit: qty,
        };

        let cartItems = profile.cart;
        if (cartItems.length > 0) {
          let isExist = false;
          cartItems.map(item => {
            if (item.product._id.toString() === product._id.toString()) {
              const index = cartItems.indexOf(item);
              if (isRemove) {
                cartItems.splice(cartItems.indexOf(item), 1);
              } else {
                item.unit = qty;
              }
              isExist = true;
            };
          });
          if (!isExist) {
            cartItems.push(cartItem);
          }
        } else {
          cartItems.push(cartItem);
        }
        profile.cart = cartItems;
        const profileResult = await profile.save();
        return profileResult.cart;
      } 
      throw new Error ('Unable to add to cart');
    } catch (error) {
      throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Add Cart Item');
    }
  }

  async AddOrderToProfile(customerId, order) {
    try {
      const profile = await CustomerModel.findById(customerId);
      if (profile) {
        if (profile.orders == undefined) {
          profile.orders = [];
        }
        profile.orders.push(order);
        profile.cart = [];
        const profileResult = await profile.save();
        return profileResult;
      }
      throw new Error ('Unable to add to order');
    } catch (error) {
      throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Add Order To Profile');
    }
  }
}

module.exports = CustomerRepository;