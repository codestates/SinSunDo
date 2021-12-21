const { users, food, foodalram } = require('../../models');
const { isAuthorized } = require('../tokenData/accessToken');

module.exports = (req, res) => {
    const accessTokenData = isAuthorized(req);
    if(!accessTokenData) {
        res.status(401).send({ data: null, message: '유효하지 않은 토큰입니다.' });
    }
    else {
        foodalram.findAll({ where: { user_id: accessTokenData.id }})
        .then((data) => {
            res.status(201).json({ data : { foodalram : data.dataValues }, message: '음식 알람 조회에 성공했습니다'})
        }).catch((err) => {
            console.log(err);
            res.status(500).send('');
        });
    }
}