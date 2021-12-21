// 회원탈퇴
const { users, food,  } = require('../../models');
const { isAuthorized } = require('../tokenData/accessToken');

module.exports = (req, res) => {
    const accessTokenData = isAuthorized(req); // 토큰 확인
        if(!accessTokenData) {
            res.status(401).send({ data: null, message: '유효하지 않은 토큰입니다.' });
        }
        else {
            try {
                // 계정 지우고 그 계정이 생성한 음식들도 전부 지워야 한다.
                users.destroy({ where: { email: accessTokenData.email } })
                .then(() => {
                    food.destroy({ where: { user_id: accessTokenData.id } })
                    .then(() => {
                        foodalram.destroy({ where: { user_id: accessTokenData.id } })
                    })
                    res.sendStatus(201);
                })
            } 
            catch (err) {
                return res.status(500).json({ message: 'Server Error' });
            }
        }
}