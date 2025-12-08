# CyberAware Backend API

Production-ready Express.js REST API for the CyberAware cybersecurity incidents management system.

## 🚀 Quick Start

### Prerequisites
- Node.js v18.0.0+
- npm v9.0.0+
- MongoDB Atlas account
- Gmail account (for email notifications)

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Fill in required variables
nano .env
```

### Environment Variables

```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/cyberaware

# JWT
JWT_SECRET=your_64_char_secret_key_here
REFRESH_TOKEN_SECRET=your_64_char_refresh_secret_here

# Email
GMAIL_USER=your_gmail@gmail.com
GMAIL_PASS=your_gmail_app_password

# Cache (optional)
REDIS_URL=redis://localhost:6379

# Frontend
FRONTEND_URL=http://localhost:3000

# Rate Limiting (optional)
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=1000
```

### Running the Server

```bash
# Development mode (watch mode with nodemon)
npm run dev

# Production mode
npm start

# Run tests
npm test

# Run specific test file
npm test -- incidents.test.js
```

Server will start on `http://localhost:5000`

## 📁 Project Structure

```
BackEnd/
├── config/                 # Configuration files
│   ├── database.js        # MongoDB connection
│   ├── redis.js           # Redis client
│   ├── logger.js          # Winston logging
│   ├── email.js           # Email configuration
│   └── swagger.js         # API documentation
│
├── controllers/            # Business logic
│   ├── authController.js
│   ├── userController.js
│   ├── incidentController.js
│   └── uploadController.js
│
├── middleware/             # Custom middleware
│   ├── auth.js            # JWT verification
│   ├── authorize.js       # Role-based access
│   ├── errorHandler.js    # Error handling
│   ├── requestLogger.js   # HTTP logging
│   ├── rateLimiter.js     # Rate limiting
│   ├── validate.js        # Input validation
│   ├── upload.js          # File upload handling
│   ├── cache.js           # Redis caching
│   └── catchAsync.js      # Async error wrapper
│
├── models/                 # Mongoose schemas
│   ├── User.js
│   ├── Incident.js
│   └── Image.js
│
├── routes/                 # API endpoints
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── incidentRoutes.js
│   └── uploadRoutes.js
│
├── utils/                  # Utility functions
│   ├── generateToken.js   # JWT token generation
│   ├── sendEmail.js       # Email sending
│   └── catchAsync.js      # Async wrapper
│
├── logs/                   # Winston logs
│   ├── error.log
│   └── combined.log
│
├── uploads/                # User uploads
│
├── tests/                  # Jest tests
│   └── incidents.test.js
│
├── scripts/                # Utility scripts
│   └── seedIncidents.js   # Seed database with sample data
│
├── .env.example
├── .gitignore
├── .dockerignore
├── Dockerfile
├── package.json
├── server.js              # Entry point
└── README.md              # This file
```

## 🔌 API Endpoints

### Authentication Routes

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}

Response: 201 Created
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123"
}

Response: 200 OK
{
  "success": true,
  "data": { ... },
  "token": "...",
  "refreshToken": "..."
}
```

#### Forgot Password
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}

Response: 200 OK
{
  "success": true,
  "message": "Password reset email sent"
}
```

#### Reset Password
```http
PATCH /api/auth/reset-password/:token
Content-Type: application/json

{
  "password": "NewSecurePassword123"
}

Response: 200 OK
```

### Incident Routes

#### Get All Incidents (with Filtering & Pagination)
```http
GET /api/incidents?page=1&limit=10&search=phishing&sort=date&severity=high&status=investigating

Response: 200 OK
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45
  }
}
```

#### Get Single Incident
```http
GET /api/incidents/507f1f77bcf86cd799439011

Response: 200 OK
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "SQL Injection Attack",
    "description": "...",
    "severity": "high",
    "status": "investigating",
    "reportedBy": "507f1f77bcf86cd799439012",
    "createdAt": "2025-12-08T18:00:00Z"
  }
}
```

#### Create Incident
```http
POST /api/incidents
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Phishing Campaign",
  "description": "Targeted phishing emails detected",
  "severity": "high",
  "status": "reported",
  "category": "phishing"
}

Response: 201 Created
```

#### Update Incident (Owner Only)
```http
PATCH /api/incidents/507f1f77bcf86cd799439011
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "resolved",
  "description": "Updated description"
}

Response: 200 OK
```

#### Delete Incident (Owner Only)
```http
DELETE /api/incidents/507f1f77bcf86cd799439011
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "message": "Incident deleted successfully"
}
```

### User Routes

#### Get Current User Profile
```http
GET /api/users/me
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "avatar": "https://..."
  }
}
```

#### Update User Profile
```http
PATCH /api/users/me
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Jane Doe",
  "avatar": "https://..."
}

Response: 200 OK
```

#### Get Dashboard Statistics
```http
GET /api/users/dashboard
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "data": {
    "totalIncidents": 45,
    "bySeverity": {
      "critical": 2,
      "high": 10,
      "medium": 25,
      "low": 8
    },
    "byStatus": {
      "reported": 15,
      "investigating": 20,
      "resolved": 10
    }
  }
}
```

### Upload Routes

#### Upload Image
```http
POST /api/upload
Authorization: Bearer {token}
Content-Type: multipart/form-data

Form Data:
- file: <image file>

Response: 201 Created
{
  "success": true,
  "data": {
    "url": "https://...",
    "filename": "image_1234567890.jpg",
    "size": 204800
  }
}
```

## 🔐 Authentication

All protected routes require JWT token in the Authorization header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token Types
- **Access Token**: 7 days expiration (used for API requests)
- **Refresh Token**: 30 days expiration (used to generate new access tokens)

## 🗄️ Database Models

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  avatar: String (optional),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Incident Schema
```javascript
{
  title: String (required),
  description: String (required),
  severity: String (enum: ['critical', 'high', 'medium', 'low']),
  status: String (enum: ['reported', 'investigating', 'resolved']),
  category: String (required),
  reportedBy: ObjectId (User reference, required),
  image: String (optional, URL to uploaded image),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🔍 Validation

Input validation using Joi schemas:

```javascript
// Register Schema
{
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
}

// Incident Schema
{
  title: Joi.string().min(5).max(100).required(),
  description: Joi.string().min(10).required(),
  severity: Joi.string().valid('critical', 'high', 'medium', 'low').required(),
  status: Joi.string().valid('reported', 'investigating', 'resolved').required(),
  category: Joi.string().required()
}
```

## 🚨 Error Handling

Centralized error handling with Winston logging:

```javascript
// Error Response Format
{
  "success": false,
  "message": "Error description",
  "statusCode": 400,
  "errors": [ /* validation errors */ ]
}
```

### Status Codes
- `200` - OK
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (no token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Server Error

## 📊 Logging

Winston logger configured for both development and production:

**Development**:
- Console output (colorized)
- Log level: `debug`

**Production**:
- File output (`logs/error.log`, `logs/combined.log`)
- Log rotation: 5MB, 5 files max
- Log level: `info`

### Log Files
- `logs/combined.log` - All logs
- `logs/error.log` - Error logs only

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Test Files
- `tests/incidents.test.js` - Incident CRUD operations

### Test Coverage
- POST /api/incidents - Create incident
- PATCH /api/incidents/:id - Update incident with ownership check
- Integration with MongoDB
- JWT authentication verification

## 🚀 Deployment

### Environment Setup (Production)
```bash
# Copy production template
cp .env.production.example .env.production

# Update variables with production values
nano .env.production
```

### Deploy to Render
See [../DEPLOYMENT.md](../DEPLOYMENT.md) for detailed steps

## 🐳 Docker

### Build Docker Image
```bash
docker build -t cyberaware-backend .
```

### Run with Docker
```bash
docker run -p 5000:5000 --env-file .env cyberaware-backend
```

### With Docker Compose (from root)
```bash
docker-compose up backend
```

## 📚 API Documentation

Interactive Swagger API documentation:
```
http://localhost:5000/api-docs
```

Health check endpoint:
```
GET http://localhost:5000/api/health
```

## 🔧 Scripts

### Seed Database with Sample Data
```bash
npm run seed

# This creates 10 famous cybersecurity incidents
```

## 📦 Dependencies

### Core
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing

### Utilities
- `dotenv` - Environment variables
- `joi` - Input validation
- `multer` - File uploads
- `nodemailer` - Email sending
- `redis` - Caching (optional)

### Middleware
- `helmet` - Security headers
- `cors` - Cross-origin requests
- `express-mongo-sanitize` - NoSQL injection prevention (disabled)
- `express-rate-limit` - Rate limiting (disabled)

### Logging & Documentation
- `winston` - Logging
- `swagger-ui-express` - API documentation
- `swagger-jsdoc` - Swagger generation

### Development
- `nodemon` - Auto-reload
- `jest` - Testing
- `supertest` - API testing
- `cross-env` - Cross-platform env vars

## ⚙️ Configuration Files

### `config/database.js`
MongoDB connection setup with Mongoose

### `config/redis.js`
Redis client initialization with auto-reconnect logic

### `config/logger.js`
Winston logger configuration with file rotation

### `config/swagger.js`
Swagger/OpenAPI specification for API documentation

## 🚧 Known Issues

- Rate limiting disabled (Express 5.x incompatibility)
- MongoDB sanitization disabled (Express 5.x incompatibility)
- These can be re-enabled with compatible package versions

## 💡 Best Practices Implemented

- ✅ MVC architecture
- ✅ Async/await error handling
- ✅ Centralized error middleware
- ✅ JWT token-based authentication
- ✅ Role-based access control
- ✅ Ownership-based authorization
- ✅ Pagination and filtering
- ✅ Input validation
- ✅ Environment-based configuration
- ✅ Structured logging
- ✅ API documentation
- ✅ Docker containerization

**Version**: 1.0.0  
**Last Updated**: December 8, 2025  
**Status**: Production-Ready ✅

