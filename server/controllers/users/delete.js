// 회원탈퇴
const { users } = require('../../models');
const { isAuthorized } = require('../tokenData');

module.exports = (req, res) => {
    const accessTokenData = isAuthorized(req); // 토큰 확인
        if(!accessTokenData) {
            res.status(401).send({ data: null, message: 'not authorized' });
        }
        else {
            try {
                users.destroy({ where: {email: accessTokenData.email}})
                .then(() => {
                    res.sendStatus(201);
                } )
            } 
            catch (err) {
                return res.status(500).json({ message: 'Server Error' });
            }
        }
}