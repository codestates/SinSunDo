const router = require('express').Router()
const controllers = require('../controllers/product')

//product router
router.get('/:filter', controllers.filter);
router.get('/:search', controllers.search);
router.get('/', controllers.product);
router.delete('/delete', controllers.delete);
router.post('/add', controllers.add);

module.exports = router