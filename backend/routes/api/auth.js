const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Staff = require('../../models/Staff');
const SuperAdmin = require('../../models/SuperAdmin');
const Brand = require('../../models/Brand');


// @route POST api/auth/admin
// @desc login user
// @access Public
router.post(
  '/admin',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Giriş denemesi başarısız oldu' }] });
      }
      if (!user.validation) {
        console.log('no validation');
        return res.status(400).json({ errors: [{ msg: 'Hesabınıza giriş yapabilmeniz için e-posta onayınız gerekmektedir' }] })
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Giriş denemesi başarısız oldu' }] });
      }
      const payload = {
        user: {
          id: user.id
        }
      }
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      )
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error')
    }
  });


// @route GET api/auth/admin
// @desc Get user info
// @access Private
router.get('/admin', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(['-password']);
    res.json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// @route POST api/auth/staff
// @desc login Staff Member
// @access Public
router.post(
  '/staff',
  [
    check('email', 'Lütfen geçerli bir e-posta adresi giriniz').isEmail(),
    check('password', 'Şifre bölümü boş bırakılmamalıdır').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    try {
      let user = await Staff.findOne({ email });
      if (!user) {
        console.log('no user');
        return res.status(400).json({ errors: [{ msg: 'Giriş denemesi başarısız oldu' }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('no match')
        return res.status(400).json({ errors: [{ msg: 'Giriş denemesi başarısız oldu' }] });
      }
      const payload = {
        user: {
          id: user.id
        }
      }
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      )
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error')
    }
  });

// @route GET api/auth/staff
// @desc Get staff info
// @access Private
router.get('/staff', auth, async (req, res) => {
  try {
    const user = await Staff.findById(req.user.id).select(['-password']);
    res.json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.post('/staff/complete', auth, async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    await Staff.updateOne({ _id: req.user.id }, {
      $set: {
        password,
        sex: req.body.sex,
        validation: true
      }
    });
    res.send({ msg: 'Success' })
  } catch (error) {
    console.log('update error')
    res.status(500).send({ msg: 'Server Error' })
  }
})


// @route POST api/auth/super
// @desc login superadmin
// @access Public
router.post(
  '/super',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
  ],
  async (req, res) => {
    const { username, password } = req.body;
    try {
      let user = await SuperAdmin.findOne({ username });
      if (!user) {
        console.log("no user found")
        return res.status(400).json({ errors: [{ msg: 'Giriş denemesi başarısız oldu' }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("no match pw")
        return res.status(400).json({ errors: [{ msg: 'Giriş denemesi başarısız oldu' }] });
      }
      const payload = {
        user: {
          id: user.id,
          email: user.email
        }
      }
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      )
    } catch (error) {
      res.status(500).send('Server error')
    }
  });

// @route GET api/auth/super
// @desc Get superadmin info
// @access Private
router.get('/super', auth, async (req, res) => {
  try {
    const user = await SuperAdmin.findById(req.user.id).select(['-password']);
    res.json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
});


// @route POST api/auth/brand
// @desc login brand account
// @access public
router.post(
  '/brand',
  [
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    try {
      let user = await Brand.findOne({ email });
      if (!user) {
        console.log("no user found")
        return res.status(400).json({ errors: [{ msg: 'Giriş denemesi başarısız oldu' }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("no match pw")
        return res.status(400).json({ errors: [{ msg: 'Giriş denemesi başarısız oldu' }] });
      }
      const payload = {
        user: {
          id: user.id
        }
      }
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      )
    } catch (error) {
      res.status(500).send('Server error')
    }
  });

router.get('/brand/one', auth, async (req, res) => {
  try {
    const user = await Brand.findById(req.user.id).select(['-password']);
    res.json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// @route GET api/auth/brand
// @desc Get all brands
// @access Private
router.get('/brand', async (req, res) => {
  try {
    const brands = await Brand.find().select(['-password']);
    res.json(brands);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;