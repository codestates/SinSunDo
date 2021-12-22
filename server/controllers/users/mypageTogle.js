// 토글 요청 응답(마이페이지)
const { users } = require('../../models');
const { isAuthorized } = require('../tokenData/accessToken');
// const { generateRefreshToken, sendRefreshToken } = require('../tokenData/refreshToken');

module.exports = (req, res) => {
    console.log(req.body);
    const accessTokenData = isAuthorized(req);
    console.log(accessTokenData)
    if(!accessTokenData) {
        res.status(401).send({ data: null, message: '유효하지 않은 토큰입니다.' });
    }
    else {
        users.update({ togle :  accessTokenData.togle ? false : true}, { where : { email: accessTokenData.email }})
        .then(() => {
            console.log("222222222222")
            res.status(200).json({ data : null, message: '알람 설정이 변경되었습니다.'})
        }).catch((err) => {
            console.log("3333333333")
            console.log(err);
            res.status(500).send({ message: 'Server Error' });
        });
    }
}