import { DataTypes } from 'sequelize';
import sequelize from '../../../Config/Database/Database.js';

const Demand = sequelize.define('Demand', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
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
}, {
  timestamps: true,
});

export default Demand;
