'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class foodalram extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  foodalram.init({
    food_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    alram_data: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'foodalram',
  });
  return foodalram;
};