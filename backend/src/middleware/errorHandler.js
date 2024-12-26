import { BaseError, NotFoundError, ValidationError } from '../utils/errors.js';

export function errorHandler(err, req, res, next) {
  console.error(err);

  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      error: err.message
    });
  }

  return res.status(500).json({
    error: 'Internal server error'
  });
}