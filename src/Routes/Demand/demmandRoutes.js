import { Router } from 'express';
import DemandController from '../../Controllers/DemandController.js';

const router = Router();

router.post('/demands', DemandController.createDemand);
router.get('/demands', DemandController.getAllDemands);
router.get('/demands/:id', DemandController.getDemandById);
router.put('/demands/:id', DemandController.updateDemand);
router.delete('/demands/:id', DemandController.deleteDemand);

export default router;
