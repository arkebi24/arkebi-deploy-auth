---

# Login Registration and Profile App

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

This project is a full-stack application for user authentication, registration, and profile management. It is built with Vite + React for the front end and Node.js for the backend, utilizing JWT for authentication and authorization, the joi library for validation, MongoDB for the database, and a RESTful API. The application is deployed on Vercel.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Endpoints](#api-endpoints)
6. [Validation](#validation)
7. [Deployment](#deployment)
8. [License](#license)

## Features

- 🌟 **User Registration**
- 🔐 **User Login**
- 🛡 **JWT-based Authentication and Authorization**
- 📝 **Profile Management**
- ✅ **Input Validation using joi**
- 🌐 **RESTful API**

## Technologies Used

- **Frontend**: ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white), ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- **Backend**: ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white), Express.js
- **Authentication/Authorization**: JSON Web Tokens (JWT)
- **Validation**: joi
- **Database**: ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
- **Deployment**: Vercel

## Installation

### Prerequisites

- Node.js >= 20.0
- npm or yarn >= 10.0
- MongoDB

### Backend Setup

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_folder>/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `backend` folder and add the following:
   ```env
   PORT=<your_port>
   MONGO_URI=<your_mongodb_uri>
   JWT_SECRET=<your_jwt_secret>
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend server:
   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5173` for the front end.
2. Use Postman or any API client to interact with the backend at `http://localhost:8080`.

## API Endpoints

### Auth Routes

- **POST /auth/register**
  - Registers a new user.
  - Request body: `{ "username": "string", "password": "string", "email": "string", "country": "string", "phonenumber": "string" }`

- **POST /auth/login**
  - Logs in a user.
  - Request body: `{ "username": "string", "password": "string" }`

### User Routes

- **GET /profile**
  - Retrieves the profile of the authenticated user.
  - Headers: `{ "Authorization": "Bearer <token>" }`

## Validation

Validation is handled using the `joi` library to ensure that all inputs conform to the required formats and constraints.

Example schema for registration:
```javascript
const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required()
});
```

## Deployment

The application is deployed on Vercel. You can access the live application at [https://arkebi-deploy-auth-client.vercel.app/](https://arkebi-deploy-auth-client.vercel.app/).

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Feel free to contribute or open issues for any bugs or feature requests!
