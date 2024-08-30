import { DataTypes } from 'sequelize';
import sequelize from '../../../Config/Database/Database.js';

const Supplier = sequelize.define('Supplier', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [14, 14],
    },
  },
}, {
  timestamps: true,
  paranoid: true,
});

export default Supplier;
