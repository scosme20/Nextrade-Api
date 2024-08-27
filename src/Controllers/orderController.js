import Order from '../Modules/order/order.js';
import Client from '../Modules/client/clientModel.js';
import Seller from '../Modules/sellers/sellerModel.js';
import Product from '../Modules/product/product.js';

class OrderController {
  static async createOrder(req, res) {
    try {
      const { quantity, totalPrice, clientId, sellerId, productId } = req.body;
      const order = await Order.create({ quantity, totalPrice, clientId, sellerId, productId });
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllOrders(req, res) {
    try {
      const orders = await Order.findAll({
        include: [Client, Seller, Product]
      });
      res.status(200).json(orders);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getOrderById(req, res) {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id, {
        include: [Client, Seller, Product]
      });

      if (!order) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }

      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateOrder(req, res) {
    try {
      const { id } = req.params;
      const { quantity, totalPrice, status, clientId, sellerId, productId } = req.body;
      const order = await Order.findByPk(id);

      if (!order) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }

      await order.update({ quantity, totalPrice, status, clientId, sellerId, productId });
      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteOrder(req, res) {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);

      if (!order) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }

      await order.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default OrderController;
