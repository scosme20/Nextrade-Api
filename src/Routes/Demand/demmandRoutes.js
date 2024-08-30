import { Router } from 'express';
import DemandController from '../../Controllers/DemandController.js';
import { authenticate } from '../../core/Middleware/AuthMiddleware.js';
import { authorizeRoles } from '../../core/Middleware/autorization.js';

const router = Router();

router.use(authenticate);

router.post('/demands', authorizeRoles('supplier'), DemandController.createDemand);
router.get('/demands', authorizeRoles('supplier', 'seller'), DemandController.getAllDemands);
router.get('/demands/:id', authorizeRoles('supplier', 'seller'), DemandController.getDemandById);
router.put('/demands/:id', authorizeRoles('supplier'), DemandController.updateDemand);
router.delete('/demands/:id', authorizeRoles('supplier'), DemandController.deleteDemand);

export default router;
