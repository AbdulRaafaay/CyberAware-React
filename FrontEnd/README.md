# CyberAware Frontend

Modern React 18 web application for the CyberAware cybersecurity incidents management platform.

## 🚀 Quick Start

### Prerequisites
- Node.js v18.0.0+
- npm v9.0.0+
- Backend API running on `http://localhost:5000` (or configured URL)

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure API endpoint
nano .env
# Set REACT_APP_API_URL=http://localhost:5000

# Start development server
npm start

# Open browser
# http://localhost:3000
```

### Environment Variables

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000

# Optional APIs
REACT_APP_NEWSAPI_KEY=your_newsapi_key
REACT_APP_GITHUB_TOKEN=your_github_token
REACT_APP_GEMINI_KEY=your_gemini_api_key
```

## 📁 Project Structure

```
FrontEnd/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Navbar.js       # Navigation bar
│   │   ├── Footer.js       # Footer component
│   │   ├── AuthModal.js    # Login/Register modal
│   │   ├── UserDropdown.js # User profile dropdown
│   │   ├── ProtectedRoute.js # Route protection
│   │   ├── AIChat.js       # AI chatbot component
│   │   ├── VideoPlayer.js  # Video player
│   │   ├── StatCard.js     # Statistics card
│   │   ├── OverviewCard.js # Dashboard card
│   │   └── ThemeToggle.js  # Dark/Light theme toggle
│   │
│   ├── contexts/            # React Context
│   │   └── AuthContext.js  # Authentication state
│   │
│   ├── pages/              # Page components
│   │   ├── js/
│   │   │   ├── Home.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Incidents.js
│   │   │   ├── IncidentForm.js
│   │   │   ├── Profile.js
│   │   │   ├── Attacks.js
│   │   │   ├── Practices.js
│   │   │   ├── Careers.js
│   │   │   ├── Resources.js
│   │   │   ├── GithubSearch.js
│   │   │   ├── Auth.js
│   │   │   ├── ForgotPassword.js
│   │   │   └── ResetPassword.js
│   │   └── css/            # Page-specific styles
│   │
│   ├── services/            # API calls
│   │   ├── api.js          # Axios instance
│   │   ├── backendApi.js   # Backend API calls
│   │   └── firebase.js     # Firebase config
│   │
│   ├── data/               # Static data (JSON)
│   │   ├── attacks.json
│   │   ├── careers.json
│   │   ├── incidents.json
│   │   ├── practices.json
│   │   ├── stats.json
│   │   └── overviewCards.json
│   │
│   ├── assets/             # Images, icons, videos
│   │
│   ├── App.js              # Main app component
│   ├── App.css             # Global styles
│   ├── index.js            # React entry point
│   ├── index.css           # Global CSS
│   └── setupTests.js       # Test configuration
│
├── public/                  # Static files
│   ├── index.html
│   └── favicon.ico
│
├── .env.example
├── .gitignore
├── Dockerfile              # Docker configuration
├── nginx.conf              # Nginx configuration (production)
├── vercel.json             # Vercel deployment config
├── package.json
└── README.md               # This file
```

## 🎨 Components

### Core Components

#### `Navbar.js`
- Navigation menu with links
- AuthModal for login/register
- User dropdown when authenticated
- Theme toggle button
- Responsive mobile menu

#### `AuthModal.js`
- Login form
- Register form
- Form validation
- Error handling
- Token storage (localStorage)

#### `UserDropdown.js`
- User profile display
- Avatar with initials fallback
- Profile link
- Logout button
- Compact responsive design

#### `ProtectedRoute.js`
- Route protection with JWT token
- Redirects unauthenticated users to login
- Role-based access control

#### `Dashboard.js`
- Incident statistics
- Charts and analytics
- User's incidents overview
- Severity breakdown
- Status breakdown

#### `IncidentForm.js`
- Create/edit incident form
- Image upload capability
- Form validation
- Error handling
- Success notifications

#### `AIChat.js`
- Gemini API integration
- Cybersecurity Q&A
- Collapsible chat interface
- Message history
- Real-time responses

#### `VideoPlayer.js`
- MP4 video playback
- YouTube video embed
- Responsive player
- Fullscreen support

### Utility Components
- `StatCard.js` - Display statistics
- `OverviewCard.js` - Dashboard card
- `ThemeToggle.js` - Dark/Light mode
- `Footer.js` - Footer information

## 📄 Pages

### Home Page (`Home.js`)
- Welcome section
- Feature overview
- Statistics
- Call-to-action buttons
- Educational content

### Dashboard (`Dashboard.js`)
- Protected route (requires login)
- User incident statistics
- Charts and analytics
- Quick action buttons
- Recent incidents

### Incidents (`Incidents.js`)
- List all incidents
- Search and filter
- Pagination
- Severity indicators
- Status badges
- Click to view details

### Create/Edit Incident (`IncidentForm.js`)
- Form for reporting incidents
- Image upload
- Severity selection
- Status tracking
- Submit/Update buttons

### User Profile (`Profile.js`)
- Protected route
- User information display
- Edit profile form
- Avatar management
- Password change link

### Attacks (`Attacks.js`)
- Types of cyber attacks
- Detailed descriptions
- Prevention tips
- Real-world examples

### Practices (`Practices.js`)
- Security best practices
- Implementation guides
- Tips and tricks
- Checklists

### Careers (`Careers.js`)
- Cybersecurity career paths
- Job roles
- Required skills
- Salary information
- Learning resources

### Resources (`Resources.js`)
- Educational materials
- Books and courses
- Tools and utilities
- Certifications

### GitHub Search (`GithubSearch.js`)
- Search GitHub users
- Display user profiles
- Repository information
- Follow user links

### Authentication (`Auth.js`, `ForgotPassword.js`, `ResetPassword.js`)
- Login page
- Register page
- Forgot password flow
- Reset password with token

## 🔐 Authentication

### AuthContext.js
Provides authentication state management:
- `user` - Current logged-in user
- `token` - JWT access token
- `refreshToken` - JWT refresh token
- `isAuthenticated` - Boolean auth status
- `login()` - User login
- `register()` - User registration
- `logout()` - User logout
- `updateProfile()` - Update user info

### Token Storage
- Access token stored in localStorage
- Refresh token stored in localStorage
- Auto-logout on token expiration

## 🌐 API Integration

### Backend API (`backendApi.js`)

```javascript
// Authentication
POST /api/auth/register
POST /api/auth/login
POST /api/auth/forgot-password
PATCH /api/auth/reset-password/:token

// Incidents
GET /api/incidents (with filtering, pagination)
GET /api/incidents/:id
POST /api/incidents
PATCH /api/incidents/:id
DELETE /api/incidents/:id

// Users
GET /api/users/me
PATCH /api/users/me
GET /api/users/dashboard

// Upload
POST /api/upload
```

### External APIs

#### GitHub API
- Search users by username
- No API key required (limited rate limit)
- Used in `GithubSearch.js`

#### NewsAPI
- Fetch cybersecurity news
- Requires API key
- Optional integration

#### Google Gemini API
- AI chatbot responses
- Cybersecurity Q&A
- Requires API key
- Used in `AIChat.js`

## 🎨 Styling

### CSS Modules
Each component has its own CSS Module for scoped styling:
```
Component.js
Component.module.css
```

### Global Styles
- `index.css` - Global styles
- `App.css` - App component styles

### Theme
- Light mode (default)
- Dark mode (toggle)
- CSS variables for theming
- Theme preference saved in localStorage

## 📦 Dependencies

### Core
- `react` - UI framework
- `react-dom` - React renderer
- `react-router-dom` - Routing

### API & Data
- `axios` - HTTP client
- `firebase` - Backend services (optional)

### Utilities
- `dotenv` - Environment variables

### Development
- `create-react-app` - Build tool
- `jest` - Testing
- `@testing-library/react` - React testing

## 🚀 Available Scripts

### `npm start`
Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run eject`
⚠️ Note: this is a one-way operation. Once you eject, you can't go back!

## 🐳 Docker

### Build Docker Image
```bash
docker build -t cyberaware-frontend .
```

### Run with Docker
```bash
docker run -p 3000:3000 --env-file .env cyberaware-frontend
```

### With Docker Compose (from root)
```bash
docker-compose up frontend
```

## 🚀 Deployment

### Deploy to Vercel
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main

**Vercel Configuration** (`vercel.json`):
- SPA routing configuration
- Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- Caching rules

### Manual Deployment
```bash
# Build for production
npm run build

# Deploy to your hosting
# Copy the 'build' folder contents to your server
```

## 🔍 Form Validation

### Registration
- Name: 2-50 characters
- Email: Valid email format
- Password: 8+ characters, must include uppercase, lowercase, numbers

### Login
- Email: Valid format
- Password: Non-empty

### Incident Report
- Title: 5-100 characters
- Description: 10+ characters
- Severity: Required selection
- Category: Required selection

## 🎯 Features Implemented

### User Authentication
- ✅ JWT-based authentication
- ✅ Register new users
- ✅ Login with email/password
- ✅ Logout functionality
- ✅ Password reset via email
- ✅ Token refresh
- ✅ Protected routes

### Incident Management
- ✅ View all incidents
- ✅ Create new incident
- ✅ Edit own incidents
- ✅ Delete own incidents
- ✅ Search incidents
- ✅ Filter by severity/status
- ✅ Pagination

### User Features
- ✅ Profile management
- ✅ Avatar display
- ✅ Dashboard with statistics
- ✅ User dropdown menu
- ✅ Theme toggle (dark/light)

### Additional Features
- ✅ GitHub user search
- ✅ AI chatbot (Gemini API)
- ✅ Security news feed
- ✅ Educational content
- ✅ Career information
- ✅ Responsive design

## 💡 Best Practices Implemented

- ✅ Component composition
- ✅ Separation of concerns
- ✅ Reusable components
- ✅ Context API for state management
- ✅ Protected routes
- ✅ Error handling
- ✅ Loading states
- ✅ Form validation
- ✅ Responsive design
- ✅ CSS Modules for styling
- ✅ Environment variables
- ✅ API abstraction layer

## 🚧 Known Issues

- Modal auth positioning on mobile
- Theme toggle persistence
- API timeout handling

## 📄 License

ISC License

## 👤 Author

**Abdulraafay**

---

**Version**: 1.0.0  
**Last Updated**: December 8, 2025  
**Status**: Production-Ready ✅
- **Features**: Displays article images, titles, descriptions, sources, and read more links
- **Implementation**: `src/pages/js/Home.js` → Real News API integration
- **API Key**: Required (set in `.env.local`)

### 3. Google Gemini API
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`
- **Documentation**: [Google Gemini API](https://ai.google.dev/docs)
- **Usage**: AI chat assistant for cybersecurity questions
- **Features**: Real AI-generated responses (NOT hardcoded), dynamic answers based on questions
- **Implementation**: `src/components/AIChat.js` → Real Gemini API with proper error handling
- **API Key**: Required (set in `.env.local`)

### 4. Firebase Firestore
- **Service**: Google Firebase
- **Usage**: Store contact form submissions
- **Implementation**: `src/services/firebase.js` and `src/pages/js/Resources.js`
- **Collection**: `resources`

## Setup and Run Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase project (for form submission)
- API keys (optional for NewsAPI and Gemini)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd cyberaware-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   Create a `.env.local` file in the root directory:
   ```env
   # Firebase Configuration
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id

   # NewsAPI Configuration (Optional)
   REACT_APP_NEWSAPI_KEY=your_newsapi_key

   # Google Gemini API Configuration (Optional)
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
cyberaware-react/
├── public/
│   └── index.html
├── src/
│   ├── assets/              # Images, videos, and other assets
│   │   └── cybersecurity-intro.mp4
│   ├── components/          # Reusable React components
│   │   ├── AIChat.js
│   │   ├── Footer.js
│   │   ├── Navbar.js
│   │   ├── OverviewCard.js
│   │   ├── StatCard.js
│   │   ├── ThemeToggle.js
│   │   ├── UserCard.js
│   │   └── VideoPlayer.js
│   ├── data/                # JSON data files
│   │   ├── attacks.json
│   │   ├── careers.json
│   │   ├── incidents.json
│   │   ├── overviewCards.json
│   │   ├── practices.json
│   │   └── stats.json
│   ├── pages/               # Page components
│   │   ├── js/
│   │   │   ├── Attacks.js
│   │   │   ├── Careers.js
│   │   │   ├── GithubSearch.js
│   │   │   ├── Home.js
│   │   │   ├── Incidents.js
│   │   │   ├── Practices.js
│   │   │   └── Resources.js
│   │   └── css/             # CSS Modules for pages
│   ├── services/            # API and service integrations
│   │   ├── api.js           # External API calls
│   │   └── firebase.js      # Firebase configuration
│   ├── App.js               # Main app component with routing
│   ├── index.js             # Entry point
│   └── index.css            # Global styles
├── package.json
└── README.md
```

## Components Overview

1. **Navbar** - Navigation bar with theme toggle
2. **Footer** - Site footer with links
3. **AIChat** - AI-powered chat assistant
4. **ThemeToggle** - Dark/light theme switcher
5. **OverviewCard** - Card component for homepage sections
6. **StatCard** - Statistics display card
7. **UserCard** - GitHub user profile card
8. **VideoPlayer** - Video player component

## Pages Overview

1. **Home** - Landing page with hero, stats, news, AI chat, and videos
2. **Attacks** - Types of cyber attacks with search and filter
3. **Practices** - Cybersecurity best practices
4. **Incidents** - Famous cybersecurity incidents
5. **Careers** - Career opportunities in cybersecurity
6. **Resources** - Contact form and resources
7. **GitHub Search** - GitHub user search (Task 2)

## Technologies Used

- **React** 19.2.0
- **React Router DOM** 7.9.6
- **Firebase** 12.6.0
- **CSS Modules** (for styling)
- **Create React App** (build tool)

## GitHub Repository

**Repository Link**: https://github.com/AbdulRaafaay/CyberAware-React

### GitHub Usage
- Regular commits with clear messages
- Branch-based development
- Pull requests for code review
- Semantic commit conventions

## Team Contributions

This project is developed collaboratively by three team members, each owning specific technical areas:

### Jaisha - Core App Architecture & Routing

**Primary Responsibilities**:
- React project initialization and setup
- React Router DOM configuration and implementation
- Main `App.js` with routing logic for all 7 pages

**Technical Implementation**:
- Set up routing structure for all 7 pages
- Application structure and component hierarchy
- Integration of all team member contributions

---

### Rafay - Dynamic Data, Components & Styling

**Primary Responsibilities**:
- Design and build all reusable React components (8+)
- Create and manage all JSON data files
- Implement CSS Modules for complete styling

**Technical Implementation**:
- **Components Created**:
  - Navbar.js, Footer.js, ThemeToggle.js, VideoPlayer.js
  - OverviewCard.js, StatCard.js, AttackCard.js, UserCard.js

- **CSS Modules** for all components:
  - Scoped styling (no global conflicts)
  - Responsive design patterns
  - Theme-aware styling
  - Animations and effects

- **JSON Data Files**:
  - `attacks.json`, `practices.json`, `incidents.json`, `careers.json`, `stats.json`

- **Page Implementations**:
  - `Attacks.js`, `Practices.js`, `Incidents.js`, `Careers.js`, `Resources.js`

---

### Kamil - API Integration (All)

**Primary Responsibilities**:
- Implement all external API integrations
- Build GitHub Search functionality (Task 2)
- Implement Google Gemini AI Chat
- Implement NewsAPI integration
- Handle Firebase integration
- Error handling and loading states for all APIs

**Technical Implementation**:
- **NewsAPI Integration** (`src/pages/js/Home.js`):
  - Fetch latest cybersecurity news articles
  - Display article cards with images, titles, descriptions
  - Loading and error state handling

- **GitHub Search API** (`src/pages/js/GithubSearch.js` - Task 2):
  - Search functionality for GitHub users
  - GET request to: `https://api.github.com/search/users`
  - Avatar/profile pictures with circular styling
  - Links to GitHub accounts
  - Loading and error handling

- **Google Gemini AI Chat** (`src/components/AIChat.js`):
  - POST request to Gemini API for real AI responses
  - Dynamic chat messages based on user input
  - Chat message history management
  - Loading state during API calls
  - Fixed model deprecation (gemini-pro → gemini-2.0-flash)

- **Firebase Integration** (`src/services/firebase.js`):
  - Firebase Firestore configuration
  - Contact form data storage

- **API Service Layer** (`src/services/api.js`):
  - `fetchCybersecurityNews()` - NewsAPI
  - `searchGithubUsers(username)` - GitHub Search
  - `callGeminiAPI(prompt)` - AI responses
  - Centralized error handling

**APIs Integrated**:
1. **NewsAPI** - `https://newsapi.org/v2/everything`
2. **GitHub Search API** - `https://api.github.com/search/users`
3. **Google Gemini API** - `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`
4. **Firebase Firestore** - Cloud data storage

---

## How It All Works Together

1. **Jaisha's Routing** - Provides the foundation connecting all pages
2. **Rafay's Components & Data** - Supplies reusable UI elements and dynamic content from JSON
3. **Kamil's APIs** - Brings in real-time data from NewsAPI, GitHub Search, and Gemini AI

**Example User Flow**:
- User navigates via Jaisha's Router
- Views Rafay's components with JSON data
- Sees Kamil's NewsAPI integration on home page
- Uses Kamil's GitHub Search to find developers
- Interacts with Kamil's AI Chat for questions

## Features Implementation Details

### State Management
- Uses `useState` for component-level state
- Uses `useEffect` for lifecycle and data fetching
- Props for component communication

### Data Loading
- All static content loaded from JSON files in `/data`
- API calls for dynamic content (news, GitHub users)
- Loading and error states implemented

### Local Storage
- Theme preference stored in `localStorage`

### Firebase Integration
- Contact form submissions stored in Firestore `contacts` collection
- Includes timestamp for each submission

### Interactive Features
- Search bar on Attacks page
- Filter dropdown on Attacks page
- Theme toggle (dark/light mode)
- AI Chat interface

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Tools

- Chrome DevTools (Network, Sources tabs)
- React DevTools
- Firebase Console

## Future Enhancements

- User authentication
- Advanced filtering options
- More API integrations
- Progressive Web App (PWA) features
- Deployment to Netlify/Vercel

## License

This project is created for educational purposes.
