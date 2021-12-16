require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
    generateRefreshToken: (data) => {
        return sign(data, process.env.REFRESH_SECRET, { expiresIn: new Date(Date.parse(new Date()) + 1000 * 3600 * 24 * 30)});
    },
    sendRefreshToken: (res, refreshToken) => {
        res.cookie("refreshToken", refreshToken, {
            sameSite: 'Strict',
            secure: true,
            httpOnly: true,
        })
    },
    checkRefeshToken: (refreshToken) => {
        try {
            return verify(refreshToken, process.env.REFRESH_SECRET);
        } catch (err) {
            return null;
        }
    }
}
