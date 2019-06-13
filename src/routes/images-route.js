const router = require('express').Router();
const multer = require('multer');
const multerConfig = require('../../config/multer');
const fileUpload = require('../middlewares/file-upload')


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    console.log(file.originalname)
    file.key = Date.now() + '-' + file.originalname
    cb(null, file.key)
  }
})



var upload = multer({ storage: storage })





router.post("/images", multer(multerConfig).array('file', 3),fileUpload , (req, res) => {
    console.log(req.files);
    console.log(req.body);
    console.log(req.filesData);
    //console.log(req)
    //console.log(req.file.originalname);
    return res.json({hello: "Ismael"});
})
module.exports = router;
