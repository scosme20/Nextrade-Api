import Demand from '../modules/demand/demandModel.js';
import Product from '../Modules/product/product.js'; // Ajuste conforme o caminho do seu modelo de produtos

export const getCatalog = async (req, res) => {
  try {
    const userRole = req.user.role; // Supondo que você tenha um campo `role` para diferenciar cliente e vendedor

    if (userRole === 'client') {
      // Lógica para clientes: Exibe demandas ou produtos para clientes
      const products = await Product.findAll({
        include: [{ model: req.user }], // Ajuste conforme a estrutura do seu modelo e necessidade
      });
      res.json(products);
    } else if (userRole === 'seller') {
      // Lógica para vendedores: Exibe produtos em atacado ou informações para vendedores
      const demands = await Demand.findAll({
        include: [{ model: req.user }], // Ajuste conforme a estrutura do seu modelo e necessidade
      });
      res.json(demands);
    } else {
      res.status(403).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catalog' });
  }
};


