import { DataTypes } from 'sequelize';
import sequelize from '../../../Config/Database/Database.js';

const Order = sequelize.define('Order', {
  clientId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Clients',
      key: 'id',
    },
  },
  sellerId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Sellers',
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Products',
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
  },
}, {
  timestamps: true,
});

export default Order;
