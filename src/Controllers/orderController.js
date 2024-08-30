import Order from '../Modules/order/order.js';
import Client from '../Modules/client/clientModel.js';
import Seller from '../Modules/sellers/sellerModel.js';
import Product from '../Modules/product/product.js';
import { validationResult } from 'express-validator';

class OrderController {
  static async createOrder(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { quantity, totalPrice, clientId, sellerId, productId } = req.body;
      const order = await Order.create({ quantity, totalPrice, clientId, sellerId, productId });
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar pedido', details: error.message });
    }
  }

  static async getAllOrders(req, res) {
    try {
      const orders = await Order.findAll({
        include: [Client, Seller, Product]
      });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar pedidos', details: error.message });
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
      res.status(500).json({ error: 'Erro ao buscar pedido', details: error.message });
    }
  }

  static async updateOrder(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const { quantity, totalPrice, status, clientId, sellerId, productId } = req.body;
      const order = await Order.findByPk(id);

      if (!order) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }

      if (req.user.role === 'client' && order.clientId !== req.user.id) {
        return res.status(403).json({ error: 'Você não tem permissão para atualizar este pedido' });
      }
      if (req.user.role === 'seller' && order.sellerId !== req.user.id) {
        return res.status(403).json({ error: 'Você não tem permissão para atualizar este pedido' });
      }

      await order.update({ quantity, totalPrice, status, clientId, sellerId, productId });
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar pedido', details: error.message });
    }
  }

  static async deleteOrder(req, res) {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);

      if (!order) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }

      if (req.user.role === 'client' && order.clientId !== req.user.id) {
        return res.status(403).json({ error: 'Você não tem permissão para excluir este pedido' });
      }
      if (req.user.role === 'seller' || req.user.role === 'supplier' || (req.user.role === 'client' && order.clientId === req.user.id)) {
        await order.destroy();
        return res.status(204).send();
      }

      res.status(403).json({ error: 'Você não tem permissão para excluir este pedido' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir pedido', details: error.message });
    }
  }
}

export default OrderController;
