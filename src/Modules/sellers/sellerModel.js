import { DataTypes } from 'sequelize';
import sequelize from '../../../Config/Database/Database.js';

const Seller = sequelize.define('Seller', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  registrationNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: true,
});

export default Seller;
