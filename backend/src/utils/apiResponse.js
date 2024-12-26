export class ApiResponse {
  static success(res, data) {
    return res.json(data);
  }

  static created(res, data) {
    return res.status(201).json(data);
  }

  static noContent(res) {
    return res.status(204).send();
  }
}