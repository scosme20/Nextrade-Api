import { Router } from 'express';
import ProductController from '../../Controllers/productController.js';
import { authenticate } from '../../core/Middleware/AuthMiddleware.js';

const router = Router();

router.use(authenticate);

router.post('/products', ProductController.createProduct);
router.get('/products', ProductController.getAllProducts);
router.get('/products/:id', ProductController.getProductById);
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);

export default router;
