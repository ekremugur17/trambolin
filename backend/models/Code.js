const mongoose = require('mongoose');

const CodeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'brand',
    required: true
  },
  status: {
    type: String,
    default: 'available'
  },
  code: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  value: {
    type: Number
  }
});

module.exports = Code = mongoose.model('code', CodeSchema);
