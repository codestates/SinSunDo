const router = require('express').Router()
const controllers = require('../controllers/tokenData')

//token router
router.post('/refreshToken', controllers.refreshToken);

module.exports = router