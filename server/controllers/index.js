module.exports = {
    //users
    signup: require('./users/signup'),
    signin: require('./users/signin'),
    signout: require('./users/signout'),
    delete_user: require('./users/delete'),
    // mypage: require('./users/mypage'),
    update: require('./users/update'),

    //product
    product: require('./product/product'),
    // filter: require('./product/filter'),
    search: require('./product/search'),
    add: require('./product/add'),
    delete_product: require('./product/delete')
};

// https://github.com/codestates/RunnersHigh 참고