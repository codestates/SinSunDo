const { users, food, foodalram } = require('../../models');
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = {
    foodData: async () => {
        // day_ago 데이터 업데이트
        await foodalram.update({ day_ago : day_ago - 1 })
    },

    alram: async () => {
        // 조건이 맞다면 알람데이터 추가
        await food.findAll({
            where:{ 
                [Op.or]: [{ day_ago: 7 }, { day_ago: 5 }, { day_ago: 1 }]
             }
        })
        .then((data) => {
            // async 위치 : data.map(async(el) => {
            // map 써야한다고 한다.
            data.map((el) => {
                await foodalram.create({
                    food_id : el.dataValues.food_id,
                    user_id : el.dataValues.user_id,
                    alram_data : `${el.dataValues.category_name} ${el.dataValues.food_name}의 유통기한이 ${el.dataValues.day_ago}일 남았습니다.`, 
                })
            })  
        })
    }
}