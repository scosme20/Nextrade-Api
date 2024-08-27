import Demand from '../Modules/demand/demandModel.js';
import Supplier from '../Modules/supplier/supplierModel.js';

class DemandController {
  static async createDemand(req, res) {
    try {
      const { description, quantity, supplierId } = req.body;
      const demand = await Demand.create({ description, quantity, supplierId });
      res.status(201).json(demand);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllDemands(req, res) {
    try {
      const demands = await Demand.findAll({
        include: [Supplier]
      });
      res.status(200).json(demands);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getDemandById(req, res) {
    try {
      const { id } = req.params;
      const demand = await Demand.findByPk(id, {
        include: [Supplier]
      });

      if (!demand) {
        return res.status(404).json({ error: 'Demanda não encontrada' });
      }

      res.status(200).json(demand);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateDemand(req, res) {
    try {
      const { id } = req.params;
      const { description, quantity, supplierId } = req.body;
      const demand = await Demand.findByPk(id);

      if (!demand) {
        return res.status(404).json({ error: 'Demanda não encontrada' });
      }

      await demand.update({ description, quantity, supplierId });
      res.status(200).json(demand);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteDemand(req, res) {
    try {
      const { id } = req.params;
      const demand = await Demand.findByPk(id);

      if (!demand) {
        return res.status(404).json({ error: 'Demanda não encontrada' });
      }

      await demand.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default DemandController;
