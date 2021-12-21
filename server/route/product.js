const router = require('express').Router()
const controllers = require('../controllers')

//product router
router.post('/', controllers.add); // 음식 추가
// router.get('/:filter', controllers.filter); // 필터된 물품 조회
router.get('/:search', controllers.search); // 찾고자 하는 물품 조회
router.delete('/delete', controllers.delete_product); // 선택 음식 제거
// router.delete('/:foodid', controllers.delete_product); // 선택 음식 제거
router.get('/', controllers.product) // 전체 음식 조회
<<<<<<< HEAD
router.get('/alram', controllers.alram); // 알림창
=======
router.get('/alram', controllers.alram) // 알람 내용 조회
>>>>>>> 5ed7991ebff49266abfe67d8e18e2ed557177834

module.exports = router;
