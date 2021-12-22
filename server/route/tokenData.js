<<<<<<< HEAD
//참조 안하는 파일

const router = require('express').Router()
// const controllers = require('../controllers/tokenData/accessToken')

//token router
// router.post('/accessToken', controllers.isAuthorized);
=======
const router = require('express').Router()
const controllers = require('../controllers/tokenData/accessToken')

//token router
router.post('/accessToken', controllers.isAuthorized);
>>>>>>> a96db17ac04e81ccdea2ac819e9d4599c45dffda


module.exports = router