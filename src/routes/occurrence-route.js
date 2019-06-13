const router = require('express').Router();

const OccurrenceCotroller = require('../controllers/occurrence-controler');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/occurrence', OccurrenceCotroller.create);
router.get('/occurrence' ,OccurrenceCotroller.find);
// router.get('/users/:id', UserCotroller.findById);
// //router.post('/users', UserCotroller.create);
// router.post('/users/signup', UserCotroller.signUp);
// //router.put('/users/:id', UserCotroller.update);
// router.delete('/users/:id', UserCotroller.destroy);

module.exports = router;
