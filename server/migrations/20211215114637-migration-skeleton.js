'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('user_category', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'user&user_category',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    await queryInterface.addConstraint('user_category', {
      fields: ['category_id'],
      type: 'foreign key',
      name: 'category&user_category',
      references: {
        table: 'category',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    await queryInterface.addConstraint('food', {
      fields: ['category_name_id'],
      type: 'foreign key',
      name: 'food&category',
      references: {
        table: 'category',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    await queryInterface.addConstraint('food', {
      fields: ['food_img_id'],
      type: 'foreign key',
      name: 'food&food_img',
      references: {
        table: 'food_img',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    await queryInterface.addConstraint('food_alram', {
      fields: ['category_id'],
      type: 'foreign key',
      name: 'food_alram&category',
      references: {
        table: 'category',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    await queryInterface.addConstraint('food_alram', {
      fields: ['food_id'],
      type: 'foreign key',
      name: 'food_alram&food',
      references: {
        table: 'food',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    await queryInterface.addConstraint('expiration', {
      fields: ['food_id'],
      type: 'foreign key',
      name: 'expiration&food',
      references: {
        table: 'food',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    await queryInterface.addConstraint('expiration', {
      fields: ['food_alram_id'],
      type: 'foreign key',
      name: 'expiration&food_alram',
      references: {
        table: 'food_alram',
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
      await queryInterface.removeConstraint('user_category', 'user&user_category'),
      await queryInterface.removeColumn('user_category', 'user_id'),
      await queryInterface.removeConstraint('user_category', 'category&user_category'),
      await queryInterface.removeColumn('user_category', 'category_id'),
      await queryInterface.removeConstraint('food', 'food&food_img'),
      await queryInterface.removeColumn('food', 'food_img_id'),
      await queryInterface.removeConstraint('food_alram', 'food_alram&category'),
      await queryInterface.removeColumn('food_alram', 'category_id'),
      await queryInterface.removeConstraint('food_alram', 'food_alram&food'),
      await queryInterface.removeColumn('food_alram', 'food_id'),
      await queryInterface.removeConstraint('expiration', 'expiration&food'),
      await queryInterface.removeColumn('expiration', 'food_id'),
      await queryInterface.removeConstraint('expiration', 'expiration&food_alram'),
      await queryInterface.removeColumn('expiration', 'food_alram_id')
  }
};
