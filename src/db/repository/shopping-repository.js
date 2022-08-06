const { CustomerModel, ProductModel, OrderModel } = require('../models');
const { APIError } = require('../../utils/app-errors');
const { v4: uuidv4 } = require('uuid');

class ShoppingRepository {
  async Orders(customerId) {
    try {
      const orders = await OrderModel.find({customerId}).populate('items.product');
      return orders;
    } catch (error) {
      throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Orders');
    }
  }

  async CreateOrder(customerId, txnId) {
    try {
      const profile = await CustomerModel.findById(customerId).populate('cart.product');
      if (profile) {
        let amount = 0;
        let cartItems = profile.cart;
        if (cartItems.length > 0) {
          cartItems.forEach(item => {
            amount += parseInt(item.product.price) * parseInt(item.unit);
          });
          const orderId = uuidv4();

          const order = await OrderModel.create({
            orderId,
            customerId,
            amount,
            txnId,
            status: 'PENDING',
            items: cartItems,
          });

          profile.cart = [];
          order.populate('items.product').execPopulate();
          const orderResult = await order.save();
          profile.orders.push(orderResult);
          await profile.save();
          return orderResult;
        }
      }
      return {};
    } catch (error) {
      throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Order');
    }
  }
}

module.exports = ShoppingRepository;