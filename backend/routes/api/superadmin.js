const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const SuperAdmin = require('../../models/SuperAdmin');

// @route POST api/superadmin
// @desc Register superadmin
// @access public
router.post(
  '/', async (req, res) => {
    const { username, password } = req.body;
    try {
      let user = await SuperAdmin.findOne({ username }).select('-password');
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User Already Exists' }] });
      }
      const newSuperAdmin = new SuperAdmin({
        username,
        password
      });
      const salt = await bcrypt.genSalt(10);
      newSuperAdmin.password = await bcrypt.hash(password, salt);
      await newSuperAdmin.save();
      res.send({ msg: 'Success' })
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error')
    }
  });

module.exports = router;