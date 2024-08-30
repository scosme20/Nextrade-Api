import { DataTypes } from 'sequelize';
import sequelize from '../../../Config/Database/Database.js';
import Suppliers from '../supplier/supplierModel.js';
import Sellers from '../sellers/sellerModel.js';
import Clients from '../client/clientModel.js';

const Profile = sequelize.define('Profile', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  sellerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  supplierId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  timestamps: true,
  paranoid: false,
});

Profile.belongsTo(Clients, { foreignKey: 'clientId' });
Profile.belongsTo(Sellers, { foreignKey: 'sellerId' });
Profile.belongsTo(Suppliers, { foreignKey: 'supplierId' });

export default Profile;
