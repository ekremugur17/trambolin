const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Staff = require('../../models/Staff');
const User = require('../../models/User');

// @route POST api/staff
// @desc Register Staff
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'İsim bölümü boş kalmamalıdır').not().isEmpty(),
      check('email', 'Lütfen geçerli bir e-posta adresi giriniz').isEmail(),
      check('phone', 'Lütfen telefon numarasını başına +90 koyarak boşluksuz olarak giriniz').isMobilePhone('tr-TR'),
      check('department', 'Departman bölümü boş kalmamalıdır').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, phone, department } = req.body;
    try {
      let user = await Staff.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'E-mail must be unique for each staff member' }] });
      }
      let superv = await User.findById(req.user.id);
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      const newPhone = phone.substr(0, 3) == '+90' ? phone : phone[0] == 0 ? '+9' + phone : '+90' + phone;

      const newStaff = new Staff({
        name,
        email,
        avatar,
        phone: newPhone,
        department,
        supervisor: superv.id,
        company: superv.company,
        validation: false,
        verification: superv.verification
      });
      const tempPw = generatePassword();
      const salt = await bcrypt.genSalt(10);
      newStaff.password = await bcrypt.hash(tempPw, salt);
      await newStaff.save();
      let array = superv.departments;
      if (!array.includes(department)) array.push(department);
      await User.updateOne({ _id: req.user.id }, {
        $inc: {
          staffNum: 1
        },
        $set: {
          departments: array
        }
      })
      res.json(tempPw);
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: 'Server Error', error })
    }
  });

// @route GET api/staff
// @desc Get all the staff according to supervisor id
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    let user = await Staff.find({ supervisor: req.user.id });
    res.json(user);
  } catch (error) {
    res.status(500).send('Server error')
  }
});


// @route POST api/staff/verify
// @desc Verify staff
// @access Private

router.post('/verify', auth, async (req, res) => {
  const id = req.body.id;
  await Staff.updateMany({ supervisor: id }, {
    $set: {
      verification: true
    }
  });
  res.send([{ msg: 'success' }]);
});


router.post('/update', auth, async (req, res) => {
  const { idArray, amount } = req.body;
  try {
    idArray.forEach(async (item) => {
      await Staff.updateOne({ _id: item._id }, {
        $inc: {
          credits: amount
        }
      });
    });
    res.send({ msg: 'Success' })
  } catch (error) {
    res.send({ msg: 'Failure' })
  }
});

// @route GET api/staff/getActive
// @desc Get all the active staff according to supervisor id
// @access Private
router.get('/getActive', auth, async (req, res) => {
  try {
    let number = await Staff.count({ supervisor: req.user.id, validation: true });
    res.json(number);
  } catch (error) {
    res.status(500).send('Server error')
  }
});

router.post('/box/useCoffee', auth, async (req, res) => {
  try {
    await Staff.updateOne({ _id: req.user.id, 'box.quota.coffee': { $gt: 0 } }, {
      $inc: {
        'box.quota.coffee': -1
      }
    });
    res.send({ status: 'Success' });
  } catch (e) {
    console.log(e)
    res.status(500).send('Server Error')
  }
});

router.post('/box/useTicket', auth, async (req, res) => {
  try {
    await Staff.updateOne({ _id: req.user.id, 'box.quota.ticket': { $gt: 0 } }, {
      $inc: {
        'box.quota.ticket': -1
      }
    });
    res.send({ status: 'Success' });
  } catch (e) {
    console.log(e)
    res.status(500).send('Server Error')
  }
});

router.post('/box/useDiscount', auth, async (req, res) => {
  try {
    await Staff.updateOne({ _id: req.user.id, 'box.quota.discount': { $gt: 0 } }, {
      $inc: {
        'box.quota.discount': -1
      }
    });
    res.send({ status: 'Success' });
  } catch (e) {
    console.log(e)
    res.status(500).send('Server Error')
  }
});

router.get('/box/quota', auth, async (req, res) => {
  try {
    const staff = await Staff.findById(req.user.id);
    res.send({ ...staff.box.quota })
  } catch (e) {
    console.log(e);
    res.send('Server error')
  }
})

router.post('/getDepartmentFriends', auth, async (req, res) => {
  const friends = await Staff.find({ department: req.body.department });
  if (friends) {
    res.send(friends);
  }
  else res.status(500).send('Server Error')
})

router.post('/resetPassword', auth, async (req, res) => {
  const { newPassword, oldPassword } = req.body;
  const { id } = req.user;
  const user = await Staff.findById(id);
  const isMatch = await bcrypt.compare(user.password, oldPassword);
  try {
    if (isMatch) {
      const salt = await bcrypt.genSalt(10);
      const hashedPw = await bcrypt.hash(newPassword, salt);
      await Staff.updateOne({ _id: id }, {
        $set: {
          password: hashedPw
        }
      })
      res.send('success');
    } else {
      return res.send('failure')
    }
  } catch (error) {
    console.log(error);
    return res.send('Server Error')
  }
});

router.post('/resetEmail', auth, async (req, res) => {
  const { id } = req.user;
  const { email } = req.body;
  try {
    await Staff.updateOne({ _id: id }, {
      $set: {
        email
      }
    });
    return res.send('success');
  } catch (error) {
    console.log(error);
    res.send('Server error')
  }
});

router.post('/resetPhone',
  [
    auth,
    [check('phone', 'Lütfen telefon numarasını başına +90 koyarak boşluksuz olarak giriniz').isMobilePhone('tr-TR')]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.send('failure');
    const { phone } = req.body;
    const { id } = req.user;
    const newPhone = phone.substr(0, 3) == '+90' ? phone : phone[0] == 0 ? '+9' + phone : '+90' + phone;
    try {
      await Staff.updateOne({ _id: id }, {
        $set: {
          phone: newPhone
        }
      })
      return res.send('success');
    } catch (error) {
      console.log(error);
      return res.send('Server Error');
    }
  })

function generatePassword() {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

router.post('/deleteStaff', auth, async (req, res) => {
  try {
    await Staff.findByIdAndRemove(req.body.id);
    res.send('Success');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

router.post('/forgotPasswordCode', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Staff.findOne({ email });
    if (user) {
      const code = generatePassword();
      res.send({ code, phone: user.phone });
    } else {
      res.send('error')
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});


router.post('/forgotPassword', async (req, res) => {
  const { email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    await Staff.findOneAndUpdate({ email }, { $set: { password: newPassword } });
    res.send('Success');
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

router.post('/doesExist', async (req, res) => {
  const { id } = req.body;
  const decoded = jwt.verify(id, config.get('jwtSecret'));
  try {
    const user = await Staff.findById(decoded.user.id);
    if (user) {
      res.send(true);
    } else res.send(false);
  } catch (e) {
    console.log(e)
    res.send(false);
  }
})

module.exports = router;