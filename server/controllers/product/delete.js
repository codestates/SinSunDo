const { users, user_category, category, food } = require('../../models');
const { isAuthorized } = require('../tokenData/accessToken');

module.exports = (req, res) => {
    console.log(req.body)
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
        res.status(401).send({ data: null, message: '유효하지 않은 토큰입니다.' });
    }
    else {
        // 음식과 연결된 알람도 같이 제거가 필요하다.
        food.destroy({
            // where: { id: req.params.postid } 
            // where: { id: req.params.id }
            where: { id: req.body.id }
        })
            .then(() => res.status(201).send({ message: '음식을 제거했습니다.' }))
            .catch((err) => {
                console.log(err);
                res.status(500).send({ message: 'Server Error' });
            });
    }
}