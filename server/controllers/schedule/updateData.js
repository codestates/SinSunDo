const { users, food, foodalram } = require('../../models');
const nodemailer = require('nodemailer')
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
            data.map(async(el) => {
                await foodalram.create({
                    food_id : el.dataValues.food_id,
                    user_id : el.dataValues.user_id,
                    alram_data : `${el.dataValues.category_name} ${el.dataValues.food_name}의 유통기한이 ${el.dataValues.day_ago}일 남았습니다.`, 
                })
            })  
        })
    },
    mail: async (req, res) => {
        const emailData = {
            "host": "smtp.mailtrap.io",
            "port": 2525,
            "secure": false,
            "auth": {
                "user": "843b211373ad23",
                "pass": "ff63eb685ab36f"
            }
        }

        const send = async (data) => {
            nodemailer.createTransport(emailData).sendMail(data, function(err, info) {
                if(err) {
                    console.log(err);
                    res.status(500).json({ message: "Server Error"})
                } else {
                    console.log(info);
                    return info.response
                }
            })
        }
        
        const content = {
            from: "gg9297@gmail.com",
            to: "26ebabea6a-c9c369@inbox.mailtrap.io",
            subject: "project test 1",
            text: "project test 1 - data"
        }

        send(content)
    }
    
}