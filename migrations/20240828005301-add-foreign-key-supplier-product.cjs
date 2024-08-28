'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = 'Products';
    const column = 'supplierId';

    // Verifica se a coluna já existe
    const tableColumns = await queryInterface.describeTable(table);
    if (!tableColumns[column]) {
      await queryInterface.addColumn(table, column, {
        type: Sequelize.INTEGER,
        references: {
          model: 'Suppliers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'supplierId');
  }
};


