// 내 정보 요청(마이페이지)
const { users } = require('../../models');
const { isAuthorized } = require('../tokenData');
const { generateRefreshToken, sendRefreshToken } = require('../tokenData/refreshToken');

module.exports ={
    // 마이페이지 정보 불러오기
    get : (req, res) => {
        const accessTokenData = isAuthorized(req);
        if(!accessTokenData) {
            res.status(401).send({ data: null, message: '유효하지 않은 토큰입니다.' });
        }
        else {
            users.findOne({ where: {email: accessTokenData.email}})
            .then((data) => {
    
                // const RefreshToken = generateRefreshToken(data.dataValues);
                // sendRefreshToken(res, `jwt ${RefreshToken}`);
    
                delete userInfo.dataValues.password;
                res.status(200).json({ "data" : { userInfo : data.dataValues }, message: '회원정보 조회에 성공했습니다'})
            }).catch((err) => {
                console.log(err);
                res.status(500).send('');
            });
        }
    },
    // 마이페이지 토글(알람받기)정보 수정
    post : (req, res) => {

    }
}