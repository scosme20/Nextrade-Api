'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableDefinition = await queryInterface.describeTable('Orders');

    // Verifica se a coluna 'clientId' já existe
    if (!tableDefinition.clientId) {
      await queryInterface.addColumn('Orders', 'clientId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Clients',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Orders', 'clientId');
  }
};

