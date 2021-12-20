// 로그인
const bcrypt = require('bcrypt'); // 비밀번호 암호화
const { users } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenData');

module.exports = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(422).send({ message: '모든 정보가 필요합니다' })
  }

  users.findOne({ 
    where: { email: req.body.email, password: req.body.password }
  })
  .then((data) => {
    // bcrypt.compareSync : 비밀번호와 암호화시킨 값이 같은지 비교하는 명령어
    if(!data || !bcrypt.compareSync(password, data.dataValues.password)) {
      return res.status(404).send({message:'로그인 정보가 일치하지 않습니다.'})
    }
    delete data.dataValues.password;
    const AccessToken = generateAccessToken(data.dataValues);
    // const RefreshToken = generateRefreshToken(data.dataValues);
    
    sendAccessToken(res, `Bearer ${AccessToken}`);
    // sendRefreshToken(res, `jwt ${RefreshToken}`);
  })
}

