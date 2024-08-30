'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const tableDescription = await queryInterface.describeTable('Products');

    if (!tableDescription.supplierId) {
      await queryInterface.addColumn('Products', 'supplierId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Suppliers',
          key: 'id',
        },
        allowNull: true,
        onDelete: 'SET NULL',
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const tableDescription = await queryInterface.describeTable('Products');

    if (tableDescription.supplierId) {
      await queryInterface.removeColumn('Products', 'supplierId');
    }
  }
};
