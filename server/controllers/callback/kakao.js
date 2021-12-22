require('dotenv').config();
const axios = require('axios');
const { users } = require('../../models');
const { generateAccessToken } = require('../tokenData/accessToken')


module.exports = async(req, res ) => {
    try {
        const { accessToken } = req.cookies;
        const kakaoToken = await axios.post(
            `https://kauth.kakao.com/oauth/token?code=${accessToken}&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO.REDIRECT_URI}&grant_type=AuthorizationCode`,
        );
        const { access_token } = kakaoToken.data;
        const kakaoUser = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                authorization: `Bearer ${access_token}`
            },
        });

        // 카카오는 데이터 구분에 따라 정해진 타입이 있다.
        const user = await users.findOrCreate({
            where: {
                email: kakaoUser.data.kakao_account.email,
                socialtype: 'kakao',
            },
            defaults: {
                email: kakaoUser.data.kakao_account.email,
                nickname: kakaoUser.data.properties.nickname,
                password: null,
                socialtype: 'kakao',
                user_picture: kakaoUser.data.kakao_account.profile.profile_image_url,
            },
        });
        const access_token = generateAccessToken(user[0].dataValues);
        res.cookie('accesToken', access_token, {
            // domain: domain,
            sameSite: 'Strict',
            secure: true,
            httpOnly: true,
            expires: new Date(Date.parse(new Date()) + 1000 * 3600 * 24 * 3)
        });
        res.status(200).json({data: access_tokne, message: 'Oauth kakao login success'});
    } catch(err) {
        res.status(500).json({ message: 'Server Error' })
    }
};