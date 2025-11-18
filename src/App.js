import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Attacks from './pages/Attacks';
import Practices from './pages/Practices';
import Incidents from './pages/Incidents';
import Careers from './pages/Careers';
import Resources from './pages/Resources';
import GithubSearch from './pages/GitHubSearch';
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
