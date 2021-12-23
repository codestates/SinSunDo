// 토글 요청 응답(마이페이지)
const { users } = require('../../models');
const { isAuthorized } = require('../tokenData/accessToken');
// const { generateRefreshToken, sendRefreshToken } = require('../tokenData/refreshToken');

module.exports = (req, res) => {
<<<<<<< HEAD
=======
    // console.log(req);
>>>>>>> 4142434bd577e19b717f33f9c5019387da6017a9
    const accessTokenData = isAuthorized(req);
    // console.log(accessTokenData)
    if(!accessTokenData) {
        res.status(401).send({ data: null, message: '유효하지 않은 토큰입니다.' });
    }
    else {
<<<<<<< HEAD
        users.update({ togle :  accessTokenData.togle === true ? false : true}, { where : { email: accessTokenData.email }})
        .then((data) => {
            console.log(data)
            res.status(201).json({ data : accessTokenData, message: '알람 설정이 변경되었습니다.'})
=======
        users.update({ togle :  accessTokenData.togle ? false : true}, { where : { email: accessTokenData.email }})
        .then(() => {
            res.status(201).json({ data : null, message: '알람 설정이 변경되었습니다.'})
>>>>>>> 4142434bd577e19b717f33f9c5019387da6017a9
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ message: 'Server Error' });
        });
    }
}