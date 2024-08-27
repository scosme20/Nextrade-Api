import { DataTypes } from 'sequelize';
import sequelize from '../../../Config/Database/Database.js';

const Supplier = sequelize.define('Supplier', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: true,
});

export default Supplier;
