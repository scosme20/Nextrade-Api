import { Router } from 'express';
import OrderController from '../../Controllers/orderController.js';
import { authenticate, authorizeRoles } from '../../core/Middleware/AuthMiddleware.js';

const router = Router();

router.use(authenticate);

router.get('/orders', OrderController.getAllOrders); 

router.post('/orders', authorizeRoles('client', 'user', 'seller'), OrderController.createOrder);

router.get('/orders/:id', OrderController.getOrderById);

router.put('/orders/:id', authorizeRoles('client', 'user', 'seller', 'supplier'), OrderController.updateOrder);

router.delete('/orders/:id', authorizeRoles('client', 'seller', 'supplier'), OrderController.deleteOrder);

export default router;
