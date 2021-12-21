module.exports = {
    //users
    signup: require('./users/signup'),
    signin: require('./users/signin'),
    signout: require('./users/signout'),
    delete_user: require('./users/delete'),
    mypageInfo: require('./users/mypageInfo'),
    mypageGet: require('./users/mypageTogle'),
    update: require('./users/update'),

    //product
    product: require('./product/product'),
    search: require('./product/search'),
    add: require('./product/add'),
    delete_product: require('./product/delete'),
    alram: require('./product/alram'),
};

// https://github.com/codestates/RunnersHigh 참고
// 메일 보내기 : https://velog.io/@josworks27/Back-end-Node.js%EC%97%90%EC%84%9C-%EB%A9%94%EC%9D%BC-%EC%A0%84%EC%86%A1%ED%95%98%EA%B8%B0-feat.-Nodemailer-Gmail
// 스케줄러 : https://velog.io/@nawnoes/Nodejs%EC%97%90%EC%84%9C-%EC%8A%A4%EC%BC%80%EC%A4%84-%EC%9E%91%EC%97%85


// 24시가 지나면 스케줄러이 의해 food 테이블의 모든 day_ago의 값이 1씩 깎여야 한다.
// 24시가 지나고 day_ago의 값이 7, 5, 1인 경우 & 유저테이블의 togle의 값이 true 인 경우 메일을 보낸다.