const router = require('express').Router()
const controllers = require('../controllers/product')

//product router
app.post('/', controllers.add); // 음식 추가
app.get('/:filter', controllers.filter); // 필터된 물품 조회
app.get('/:search', controllers.search); // 찾고자 하는 물품 조회
app.delete('/:foodid', controllers.delete_product); // 선택 음식 제거
app.get('/', controllers.product) // 전체 음식 조회

module.exports = router