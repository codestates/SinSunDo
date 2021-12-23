// 토글 요청 응답(마이페이지)
const { users } = require('../../models');
const { isAuthorized } = require('../tokenData/accessToken');
// const { generateRefreshToken, sendRefreshToken } = require('../tokenData/refreshToken');

module.exports = (req, res) => {
    const accessTokenData = isAuthorized(req);
    // console.log(accessTokenData)
    if(!accessTokenData) {
        res.status(401).send({ data: null, message: '유효하지 않은 토큰입니다.' });
    }
    else {
        users.update({ togle :  accessTokenData.togle === true ? false : true}, { where : { email: accessTokenData.email }})
        .then((data) => {
            console.log(data)
            res.status(201).json({ data : accessTokenData, message: '알람 설정이 변경되었습니다.'})
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ message: 'Server Error' });
        });
    }
}