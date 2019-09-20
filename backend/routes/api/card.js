const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Iyzipay = require('iyzipay');
const iyzipay = require('../../config/iyzipay');
const Card = require('../../models/Card');


// @route POST api/card
// @desc register card to database
// @access Private
router.post('/', auth, async (req, res) => {
  const { id } = req.user;
  const { cardToken, cardUserKey, cardAlias, lastFourDigits, cardType, cardAssociation, cardFamily, cardBankCode, cardBankName } = req.body;
  const newCard = new Card({
    owner: id,
    cardToken,
    cardAlias,
    cardUserKey,
    lastFourDigits,
    cardType,
    cardAssociation,
    cardFamily,
    cardBankCode,
    cardBankName
  })
  try {
    await newCard.save();
    res.send({ msg: 'Successfully saved card' });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// @route POST api/card/iyziyo
// @desc register card to iyzico
// @access Private

router.post('/iyzico', auth, (req, res) => {
  const { id } = req.user;
  const { card, email } = req.body;
  iyzipay.card.create({
    locale: Iyzipay.LOCALE.TR,
    conversationId: '123456789',
    externalId: id,
    email,
    card
  }, function (err, result) {
    res.send({ err, result });
  });
})

router.get('/', auth, async (req, res) => {
  const { id } = req.user;
  try {
    const cards = await Card.find({ owner: id });
    res.send(cards);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

router.post('/deleteCard', auth, async (req, res) => {
  try {
    await Card.findByIdAndRemove(req.body.id);
    res.send('Success');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;