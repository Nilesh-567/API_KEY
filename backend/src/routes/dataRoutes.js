import { Router } from 'express';
import { DataController } from '../controllers/dataController.js';
import { validateApiKey } from '../middleware/validateApiKey.js';

export const dataRoutes = Router();
const dataController = new DataController();

// Apply API key validation to all data routes
dataRoutes.use(validateApiKey);

dataRoutes.get('/', dataController.getAllRecords);
dataRoutes.get('/:id', dataController.getRecordById);
dataRoutes.post('/', dataController.createRecord);
dataRoutes.put('/:id', dataController.updateRecord);
dataRoutes.delete('/:id', dataController.deleteRecord);