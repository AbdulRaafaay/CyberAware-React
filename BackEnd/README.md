# CyberAware Backend API

Backend server for the CyberAware MERN stack application.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   - Copy `.env.example` to `.env`
   - Update the values in `.env` with your configuration:
     - MongoDB connection string
     - JWT secrets
     - Email service credentials
     - Frontend URL

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   (Requires nodemon to be installed globally or as dev dependency)

4. **Start Production Server**
   ```bash
   npm start
   ```

## Project Structure

```
BackEnd/
├── config/          # Configuration files (database, email)
├── controllers/     # Route controllers
├── middleware/      # Custom middleware (auth, error handling, validation)
├── models/          # Mongoose models
├── routes/          # Express routes
├── utils/           # Utility functions
├── tests/           # Test files
├── .env             # Environment variables (not in git)
├── .env.example     # Example environment variables
└── server.js        # Main server file
```

## API Endpoints

Endpoints will be documented as they are implemented in subsequent phases.

## Development Phases

- ✅ Phase 1: Project Setup & Foundation (Current)
- ⏳ Phase 2: Database Models & Schemas
- ⏳ Phase 3: Authentication & Authorization
- ⏳ Phase 4: CRUD Operations for Incidents
- ⏳ Phase 5: Image Upload & File Management
- ⏳ Phase 6: User Profile & Dashboard
- ⏳ Phase 7: Email Notifications
- ⏳ Phase 8: Error Handling & Security
- ⏳ Phase 9: Testing
- ⏳ Phase 10: Integration & Frontend Connection
- ⏳ Phase 11: Optional Enhancements
- ⏳ Phase 12: Deployment Preparation

