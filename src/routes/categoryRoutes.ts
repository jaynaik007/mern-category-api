import { Router } from 'express';
import { createCategory, getCategoryTree, updateCategory, deleteCategory   } from '../controllers/categoryController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticate, createCategory as any);
router.get('/', authenticate, getCategoryTree as any);
router.put('/:id', authenticate, updateCategory as any);
router.delete('/:id', authenticate, deleteCategory as any);

export default router;
