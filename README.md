# SenseGrass Project

## Project Overview
SenseGrass is a Vite-based agricultural analysis platform that leverages AI insights for soil and crop health management. It includes features for field management, AI-based analysis, user authentication, and payment integration.

## Features
- **Field Management:** Create, update, delete, and retrieve agricultural fields.
- **AI Analysis:** Generate soil and crop health analysis using Google AI.
- **User Management:** Register, login, and retrieve user profiles using JWT.
- **Payment Integration:** Integrated with Stripe for payment processing.

## Tech Stack
- **Frontend:** Vite, React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **AI Integration:** Google Generative AI
- **Payment Gateway:** Stripe

## Prerequisites
- Node.js (v16+)
- MongoDB Atlas Account
- Stripe Account
- Google Generative AI API Key

## Environment Variables
Create a `.env` file in the root directory and set the following environment variables:
```plaintext
MONGO_URI=<your-mongo-uri>
JWT_SECRET=<your-jwt-secret>
PORT=5000
GOOGLEAI_API=<your-googleai-api-key>
STRIPE_SECRET_KEY=<your-stripe-secret-key>
CLIENT_URL=http://localhost:5173
```

## Project Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate into the project directory:
   ```bash
   cd sensegrass
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. The server will run on `http://localhost:5000` and the frontend on `http://localhost:5173`

## Running the Project
- **Backend:**
  ```bash
  npm run server
  ```
- **Frontend:**
  ```bash
  npm run dev
  ```

## API Endpoints
### User Authentication
- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Login user.
- `GET /api/users/profile`: Get user profile (protected route).

### Field Management
- `POST /api/fields`: Create a field.
- `GET /api/fields`: Get all fields.
- `PUT /api/fields/:id`: Update a field.
- `DELETE /api/fields/:id`: Delete a field.

### AI Analysis
- `POST /api/ai/generate`: Generate AI-based field analysis.
- `GET /api/ai/:fieldName`: Get AI analysis for a specific field.

### Payment Integration
- `POST /api/payments/create-intent`: Create a payment intent.
- `POST /api/payments/save`: Save a transaction.
- `GET /api/payments/transactions`: Get all transactions.

## Project Structure
```plaintext
├── controllers
│   ├── aiController.js
│   ├── fieldController.js
│   ├── paymentController.js
│   └── userController.js
├── models
│   ├── AIAnalysis.js
│   ├── Field.js
│   ├── Transaction.js
│   └── User.js
├── routes
│   ├── aiRoutes.js
│   ├── fieldRoutes.js
│   ├── paymentRoutes.js
│   └── userRoutes.js
├── .env
├── server.js
├── vite.config.js
├── package.json
└── README.md
```

## License
This project is licensed under the MIT License.


