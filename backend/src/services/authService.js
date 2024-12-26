import { v4 as uuidv4 } from 'uuid';

export class AuthService {
  constructor() {
    if (!AuthService.instance) {
      this.apiKeys = new Set();
      AuthService.instance = this;
    }
    return AuthService.instance;
  }

  async generateApiKey() {
    const apiKey = uuidv4();
    this.apiKeys.add(apiKey);
    return apiKey;
  }

  validateApiKey(apiKey) {
    return this.apiKeys.has(apiKey);
  }
}