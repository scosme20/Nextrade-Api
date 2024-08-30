'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    
    const table = await queryInterface.describeTable('Orders');
    if (!table.productId) {
      await queryInterface.addColumn('Orders', 'productId', {
        type: Sequelize.INTEGER,
        allowNull: false,
      });
    }

    await queryInterface.addConstraint('Orders', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'fk_product_order',
      references: {
        table: 'Products',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeConstraint('Orders', 'fk_product_order');

    await queryInterface.removeColumn('Orders', 'productId');
  },
};
