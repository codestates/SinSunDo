module.exports = (req, res) => {
    try{
        res.clearCookie('Bearer', {
            sameSite: 'Strict',
            secure: true,
            httpOnly: true,
        });
        res.status(204).json({ message: '로그아웃 되었습니다.' });
    } catch (err){
        res.status(500).json({ message: 'Server Error' });
    }
}