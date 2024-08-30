'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('Products');
    if (!table.sellerId) {
      await queryInterface.addColumn('Products', 'sellerId', {
        type: Sequelize.INTEGER,
        allowNull: true,
      });
    }

    await queryInterface.addConstraint('Products', {
      fields: ['sellerId'],
      type: 'foreign key',
      name: 'fk_seller_product',
      references: {
        table: 'Sellers',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Products', 'fk_seller_product');

    await queryInterface.removeColumn('Products', 'sellerId');
  },
};
