import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

// Configuration
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory storage
const apiKeys = new Set();
const database = new Map();

// Middleware
app.use(cors());
app.use(express.json());

// API Key validation middleware
const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || !apiKeys.has(apiKey)) {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  next();
};

// Generate API Key endpoint
app.post('/api/generate-key', (req, res) => {
  const apiKey = uuidv4();
  apiKeys.add(apiKey);
  res.json({ apiKey });
});

// CRUD endpoints
app.get('/api/data', validateApiKey, (req, res) => {
  res.json(Array.from(database.values()));
});

app.get('/api/data/:id', validateApiKey, (req, res) => {
  const record = database.get(req.params.id);
  if (!record) {
    return res.status(404).json({ error: 'Record not found' });
  }
  res.json(record);
});

app.post('/api/data', validateApiKey, (req, res) => {
  const id = uuidv4();
  const record = { id, ...req.body, createdAt: new Date() };
  database.set(id, record);
  res.status(201).json(record);
});

app.put('/api/data/:id', validateApiKey, (req, res) => {
  if (!database.has(req.params.id)) {
    return res.status(404).json({ error: 'Record not found' });
  }
  const record = { 
    ...database.get(req.params.id),
    ...req.body,
    updatedAt: new Date()
  };
  database.set(req.params.id, record);
  res.json(record);
});

app.delete('/api/data/:id', validateApiKey, (req, res) => {
  if (!database.has(req.params.id)) {
    return res.status(404).json({ error: 'Record not found' });
  }
  database.delete(req.params.id);
  res.status(204).send();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});