import { AuthService } from '../services/authService.js';
import { UnauthorizedError } from '../utils/errors.js';

export function validateApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  const authService = new AuthService();

  if (!apiKey || !authService.validateApiKey(apiKey)) {
    throw new UnauthorizedError('Invalid API key');
  }

  next();
}