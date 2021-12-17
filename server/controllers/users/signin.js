// 로그인
const { users } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenData');

module.exports = (req, res) => {
    users.findOne({ 
        where: { email: req.body.email, password: req.body.password }
      })
      .then((data) => {
        if(!data) {
          return res.status(404).send({message:'invalid user'})
        }
        delete data.dataValues.password;
        const AccessToken = generateAccessToken(data.dataValues);
        const RefreshToken = generateRefreshToken(data.dataValues);
        
        sendAccessToken(res, `jwt ${AccessToken}`);
        sendRefreshToken(res, `jwt ${RefreshToken}`);

        res.status(201).send({message: "로그인에 성공하였습니다."})
      })
}