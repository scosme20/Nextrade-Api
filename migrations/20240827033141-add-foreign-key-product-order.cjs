'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableDefinition = await queryInterface.describeTable('Orders');

    // Verifica se a coluna 'productId' já existe
    if (!tableDefinition.productId) {
      await queryInterface.addColumn('Orders', 'productId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Orders', 'productId');
  }
};

