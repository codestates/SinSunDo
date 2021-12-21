// 물품 더하기
const { users, food } = require('../../models');
const { isAuthorized } = require('../tokenData/accessToken');

module.exports = (req, res) => {
    const accessTokenData = isAuthorized(req);
    if(!accessTokenData) {
        res.status(401).send({ data: null, message: '유효하지 않은 토큰입니다.' });
    }
    else {
        // find or create로 만들어진건 그냥 넘겨야하나?
        // 매일 업데이트 되어야하니 이렇게 작성되면 안되는거같다. day_ago는 따로 나와있어야할 것 같다.
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
                // 하루에 한번씩 연산이 이루어져야하네?
                food.update({ 
                    day_ago: `SELECT DATE_ADD(NOW(), INTERVAL - ${req.body.food_expiration}) FROM FOOD`
                }, {where : { id : data.dataValues.id }})
            } 
            else res.status(401).json({message: "요청이 잘못되었습니다."})
        })
        .then((data) => {
            if(data) {
                res.status(201).send({ message: '음식 등록에 성공했습니다.'})
            } 
            else res.status(401).json({message: "요청이 잘못되었습니다."})
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('');
        });
    }
}