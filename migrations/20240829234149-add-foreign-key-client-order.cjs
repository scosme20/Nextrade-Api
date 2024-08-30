'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const table = await queryInterface.describeTable('Orders');
    if (!table.clientId) {
      await queryInterface.addColumn('Orders', 'clientId', {
        type: Sequelize.INTEGER,
        allowNull: false,
      });
    }

    await queryInterface.addConstraint('Orders', {
      fields: ['clientId'],
      type: 'foreign key',
      name: 'fk_client_order',
      references: {
        table: 'Clients',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeConstraint('Orders', 'fk_client_order');

    await queryInterface.removeColumn('Orders', 'clientId');
  },
};
