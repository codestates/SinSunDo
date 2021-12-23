// 물품 더하기
const { users, food } = require('../../models');
const { isAuthorized } = require('../tokenData/accessToken');

module.exports = (req, res) => {
    // D-Day 날짜 지정
    const setDate = new Date(req.body.food_expiration);
    let now = new Date();
    // D-Day 날짜에서 현재 날짜의 차이를 getTime 메서드를 사용해서 밀리초의 값으로 가져온다. 
    let distance = setDate.getTime() - now.getTime();
    // console.log(distance)

    let day = Math.floor(distance/(1000*60*60*24)) + 1;
    // console.log(day)
    const accessTokenData = isAuthorized(req);
    if(!accessTokenData) {
        res.status(401).send({ data: null, message: '유효하지 않은 토큰입니다.' });
    }
    else {
        food.create({ 
            food_name : req.body.food_name, // 음식이름
            food_quantity : req.body.food_quantity, // 음식 수량
            category_name : req.body.category_name, // 카테고리
            storage : req.body.storage, // 냉동,냉장,실온
            food_expiration : req.body.food_expiration, // 유통기한
            day_ago : day, //남은 일자
            user_id : accessTokenData.id
        })
        .then((data) => {
            if(data) {
                res.status(201).send({ message: '음식 등록에 성공했습니다.' })
            } 
            else res.status(401).json({ message: "요청이 잘못되었습니다." })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ message: 'Server Error' });
        });
    }
}
