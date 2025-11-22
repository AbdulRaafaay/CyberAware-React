import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? styles.active : '';
  };

  return (
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
        <ThemeToggle />
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
              GitHub Search
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

