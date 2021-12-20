// 계정정보 수정
const bcrypt = require('bcrypt'); // 비밀번호 암호화
const { users } = require('../../models');
const { isAuthorized } = require('../tokenData');

module.exports = (req, res) => {
    const accessTokenData = isAuthorized(req);
    if(!accessTokenData) {
        res.status(401).send({ data: null, message: '유효하지 않은 토큰입니다.' });
    }
    else {
        try {
            // 이미지 파일도 url 형식으로 입력받아 저장해야 한다.
            const { nickname, password } = req.body;
            users.findOne({ where: { nickname: nickname}})
            .then((data) => {
                if(data) {
                    return res.status(404).send({message:'중복된 닉네임입니다.'})
                }
                else {
                    // 비밀번호 암호화 해서 넣어줘야 한다.
                    bcrypt.genSalt(10, (err, salt) => { 
                        bcrypt.hash(password, salt, async (err, hash) => {
                            users.update({ nickname : nickname, password : hash}, {where : { email: accessTokenData.email }})
                            .then(() => {
                                users.findOne({ where: { email: accessTokenData.email }})
                                .then((data) => {
                                    delete data.dataValues.password; 
                                    res.status(201).send({message: "회원정보가 수정되었습니다."})
                                })
                            })
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
// 계정의 닉네임, 비번, 사진파일을 받고 그 값으로 수정해줘야 한다.(이미지 파일은 어디 모여있는것 같다. 더 찾아보기)
// 이메일은 변경되지 않는다.
// 닉네임, 비번, 사진파일이 변경된 후 새로운 토큰을 발급해줘야할거다.(이건 일단 PASS, 쓴다면 주석 해제)
// 닉네임 중복 안된다.(했네?)
// 여기서 알람설정을 on/off하네...(도움받고 진행중)
// 닉네임 변경 들어가서 같은 닉네임으로 변경하면?(이건 진행해야 하나?) 이건 중복이랑 겹치니 넘어가는걸로
// 이미지는 어떻게 저장해야 하지?(이거 index.js에 적힌 링크 통해 좀 더 확인이 필요해 보인다. 이미지 저장공간이 있어보이고 참조해서 그 주소만 가져오는거같다.)
// 이미지 업로드 참조 사이트 : https://basketdeveloper.tistory.com/55