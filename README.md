# CyberAware-React

A comprehensive cybersecurity awareness website rebuilt in React, featuring dynamic data, API integration (GitHub, Firebase, AI), and CSS Modules.

This project implements the **Assignment 02** requirements for the Web Programming course (Fall 2025) at National University of Computer and Emerging Sciences, Lahore Campus.

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
- ✅ Favorites functionality with Local Storage

## APIs Used

### 1. GitHub Search API
- **Endpoint**: `https://api.github.com/search/users`
- **Documentation**: [GitHub Search Users API](https://docs.github.com/en/rest/search?apiVersion=2022-11-28#search-users)
- **Usage**: Search for GitHub users by username
- **Implementation**: `src/services/api.js` → `searchGitHubUsers()`

### 2. NewsAPI
- **Endpoint**: `https://newsapi.org/v2/everything`
- **Documentation**: [NewsAPI Documentation](https://newsapi.org/docs)
- **Usage**: Fetch latest cybersecurity news articles
- **Implementation**: `src/services/api.js` → `fetchCybersecurityNews()`
- **Note**: Requires API key (set in `.env.local`)

### 3. Google Gemini API
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`
- **Documentation**: [Google Gemini API](https://ai.google.dev/docs)
- **Usage**: AI chat assistant for cybersecurity questions
- **Implementation**: `src/components/AIChat.js`
- **Note**: Requires API key (set in `.env.local`)

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

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

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
- **Axios** 1.13.2
- **CSS Modules** (for styling)
- **Create React App** (build tool)

## GitHub Repository

**Repository Link**: [Add your GitHub repository URL here]

### GitHub Usage
- Regular commits with clear messages
- Branch-based development
- Pull requests for code review
- Semantic commit conventions

## Screenshots

### Task 1 Screenshots

#### Home Page
![Home Page](screenshots/home.png)
*Landing page with hero section, statistics, overview cards, news, AI chat, and video sections*

#### Attacks Page
![Attacks Page](screenshots/attacks.png)
*Cyber attacks page with search and filter functionality*

#### Practices Page
![Practices Page](screenshots/practices.png)
*Cybersecurity best practices organized by category*

#### Incidents Page
![Incidents Page](screenshots/incidents.png)
*Famous cybersecurity incidents with timelines*

#### Careers Page
![Careers Page](screenshots/careers.png)
*Career opportunities in cybersecurity*

#### Resources Page
![Resources Page](screenshots/resources.png)
*Contact form with Firebase integration*

### Task 2 Screenshots

#### GitHub Search Page
![GitHub Search Page](screenshots/github-search.png)
*GitHub user search with results displaying name, avatar, and profile link*

**Note**: Please add full-screen screenshots of all pages to the `screenshots/` folder and update the paths above.

## Team Contributions

### Member 1: [Your Name]
- **Contributions**:
  - Set up React project structure
  - Implemented routing and navigation
  - Created Home page with API integration
  - Implemented AI Chat component
  - Firebase Firestore integration

### Member 2: Abdul Rafay
- **Contributions**:
  - Created JSON data files
  - Implemented Attacks, Practices, Incidents pages
  - Implemented search and filter functionality
  - Styling with CSS Modules
  - Local Storage implementation
  - GitHub Search page (Task 2)

### Member 3: [Team Member Name] (if applicable)
- **Contributions**:
  - [Add contributions]

**Note**: Update this section with actual team member names and their specific contributions.

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
- GitHub favorites stored in `localStorage`

### Firebase Integration
- Contact form submissions stored in Firestore `contacts` collection
- Includes timestamp for each submission

### Interactive Features
- Search bar on Attacks page
- Filter dropdown on Attacks page
- Theme toggle (dark/light mode)
- AI Chat interface
- GitHub favorites functionality

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
