const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  cardToken: {
    type: String,
    required: true
  },
  cardUserKey: {
    type: String,
    required: true
  },
  cardAlias: {
    type: String,
    default: 'Payment Card'
  },
  lastFourDigits: {
    type: String,
    required: true
  },
  cardType: {
    type: String,
    default: null
  },
  cardAssociation: {
    type: String,
    default: null
  },
  cardFamily: {
    type: String,
    default: null
  },
  cardBankCode: {
    type: Number,
    default: null
  },
  cardBankName: {
    type: String,
    default: null
  },
});

module.exports = Card = mongoose.model('card', CardSchema);
