const router = require('express').Router()
const controllers = require('../controllers/users')

//user router
router.post('/signin', controllers.signin);
router.post('/signup', controllers.signup);
router.post('/signout', controllers.signout);
router.delete('/delete', controllers.delete);
router.get('/mypage', controllers.mypage);

module.exports = router