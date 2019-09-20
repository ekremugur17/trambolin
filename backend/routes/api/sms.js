const express = require('express');
const router = express.Router();
const config = require('config');
const https = require('https');
const id = config.get('gsmID');
const pw = config.get('gsmPW');

router.post('/', (req, res) => {
  let { phone, password } = req.body;
  phone = phone.substr(3, phone.length);
  const message = `Trambolin'e Hosgeldiniz, sifrenizi kullanarak kazanmaya baslayin! Sifreniz: ${password}`
  const url = `https://api.netgsm.com.tr/sms/send/get/?usercode=${id}&password=${pw}&gsmno=${phone}&message=${message}&msgheader=8503051076&stopdate=300120122321&dil=TR`;
  https.get(url, (resp) => {
    res.send({ msg: 'Success' })
  })
});

router.post('/forgotPassword', (req, res) => {
  let { phone, code } = req.body;
  phone = phone.substr(3, phone.length);
  console.log(phone);
  const message = `Trambolin üyeliğinizi sıfırlamak için onaylama kodunuz: ${code}`
  const url = `https://api.netgsm.com.tr/sms/send/get/?usercode=${id}&password=${pw}&gsmno=${phone}&message=${message}&msgheader=8503051076&stopdate=300120122321&dil=TR`;
  console.log('here');
  https.get(url, (resp) => {
    res.send({ msg: 'Success' })
  })
})

module.exports = router;