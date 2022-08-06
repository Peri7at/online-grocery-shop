const CustomerController = require('../controllers/customer');
const UserAuth = require('./middlewares/auth');

module.exports = (app) => {
  const controller = new CustomerController();

  app.post('/customer/signup', async (req, res, next) => {
    try {
      const { email, password, phone } = req.body;
      const { data } = await controller.SignUp({ email, password, phone });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }),

  app.post('/customer/signin', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { data } = await controller.SignIn({ email, password });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }),

  app.post('/customer/add-address', UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { street, postalCode, city, country } = req.body;
      const { data } = await controller.AddNewAddress(_id, { street, postalCode, city, country });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }),

  app.get('/customer/profile', UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await controller.GetProfile(_id);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }),

  app.get('/customer/shopping-details', UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await controller.GetShoppingDetails(_id);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }),

  app.get('/customer/wishlist', UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await controller.GetWishlist(_id);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  })
}