const router = require('express').Router()
const controllers = require('../controllers')
const controllersSignup = require('../controllers/users/signup')

//user router
router.get('/mypage', controllers.mypageInfo); // 유저정보 조회
router.patch('/mypage', controllers.mypageTogle); // 알람설정 변경


router.get('/signup', controllersSignup.emailCheck); // 이메일 중복 검사
router.get('/signup', controllersSignup.nickNameCheck); // 닉네임 중복 검사
router.post('/signup', controllersSignup.signup); // 회원가입
router.post('/signin', controllers.signin); // 로그인
router.post('/signout', controllers.signout); // 로그아웃
router.patch('/update', controllers.update); // 회원정보 수정
router.delete('/delete', controllers.delete_user); // 회원탈퇴

module.exports = router;