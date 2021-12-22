const bcrypt = require('bcrypt'); // 비밀번호 암호화
const { users } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenData/accessToken');

module.exports = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(422).send({ message: '모든 정보가 필요합니다' })
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
            if(err) {
                throw err;
            }
            else {
                users.findOne({ 
                    where: { email: req.body.email }
                })
                .then((data) => {
                // bcrypt.compareSync : 비밀번호와 암호화시킨 값이 같은지 비교하는 명령어
                // console.log(req.body.password, data.dataValues.password)
                // console.log(bcrypt.compareSync(req.body.password, data.dataValues.password))
                if(!data || !bcrypt.compareSync(req.body.password, data.dataValues.password)) {
                    return res.status(404).send({message:'로그인 정보가 일치하지 않습니다.'})
                }
                delete data.dataValues.password;
                delete data.dataValues.togle; // 토글데이터가 변경되어도 토큰에는 영향을 주지 않게 하기 위해 제거
                const accessToken = generateAccessToken(data.dataValues);
                // const RefreshToken = generateRefreshToken(data.dataValues);
                
                sendAccessToken(res, `Bearer ${AccessToken}`, { message: '로그인에 성공했습니다.' });
                // sendRefreshToken(res, `jwt ${RefreshToken}`);
                })
            }
        })
    })
}
