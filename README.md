# School Management API

A RESTful API for managing school data with proximity-based sorting built using Node.js, Express, and MySQL.

## Features

- Add new schools with validated data
- List schools sorted by proximity to a user's location
- RESTful API design with proper error handling
- MySQL database integration

## Prerequisites

- Node.js (v14 or higher)
- MySQL database

## Installation

1. Clone the repository
2. Install dependencies:
```
npm install
```
3. Create a `.env` file based on `.env.example`:
```
cp .env.example .env
```
4. Update the `.env` file with your MySQL database credentials

## Running the API

Start the development server:
```
npm run dev
```

For production:
```
npm start
```

## API Endpoints

### Add a New School

```
POST /api/addSchool
```

**Request Body:**
```json
{
  "name": "Sample School",
  "address": "123 Education St, City, Country",
  "latitude": 34.0522,
  "longitude": -118.2437
}
```

**Response:**
```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "Sample School",
    "address": "123 Education St, City, Country",
    "latitude": 34.0522,
    "longitude": -118.2437
  }
}
```

### List Schools by Proximity

```
GET /api/listSchools?latitude=34.0522&longitude=-118.2437
```

**Response:**
```json
{
  "success": true,
  "message": "Schools retrieved successfully",
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "Sample School",
      "address": "123 Education St, City, Country",
      "latitude": 34.0522,
      "longitude": -118.2437,
      "distance": 0
    },
    {
      "id": 2,
      "name": "Another School",
      "address": "456 Learning Ave, Town, Country",
      "latitude": 34.1522,
      "longitude": -118.3437,
      "distance": 12.34
    }
  ]
}
```

## Postman Collection

A Postman collection is available for testing the API. Import the collection from:

[School Management API.postman_collection.json](./School%20Management%20API.postman_collection.json)

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error