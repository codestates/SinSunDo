// 계정정보 수정
const { users } = require('../../models');
const { isAuthorized } = require('../tokenData');
const { generateAccessToken, sendAccessToken } = require('../tokenData/accessToken');
const { generateRefreshToken, sendRefreshToken } = require('../tokenData/refreshToken');

module.exports = (req, res) => {
    const accessTokenData = isAuthorized(req);
    if(!accessTokenData) {
        res.status(401).send({ data: null, message: 'not authorized' });
    }
    else {
        try {
            const { nickname, password, user_picture } = req.body;

            users.findOne({ where: { nickname: nickname}})
            .then((data) => {
                if(data) {
                    return res.status(404).send({message:'중복된 닉네임입니다.'})
                }
                else {
                    users.update({ nickname, password, user_picture}, {where : { email: accessTokenData.email }})
                    .then(() => {
                        users.findOne({ where: { email: accessTokenData.email }})
                        .then((data) => {
                            delete data.dataValues.password;
                            const AccessToken = generateAccessToken(data.dataValues);
                            const RefreshToken = generateRefreshToken(data.dataValues);
                            sendRefreshToken(res, `jwt ${RefreshToken}`);
                            sendAccessToken(res, `jwt ${AccessToken}`);
        
                            res.status(201).send({message: "회원정보가 수정되었습니다."})
                        })
                    })
                }
            })
        }
        catch (err) {
            return res.status(500).json({ message: 'Server Error' });
        }

    }
}
// 계정의 닉네임, 비번, 사진파일을 받고 그 값으로 수정해줘야 한다.
// 이메일은 변경되지 않는다.
// 닉네임, 비번, 사진파일이 변경된 후 새로운 토큰을 발급해줘야할거다.
// 닉네임 중복 안된다.