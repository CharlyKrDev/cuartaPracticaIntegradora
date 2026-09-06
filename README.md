# 🛒 Modular E-commerce Backend API

[![Node.js](https://img.shields.io/badge/Node.js-20.x-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green)](https://mongodb.com/)
[![Tests](https://img.shields.io/badge/tests-Mocha%20%2B%20Chai%20%2B%20Supertest-brightgreen)](https://mochajs.org/)

Backend e-commerce application built with **Node.js, Express and MongoDB** as the final project for the **Coderhouse Backend Development** course.

The project started as a CRUD-based e-commerce application and was progressively refactored into a layered backend with controllers, services, repositories, DAO/DTO patterns, authentication, role-based access, API documentation, logging and automated HTTP tests.

## 🚀 Features

- Product and cart CRUD operations
- MongoDB persistence with Mongoose
- User registration, login and session management
- Authentication with Passport.js
- Role-based authorization and administrative user management
- Password recovery by email
- Purchase ticket generation
- Product pagination
- File uploads with Multer
- Real-time communication with Socket.IO
- Mock product generation with Faker
- Centralized error handling
- Application logging with Winston
- Swagger / OpenAPI documentation
- Automated API testing with Mocha, Chai and Supertest

## 🛠️ Tech Stack

### Backend
- JavaScript
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose
- connect-mongo

### Authentication & Security
- Passport.js
- JSON Web Token (JWT)
- bcryptjs
- Express Session

### Testing
- Mocha
- Chai
- Supertest

### API & Infrastructure
- Swagger / OpenAPI
- Winston
- Socket.IO
- Multer
- Nodemailer
- Faker
- Handlebars

## 🏗️ Architecture

The project was refactored to separate responsibilities across multiple layers:

```text
Request
   |
 Route
   |
 Controller
   |
 Service
   |
 Repository / DAO
   |
 MongoDB
```

Main source folders:

```text
src/
├── config/
├── connection/
├── controllers/
├── dao/
├── docs/
├── dto/
├── middleware/
├── repository/
├── routes/
├── services/
├── tests/
├── utils/
└── app.js
```

This separation keeps HTTP handling, business logic and data access in different parts of the application.

## 🌐 Main API Areas

The application exposes endpoints for:

- Products
- Carts
- Sessions
- Users
- Mock products
- Administrative operations

Swagger documentation is available locally at:

```text
http://localhost:8080/api/docs
```

The product view is available at:

```text
http://localhost:8080/products
```

## 📦 Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB database

### 1. Clone the repository

```bash
git clone https://github.com/CharlyKrDev/ecommerce-backend-api.git
cd ecommerce-backend-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
MONGO_URL=your_mongodb_connection_string
```

Do not commit the `.env` file or credentials to the repository.

### 4. Start the application

```bash
npm start
```

The server runs on:

```text
http://localhost:8080
```

## 🧪 Testing

The project includes automated HTTP/API tests with **Mocha, Chai and Supertest**.

Run the test suite with:

```bash
npm test
```

Example of the type of behavior covered by the tests:

- Successful product updates
- Resource-not-found responses
- Duplicate product-code validation
- API status codes and response payloads

## 📄 API Documentation

Swagger is integrated into the application.

After starting the server, open:

```text
http://localhost:8080/api/docs
```

The documentation covers the main API resources and can be used to inspect and test endpoints.

## 🔐 Authentication & Authorization

The project includes authentication and authorization flows using sessions, Passport.js and role-based access control.

It also contains password-recovery functionality using email delivery through Nodemailer.

## 📝 Error Handling & Logging

The application includes:

- Centralized error-handling middleware
- Custom error information for common e-commerce cases
- Winston logging for relevant application events

## 🔌 Real-Time Features

Socket.IO is integrated with the Express session middleware to support real-time functionality while sharing session information between HTTP and WebSocket connections.

## 📚 Project Context

This repository represents my final project for the **Coderhouse Backend Development** course.

Its main value is the progression from a basic e-commerce CRUD application toward a more structured backend using layered architecture, authentication, persistence, testing and API documentation.

It is an educational project and reflects the technologies and architectural concepts covered during the course.

## 👨‍💻 Author

**Carlos Alberto Kaar**

- LinkedIn: https://www.linkedin.com/in/carlos-alberto-kaar/
- GitHub: https://github.com/CharlyKrDev
