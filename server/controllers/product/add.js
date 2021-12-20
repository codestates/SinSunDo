// 물품 더하기
const { users, user_category, category, food } = require('../../models');
const { isAuthorized } = require('../tokenData/accessToken');

module.exports = (req, res) => {
    const accessTokenData = isAuthorized(req);
    if(!accessTokenData) {
        res.status(401).send({ data: null, message: '유효하지 않은 토큰입니다.' });
    }
    else {
        food.create({ 
            food_name : req.body.food_name, // 음식이름
            food_quantity : req.body.food_quantity, // 음식 수량
            category_name_id : req.body.category_name_id, // 카테고리
            storage : req.body.storage, // 냉동,냉장,실온
            food_expiration : req.body.food_expiration, // 유통기한
            day_ago: null
        })
        .then((data) => {
            if(data) {
                food.create({ 
                    day_ago: `SELECT DATE_ADD(NOW(), INTERVAL -${req.body.food_expiration}) FROM FOOD`
                })
            } else res.status(401).json({message: "요청이 잘못되었습니다."})
        })
        .then((data) => {
            if(data) {
                res.status(201).send({ message: '음식 등록에 성공했습니다.' })
            } else res.status(401).json({message: "요청이 잘못되었습니다."})
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('');
        });
    }
}