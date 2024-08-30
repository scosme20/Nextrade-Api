import { DataTypes } from 'sequelize';
import sequelize from '../Config/Database/Database.js';

const Orders = sequelize.define('Orders', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  clientId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Clients',
      key: 'id',
    },
    allowNull: false,
  },
  sellerId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Sellers',
      key: 'id',
    },
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Products',
      key: 'id',
    },
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoid: true,
});

export default Orders;
