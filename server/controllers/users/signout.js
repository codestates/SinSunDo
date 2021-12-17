module.exports = (req, res) => {
    res.clearCookie('jwt');
    return res.json({ message: '로그아웃 되었습니다.' });
}