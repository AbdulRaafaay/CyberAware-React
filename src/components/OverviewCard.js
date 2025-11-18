import React from 'react';
import styles from './OverviewCard.module.css';

const OverviewCard = ({ icon, title, description, link }) => {
  return (
    <div className={styles.overviewCard}>
      <div className={styles.cardIcon}>{icon}</div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
      {link && (
        <a href={link} className={styles.cardLink}>
          Explore →
        </a>
      )}
    </div>
  );
};

export default OverviewCard;
