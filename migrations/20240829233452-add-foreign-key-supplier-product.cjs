'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('Products');
    if (!table.supplierId) {
      await queryInterface.addColumn('Products', 'supplierId', {
        type: Sequelize.INTEGER,
        allowNull: true,
      });
    }

    await queryInterface.addConstraint('Products', {
      fields: ['supplierId'],
      type: 'foreign key',
      name: 'fk_supplier_product',
      references: {
        table: 'Suppliers',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeConstraint('Products', 'fk_supplier_product');

    await queryInterface.removeColumn('Products', 'supplierId');
  },
};
