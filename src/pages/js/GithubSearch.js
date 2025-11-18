import React, { useState } from 'react';
import '../css/GitHubSearch.css';

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
    <div>
      <h1>GitHub User Search</h1>
      <p>Search for GitHub users by username</p>

      <form onSubmit={searchUsers}>
        <input
          type="text"
          placeholder="Enter username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <p>{error}</p>}

      {users.length > 0 && (
        <div>
          {users.map((user) => (
            <div key={user.id}>
              <h3>{user.login}</h3>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                View Profile
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GithubSearch;