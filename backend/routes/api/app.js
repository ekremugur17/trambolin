const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const App = require('../../models/App');

// @route POST api/app
// @desc get image by name
// @access private
router.post('/', auth, async (req, res) => {
  const { name } = req.body;
  try {
    let image = await App.findOne({ name });
    if (!image) return res.status(404).send({ msg: 'Image not Found' });
    res.send(image);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});


// @route POST api/app/upload
// @desc upload image
// @access Private
router.post('/upload', auth, async (req, res) => {
  const { name, position, url } = req.body;
  try {
    switch (position) {
      case 'first':
        await App.updateOne({ name }, { $set: { first: url } })
        break;
      case 'second':
        await App.updateOne({ name }, { $set: { second: url } })
        break;
      case 'third':
        await App.updateOne({ name }, { $set: { third: url } })
        break;
      case 'fourth':
        await App.updateOne({ name }, { $set: { fourth: url } })
        break;
      default:
        break;
    }
    res.send({ msg: 'Successfully Updated' });
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
});

module.exports = router;