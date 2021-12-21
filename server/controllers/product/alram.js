<<<<<<< HEAD
const { food } = require('../../models')
const { foodalram } = require('../../models')

<<<<<<< HEAD
module.exports = (req, res) => {
=======
const { users, food, foodalram } = require('../../models');
const { isAuthorized } = require('../tokenData/accessToken');
>>>>>>> 64385f75eb4c3b923c5bdf6256fd7345ffc78ff5

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
=======
module.exports = async(req, res) => {
    const accessTokenData = isAuthorized(req);
    if(!accessTokenData && req.body.togle === false) {
        res.status(400).send({ data: null, message: '잘못된 요청입니다.' });
    } else {
        const queryString = `select food_name, food_expiration, food_category, day_ago from food`
        const user = await food.findAll({
            include: [
                { model: users, attributes: ['nickname', 'user_picture'] }
            ],
            where: {
                user_id: req.params.user_id
            },
        })

        if(user) {
            
        }
>>>>>>> 2a0b2d6180ee7d0f29eae3de3bfe4322de74ff5d
    }
}