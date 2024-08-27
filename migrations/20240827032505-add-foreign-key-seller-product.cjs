'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableDefinition = await queryInterface.describeTable('Products');

    // Verifica se a coluna 'sellerId' já existe
    if (!tableDefinition.sellerId) {
      await queryInterface.addColumn('Products', 'sellerId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Sellers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'sellerId');
  }
};


