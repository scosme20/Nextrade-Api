import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Supplier from './Supplier';
import Seller from './Seller';

class Product extends Model {}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Product',
  timestamps: true,
});

Product.belongsTo(Supplier, { foreignKey: 'supplierId' });
Product.belongsTo(Seller, { foreignKey: 'sellerId' });

export default Product;
