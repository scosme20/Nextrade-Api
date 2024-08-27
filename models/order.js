import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Client from './Client';
import Seller from './Seller';
import Product from './Product';

class Order extends Model {}

Order.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
  sequelize,
  modelName: 'Order',
  timestamps: true,
});

// Associações
Order.belongsTo(Client, { foreignKey: 'clientId' });
Order.belongsTo(Seller, { foreignKey: 'sellerId' });
Order.belongsTo(Product, { foreignKey: 'productId' });

export default Order;
