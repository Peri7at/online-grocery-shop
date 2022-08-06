const ShoppingController = require('../controllers/shopping');
const CustomerController = require('../controllers/customer');
const UserAuth = require('./middlewares/auth');

module.exports = (app) => {
  const controller = new ShoppingController();
  const customerController = new CustomerController();
  
  app.post('/shopping/order', UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const { txnNumber } = req.body;

    try {
      const { data } = await controller.PlaceOrder(_id, txnNumber);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }),

  app.get('/shopping/orders', UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    try {
      const { data } = await customerController.GetShoppingDetails(_id);
      return res.status(200).json(data.orders)
    } catch (err) {
      next(err);
    }
  }),

  app.get('/shopping/cart', UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    try {
      const { data } = await customerController.GetShoppingDetails(_id);
      return res.status(200).json(data.cart)
    } catch (err) {
      next(err);
    }
  });
}

