const schedule = require('node-schedule');
const { food }= require('../../models')

module.exports = async(req, res, callback) => {
    try{
        const job = await schedule.scheduleJob('01 00 00 * * MON-SUN', () => {
            const queryString = `update foodalram set day_ago = day_ago -1`;
            food.query(query, queryString, (error, result) => {
                callback(error, result);
            });
        })
        res.status(201).json({ data: job, message: '업데이트에 성공하였습니다.' });
    } catch(err) {
        res.status(500).json({ message: 'error' });
    }
};
    // && req.body.togle === false