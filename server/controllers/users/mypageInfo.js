// 내 정보 요청(마이페이지)
const { users } = require('../../models');
const { isAuthorized } = require('../tokenData/accessToken');
// const { generateRefreshToken, sendRefreshToken } = require('../tokenData/refreshToken');

module.exports = (req, res) => {
    // 마이페이지 정보 불러오기
<<<<<<< HEAD
=======
    // console.log(req);
>>>>>>> 4142434bd577e19b717f33f9c5019387da6017a9
    const accessTokenData = isAuthorized(req);
    // console.log(accessTokenData);
    if(!accessTokenData) {
        res.status(401).send({ data: null, message: '유효하지 않은 토큰입니다.' });
    }
    else {
        users.findOne({ where: {email: accessTokenData.email}})
        .then((data) => {
            // const RefreshToken = generateRefreshToken(data.dataValues);
            // sendRefreshToken(res, `jwt ${RefreshToken}`);
            delete data.dataValues.password;
<<<<<<< HEAD
            // delete data.dataValues.togle;
=======
            delete data.dataValues.togle;
>>>>>>> 4142434bd577e19b717f33f9c5019387da6017a9
            res.status(200).json({ data : { userInfo : data.dataValues }, message: '회원정보 조회에 성공했습니다'})
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ message: 'Server Error' });
        });
    }
}