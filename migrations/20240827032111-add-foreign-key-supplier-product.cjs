'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const tableDefinition = await queryInterface.describeTable('Products');

    if (!tableDefinition.supplierId) {
      await queryInterface.addColumn('Products', 'supplierId', {
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

