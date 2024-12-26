import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';

export const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/generate-key', authController.generateApiKey);