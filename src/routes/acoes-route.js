const router = require('express').Router();

const multer = require('multer');
const multerConfig = require('../../config/multer');
const fileUpload = require('../middlewares/file-upload')

const AcoesCotroller = require('../controllers/acoes-controler');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/acoes', multer(multerConfig).array('image'), fileUpload, AcoesCotroller.create);
router.get('/acoes' ,AcoesCotroller.findAll);
// router.get('/users/:id', UserCotroller.findById);
// //router.post('/users', UserCotroller.create);
// router.post('/users/signup', UserCotroller.signUp);
// //router.put('/users/:id', UserCotroller.update);
// router.delete('/users/:id', UserCotroller.destroy);

module.exports = router;
