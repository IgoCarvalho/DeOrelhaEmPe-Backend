const router = require('express').Router();

const multer = require('multer');
const multerConfig = require('../../config/multer');
const fileUpload = require('../middlewares/file-upload')

const OccurrenceCotroller = require('../controllers/occurrence-controler');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/occurrence', multer(multerConfig).array('file', 5),fileUpload, authMiddleware, OccurrenceCotroller.create);
router.get('/occurrence' ,OccurrenceCotroller.find);
router.get('/occurrence/small', OccurrenceCotroller.findSmall);
router.post('/occurrence/updatestatus', OccurrenceCotroller.updateStatus);
router.post('/occurrence/coment', authMiddleware, OccurrenceCotroller.addComent);

module.exports = router;
