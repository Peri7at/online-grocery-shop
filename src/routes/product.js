const ProductController = require('../controllers/product');
const CustomerController = require('../controllers/customer');
const UserAuth = require('./middlewares/auth');

module.exports = (app) => {
  const controller = new ProductController();
  const customerController = new CustomerController();

  app.post('/product/create', async (req, res, next) => {
    try {
      const { name, desc, type, unit, price, available, supplier, banner } = req.body;
      const { data } = await controller.CreateProduct({ name, desc, type, unit, price, available, supplier, banner });
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }),

  app.get('/category/:type', async (req, res, next) => {
    const { type } = req.params;
    try {
      const { data } = await controller.GetProductsByCategory(type);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }),

  app.get('/product/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
      const { data } = await controller.GetProductById(id);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }),

  app.post('/ids', async (req, res, next) => {
    const { ids } = req.body;
    try {
      const { products } = await controller.GetSelectedProducts(ids);
      return res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }),

  app.put('/wishlist', UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    try {
      const product = await controller.GetProductById(req.body._id);
      const wishlist = await customerController.AddToWishlist(_id, product);
      return res.status(200).json(wishlist); 
    } catch (err) {
      next(err);
    }
  }),

  app.delete('/wishlist/:id', UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const { productId } = req.params;
    try {
      const product = await controller.GetProductById(productId);
      const wishlist = await customerController.RemoveFromWishlist(_id, product);
      return res.status(200).json(wishlist);
    } catch (err) {
      next(err);
    }
  }),

  app.put('/cart', UserAuth, async (req, res, next) => {
    const { _id, qty } = req.body;
    try {
      const product = await controller.GetProductById(_id);
      const cart = await customerController.ManageCart(req.user._id, product, qty, false);
      return res.status(200).json(cart);
    } catch (err) {
      next(err);
    }
  }),

  app.delete('/cart/:id', UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const { productId } = req.params;
    try {
      const product = await controller.GetProductById(productId);
      const cart = await customerController.ManageCart(_id, product, 0, true);
      return res.status(200).json(cart);
    } catch (err) {
      next(err);
    }
  }),

  app.get('/', async (req, res, next) => {
    try {
      const { data } = await controller.GetProducts();
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });
}