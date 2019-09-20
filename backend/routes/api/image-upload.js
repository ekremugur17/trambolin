const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const upload = require('../../services/image-upload');
const singleUpload = upload.single('image');

router.post('/', (req, res) => {
  singleUpload(req, res, (err) => {
    if (err) return res.status(401).send({ errors: [{ title: "Image upload error", detail: err.message }] });
    return res.json({ imgURL: req.file.location })
  });
});

module.exports = router;