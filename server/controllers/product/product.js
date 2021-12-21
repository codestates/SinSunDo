// 물품 조회하기
const { users, food } = require('../../models');
const { isAuthorized } = require('../tokenData/accessToken');

module.exports = (req, res) => {
    const accessTokenData = isAuthorized(req);
    if(!accessTokenData) {
        res.status(401).send({ data: null, message: 'not authorized' });
    }
    else {
        users.findAll({ 
            where: {email: accessTokenData.email},
        })
        .then((foodData) => {
            res.status(201).json({ data : { foodInfo : foodData }, message: '음식 조회에 성공했습니다'})
        })
    }
}