import { DataTypes } from 'sequelize';
import sequelize from '../../../Config/Database/Database.js';

const Product = sequelize.define('Product', {
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
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  supplierId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Suppliers',
      key: 'id',
    },
    allowNull: true,
  },
  sellerId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Sellers',
      key: 'id',
    },
    allowNull: true,
  },
}, {
  timestamps: true,
  paranoid: true,
});

export default Product;
