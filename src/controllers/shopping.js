const { ShoppingRepository } = require('../db');
const { FormateData } = require('../utils');

class ShoppingController {
  constructor() {
    this.repository = new ShoppingRepository();
  }

  async PlaceOrder(userInputs) {
    const { _id, txnNumber } = userInputs;
    try {
      const orderResult = await this.repository.CreateOrder({ _id, txnNumber });
      return FormateData(orderResult);
    } catch (error) {
      throw new APIError('Data Not Found');
    }
  }

  async GetOrders(customerId) {
    try {
      const orders = await this.repository.Orders(customerId);
      return FormateData(orders);
    } catch (error) {
      throw new APIError('Data Not Found');
    }
  }
}

module.exports = ShoppingController;