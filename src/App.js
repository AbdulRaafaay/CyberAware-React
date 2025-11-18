import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/js/Home';
import Attacks from './pages/js/Attacks';
import Practices from './pages/js/Practices';
import Incidents from './pages/js/Incidents';
import Careers from './pages/js/Careers';
import Resources from './pages/js/Resources';
import GithubSearch from './pages/js/GitHubSearch';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attacks" element={<Attacks />} />
        <Route path="/practices" element={<Practices />} />
        <Route path="/incidents" element={<Incidents />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/github-search" element={<GithubSearch />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
