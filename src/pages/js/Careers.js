import React, { useState, useEffect } from 'react';
import careersData from '../../data/careers.json';
import styles from '../css/Careers.module.css';

const Careers = () => {
  const [careers, setCareers] = useState(careersData);

  useEffect(() => {
    setCareers(careersData);
  }, []);

  const getLevelClass = (level) => {
    const levelMap = {
      entry: styles.entry,
      mid: styles.mid,
      senior: styles.senior
    };
    return levelMap[level] || styles.mid;
  };

  return (
    <div className={styles.careers}>
      

      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Careers in Cybersecurity</h1>
          <p className={styles.pageSubtitle}>
            Explore exciting career opportunities in the growing field of cybersecurity
          </p>
        </div>
      </section>

      <section className={styles.careerOverview}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Why Choose Cybersecurity?</h2>
          <div className={styles.overviewStats}>
            {careers.stats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.careerPaths}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Popular Career Paths</h2>
          <div className={styles.careersGrid}>
            {careers.careers.map((career, index) => (
              <div key={index} className={styles.careerCard}>
                <div className={styles.careerIcon}>{career.icon}</div>
                <h3>{career.title}</h3>
                <p className={styles.careerDescription}>{career.description}</p>
                <div className={styles.careerDetails}>
                  <div className={styles.detailItem}>
                    <strong>Salary Range:</strong> {career.salaryRange}
                  </div>
                  <div className={styles.detailItem}>
                    <strong>Experience:</strong> {career.experience}
                  </div>
                  <div className={styles.detailItem}>
                    <strong>Skills:</strong> {career.skills}
                  </div>
                  <div className={styles.detailItem}>
                    <strong>Certifications:</strong> {career.certifications}
                  </div>
                </div>
                <div className={`${styles.careerLevel} ${getLevelClass(career.level)}`}>
                  {career.level === 'entry' && 'Entry Level'}
                  {career.level === 'mid' && 'Mid Level'}
                  {career.level === 'senior' && 'Senior Level'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;

