'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      totalPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      clientId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Clients',  
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      sellerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Sellers',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};
