const config = require('config');
const Iyzipay = require('iyzipay');

const iyzipay = new Iyzipay({
  apiKey: config.get('iyziAPI'),
  secretKey: config.get('iyziSECRET'),
  uri: 'https://sandbox-api.iyzipay.com'
});

module.exports = iyzipay;