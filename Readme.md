E-Commerce MERN App

A full-stack E-Commerce application built with MERN stack (MongoDB, Express, React, Node.js) and TypeScript, featuring a clean architecture, responsive design, and global state management using React Context.

Table of Contents

Demo
=> Features
=> Tech Stack
=> Folder Structure
=> Installation
=> Environment Variables
=> Running the Project
=> API Endpoints
=> Future Improvements

Demo
Frontend: http://localhost:5173/
Backend: http://localhost:3000/api/

Features

=> Product listing with images and descriptions
=> Add/remove items from cart with quantity control
=> Responsive design for desktop and mobile
=> Client-side form validation using Yup
=> Backend request validation using Joi
=> Persistent API layer using Axios instance
=> Toast notifications for actions
=> Loader displayed during API calls
=> Clean folder structure for scalability

Tech Stack

=> Frontend: React 18, TypeScript, Tailwind CSS, React Router, React Query, React Hook Form, Yup, React Toastify
=> Backend: Node.js, Express.js, TypeScript, Joi , Cors , helmet
Other: Axios, PNPM (package manager)

Folder Structure
```bash
ecommerce-project/
│
├── backend/
├── public/
│   │   └── uploads/
|   |
│   ├── src/
│   │   ├── app.ts
│   │   ├── server.ts
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── validations/
│   │   ├── data/
│   │   └── component/
│   └── package.json
│
├── frontend/
│   ├── src/
|   |   |
│   │   ├── api/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   └── ui/
│   │   ├── context/
│   │   ├── navigation/
│   │   ├── pages/
│   │   ├── types/
│   │   ├── utils/
│   │   └── App.tsx
│   │   └── main.tsx
│   ├── .env
│   └── package.json
│
└── README.md

Installation
Backend
# Navigate to backend folder
cd backend

# Install dependencies
pnpm install

Frontend
# Navigate to frontend folder
cd frontend

# Install dependencies
pnpm install

Environment Variables

=> Create a .env file in the frontend root:

VITE_BACKEND_URL=http://localhost:3000/api/

=> Create a .env file in the backend root:

PORT=3000


Make sure the frontend .env variables start with VITE_ for Vite to expose them.

=> Running the Project
=> Backend
cd backend
pnpm dev


Starts backend server at http://localhost:3000

=> Frontend
cd frontend
pnpm run dev


Starts frontend at http://localhost:5173/

API Endpoints

=>  Products

GET /api/products – Fetch all products

=>  Orders

POST /api/orders – Place a new order

Request payload for order:

{
  "firstName": "John",
  "lastName": "Doe",
  "address": "123 Main Street",
  "cartItems": [
    {
      "id": "1",
      "name": "Apple iPhone 15 Pro",
      "price": 1199.99,
      "quantity": 1
    }
  ],
  "total": 1199.99
}

Future Improvements

=> Connect backend to MongoDB for persistent storage
=> Implement user authentication and authorization
=> Add payment gateway integration
=> Store cart data in localStorage or backend for persistence
=> Improve UI/UX with better animations and filters

Author
Anash khan