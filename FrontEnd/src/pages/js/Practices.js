import React, { useState, useEffect } from 'react';
import practicesData from '../../data/practices.json';
import styles from '../css/Practices.module.css';

const Practices = () => {
  const [practices, setPractices] = useState(practicesData);

  useEffect(() => {
    setPractices(practicesData);
  }, []);

  const getPriorityClass = (priority) => {
    const priorityMap = {
      critical: styles.critical,
      high: styles.high,
      medium: styles.medium
    };
    return priorityMap[priority] || styles.medium;
  };

  return (
    <div className={styles.practices}>
      

      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Cybersecurity Best Practices</h1>
          <p className={styles.pageSubtitle}>
            Essential security measures to protect yourself and your organization online
          </p>
        </div>
      </section>

      {Object.entries(practices).map(([category, items]) => (
        <section key={category} className={styles.practicesSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>
              {category === 'passwordSecurity' && 'Password Security'}
              {category === 'twoFactorAuth' && 'Two-Factor Authentication (2FA)'}
              {category === 'softwareUpdates' && 'Software Updates'}
              {category === 'networkSecurity' && 'Network Security'}
              {category === 'emailSecurity' && 'Email Security'}
            </h2>
            <div className={styles.practicesGrid}>
              {items.map((practice, index) => (
                <div key={index} className={styles.practiceCard}>
                  <div className={styles.practiceIcon}>{practice.icon}</div>
                  <h3>{practice.title}</h3>
                  <p className={styles.practiceDescription}>{practice.description}</p>
                  <div className={styles.practiceTips}>
                    {practice.tips.map((tip, tipIndex) => (
                      <div key={tipIndex} className={styles.tipItem}>{tip}</div>
                    ))}
                  </div>
                  <div className={`${styles.priorityLevel} ${getPriorityClass(practice.priority)}`}>
                    {practice.priority === 'critical' && 'Critical Priority'}
                    {practice.priority === 'high' && 'High Priority'}
                    {practice.priority === 'medium' && 'Medium Priority'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Practices;

