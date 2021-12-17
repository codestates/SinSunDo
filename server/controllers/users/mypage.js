// 내 정보 요청(마이페이지)
const { users } = require('../../models');
const { isAuthorized } = require('../tokenData');
const { generateRefreshToken, sendRefreshToken } = require('../tokenData/refreshToken');

module.exports = (req, res) => {
    const accessTokenData = isAuthorized(req);
    if(!accessTokenData) {
        res.status(401).send({ data: null, message: 'not authorized' });
    }
    else {
        users.findOne({ where: {email: accessTokenData.email}})
        .then((data) => {
            const RefreshToken = generateRefreshToken(data.dataValues);
            sendRefreshToken(res, `jwt ${RefreshToken}`);
            
            res.status(200).json({ "data" : {userInfo : data.dataValues}})
        }).catch((err) => {
            console.log(err);
            res.status(500).send('');
        });
    }
}