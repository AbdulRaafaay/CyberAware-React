# CyberAware-React

A comprehensive cybersecurity awareness website rebuilt in React, featuring dynamic data, API integration (GitHub, Firebase, AI), and CSS Modules.

## Project Description

CyberAware-React is an educational platform that provides information about cybersecurity threats, best practices, career opportunities, and real-world incidents. The website is built using React with modern features including:

- **Modular React Components**: 8+ reusable components for maintainable code
- **Dynamic Data Loading**: All content loaded from JSON files and public APIs
- **API Integration**: GitHub API, NewsAPI, and Google Gemini AI
- **Firebase Integration**: Contact form data stored in Firestore
- **Local Storage**: Theme preferences and GitHub favorites persistence
- **Interactive Features**: Search, filter, theme toggle, and AI chat
- **Video Integration**: Local MP4 and embedded YouTube videos

## Features

### Task 1 Features
- ✅ Modular React components (8+ custom components)
- ✅ React Router for navigation
- ✅ useState and useEffect for state management
- ✅ Public API integration (NewsAPI for cybersecurity news)
- ✅ Dynamic content from local JSON files
- ✅ Interactive features (search, filter, theme toggle)
- ✅ Local Storage (theme preference, GitHub favorites)
- ✅ Firebase Firestore form integration
- ✅ Video integration (local MP4 + YouTube)
- ✅ Clean folder structure
- ✅ AI Chat using Google Gemini API

### Task 2 Features
- ✅ GitHub User Search page
- ✅ Uses GitHub Search API (`/search/users`)
- ✅ Displays user name, profile link, and avatar

## APIs Used

### 1. GitHub Search API
- **Endpoint**: `https://api.github.com/search/users`
- **Documentation**: [GitHub Search Users API](https://docs.github.com/en/rest/search?apiVersion=2022-11-28#search-users)
- **Usage**: Search for GitHub users by username
- **Features**: Displays user avatar/profile pictures, username, and link to GitHub profile
- **Implementation**: `src/pages/js/GithubSearch.js` → Real API calls with dynamic avatar display
- **No API Key Required**: Public GitHub API

### 2. NewsAPI
- **Endpoint**: `https://newsapi.org/v2/everything`
- **Documentation**: [NewsAPI Documentation](https://newsapi.org/docs)
- **Usage**: Fetch latest cybersecurity news articles
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

This project is created for educational purposes as part of the Web Programming course assignment.
