import { DataService } from '../services/dataService.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ValidationError } from '../utils/errors.js';

export class DataController {
  constructor(dataService = new DataService()) {
    this.dataService = dataService;
  }

  getAllRecords = async (req, res, next) => {
    try {
      const records = await this.dataService.getAllRecords();
      return ApiResponse.success(res, records);
    } catch (error) {
      next(error);
    }
  };

  getRecordById = async (req, res, next) => {
    try {
      const record = await this.dataService.getRecordById(req.params.id);
      return ApiResponse.success(res, record);
    } catch (error) {
      next(error);
    }
  };

  createRecord = async (req, res, next) => {
    try {
      if (!req.body.name || !req.body.description) {
        throw new ValidationError('Name and description are required');
      }
      const record = await this.dataService.createRecord(req.body);
      return ApiResponse.created(res, record);
    } catch (error) {
      next(error);
    }
  };

  updateRecord = async (req, res, next) => {
    try {
      const record = await this.dataService.updateRecord(req.params.id, req.body);
      return ApiResponse.success(res, record);
    } catch (error) {
      next(error);
    }
  };

  deleteRecord = async (req, res, next) => {
    try {
      await this.dataService.deleteRecord(req.params.id);
      return ApiResponse.noContent(res);
    } catch (error) {
      next(error);
    }
  };
}