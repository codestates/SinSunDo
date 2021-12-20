// 물품 더하기
const { users, user_category, category, food } = require('../../models');
const { isAuthorized } = require('../tokenData');

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
            food_img_id : req.body.food_img_id // 이미지인데 이게 아닌듯 하다.(이건 아이콘, 사진 둘 중 하나를 선택하게 되면 그때 수정이 들어가면 된다.)
        })
        .then(() => res.status(201).send({ message: '음식 등록에 성공했습니다.' }))
        .catch((err) => {
            console.log(err);
            res.status(500).send('');
        });
    }
}