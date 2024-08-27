import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Supplier from './Supplier';

class Demand extends Model {}

Demand.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Demand',
  timestamps: true,
});

Demand.belongsTo(Supplier, { foreignKey: 'supplierId' });

export default Demand;
