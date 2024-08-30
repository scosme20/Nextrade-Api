'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Verifica se a coluna sellerId já existe na tabela Orders
    const table = await queryInterface.describeTable('Orders');
    if (!table.sellerId) {
      // Adiciona a coluna sellerId se não existir
      await queryInterface.addColumn('Orders', 'sellerId', {
        type: Sequelize.INTEGER,
        allowNull: false, // Ajuste conforme necessário
      });
    }

    // Adiciona a constraint de chave estrangeira à coluna sellerId
    await queryInterface.addConstraint('Orders', {
      fields: ['sellerId'],
      type: 'foreign key',
      name: 'fk_seller_order',
      references: {
        table: 'Sellers',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE', // Ajuste conforme necessário
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove a constraint de chave estrangeira
    await queryInterface.removeConstraint('Orders', 'fk_seller_order');

    // Remove a coluna sellerId se necessário
    await queryInterface.removeColumn('Orders', 'sellerId');
  },
};
