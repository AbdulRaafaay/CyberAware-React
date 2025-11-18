import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AttacksPage from './pages/AttacksPage';
import CareersPage from './pages/CareersPage';
import GitHubSearchPage from './pages/GitHubSearchPage';
import IncidentsPage from './pages/IncidentsPage';
import PracticesPage from './pages/PracticesPage';
import ResourcesPage from './pages/ResourcesPage';
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/attacks">Attacks</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/github-search">GitHub Search</Link>
            <Link to="/incidents">Incidents</Link>
            <Link to="/practices">Practices</Link>
            <Link to="/resources">Resources</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/attacks" element={<AttacksPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/github-search" element={<GitHubSearchPage />} />
          <Route path="/incidents" element={<IncidentsPage />} />
          <Route path="/practices" element={<PracticesPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
