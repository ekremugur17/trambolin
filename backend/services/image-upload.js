const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const config = require('config');

aws.config.update({
  secretAccessKey: config.get('awsSecretKey'),
  accessKeyId: config.get('awsKeyId'),
  region: config.get('awsRegion')
});
const s3 = new aws.S3()

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid Mime Type, only JPEG and PNG are allowed'), false);
  }
}

const upload = multer({
  fileFilter: fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: 'trambolin-images',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: 'testMetaData' });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload;