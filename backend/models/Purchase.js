const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'staff',
    required: true
  },
  brand: {
    type: Object,
    default: null
  },
  value: {
    type: Number,
    default: null
  },
  code: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: null
  },
  type: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: new Date
  }
});

module.exports = Purchase = mongoose.model('purchase', PurchaseSchema);
