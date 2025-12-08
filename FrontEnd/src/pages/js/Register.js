import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import styles from '../css/Incidents.module.css';

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.incidents}>
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Register</h1>
          <p className={styles.pageSubtitle}>Create your CyberAware account</p>
        </div>
      </section>

      <section className={styles.incidentsSection}>
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
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
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          <p style={{ marginTop: '1rem' }}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Register;
