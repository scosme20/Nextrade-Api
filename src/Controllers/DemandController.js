import Demand from '../Modules/demand/demandModel.js';
import Supplier from '../Modules/supplier/supplierModel.js';
import Seller from '../Modules/sellers/sellerModel.js';
import { validationResult } from 'express-validator';

class DemandController {
  static async createDemand(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { description, quantity, supplierId } = req.body;
      if (req.user.role !== 'supplier') {
        return res.status(403).json({ error: 'Access denied' });
      }

      const demand = await Demand.create({ description, quantity, supplierId });
      res.status(201).json(demand);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar demanda', details: error.message });
    }
  }

  static async getAllDemands(req, res) {
    try {
      const userRole = req.user.role;
      const userId = req.user.id;

      if (userRole === 'supplier') {
        const demands = await Demand.findAll({
          include: [{ model: Seller, where: { supplierId: userId } }]
        });
        res.status(200).json(demands);
      } else if (userRole === 'seller') {
        const demands = await Demand.findAll({
          include: [{ model: Client, where: { sellerId: userId } }]
        });
        res.status(200).json(demands);
      } else {
        res.status(403).json({ error: 'Access denied' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar demandas', details: error.message });
    }
  }

  static async getDemandById(req, res) {
    try {
      const { id } = req.params;
      const userRole = req.user.role;
      const userId = req.user.id;

      const demand = await Demand.findByPk(id, {
        include: [Supplier, Seller]
      });

      if (!demand) {
        return res.status(404).json({ error: 'Demanda não encontrada' });
      }

      if (userRole === 'supplier' && demand.sellerId !== userId) {
        return res.status(403).json({ error: 'Access denied' });
      }

      if (userRole === 'seller' && demand.clientId !== userId) {
        return res.status(403).json({ error: 'Access denied' });
      }

      res.status(200).json(demand);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar demanda', details: error.message });
    }
  }

  static async updateDemand(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const { description, quantity, supplierId } = req.body;
      const userRole = req.user.role;
      const userId = req.user.id;

      const demand = await Demand.findByPk(id);

      if (!demand) {
        return res.status(404).json({ error: 'Demanda não encontrada' });
      }

      if (userRole === 'supplier' && demand.sellerId !== userId) {
        return res.status(403).json({ error: 'Access denied' });
      }

      if (userRole === 'seller' && demand.clientId !== userId) {
        return res.status(403).json({ error: 'Access denied' });
      }

      await demand.update({ description, quantity, supplierId });
      res.status(200).json(demand);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar demanda', details: error.message });
    }
  }

  static async deleteDemand(req, res) {
    try {
      const { id } = req.params;
      const userRole = req.user.role;
      const userId = req.user.id;

      const demand = await Demand.findByPk(id);

      if (!demand) {
        return res.status(404).json({ error: 'Demanda não encontrada' });
      }

      if (userRole === 'supplier' && demand.sellerId !== userId) {
        return res.status(403).json({ error: 'Access denied' });
      }

      if (userRole === 'seller' && demand.clientId !== userId) {
        return res.status(403).json({ error: 'Access denied' });
      }

      await demand.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir demanda', details: error.message });
    }
  }
}

export default DemandController;
