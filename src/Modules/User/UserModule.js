import { DataTypes } from 'sequelize';
import sequelize from '../../../Config/Database/Database.js';

const Users = sequelize.define('Users', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default Users;
