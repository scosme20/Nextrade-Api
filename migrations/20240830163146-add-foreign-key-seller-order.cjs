'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableDescription = await queryInterface.describeTable('Orders');

    if (!tableDescription.sellerId) {
      await queryInterface.addColumn('Orders', 'sellerId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Sellers',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const tableDescription = await queryInterface.describeTable('Orders');

    if (tableDescription.sellerId) {
      await queryInterface.removeColumn('Orders', 'sellerId');
    }
  }
};
