const { ProductRepository } = require('../db');
const { FormateData } = require('../utils');
const { APIError } = require('../utils/app-errors');

class ProductController {
  constructor() {
    this.repository = new ProductRepository();
  }

  async CreateProduct(productInputs) {
    try {
      const productResult = await this.repository.CreateProduct(productInputs);
      return FormateData(productResult);
    } catch (error) {
      throw new APIError('Data Not Found');
    }
  }

  async GetProducts() {
    try {
      const products = await this.repository.Products();
      let categories = {};
      products.map(({type}) => categories[type] = type);
      return FormateData( {products, categories: Object.keys(categories)});
    } catch (error) {
      throw new APIError('Data Not Found');
    }
  }

  async GetProductById(productId) {
    try {
      return await this.repository.FindProductById(productId);
    } catch (error) {
      throw new APIError('Data Not Found');
    }
  }

  async GetProductDescription(productId) {
    try {
      const product = await this.repository.FindProductById(productId);
      return FormateData(product);
    } catch (error) {
      throw new APIError('Data Not Found');
    }
  }
  
  async GetProductByCategory(category) {
    try {
      const products = await this.repository.FindProductByCategory(category);
      return FormateData(products);
    } catch (error) {
      throw new APIError('Data Not Found');
    }
  }

  async GetSelectedProducts(selectedIds) {
    try {
      const products = await this.repository.FindSelectedProducts(selectedIds);
      return FormateData(products);
    } catch (error) {
      throw new APIError('Data Not Found');
    }
  }
}

module.exports = ProductController;