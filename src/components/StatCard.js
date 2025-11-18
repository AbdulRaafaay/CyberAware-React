import React from 'react';
import styles from './StatCard.module.css';

const StatCard = ({ number, label }) => {
  return (
    <div className={styles.statCard}>
      <div className={styles.statNumber}>{number}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
};

export default StatCard;
