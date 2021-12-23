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
    user_id: DataTypes.INTEGER,
    food_quantity: DataTypes.INTEGER,
    category_name: DataTypes.STRING,
    storage: DataTypes.STRING,
    food_name: DataTypes.STRING,
    food_expiration: DataTypes.DATE,
    day_ago: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'food',
  });
  return food;
};