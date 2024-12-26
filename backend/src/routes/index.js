import { Router } from 'express';
import { authRoutes } from './authRoutes.js';
import { dataRoutes } from './dataRoutes.js';

export const apiRoutes = Router();

apiRoutes.use('/auth', authRoutes);
apiRoutes.use('/data', dataRoutes);