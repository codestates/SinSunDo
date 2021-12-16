const { users } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenData/accessToken');
const { generateRefreshToken, sendRefreshToken } = require('../tokenData/refreshToken');

module.exports = (req, res) => {
    const { email, password, username } = req.body;
    if(!username || !email || !password) {
        res.status(400).send("모든 항목은 필수입니다.")
    }
    users.findOrCreate({
        where: {
            email,
            password,
            username
        },
    })
    .then(([data, created]) => {
        // console.log(created)
        if(created === false) {
            return res.status(409).send("이미 존재하는 이메일입니다.")
        } 
        const AccessToken = generateAccessToken(data.dataValues);
        const RefreshToken = generateRefreshToken(data.dataValues);
          // console.log(AccessToken)
          // console.log(RefreshToken)
        sendRefreshToken(res, `jwt ${RefreshToken}`);
        sendAccessToken(res, `jwt ${AccessToken}`);
        return res.status(201).send({message: "회원가입에 성공하였습니다."})
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({message: "error"}); // Server error
    });
}