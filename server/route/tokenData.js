const router = require('express').Router()
const controllers = require('../controllers/tokenData/accessToken')

//token router
router.post('/accessToken', controllers.isAuthorized);


module.exports = router