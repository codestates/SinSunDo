const { user } = require('../../models');
const bcrypt = require('bcrypt');
// const { generateAccessToken, sendAccessToken} = require('../tokenFunctions');

module.exports = async(req, res) => {
// console.log(req.body)
    const { email, password, nickname, user_picture, socialtype, togle} = req.body;
    if(!nickname || !email || !password) {
        res.status(422).send('모든 항목은 필수입니다.')
    } try {

    const userEmail = await user.findOne({
        where: {
            email
        },
    })

    const userNickname = await user.findOne({
        where: {
            nickname
        },
    })
    // console.log(userEmail)

        if(userEmail) {
            res.status(409).send({message: '이미 존재하는 이메일입니다.'})
        } else if(!userEmail && userNickname) {
            res.status(409).send({message: '이미 존재하는 닉네임입니다.'})
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    if(err) {
                        throw err;
                    } else {
                        await user.create({
                            email,
                            nickname,
                            password: hash,
                            user_picture,
                            socialtype,
                            togle
                        })
                    
                // const AccessToken = generateAccessToken(data.dataValues);
                // const RefreshToken = generateRefreshToken(data.dataValues);
                // sendRefreshToken(res, `jwt ${RefreshToken}`);
                // sendAccessToken(res, `jwt ${AccessToken}`);
                        res.status(201).json({message: "회원가입에 성공하였습니다."});
                    }
                })
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "error" });
    }
};