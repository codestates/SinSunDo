'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('food', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      food_quantity: {
        type: Sequelize.INTEGER
      },
      category_name: {
        type: Sequelize.STRING
      },
      storage: {
        type: Sequelize.STRING
      },
      food_name: {
        type: Sequelize.STRING
      },
      day_ago: {
        type: Sequelize.DATE
      },
      food_expiration: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('food');
  }
};