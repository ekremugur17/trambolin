const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User')

// @route POST api/users
// @desc Register User
// @access Public
router.post(
  '/',
  [
    check('name', 'İsim bölümü boş bırakılmamalıdır').not().isEmpty(),
    check('email', 'Lütfen geçerli bir e-posta adresi giriniz').isEmail(),
    check('password', 'Şifreniz en az 6 karakter uzunluğunda olmalıdır').isLength({ min: 6 }),
    check('phone', 'Lütfen telefon numaranızı başına +90 koyarak boşluksuz olarak giriniz').isMobilePhone('tr-TR')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, phone, company, staffNum, address, tuzelName, varlikTipi, image1URL, image2URL } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'Bu e-posta hesabına ait bir kullanıcı zaten var' }] });
      }
      user = await User.findOne({ company });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'Şirket ismi her üyeliğe özel olmalıdır' }] });
      }
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      user = new User({
        name,
        email,
        avatar,
        password,
        phone,
        company,
        staffNum,
        address,
        tuzelName,
        varlikTipi,
        image1URL,
        image2URL,
        validation: false,
        verification: false
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id
        }
      }
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
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

// @route get api/users
// @desc get all Users
// @access Private
router.get('/', auth, async (req, res) => {
  await User.find({ verification: false }, (err, docs) => { res.send({ err, docs }) });
});

// @route POST api/users/verify
// @desc Verify user
// @access Private

router.post('/verify', auth, async (req, res) => {
  const id = req.body.id;
  await User.updateOne({ _id: id }, {
    $set: {
      verification: true
    }
  });
  res.send([{ msg: 'success' }]);
});


// @route POST api/users/registerNew
// @desc Register User with new interface
// @access Public
router.post(
  '/registerNew',
  [
    check('name', 'İsim bölümü boş bırakılmamalıdır').not().isEmpty(),
    check('email', 'Lütfen geçerli bir e-posta adresi giriniz').isEmail(),
    check('password', 'Şifreniz en az 6 karakter uzunluğunda olmalıdır').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, passwordVerify, company, city, surveyQ1, surveyQ2 } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'Bu e-posta hesabına ait bir kullanıcı zaten var' }] });
      }
      user = await User.findOne({ company });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'Şirket ismi her üyeliğe özel olmalıdır' }] });
      }
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      user = new User({
        name, email, password, passwordVerify, company, city, surveyQ1: surveyQ1.value, surveyQ2: surveyQ2.value, avatar
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id
        }
      }
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
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


router.post('/doesMailExist', async (req, res) => {
  const { email } = req.body;
  const user = User.findOne({ email });
  if (user) {
    res.status(400).send({ errors: [{ msg: 'Bu e-posta zaten kullanımda' }] });
  } else res.send('Success');
});

module.exports = router;