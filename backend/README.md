# Backend API Documentation

## Architecture Overview

This backend follows a clean, layered architecture:

1. Routes Layer (Entry Point)
   - Handles HTTP routing
   - Basic request validation
   - Routes to appropriate controllers

2. Controllers Layer
   - Handles HTTP requests/responses
   - Input validation
   - Calls appropriate services

3. Services Layer
   - Contains business logic
   - Manages data operations
   - Handles complex operations

4. Utils/Shared
   - Common utilities
   - Error handling
   - Response formatting

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── middleware/     # Express middleware
├── routes/         # API routes
├── services/      # Business logic
└── utils/         # Shared utilities
```

## API Endpoints

### Authentication
- POST `/api/auth/generate-key`
  - Generates new API key
  - No authentication required
  - Returns: `{ apiKey: string }`

### Data Operations
All data endpoints require API key authentication via `x-api-key` header.

- GET `/api/data`
  - Get all records
  - Returns: Array of records

- GET `/api/data/:id`
  - Get single record
  - Returns: Record object

- POST `/api/data`
  - Create new record
  - Body: `{ name: string, description: string }`
  - Returns: Created record

- PUT `/api/data/:id`
  - Update record
  - Body: `{ name?: string, description?: string }`
  - Returns: Updated record

- DELETE `/api/data/:id`
  - Delete record
  - Returns: No content (204)

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 204: No Content
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```
   PORT=3000
   NODE_ENV=development
   ```

3. Start development server:
   ```bash
   npm run dev
   ```