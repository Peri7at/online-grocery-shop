const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  email: String,
  password: String,
  salt: String,
  phone: String,
  address: [
    { type: Schema.Types.ObjectId, ref: 'address', required: true }
  ],
  cart: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'product', required: true },
      unit: { type: Number, required: true },
    }
  ],
  wishlist: [
    { type: Schema.Types.ObjectId, ref: 'product', required: true }
  ],
  orders: [
    { type: Schema.Types.ObjectId, ref: 'order', required: true }
  ]
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      delete ret.password;
      delete ret.salt;
    }
  }
});

module.exports = mongoose.model('customer', customerSchema);  