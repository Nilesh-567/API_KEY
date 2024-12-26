import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler.js';
import { apiRoutes } from './routes/index.js';
import { logger } from './utils/logger.js';

export function createApp() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(logger);

  // Routes
  app.use('/api', apiRoutes);

  // Error handling
  app.use(errorHandler);

  return app;
}