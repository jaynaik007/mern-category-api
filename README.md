# MERN Category API

A multi-level category management API built with **Node.js**, **Express**, **MongoDB**, and **TypeScript**, featuring **JWT authentication**, role-based access, and support for nested categories. This project is part of a Senior MERN Stack Developer assignment.

---

## 🔧 Tech Stack

- **Node.js + Express**
- **MongoDB + Mongoose**
- **TypeScript**
- **JWT Authentication**
- **Jest** for Testing
- **Docker** (Optional - Bonus)

---

## 🚀 Setup & Run Locally

### 1. Clone the repo

bash
git clone https://github.com/jaynaik007/mern-category-api.git
cd mern-category-api

### 2. Install dependencies

npm install

### 3. Set environment variables

Create a .env file in the root:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/category-api
JWT_SECRET=your_jwt_secret

### 4. Run the development server

npm run dev

### 5. Run tests

npm test

🔐 API Endpoints
Auth Routes

POST /api/auth/register
Request:
{
"email": "test@example.com",
"password": "password123"
}
Response:
{
"message": "User registered successfully"
}

POST /api/auth/login
Request:
{
"email": "test@example.com",
"password": "password123"
}
Response:
{
"token": "jwt_token_here"
}

Categories routes can be found in shared collection file of Postman.
