# flea_market

A simple API that simulates a flea market, providing easy CRUD routes and authentication.

---

## Table of Contents

-   [Overview](#overview)
-   [Features](#features)
-   [Project Structure](#project-structure)
-   [Setup & Installation](#setup--installation)
-   [Configuration](#configuration)
-   [API Endpoints](#api-endpoints)
-   [Data Models](#data-models)
-   [File Uploads](#file-uploads)
-   [Authentication](#authentication)
-   [Development](#development)
-   [License](#license)

---

## Overview

This project is a RESTful API for a flea market application. It allows users to register, list items for sale, purchase items, and manage their own listings. The API is built with Node.js, Express, and MongoDB (via Mongoose), and supports file uploads for item images.

---

## Features

-   User authentication (via email)
-   CRUD operations for market items
-   Purchase flow for reserving/buying items
-   Dashboard for user-specific listings
-   File upload support for item images
-   Data validation with Yup
-   CORS enabled for cross-origin requests

---

## Project Structure

```
flea_market/
  ├── src/
  │   ├── app.js                # Express app setup and middleware
  │   ├── server.js             # App entry point (listens on port 3030)
  │   ├── config/
  │   │   └── upload.js         # Multer configuration for file uploads
  │   ├── controllers/          # Route controllers
  │   ├── models/               # Mongoose models (User, Market, Purchase)
  │   └── routes.js             # API route definitions
  ├── uploads/                  # Uploaded images
  ├── package.json
  ├── README.md
  └── ...
```

---

## Setup & Installation

1. **Clone the repository:**

    ```bash
    git clone <repo-url>
    cd flea_market
    ```

2. **Install dependencies:**

    ```bash
    yarn install
    # or
    npm install
    ```

3. **Configure MongoDB:**

    - Update the MongoDB connection string in `src/app.js`:
        ```js
        mongoose.connect(
            'mongodb://<username>:<password>@<host>:<port>/<database>'
        );
        ```

4. **Run the development server:**

    ```bash
    yarn dev
    # or
    npm run dev
    ```

    The server will start on [http://localhost:3030](http://localhost:3030).

---

## Configuration

-   **File Uploads:** Configured via `src/config/upload.js` using Multer. Uploaded files are stored in the `uploads/` directory with a timestamped filename.
-   **Static Files:** Uploaded images are served at `/files/<filename>`.

---

## API Endpoints

### Authentication

#### Create or Retrieve User Session

- **POST /sessions**
- **Description:** Register a new user or log in an existing user by email.
- **Request Body:**
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Response:**
  - `200 OK` (user object)
  - `400 Bad Request` (invalid email)
- **Example Response:**
  ```json
  {
    "_id": "...",
    "email": "user@example.com"
  }
  ```

---

### Market

#### List Market Items

- **GET /markets?status=true|false**
- **Description:** List all market items filtered by status (available or reserved).
- **Query Parameters:**
  - `status` (boolean, required): `true` for available, `false` for reserved
- **Response:**
  - `200 OK` (array of market items)
- **Example Response:**
  ```json
  [
    {
      "_id": "...",
      "thumbnail": "image.jpg",
      "description": "A nice item",
      "price": 100,
      "status": true,
      "user": "..."
    }
  ]
  ```

#### Create Market Item

- **POST /markets**
- **Description:** Create a new market item. Requires authentication and image upload.
- **Headers:**
  - `user_id` (string, required): User ID from session
- **Request Body (multipart/form-data):**
  - `thumbnail` (file, required): Image file
  - `description` (string, required)
  - `price` (number, required)
  - `status` (boolean, required)
- **Response:**
  - `200 OK` (created market item)
  - `400 Bad Request` (validation error)
- **Example Response:**
  ```json
  {
    "_id": "...",
    "thumbnail": "image.jpg",
    "description": "A nice item",
    "price": 100,
    "status": true,
    "user": "..."
  }
  ```

#### Update Market Item

- **PUT /markets/:market_id**
- **Description:** Update an existing market item. Only the owner can update. Requires authentication and image upload.
- **Headers:**
  - `user_id` (string, required)
- **Path Parameters:**
  - `market_id` (string, required)
- **Request Body (multipart/form-data):**
  - `thumbnail` (file, required): Image file
  - `description` (string, required)
  - `price` (number, required)
  - `status` (boolean, required)
- **Response:**
  - `200 OK` (empty)
  - `400 Bad Request` (validation error)
  - `401 Unauthorized` (not the owner)

#### Delete Market Item

- **DELETE /markets**
- **Description:** Delete a market item. Only the owner can delete.
- **Headers:**
  - `user_id` (string, required)
- **Request Body:**
  ```json
  {
    "market_id": "..."
  }
  ```
- **Response:**
  - `200 OK` (success message)
  - `401 Unauthorized` (not the owner)
- **Example Response:**
  ```json
  { "message": "Deleted with Success" }
  ```

---

### Purchase

#### List Purchases

- **GET /purchase**
- **Description:** List all purchases for the authenticated user.
- **Headers:**
  - `user_id` (string, required)
- **Response:**
  - `200 OK` (array of purchases)
- **Example Response:**
  ```json
  [
    {
      "_id": "...",
      "date": "2024-06-01T12:00:00Z",
      "user": "...",
      "market": { ... }
    }
  ]
  ```

#### Purchase Market Item

- **POST /markets/:market_id/purchase**
- **Description:** Reserve (purchase) a market item. Cannot purchase your own item.
- **Headers:**
  - `user_id` (string, required)
- **Path Parameters:**
  - `market_id` (string, required)
- **Request Body:**
  ```json
  {
    "date": "2024-06-01T12:00:00Z"
  }
  ```
- **Response:**
  - `200 OK` (purchase object)
  - `400 Bad Request` (item does not exist or is reserved)
  - `401 Unauthorized` (cannot buy your own item)
- **Example Response:**
  ```json
  {
    "_id": "...",
    "date": "2024-06-01T12:00:00Z",
    "user": "...",
    "market": { ... }
  }
  ```

#### Cancel Purchase

- **DELETE /purchase/cancel**
- **Description:** Cancel a purchase.
- **Request Body:**
  ```json
  {
    "purchase_id": "..."
  }
  ```
- **Response:**
  - `200 OK` (empty)

---

### Dashboard

#### List User's Market Items

- **GET /dashboard**
- **Description:** List all market items created by the authenticated user.
- **Headers:**
  - `user_id` (string, required)
- **Response:**
  - `200 OK` (array of market items)

---

## Error Handling

- `400 Bad Request`: Invalid input, missing required fields, or item does not exist.
- `401 Unauthorized`: User is not authorized to perform the action (e.g., not the owner, or trying to buy own item).

Example error response:
```json
{ "error": "bad request" }
```

---

## Data Models

### User
```js
{
    email: String;
}
```

### Market
```js
{
  thumbnail: String,      // Image filename
  description: String,
  price: Number,
  status: Boolean,        // true = available, false = reserved
  user: ObjectId (User)
}
```
- **Virtuals:**  `thumbnail_url` - Returns the full URL to the uploaded image.

### Purchase
```js
{
  date: String,
  user: ObjectId (User),
  market: ObjectId (Market)
}
```

---

## File Uploads

- Uses Multer for handling file uploads.
- Images are uploaded via the `POST /markets` and `PUT /markets/:market_id` endpoints.
- Uploaded files are stored in the `uploads/` directory and accessible via `/files/<filename>`.

---

## Authentication

- Authentication is handled via a `user_id` header in requests.
- Users cannot purchase their own items.
- Only the owner can update or delete their own market items.

---

## Development

- **Start server:** `yarn dev` or `npm run dev`
- **Hot reload:** Enabled via `nodemon`
- **Dependencies:** Express, Mongoose, Multer, Yup, CORS

---

## License

MIT

