import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>CyberAware</h3>
            <p>Empowering individuals and organizations with cybersecurity knowledge</p>
          </div>
          <div className={styles.footerSection}>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/attacks">Cyber Attacks</Link></li>
              <li><Link to="/practices">Best Practices</Link></li>
              <li><Link to="/careers">Careers</Link></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h4>Resources</h4>
            <ul>
              <li><Link to="/resources">Learning Materials</Link></li>
              <li><Link to="/resources">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2025 CyberAware. Educational Website for Cybersecurity Awareness.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;