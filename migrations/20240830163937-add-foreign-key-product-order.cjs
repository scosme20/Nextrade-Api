'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableDescription = await queryInterface.describeTable('Orders');

    // Verifique se a coluna 'productId' já existe
    if (!tableDescription.productId) {
      await queryInterface.addColumn('Orders', 'productId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const tableDescription = await queryInterface.describeTable('Orders');

    // Verifique se a coluna 'productId' existe antes de tentar removê-la
    if (tableDescription.productId) {
      await queryInterface.removeColumn('Orders', 'productId');
    }
  }
};
