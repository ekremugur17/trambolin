const mongoose = require('mongoose');

const SuperAdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = SuperAdmin = mongoose.model('superadmin', SuperAdminSchema);
