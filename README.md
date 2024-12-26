# Secure REST API with Frontend Interface

This project implements a secure REST API using Node.js/Express.js with API key authentication and a React-based frontend testing interface.

## Features

- API key authentication
- CRUD operations
- Frontend testing interface
- Real-time response display
- In-memory data storage

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development servers:
   ```bash
   npm run dev
   ```

This will start both the frontend and backend servers concurrently.

## API Documentation

### Authentication

All API requests (except key generation) require an API key in the `x-api-key` header.

### Endpoints

#### Generate API Key
- POST `/api/generate-key`
- No authentication required
- Returns a new API key

#### Data Operations
All data endpoints require API key authentication.

- GET `/api/data` - Retrieve all records
- GET `/api/data/:id` - Retrieve single record
- POST `/api/data` - Create new record
- PUT `/api/data/:id` - Update record
- DELETE `/api/data/:id` - Remove record

### Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 201: Created
- 204: No Content
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

Each error response includes an error message in the JSON response body.