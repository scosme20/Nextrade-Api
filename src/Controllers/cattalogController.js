import Demand from '../Modules/demand/demandModel.js';
import Product from '../Modules/product/product.js';
import Supplier from '../Modules/supplier/supplierModel.js';
import Seller from '../Modules/sellers/sellerModel.js';

export const getCatalog = async (req, res) => {
  try {
    const userRole = req.user.role;
    const userId = req.user.id;

    if (userRole === 'client') {
      const sellers = await Seller.findAll({
        attributes: ['id'],
      });
      const sellerIds = sellers.map(seller => seller.id);
      const products = await Product.findAll({
        where: { sellerId: sellerIds }
      });
      res.json(products);
    } else if (userRole === 'seller') {
      const suppliers = await Supplier.findAll({
        attributes: ['id'],
      });
      const supplierIds = suppliers.map(supplier => supplier.id);
      const products = await Product.findAll({
        where: { supplierId: supplierIds }
      });
      res.json(products);
    } else if (userRole === 'supplier') {
      const demands = await Demand.findAll({
        where: { supplierId: userId }
      });
      res.json(demands);
    } else if (userRole === 'seller') {
      const demands = await Demand.findAll({
        where: { sellerId: userId }
      });
      res.json(demands);
    } else {
      res.status(403).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catalog', error: error.message });
  }
};
