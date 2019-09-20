const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String
  },
  staffNum: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  },
  address: {
    address1: {
      type: String,
      default: ''
    },
    billing: {
      type: String,
      default: ''
    },
    shipping: {
      type: String,
      default: ''
    },
  },
  tuzelName: {
    type: String,
    default: ''
  },
  varlikTipi: {
    type: String,
    default: ''
  },
  image1URL: {
    type: String,
    default: ''
  },
  image2URL: {
    type: String,
    default: ''
  },
  validation: {
    type: Boolean,
    default: false
  },
  verification: {
    type: Boolean,
    default: false
  },
  departments: {
    type: Array,
    default: []
  },
  surveyQ1: {
    type: String,
    required: true
  },
  surveyQ2: {
    type: String,
    required: true
  },
  boxSub: {
    status: {
      type: Boolean,
      default: false
    },
    subModel: {
      type: Number,
      default: 0
    }
  }
});

module.exports = User = mongoose.model('user', UserSchema);