// 물품 조회하기
const { users, food } = require('../../models');
const { isAuthorized } = require('../tokenData/accessToken');

module.exports = (req, res) => {
    // console.log(req)
    const accessTokenData = isAuthorized(req);
    if(!accessTokenData) {
        res.status(401).send({ data: null, message: 'not authorized' });
    }
    else {
        food.findAll({ 
            where: {user_id: accessTokenData.id},
        })
        .then((foodData) => {
            res.status(201).json({ data : { foodInfo : foodData }, message: '음식 조회에 성공했습니다'})
        })
    }
}