const sequelize = require("sequelize");
const Op = sequelize.Op;
const { food } = require('../../models')

module.exports = (req, res) => {
    const searchWord = req.query.searchWord

    //[Op.or]을 이용해 두 개의 컬럼에서 유사 검색어 조회
    food.findAll({
        where:{
            [Op.or]: [
                {
                    food_name: {
                        [Op.like]: searchWord + "%"
                    }
                },
                {
                    food_expiration: {
                        [Op.like]: searchWord + "%"
                    }
                }
            ]
        }
    })
    .then((data) => {
        res.status(200).json({data: data, message: '상품 목록 가져오기를 성공하였습니다.'})
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({message: 'error'})
    })
};