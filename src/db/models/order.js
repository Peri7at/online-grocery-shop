const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderId: String,
  customerId: String,
  amount: Number,
  status: String,
  txnId: String,
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'product', required: true },
      unit: { type: Number, required: true },
    }
  ]
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
    } // delete ret.password;
  },
  timestamps: true
});

module.exports = mongoose.model('order', orderSchema);