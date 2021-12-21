require('dotenv').config();
const axios = require('axios');
const { users } = require('../../models');
const { generateAccessToken } = require('../tokenData/accessToken');

module.exports = (req, res) => {

    axios.post('https://oauth2.googleapis.com/token', {
        code: req.cookies.accessToken,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: AuthorizationCode
    })
    .then((data) => {
        if(data) {
            // console.log(data)
            // 토큰 검사
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${data.data.accessToken}`, {
                headers: {
                    Authorization: `Bearer ${data.data.accessToken}`,
                },
            })
            .then((data) => {
                if(data) {
                    const userInfo = {
                        email: data.data.email,
                        nickname: data.data.name,
                        password: null,
                        socialtype: 'google',
                        user_picture: data.data.picture
                    }

                    users.findOrCreate({
                        where: {
                            email: data.data.email,
                            socialtype: 'google',
                        },
                        defaults: {
                            userInfo
                        },
                    })
                    .then(([data, created]) => {
                        if(!created) {
                            res.status(400).json({message: 'Bad Request'})
                        } else {
                            const access_tokne = generateAccessToken(data[0].dataValues);
                    
                            res.cookie('accessToken', access_tokne, {
                            // domain: domain,
                                sameSite: 'Strict',
                                secure: true,
                                httpOnly: true,
                                expires: new Date(Date.parse(new Date()) + 1000 * 3600 * 24 * 3)
                            });
                            res.status(200).json({data: access_tokne, message: 'Oauth google login success'});
                        }
                    })
                    .catch((err) => res.status(500).json({ status: false, message: 'Oauth google server error' }));
                } else {
                    res.status(403).json({message: 'Forbidden'})
                }
            })
            .catch((err) => res.status(500).json({ status: false, message: 'Oauth google server error' }));
        } else {
            res.status(400).json({message: 'Bad Request'})
        }
    })
    .catch((err) => res.status(500).json({ status: false, message: 'Oauth google server error' }));
};