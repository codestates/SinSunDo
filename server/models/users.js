'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users.init({
    email: DataTypes.STRING,
    nickname: DataTypes.STRING,
    socialtype: DataTypes.STRING,
    password: DataTypes.STRING,
    togle: DataTypes.BOOLEAN,
    user_picture: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};