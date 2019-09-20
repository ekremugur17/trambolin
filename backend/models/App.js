const mongoose = require('mongoose');

const AppSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  first: {
    type: String,
    default: null
  },
  second: {
    type: String,
    default: null
  },
  third: {
    type: String,
    default: null
  },
  fourth: {
    type: String,
    default: null
  }
});

module.exports = App = mongoose.model('app', AppSchema);
