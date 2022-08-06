const { ProductModel }  = require('../models/product');
const { APIError } = require('../../utils/app-errors');

class ProductRepository {
  async CreateProduct({ name, desc, banner, type, unit, price, available, supplier }) {
    try {
      const product = await ProductModel.create({
        name,
        desc,
        banner,
        type,
        unit,
        price,
        available,
        supplier,
      });
      const productResult = await product.save();
      return productResult;
    } catch (error) {
      throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Product');
    }
  }

  async Products() {
    try {
      const products = await ProductModel.find();
      return products;
    } catch (error) {
      throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Products');
    }
  }

  async FindProductById({id}) {
    try {
      const product = await ProductModel.findById(id);
      return product;
    } catch (error) {
      throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable Find Product By Id');
    }
  }

  async FindProductByCategory(category) {
    try {
      const products = await ProductModel.find({type : category});
      return products;
    } catch (error) {
      throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Products By Category');
    }
  }

  async FindSelectedProducts(selectedIds) {
    try {
      const products = await ProductModel.find({_id : {$in : selectedIds}});
      return products;
    } catch (error) {
      throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Selected Products');
    }
  }
}

module.exports = new ProductRepository();

