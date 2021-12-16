'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  food.init({
    food_name: DataTypes.STRING,
    food_quantity: DataTypes.INTEGER,
    food_expiration: DataTypes.DATE,
    food_img_id: DataTypes.INTEGER,
    category_name_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'food',
  });
  return food;
};