'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const tableDescription = await queryInterface.describeTable('Products');

    if (!tableDescription.sellerId) {
      await queryInterface.addColumn('Products', 'sellerId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Sellers',
          key: 'id',
        },
        allowNull: true,
        onDelete: 'SET NULL',
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const tableDescription = await queryInterface.describeTable('Products');

    if (tableDescription.sellerId) {
      await queryInterface.removeColumn('Products', 'sellerId');
    }
  }
};
