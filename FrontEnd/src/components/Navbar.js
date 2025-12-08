import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import UserDropdown from './UserDropdown';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? styles.active : '';
  };

  const openAuthModal = (mode) => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <div className={styles.navLogo}>
            <Link to="/">
              <h2>CyberAware</h2>
            </Link>
          </div>
          
          <input
            type="checkbox"
            id="nav-toggle"
            className={styles.navToggle}
            checked={isMenuOpen}
            onChange={toggleMenu}
          />
          <label htmlFor="nav-toggle" className={styles.hamburger}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </label>

          <ul className={`${styles.navMenu} ${isMenuOpen ? styles.navMenuOpen : ''}`}>
            <li className={styles.navItem}>
              <Link to="/" className={`${styles.navLink} ${isActive('/')}`} onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/attacks" className={`${styles.navLink} ${isActive('/attacks')}`} onClick={() => setIsMenuOpen(false)}>
                Attacks
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/practices" className={`${styles.navLink} ${isActive('/practices')}`} onClick={() => setIsMenuOpen(false)}>
                Best Practices
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/incidents" className={`${styles.navLink} ${isActive('/incidents')}`} onClick={() => setIsMenuOpen(false)}>
                Incidents
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/careers" className={`${styles.navLink} ${isActive('/careers')}`} onClick={() => setIsMenuOpen(false)}>
                Careers
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/resources" className={`${styles.navLink} ${isActive('/resources')}`} onClick={() => setIsMenuOpen(false)}>
                Resources
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/github-search" className={`${styles.navLink} ${isActive('/github-search')}`} onClick={() => setIsMenuOpen(false)}>
                GitHub
              </Link>
            </li>

            {/* Mobile Auth/User Actions */}
            {!user ? (
              <li className={`${styles.navItem} ${styles.mobileOnly}`}>
                <button 
                  className={styles.mobileAuthBtn}
                  onClick={() => openAuthModal('login')}
                >
                  Login
                </button>
              </li>
            ) : (
              <li className={`${styles.navItem} ${styles.mobileOnly}`}>
                <div className={styles.mobileUserMenu}>
                  <Link to="/dashboard" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <Link to="/profile" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                    Profile
                  </Link>
                  <Link to="/incidents/new" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                    Report Incident
                  </Link>
                </div>
              </li>
            )}
          </ul>

          <div className={styles.navActions}>
            {!user ? (
              <button 
                className={styles.loginBtn}
                onClick={() => openAuthModal('login')}
              >
                Login
              </button>
            ) : (
              <div className={styles.desktopOnly}>
                <UserDropdown />
              </div>
            )}
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </>
  );
};

export default Navbar;

