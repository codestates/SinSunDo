require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
    generateAccessToken: (data) => {
        return sign(data, process.env.ACCESS_SECRET, { expiresIn: new Date(Date.parse(new Date()) + 1000 * 3600 * 24 * 3)});
    },
    sendAccessToken: (res, accessToken) => {
        res.json({ data: { accessToken }, message: "ok" });
    },
    resendAccessToken: (res, accessToken, data) => {
        res.json({ data: { accessToken, userInfo: data }, message: "ok" });
    },
    isAuthorized: (req) => {
        const cookies = req.headers["cookie"];

        if (!cookies) {
            return null;
        } 
        const token1 = cookies.split("jwt%20")[1];
        // console.log(token1)
        const token = token1.split("%22%")[0]
        // console.log(token)
        try {
            return verify(token, process.env.ACCESS_SECRET);
        } catch (err) {
            return null;
        }
    }
};
