import { v4 as uuidv4 } from 'uuid';
import { NotFoundError } from '../utils/errors.js';

export class DataService {
  constructor() {
    if (!DataService.instance) {
      this.database = new Map();
      DataService.instance = this;
    }
    return DataService.instance;
  }

  async getAllRecords() {
    return Array.from(this.database.values());
  }

  async getRecordById(id) {
    const record = this.database.get(id);
    if (!record) {
      throw new NotFoundError('Record not found');
    }
    return record;
  }

  async createRecord(data) {
    const id = uuidv4();
    const record = {
      id,
      ...data,
      createdAt: new Date(),
    };
    this.database.set(id, record);
    return record;
  }

  async updateRecord(id, data) {
    if (!this.database.has(id)) {
      throw new NotFoundError('Record not found');
    }

    const record = {
      ...this.database.get(id),
      ...data,
      updatedAt: new Date(),
    };
    this.database.set(id, record);
    return record;
  }

  async deleteRecord(id) {
    if (!this.database.has(id)) {
      throw new NotFoundError('Record not found');
    }
    this.database.delete(id);
  }
}