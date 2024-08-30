import { DataTypes } from 'sequelize';
import sequelize from '../../../Config/Database/Database.js';

const Sellers = sequelize.define('Sellers', {
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
  registrationNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [5, 20],
    },
  },
}, {
  timestamps: true,
  paranoid: false,
});

export default Sellers;
