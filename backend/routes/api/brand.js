const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');

const Brand = require('../../models/Brand');
const Code = require('../../models/Code');

// @route POST api/brand
// @desc Register brand user
// @access private
router.post(
  '/', auth, async (req, res) => {
    const { email, company, images, description, tags, taxoffice, taxnumber, phone, address, iban, brand, type } = req.body;
    try {
      let user = await Brand.findOne({ email }).select('-password');
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User Already Exists' }] });
      }
      const password = generatePassword();
      const newBrand = new Brand({
        brand,
        email,
        password,
        company,
        description,
        tags: tags.split(','),
        images,
        payment: {
          taxoffice,
          taxnumber,
          phone,
          address,
          iban,
          type
        }
      });
      const salt = await bcrypt.genSalt(10);
      newBrand.password = await bcrypt.hash(password, salt);
      await newBrand.save();
      res.send({ password })
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error')
    }
  });

router.get('/getDiscountBrands', auth, async (req, res) => {
  let array = [];
  const brands = await Brand.find().select('_id');
  for (let i = 0; i < brands.length; i++) {
    const code = await Code.findOne({ owner: brands[i].id, type: 'discount', status: 'available' });
    if (code) {
      array.push(brands[i].id);
    }
  }
  res.send(array);
});



function generatePassword() {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

module.exports = router;