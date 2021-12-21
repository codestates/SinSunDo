const { users, food, foodalram } = require('../../models');
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = {
    foodData: async () => {
        // day_ago 데이터 업데이트
        food.update({ day_ago : day_ago - 1 })
    },

    alram: async () => {
        // 조건이 맞다면 알람데이터 추가
        food.findAll({
            where:{ 
                [Op.or]: [{ day_ago: 7 }, { day_ago: 5 }, { day_ago: 1 }]
            }
        })
        .then((data) => {
            // 이게 하나 만들어지는걸텐데
            // 내가 원하는건 여러개를 만들어야하는건데
            // map 써야한다고 한다.
            foodalram.create({

            })
        })
    }
}

const schedule = require('node-schedule');
const { food }= require('../../models')

module.exports = async(req, res, callback) => {
    try{
        const accessTokenData = isAuthorized(req);
        if(!accessTokenData) {
            res.status(400).json({ data: null, message: '잘못된 요청입니다.' });
        } else {
            const job = await schedule.scheduleJob('01 00 00 * * MON-SUN', () => {
                const query = `update foodalram set day_ago = day_ago -1 where foodalram.user_id = ${req.params.user_id}`;
                food.query(query, query, (error, result) => {
                    callback(error, result);
                });
            })
            res.status(201).json({ data: job, message: '업데이트에 성공하였습니다.' });
        }
    } catch(err) {
        res.status(500).json({ message: 'error' });
    }
};