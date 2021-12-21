require("dotenv").config();

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

    mail: async () => {
        // 메일을 보내기 위한 기본 설정
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS,
            },
        });
        // 토글정보 확인
        await users.findAll({ where : { togle : true }})
        .then((usersData) => {
            usersData.map(async(el) => {
                // 그 유저의 알람메시지를 하나로 모은다.
                let message = ""; // 빈 메시지 하나 만들어준다.

                let today = new Date(); // 날짜 비교를 위해 만듦
                let year = today.getFullYear();
                let month = ('0' + (today.getMonth() + 1)).slice(-2);
                let day = ('0' + today.getDate()).slice(-2);
                let dateString = year + '-' + month  + '-' + day;
                
                // 메시지를 중첩하는 작업을 진행한다.
                await foodalram.findAll({ where : {
                    [Op.and]: [
                        {
                            user_id: el.dataValues.id
                        },
                        {
                            createdAt: {
                                [Op.like]: dateString + "%"
                            }
                        }
                    ]
                    } 
                })
                .then((alramData) => {
                    alramData.map((el2) => {
                        // 여러개의 메시지를 하나의 string으로 묶어 보낸다.
                        message = message + " " + el2.dataValues.alram_data;
                    })
                })

                // 토글정보가 true인 계정의 모든 알람을 확인
                await transporter.sendMail({
                    from: `"SinSunDo" <${process.env.NODEMAILER_USER}>`,
                    to: el.dataValues.email,
                    subject: '유통기한 알림 메일입니다.',
                    text: message
                });
            })
        })
    }
    
}