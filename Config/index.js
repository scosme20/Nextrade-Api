import sequelize from './Database/Database.js';
import User from '../src/Modules/User/UserModule.js';
import Client from '../src/Modules/client/clientModel.js';
import Seller from '../src/Modules/sellers/sellerModel.js';
import Product from '../src/Modules/product/product.js';
import Order from '../src/Modules/order/order.js';
import Supplier from '../src/Modules/supplier/supplierModel.js';


User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Client.hasMany(Order, { foreignKey: 'clientId' });
Order.belongsTo(Client, { foreignKey: 'clientId' });

Seller.hasMany(Order, { foreignKey: 'sellerId' });
Order.belongsTo(Seller, { foreignKey: 'sellerId' });

Product.hasMany(Order, { foreignKey: 'productId' });
Order.belongsTo(Product, { foreignKey: 'productId' });

Supplier.hasMany(Product, { foreignKey: 'supplierId' });
Product.belongsTo(Supplier, { foreignKey: 'supplierId' });

Seller.hasMany(Product, { foreignKey: 'sellerId' });
Product.belongsTo(Seller, { foreignKey: 'sellerId' });

sequelize.sync();

export default sequelize;
