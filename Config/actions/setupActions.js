import Supplier from '../../Modules/product/product.js';
import Product from '../../Modules/product/product.js';
import Seller from '../../Modules/sellers/sellerModel.js';
import Client from '../../Modules/client/clientModel.js';
import Order from '../../Modules/order/order.js';

export default function setupAssociations() {
  Supplier.hasMany(Product, { foreignKey: 'supplierId' });
  Product.belongsTo(Supplier, { foreignKey: 'supplierId' });

  Seller.hasMany(Product, { foreignKey: 'sellerId' });
  Product.belongsTo(Seller, { foreignKey: 'sellerId' });

  Client.hasMany(Order, { foreignKey: 'clientId' });
  Order.belongsTo(Client, { foreignKey: 'clientId' });

  Seller.hasMany(Order, { foreignKey: 'sellerId' });
  Order.belongsTo(Seller, { foreignKey: 'sellerId' });

  Product.hasMany(Order, { foreignKey: 'productId' });
  Order.belongsTo(Product, { foreignKey: 'productId' });
}
