'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const tableDescription = await queryInterface.describeTable('Orders');

    if (!tableDescription.clientId) {
      await queryInterface.addColumn('Orders', 'clientId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Clients',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const tableDescription = await queryInterface.describeTable('Orders');

    if (tableDescription.clientId) {
      await queryInterface.removeColumn('Orders', 'clientId');
    }
  }
};
