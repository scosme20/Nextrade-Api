// controllers/ProductController.js
import Product from '../Modules/product/product.js';

class ProductController {
  static async createProduct(req, res) {
    const { name, description, price, stock, supplierId, sellerId } = req.body;
    try {
      const product = await Product.create({ name, description, price, stock, supplierId, sellerId });
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllProducts(req, res) {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getProductById(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findByPk(id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateProduct(req, res) {
    const { id } = req.params;
    const { name, description, price, stock, supplierId, sellerId } = req.body;
    try {
      const [updated] = await Product.update(
        { name, description, price, stock, supplierId, sellerId },
        { where: { id } }
      );
      if (updated) {
        const updatedProduct = await Product.findByPk(id);
        res.status(200).json(updatedProduct);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Product.destroy({ where: { id } });
      if (deleted) {
        res.status(204).json();
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default ProductController;

