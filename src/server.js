const express = require('express');
const cors = require('cors');
const {customer, products, shopping} = require('./routes');
const HandleErrors = require('./utils/error-handler');

module.exports = async (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(express.static(__dirname + '/public'));
  app.use('/customer', customer);
  app.use('/products', products);
  app.use('/shopping', shopping);
  app.use(HandleErrors);
}