const router = require('express').Router()
const controllers = require('../controllers')

//user router
router.get('/mypage', controllers.mypageInfo); // 유저정보 조회
router.patch('/mypage', controllers.mypageTogle); // 알람설정 변경

router.post('/signup', controllers.signup); // 회원가입
router.post('/signin', controllers.signin); // 로그인
router.post('/signout', controllers.signout); // 로그아웃
router.patch('/update', controllers.update); // 회원정보 수정
router.delete('/delete', controllers.delete_user); // 회원탈퇴

module.exports = router;