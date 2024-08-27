import { DataTypes } from 'sequelize';
import sequelize from '../../../Config/Database/Database.js';

const Product = sequelize.define('Product', {
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
  supplierId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Suppliers',
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
}, {
  timestamps: true,
});

export default Product;
