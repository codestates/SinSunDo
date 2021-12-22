// 물품 더하기
const { users, food } = require('../../models');
const { isAuthorized } = require('../tokenData/accessToken');

module.exports = (req, res) => {
    const accessTokenData = isAuthorized(req);
    if(!accessTokenData) {
        res.status(401).send({ data: null, message: '유효하지 않은 토큰입니다.' });
    }
    else {
        const getDDay = () => {
            // D-Day 날짜 지정
            const setDate = new Date(`${req.body.food_expiration}T00:00:00+0900`);
            // D-day 날짜의 연,월,일 구하기
            const setDateYear = setDate.getFullYear();
            // getMonth 메서드는 0부터 세기 때문에 +1 해준다.
            const setDateMonth = setDate.getMonth() + 1;
            const setDateDay = setDate.getDate();
            const now = new Date();

            // D-Day 날짜에서 현재 날짜의 차이를 getTime 메서드를 사용해서 밀리초의 값으로 가져온다. 
            const distance = setDate.getTime() - now.getTime();

            const day = Math.floor(distance/(1000*60*60*24));
        
            food.create({ 
                food_name : req.body.food_name, // 음식이름
                food_quantity : req.body.food_quantity, // 음식 수량
                category_name_id : req.body.category_name_id, // 카테고리
                storage : req.body.storage, // 냉동,냉장,실온
                food_expiration : req.body.food_expiration, // 유통기한
                day_ago : null
            })
            .then((data) => {
                if(data) {
                    food.update({ 
                        // day_ago: `SELECT DATE_ADD(NOW(), INTERVAL - ${req.body.food_expiration}) FROM FOOD`
                        day_ago: day
                    }, {where : { id : data.dataValues.id }})
                } 
                else res.status(401).json({message: "요청이 잘못되었습니다."})
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
}

