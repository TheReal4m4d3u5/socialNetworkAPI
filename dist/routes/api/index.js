import { Router } from 'express';
import userRoutes from './userRoutes.js';
import thoughtsRoutes from './thoughtsRoutes.js';
const router = Router();
router.use('/users', userRoutes);
router.use('/thoughts', thoughtsRoutes);
export default router;
