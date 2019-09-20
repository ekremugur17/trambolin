const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  receiverInfo: {
    name: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    }
  },
  department: {
    type: String,
    default: null
  },
  receiver: {
    type: String,
    default: null
  },
  forWho: {
    type: String,
    default: 'public'
  },
  message: {
    type: String,
    required: true,
    maxlength: 100
  },
  date: {
    type: Date,
    default: new Date
  }
});

module.exports = Message = mongoose.model('message', MessageSchema);