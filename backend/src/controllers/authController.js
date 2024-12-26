import { AuthService } from '../services/authService.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class AuthController {
  constructor(authService = new AuthService()) {
    this.authService = authService;
  }

  generateApiKey = async (req, res, next) => {
    try {
      const apiKey = await this.authService.generateApiKey();
      return ApiResponse.success(res, { apiKey });
    } catch (error) {
      next(error);
    }
  };
}