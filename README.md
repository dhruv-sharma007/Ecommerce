# Ecommerce Backend

Backend for an ecommerce application, providing robust APIs for managing products, users, orders, and more. This repository is written entirely in JavaScript.

## Features
- User Authentication and Authorization
- Product Management (CRUD operations)
- Order Management (CRUD operations)
- Cart Management
- Payment Integration
- RESTful API structure

## Getting Started

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/dhruv-sharma007/Ecommerce.git
   cd Ecommerce
   ```
2. Install dependencies:
```bash
npm install
```
### Configuration 
1. Create a .env file in the root directory
2. Add the following environment variables:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
### Running the Application
- To start the development server:
```bash
npm run dev
```
- check markdown in server folder for routes
