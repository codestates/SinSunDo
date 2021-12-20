// 물품 조회하기
const { users, user_category, category, food } = require('../../models');
const { isAuthorized } = require('../tokenData');

module.exports = (req, res) => {
    const accessTokenData = isAuthorized(req);
    if(!accessTokenData) {
        res.status(401).send({ data: null, message: 'not authorized' });
    }
    else {
        users.findAll({ 
            where: {email: accessTokenData.email},
            include: [
                { 
                    model: user_category,
                    attributes: {  }
                }
            ]
        })
        .then()
    }
}

//https://flyingsquirrel.medium.com/sequelize-table-join%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95-34dc1ce4e86f