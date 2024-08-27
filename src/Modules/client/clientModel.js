import { DataTypes } from 'sequelize';
import sequelize from '../../../Config/Database/Database.js';

const Client = sequelize.define('Client', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: true,
});

export default Client;
