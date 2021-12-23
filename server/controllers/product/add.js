// 물품 더하기
const { users, food } = require('../../models');
const { isAuthorized } = require('../tokenData/accessToken');

module.exports = (req, res) => {
    const accessTokenData = isAuthorized(req);
    if(!accessTokenData) {
        res.status(401).send({ data: null, message: '유효하지 않은 토큰입니다.' });
    }
    else {
        // D-Day 날짜 지정
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();

        let endDate1 = req.body.food_expiration.toString().split('-');
        const endDate2 = new Date(endDate1[0], endDate1[1], endDate1[2])
        const stDate = new Date(year, month, day);

        const btMs = endDate2.getTime() - stDate.getTime();
        const btdat = btMs / (1000*60*60*24);

        // console.log(endDate2, stDate);
        // console.log(endDate2.getTime(), stDate.getTime());
        // console.log(btdat)

        food.create({ 
            food_name : req.body.food_name, // 음식이름
            user_id : accessTokenData.id, // 유저 고유번호
            food_quantity : req.body.food_quantity, // 음식 수량
            category_name : req.body.category_name, // 카테고리
            storage : req.body.storage, // 냉동,냉장,실온
            food_expiration : req.body.food_expiration, // 유통기한
            day_ago : btdat
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

