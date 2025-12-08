import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import styles from './UserDropdown.module.css';

const UserDropdown = () => {
  const { user, logout } = React.useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={styles.userDropdown} ref={dropdownRef}>
      <button 
        className={styles.userButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className={styles.avatar}>
          {getInitials(user?.name)}
        </div>
        <span className={styles.userName}>{user?.name || 'User'}</span>
        <svg 
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          width="16" 
          height="16" 
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader}>
            <div className={styles.avatarLarge}>
              {getInitials(user?.name)}
            </div>
            <div className={styles.userInfo}>
              <div className={styles.userNameLarge}>{user?.name}</div>
              <div className={styles.userEmail}>{user?.email}</div>
            </div>
          </div>

          <div className={styles.dropdownDivider}></div>

          <Link 
            to="/dashboard" 
            className={styles.dropdownItem}
            onClick={() => setIsOpen(false)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="3" width="7" height="7" strokeWidth="2" strokeLinecap="round"/>
              <rect x="14" y="3" width="7" height="7" strokeWidth="2" strokeLinecap="round"/>
              <rect x="14" y="14" width="7" height="7" strokeWidth="2" strokeLinecap="round"/>
              <rect x="3" y="14" width="7" height="7" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Dashboard</span>
          </Link>

          <Link 
            to="/profile" 
            className={styles.dropdownItem}
            onClick={() => setIsOpen(false)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="7" r="4" strokeWidth="2"/>
            </svg>
            <span>My Profile</span>
          </Link>

          <Link 
            to="/incidents/new" 
            className={styles.dropdownItem}
            onClick={() => setIsOpen(false)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Report Incident</span>
          </Link>

          <div className={styles.dropdownDivider}></div>

          <button 
            className={`${styles.dropdownItem} ${styles.logoutItem}`}
            onClick={handleLogout}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeWidth="2" strokeLinecap="round"/>
              <polyline points="16 17 21 12 16 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="21" y1="12" x2="9" y2="12" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
