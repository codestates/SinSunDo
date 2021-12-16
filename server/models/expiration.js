'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class expiration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  expiration.init({
    food_id: DataTypes.INTEGER,
    food_alram_id: DataTypes.INTEGER,
    day_ago: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'expiration',
  });
  return expiration;
};