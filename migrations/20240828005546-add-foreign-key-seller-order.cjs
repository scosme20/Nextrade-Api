'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Verificar se a coluna já existe
    const tableInfo = await queryInterface.describeTable('Orders');
    if (!tableInfo.sellerId) {
      await queryInterface.addColumn('Orders', 'sellerId', {
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
    await queryInterface.removeColumn('Orders', 'sellerId');
  }
};
