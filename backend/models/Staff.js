const mongoose = require('mongoose');
const date = new Date();

const StaffSchema = new mongoose.Schema({
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  company: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  validation: {
    type: Boolean,
    default: false
  },
  verification: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true
  },
  workDate: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    default: null
  },
  interests: {
    type: [String],
    default: null
  },
  date: {
    type: Date,
    default: Date.now
  },
  credits: {
    type: Number,
    default: 0
  },
  department: {
    type: String,
    default: 'none'
  },
  box: {
    status: {
      type: Boolean,
      default: false
    },
    quota: {
      coffee: {
        type: Number,
        default: 0
      },
      ticket: {
        type: Number,
        default: 0
      },
      discount: {
        type: Number,
        default: 0
      }
    }
  },
  discountPurchases: {
    type: Array,
    default: []
  }
});

module.exports = Staff = mongoose.model('staff', StaffSchema);