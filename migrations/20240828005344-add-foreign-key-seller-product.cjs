'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = 'Products';
    const column = 'sellerId';

    // Verifica se a coluna já existe
    const tableColumns = await queryInterface.describeTable(table);
    if (!tableColumns[column]) {
      await queryInterface.addColumn(table, column, {
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
