const express = require('express');
const router = express.Router();
const Iyzipay = require('iyzipay');
const iyzipay = require('../../config/iyzipay');
const auth = require('../../middleware/auth');

const Staff = require('../../models/Staff');
const Brand = require('../../models/Brand');
const Card = require('../../models/Card');

// @route POST api/payment/register/sub
// @desc register sub merchant
// @access private 
router.post('/register/sub', async (req, res) => {
  const { email, type, company, taxnumber, iban, address, taxoffice, phone } = req.body;
  const brand = await Brand.findOne({ email });
  const id = brand.id;
  iyzipay.subMerchant.create({
    locale: Iyzipay.LOCALE.TR,
    conversationId: '123456789',
    subMerchantExternalId: id,
    subMerchantType: type === 'Limited/Anonim' ? Iyzipay.SUB_MERCHANT_TYPE.LIMITED_OR_JOINT_STOCK_COMPANY : Iyzipay.SUB_MERCHANT_TYPE.PRIVATE_COMPANY,
    address,
    taxOffice: taxoffice,
    taxNumber: taxnumber,
    legalCompanyTitle: company,
    email,
    gsmNumber: phone,
    name: company,
    iban,
    currency: Iyzipay.CURRENCY.TRY
  }, function (err, result) {
    res.send({ error: err, result });
    if (result.status === 'success') {
      updateBrandWithSubKey(id, result.subMerchantKey)
    }
  });
});


// @route POST api/payment/info/sub
// @desc retrieve sub merchant info
// @access public 
router.post('/info/sub', (req, res) => {
  iyzipay.subMerchant.retrieve({
    locale: Iyzipay.LOCALE.TR,
    conversationId: '123456789',
    subMerchantExternalId: req.body.externalId
  }, function (err, result) {
    res.send({ error: err, result })
  });
});

router.post('/register/card', auth, async (req, res) => {
  const { id, email } = req.user;
  const card = req.body;

  iyzipay.card.create({
    locale: Iyzipay.LOCALE.TR,
    conversationId: '123456789',
    email,
    externalId: id,
    card
  }, function (err, result) {
    res.send({ err, result });
  });
});

async function updateBrandWithSubKey(brandId, subKey) {
  await Brand.updateOne({ _id: brandId }, {
    $set: {
      subMerchantKey: subKey
    }
  })
}

router.post('/withRegistered', auth, async (req, res) => {
  const { id } = req.user;
  const staff = await Staff.findById(id);
  if (staff.credits < req.body.value) {
    return res.send({ err: null, result: { status: 'failure' } })
  }
  const supervisor = await User.findById(staff.supervisor);
  const names = supervisor.name.split(' ');
  const cards = await Card.find({ owner: supervisor.id });
  let request = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: '123456789',
    price: req.body.value,
    paidPrice: req.body.value,
    currency: Iyzipay.CURRENCY.TRY,
    installment: '1',
    basketId: 'B67832',
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    paymentCard: {
      cardUserKey: cards[0].cardUserKey,
      cardToken: cards[0].cardToken
    },
    buyer: {
      id: supervisor.id,
      identityNumber: '22042751238',
      name: names[0] ? names[0] : 'noname',
      surname: names[1] ? names[1] : 'noname',
      gsmNumber: supervisor.phone,
      email: supervisor.email,
      registrationAddress: supervisor.address.address1,
      ip: req.connection.remoteAddress,
      city: 'Istanbul',
      country: 'Turkey'
    },
    shippingAddress: {
      contactName: supervisor.name,
      city: 'Istanbul',
      country: 'Turkey',
      address: supervisor.address.shipping
    },
    billingAddress: {
      contactName: supervisor.name,
      city: 'Istanbul',
      country: 'Turkey',
      address: supervisor.address.billing
    },
    basketItems: [
      {
        id: 'GC101',
        name: 'Gift Coupon',
        category1: 'Coupons',
        category2: 'Gift Coupons',
        itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
        price: req.body.value,
        subMerchantKey: req.body.subMerchantKey,
        subMerchantPrice: req.body.value
      }
    ]
  };

  iyzipay.payment.create(request, function (err, result) {
    res.send({ result, err });
  });
})

module.exports = router;