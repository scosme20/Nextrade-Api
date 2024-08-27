import Demand from '../modules/demand/demandModel.js';
import Product from '../Modules/product/product.js';

export const getCatalog = async (req, res) => {
  try {
    const userRole = req.user.role;

    if (userRole === 'client') {
      const products = await Product.findAll({
        include: [{ model: req.user }],
      });
      res.json(products);
    } else if (userRole === 'seller') {
      const demands = await Demand.findAll({
        include: [{ model: req.user }],
      });
      res.json(demands);
    } else {
      res.status(403).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catalog' });
  }
};


