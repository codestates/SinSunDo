const { food } = require('../../models')
const { foodalram } = require('../../models')

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
    }
}