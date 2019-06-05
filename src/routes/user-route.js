const router = require('express').Router();

const UserCotroller = require('../controllers/user-controler');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/users/signin', UserCotroller.signIn);
router.get('/users',authMiddleware ,UserCotroller.findAll);
router.get('/users/:id', UserCotroller.findById);
//router.post('/users', UserCotroller.create);
router.post('/users/signup', UserCotroller.signUp);
//router.put('/users/:id', UserCotroller.update);
router.delete('/users/:id', UserCotroller.destroy);

module.exports = router;
