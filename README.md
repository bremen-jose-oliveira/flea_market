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

### Market

-   `GET /markets?status=true|false`  
    List all market items filtered by status (available/reserved).

-   `POST /markets`  
    Create a new market item (requires image upload and authentication).

-   `PUT /markets/:market_id`  
    Update an existing market item (requires authentication).

-   `DELETE /markets`  
    Delete a market item (requires authentication).

### Purchase

-   `GET /purchase`  
    List all purchases for the authenticated user.

-   `POST /markets/:market_id/purchase`  
    Purchase (reserve) a market item.

-   `DELETE /purchase/cancel`  
    Cancel a purchase.

### Dashboard

-   `GET /dashboard`  
    List all market items created by the authenticated user.

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

-   **Virtuals:**  
    `thumbnail_url` - Returns the full URL to the uploaded image.

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

-   Uses Multer for handling file uploads.
-   Images are uploaded via the `POST /markets` and `PUT /markets/:market_id` endpoints.
-   Uploaded files are stored in the `uploads/` directory and accessible via `/files/<filename>`.

---

## Authentication

-   Authentication is handled via a `user_id` header in requests.
-   Users cannot purchase their own items.
-   Only the owner can update or delete their own market items.

---

## Development

-   **Start server:** `yarn dev` or `npm run dev`
-   **Hot reload:** Enabled via `nodemon`
-   **Dependencies:** Express, Mongoose, Multer, Yup, CORS

---

## License

MIT

