import express from 'express';
import { getCatalog } from '../../Controllers/cattalogController.js';
import { authenticate } from '../../core/Middleware/AuthMiddleware.js';

const router = express.Router();

router.get('/', authenticate, getCatalog);

export default router;
