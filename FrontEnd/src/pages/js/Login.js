import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import styles from '../css/Incidents.module.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.incidents}>
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Login</h1>
          <p className={styles.pageSubtitle}>Access your CyberAware account</p>
        </div>
      </section>

      <section className={styles.incidentsSection}>
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.createButton} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p style={{ marginTop: '1rem' }}>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Login;
