# CyberAware - MERN Cybersecurity Incidents Management System

A production-ready full-stack MERN application for managing and tracking cybersecurity incidents with real-time notifications, user authentication, and comprehensive analytics.

## 🚀 Features

### Core Functionality
- **User Authentication & Authorization**
  - JWT-based authentication with refresh tokens
  - Role-based access control (user/admin)
  - Password hashing with bcrypt
  - Email-based password reset
  
- **Incident Management**
  - Create, read, update, delete cybersecurity incidents
  - Advanced filtering and pagination
  - Search by severity, status, and category
  - Ownership-based access control
  
- **User Dashboard**
  - Real-time incident statistics
  - Severity and status breakdown
  - User profile management
  - Activity tracking

- **Security Features**
  - CORS protection
  - Helmet security headers
  - Input validation with Joi
  - Rate limiting (configured)
  - NoSQL injection prevention

- **Advanced Features**
  - Redis caching (5-minute TTL)
  - Winston logging system
  - Docker containerization
  - Swagger API documentation
  - Email notifications

## 📁 Project Structure

```
CyberAware-React/
├── BackEnd/                 # Express.js API server
│   ├── config/             # Configuration files
│   ├── controllers/        # Business logic
│   ├── middleware/         # Custom middleware
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── logs/              # Winston logs
│   ├── uploads/           # Image uploads
│   └── server.js          # Entry point
│
├── FrontEnd/               # React.js UI
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React Context
│   │   ├── pages/         # Page components
│   │   ├── services/      # API calls
│   │   └── App.js         # Main app
│   ├── public/            # Static files
│   └── Dockerfile         # Frontend container
│
└── docker-compose.yml      # Full stack orchestration
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 22.x
- **Framework**: Express.js 5.x
- **Database**: MongoDB (Atlas)
- **Cache**: Redis
- **Authentication**: JWT + bcryptjs
- **Validation**: Joi
- **Logging**: Winston
- **Email**: Nodemailer
- **File Upload**: Multer
- **Documentation**: Swagger/OpenAPI
- **Container**: Docker

### Frontend
- **Framework**: React 18.x
- **Styling**: CSS Modules
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Routing**: React Router v6
- **UI Components**: Custom components
- **Deployment**: Vercel

## 📋 Prerequisites

- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher
- **MongoDB Atlas** account
- **Docker & Docker Compose** (optional, for containerization)
- **Gmail Account** (for email notifications)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/AbdulRaafaay/CyberAware-React.git
cd CyberAware-React
```

### 2. Backend Setup

```bash
cd BackEnd

# Install dependencies
npm install

# Create .env file from template
cp .env.example .env

# Fill in required environment variables:
# - MONGODB_URI
# - JWT_SECRET
# - GMAIL_USER & GMAIL_PASS
# - REDIS_URL (optional)
# - FRONTEND_URL

# Start development server
npm start

# Or run with nodemon for hot reload
npm run dev

# Run tests
npm test
```

**Backend runs on**: `http://localhost:5000`

### 3. Frontend Setup

```bash
cd FrontEnd

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure REACT_APP_API_URL=http://localhost:5000

# Start development server
npm start
```

**Frontend runs on**: `http://localhost:3000`

### 4. Using Docker Compose (Optional)

```bash
# From root directory
docker-compose up -d

# This starts:
# - Frontend (port 3000)
# - Backend (port 5000)
# - MongoDB (port 27017)
# - Redis (port 6379)
```

## 🔑 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/cyberaware
JWT_SECRET=your_secret_key_64_chars_min
REFRESH_TOKEN_SECRET=your_refresh_secret_64_chars_min
GMAIL_USER=your_gmail@gmail.com
GMAIL_PASS=your_app_password
REDIS_URL=redis://localhost:6379
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
```

## 📚 API Documentation

Interactive Swagger documentation available at:
```
http://localhost:5000/api-docs
```

### Key Endpoints

**Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset
- `PATCH /api/auth/reset-password/:token` - Reset password

**Incidents**
- `GET /api/incidents` - List all incidents (with pagination, filtering)
- `GET /api/incidents/:id` - Get incident details
- `POST /api/incidents` - Create new incident
- `PATCH /api/incidents/:id` - Update incident
- `DELETE /api/incidents/:id` - Delete incident

**Users**
- `GET /api/users/me` - Get current user profile
- `PATCH /api/users/me` - Update profile
- `GET /api/users/dashboard` - Dashboard statistics

## 🧪 Testing

### Run Tests
```bash
cd BackEnd
npm test
```

### Test Coverage
- Unit tests for authentication
- API tests for CRUD operations with ownership validation
- Integration tests with MongoDB

## 🔐 Security Features

- ✅ JWT-based authentication
- ✅ Bcrypt password hashing
- ✅ CORS configuration
- ✅ Helmet security headers
- ✅ Input validation & sanitization
- ✅ Rate limiting
- ✅ NoSQL injection prevention
- ✅ HTTPS-ready (production)

## 📦 Deployment

### Backend Deployment (Render)
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions

### Frontend Deployment (Vercel)
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions

## 🐳 Docker Support

Full stack containerization with Docker Compose:

```bash
# Build all containers
docker-compose build

# Start all services
docker-compose up

# Stop all services
docker-compose down
```

Services included:
- Frontend (port 3000)
- Backend (port 5000)
- MongoDB (port 27017)
- Redis (port 6379)

## 📊 Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (user/admin),
  avatar: String (URL),
  createdAt: Date,
  updatedAt: Date
}
```

### Incidents Collection
```javascript
{
  title: String,
  description: String,
  severity: String (critical/high/medium/low),
  status: String (reported/investigating/resolved),
  category: String,
  reportedBy: ObjectId (User reference),
  image: String (URL),
  createdAt: Date,
  updatedAt: Date
}
```

## 🚧 Known Issues & Limitations

- Rate limiting middleware disabled (Express 5.x compatibility)
- MongoDB sanitization disabled (Express 5.x compatibility)
- Redis is optional - app works without it

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes and commit: `git commit -m 'Add your feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Create a Pull Request

## 📄 License

ISC License - See LICENSE file for details

## 👤 Author

**Abdulraafay**
- GitHub: [@AbdulRaafaay](https://github.com/AbdulRaafaay)

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub or contact support@cyberaware.com

---

**Last Updated**: December 8, 2025
**Version**: 1.0.0
**Status**: Production-Ready ✅
