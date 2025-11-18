import React from 'react';
import styles from './UserCard.module.css';

const UserCard = ({ user, onToggleFavorite, isFavorited }) => {
  return (
    <div className={styles.userCard}>
      <img src={user.avatar_url} alt={user.login} className={styles.avatar} />
      <div className={styles.userInfo}>
        <h3 className={styles.name}>{user.name || user.login}</h3>
        <p className={styles.username}>@{user.login}</p>
        <a href={user.html_url} target="_blank" rel="noopener noreferrer" className={styles.profileLink}>View Profile →</a>
      </div>
      <button
        className={`${styles.favoriteBtn} ${isFavorited ? styles.favorited : ''}`}
        onClick={() => onToggleFavorite(user)}
        aria-label="Toggle favorite"
      >
        {isFavorited ? '★' : '☆'}
      </button>
    </div>
  );
};

export default UserCard;
