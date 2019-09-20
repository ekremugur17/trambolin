const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Code = require('../../models/Code');
const Staff = require('../../models/Staff');

// @route POST api/code/gift
// @desc add gift codes
// @access Private
router.post('/gift', auth, async (req, res) => {
  let keys = Object.keys(req.body);
  let values = Object.values(req.body);
  for (let i = 0; i < keys.length; i++) {
    for (let j = 0; j < values[i].length; j++) {
      for (let k = 0; k < values[i][j].length; k++) {
        const newCode = new Code({
          owner: req.user.id,
          code: values[i][j][k].toString(),
          type: 'gift',
          value: parseInt(keys[i])
        })
        newCode.save();
      }
    }
  }
  res.send({ msg: 'success' });
});

// @route POST api/code/discount
// @desc add discount codes
// @access Private
router.post('/discount', auth, async (req, res) => {
  for (let j = 0; j < req.body.codes.length; j++) {
    for (let k = 0; k < req.body.codes[j].length; k++) {
      const newCode = new Code({
        owner: req.user.id,
        code: req.body.codes[j][k].toString(),
        type: 'discount'
      })
      newCode.save();
    }
  }
  res.send({ msg: 'success' });
});

// @route POST api/code/checkCoupon
// @desc check gift codes
// @access Private
router.post('/checkCoupon', auth, async (req, res) => {
  let array = [{ status: false, value: 25 }, { status: false, value: 50 }, { status: false, value: 100 }, { status: false, value: 200 }, { status: false, value: 250 }, { status: false, value: 500 }];
  for (let i = 0; i < array.length; i++) {
    const res = await Code.find({ owner: req.body.id, status: 'available', value: array[i].value, type: 'gift' });
    if (res.length > 0) {
      array[i].status = true;
    }
  }
  res.send({ coupons: array });
});

// @route POST api/code/checkCoupon
// @desc check gift codes
// @access Private
router.post('/getCoupon', auth, async (req, res) => {
  const response = await Code.findOneAndUpdate({ owner: req.body.id, status: 'available', type: 'gift', value: req.body.value }, {
    $set: {
      status: 'used'
    }
  });
  if (!response) {
    return res.status(500).send('Code couldnt be found')
  }
  await Staff.updateOne({ _id: req.user.id }, {
    $inc: {
      credits: -1 * req.body.value
    }
  })
  res.send({ code: response.code, terms: response.terms });
});

router.post('/getDiscount', auth, async (req, res) => {
  const response = await Code.findOneAndUpdate({ owner: req.body.id, status: 'available', type: 'discount' }, {
    $set: {
      status: 'used'
    }
  });
  if (!response) {
    return res.status(500).send('Code couldnt be found')
  }
  // const staff = await Staff.findOne({ _id: req.user.id });
  // const array = staff.discountPurchases;
  // console.log(array);
  // await Staff.updateOne({ _id: req.user.id }, {
  //   $inc: {

  //   }
  // })
  if (!response) {
    return res.status(500).send('Code couldnt be found')
  }
  res.send({ code: response.code, value: response.value });
});

// @route POST api/code/getCoffeeCoupon
// @desc get getCoffeeCoupon
// @access Private
router.get('/getCoffeeCoupon', auth, async (req, res) => {
  const response = await Code.findOneAndUpdate({ status: 'available', type: 'coffee' }, {
    $set: {
      status: 'used'
    }
  });
  if (!response) {
    return res.status(500).send('Code couldnt be found')
  }
  res.send({ code: response.code });
});

// @route POST api/code/getTicketCoupon
// @desc get getTicketCoupon
// @access Private
router.get('/getTicketCoupon', auth, async (req, res) => {
  const response = await Code.findOneAndUpdate({ status: 'available', type: 'ticket' }, {
    $set: {
      status: 'used'
    }
  });
  if (!response) {
    return res.status(500).send('Code couldnt be found')
  }
  res.send({ code: response.code });
});

// @route POST api/code/getDiscountCoupon
// @desc get getDiscountCoupon
// @access Private
router.get('/getDiscountCoupon', auth, async (req, res) => {
  const response = await Code.findOneAndUpdate({ status: 'available', type: 'discount' }, {
    $set: {
      status: 'used'
    }
  });
  res.send({ code: response.code });
});



module.exports = router;