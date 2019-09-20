const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Staff = require('../../models/Staff');
const Purchase = require('../../models/Purchase');

router.post('/gift', auth, async (req, res) => {
  const { brand, amount, code } = req.body;
  const { id } = req.user;
  const newPurchase = new Purchase({
    userId: id,
    brand,
    value: amount,
    code: code.code,
    type: 'gift'
  });
  try {
    await newPurchase.save();
    res.send('Success');
  } catch (error) {
    res.send(error);
  }
});

router.post('/box', auth, async (req, res) => {
  const { code, content } = req.body;
  const { id } = req.user;
  const newPurchase = new Purchase({
    userId: id,
    code,
    type: 'box',
    content
  });
  try {
    await newPurchase.save();
    res.send('Success');
  } catch (error) {
    res.send(error);
  }
});

router.post('/discount', auth, async (req, res) => {
  const { brand, amount, code } = req.body;
  const { id } = req.user;
  const staff = await Staff.findById(id);
  let purchases = staff.discountPurchases;
  let found = false;
  for (let i = 0; i < purchases.length; i++) {
    if (purchases[i].brand == brand.brand) {
      purchases[i].count += 1;
      found = true;
    }
  }
  if (!found) {
    purchases.push({ brand: brand.brand, count: 1 })
  }
  await Staff.updateOne({ _id: id }, {
    $set: {
      discountPurchases: purchases
    }
  })
  const newPurchase = new Purchase({
    userId: id,
    brand,
    code,
    type: 'discount',
    value: amount
  });
  console.log(newPurchase);
  try {
    await newPurchase.save();
    res.send('Success');
  } catch (error) {
    res.send(error);
  }
});

router.get('/getPast', auth, async (req, res) => {
  const { id } = req.user;
  const purchases = await Purchase.find({ userId: id });
  res.send(purchases);
});

module.exports = router;