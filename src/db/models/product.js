const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  desc: String,
  banner: String,
  type: String,
  unit: Number,
  price: Number,
  available: Boolean,
  supplier: String
});

module.exports = mongoose.model('product', productSchema);