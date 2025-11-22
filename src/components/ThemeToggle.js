import React, { useState, useEffect } from 'react';
import styles from './ThemeToggle.css';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark');
  const [storageToggle, setStorageToggle] = useState(false);

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Load storage toggle from localStorage
    const savedToggle = localStorage.getItem('storageToggle') === 'true';
    setStorageToggle(savedToggle);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleStorageToggle = () => {
    const newValue = !storageToggle;
    setStorageToggle(newValue);
    localStorage.setItem('storageToggle', newValue);
  };

  return (
    <>
      <button className={styles.themeToggle} onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
      <button 
        className={styles.storageToggle} 
        onClick={handleStorageToggle}
        aria-label="Toggle storage"
        title={storageToggle ? 'ON' : 'OFF'}
      >
        {storageToggle ? 'ON' : 'OFF'}
      </button>
    </>
  );
};

export default ThemeToggle;