import React, { useState } from 'react';
import styles from '../css/GitHubSearch.module.css';

const GithubSearch = () => {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchUsers = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    setLoading(true);
    setError('');
    setUsers([]);

    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${encodeURIComponent(username)}&per_page=10`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data.items || []);
      
      if (data.items.length === 0) {
        setError('No users found');
      }
    } catch (err) {
      setError('Error fetching users. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.githubSearch}>
      
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>GitHub User Search</h1>
          <p className={styles.pageSubtitle}>
            Search for GitHub users by username
          </p>
        </div>
      </section>

      <section className={styles.searchSection}>
        <div className={styles.container}>
          <form onSubmit={searchUsers} className={styles.searchForm}>
            <input
              type="text"
              placeholder="Enter username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.searchInput}
            />
            <button
              type="submit"
              disabled={loading}
              className={styles.searchButton}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
          {error && <div className={styles.error}>{error}</div>}
        </div>
      </section>

      <section className={styles.resultsSection}>
        <div className={styles.container}>
          {users.length > 0 && (
            <div className={styles.resultsGrid}>
              {users.map((user) => (
                <div key={user.id} className={styles.userCard}>
                  <div className={styles.avatarContainer}>
                    <img
                      src={user.avatar_url}
                      alt={user.login}
                      className={styles.avatar}
                    />
                  </div>
                  <div className={styles.userInfo}>
                    <h3 className={styles.userName}>{user.login}</h3>
                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.profileLink}
                    >
                      View Profile →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default GithubSearch;

