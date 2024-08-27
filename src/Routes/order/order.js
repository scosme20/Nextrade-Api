import { Router } from 'express';
import OrderController from '../../Controllers/orderController.js';

const router = Router();

router.post('/orders', OrderController.createOrder);
router.get('/orders', OrderController.getAllOrders);
router.get('/orders/:id', OrderController.getOrderById);
router.put('/orders/:id', OrderController.updateOrder);
router.delete('/orders/:id', OrderController.deleteOrder);

export default router;

