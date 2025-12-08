import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/js/Home';
import Attacks from './pages/js/Attacks';
import Careers from './pages/js/Careers';
import GithubSearch from './pages/js/GithubSearch';
import Incidents from './pages/js/Incidents';
import IncidentForm from './pages/js/IncidentForm';
import Dashboard from './pages/js/Dashboard';
import Profile from './pages/js/Profile';
import Practices from './pages/js/Practices';
import Resources from './pages/js/Resources';
import Login from './pages/js/Login';
import Register from './pages/js/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/attacks" element={<Attacks />} />
          <Route path="/practices" element={<Practices />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/incidents/new" element={<ProtectedRoute><IncidentForm /></ProtectedRoute>} />
          <Route path="/incidents/edit/:id" element={<ProtectedRoute><IncidentForm /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/github-search" element={<GithubSearch />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
