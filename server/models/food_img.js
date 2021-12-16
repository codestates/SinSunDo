'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class food_img extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  food_img.init({
    food_picture: DataTypes.BLOB,
    food_icon: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'food_img',
  });
  return food_img;
};