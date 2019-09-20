const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: {
    banner: {
      type: String, default: null
    },
    detail: {
      type: String, default: null
    },
    discount: {
      type: String, default: null
    }
  },
  tags: {
    type: Array, default: []
  },
  payment: {
    type: Object, default: {}
  },
  subMerchantKey: {
    type: String, default: null
  }
});

module.exports = Brand = mongoose.model('brand', BrandSchema);
