'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('foodalram', 'food_id', Sequelize.INTEGER);
    await queryInterface.addConstraint('foodalram', {
      fields: ['food_id'],
      type: 'foreign key',
      name: 'foodalram&food',
      references: {
        table: 'food',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    await queryInterface.addColumn('food', 'user_id', Sequelize.INTEGER);
    await queryInterface.addConstraint('food', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'food&users',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
      await queryInterface.removeConstraint('foodalram', 'foodalram&food'),
      await queryInterface.removeColumn('foodalram', 'food_id'),
      await queryInterface.removeConstraint('food', 'food&users'),
      await queryInterface.removeColumn('food', 'user_id')
  }
};