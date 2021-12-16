const router = require('express').Router()
const controllers = require('../controllers')
const controllersP = require('../controllers/product')

//product router
router.get('/:filter', controllersP.filter);
router.get('/:search', controllersP.search);
router.get('/', controllers.product);
router.delete('/delete', controllersP.delete);
router.post('/add', controllersP.add);

module.exports = router