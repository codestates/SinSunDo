module.exports = {
    //users
    signup: require('./users/signup'),
    signin: require('./users/signin'),
    signout: require('./users/signout'),
    delete: require('./users/delete'),
    mypage: require('./users/mypage'),

    //product
    product: require('./product'),
    filter: require('./product/filter'),
    search: require('./product/search'),
    add: require('./product/add'),
    delete: require('./product/delete')
};
