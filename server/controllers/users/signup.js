const { users } = require('../../models');
const bcrypt = require('bcrypt');
// const { generateAccessToken, sendAccessToken} = require('../tokenFunctions');

module.exports = async(req, res) => {
    console.log(req)
    const { email, password, nickname, user_picture, socialtype, togle} = req.body;
    if(!nickname || !email || !password) {
        res.status(422).json({data: null, message: '모든 항목은 필수입니다.'})
    } try {
    //두 개 이상 중복 확인을 할 때는 findOrCreate보단 findOne으로 하나씩 찾고 각각 중복검사를 한다
    //findOrCreate에 두 개 이상의 컬럼 값을 넣으면 두 개 모두 중복되었을 때만 중복 에러가 나온다.
    const userEmail = await users.findOne({
        where: {
            email
        },
    })

    const userNickname = await users.findOne({
        where: {
            nickname
        },
    })
    // console.log(userEmail)

        if(userEmail) {
            res.status(409).json({message: '이미 존재하는 이메일입니다.'})
        } else if(!userEmail && userNickname) {
            res.status(409).json({message: '이미 존재하는 닉네임입니다.'})
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    if(err) {
                        throw err;
                    } else {
                        await users.create({
                            email,
                            nickname,
                            password: hash,
                            user_picture,
                            socialtype,
                            togle: true
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