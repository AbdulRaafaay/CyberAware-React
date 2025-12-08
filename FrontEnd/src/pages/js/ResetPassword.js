import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { authAPI } from '../../services/backendApi';
import styles from '../css/Auth.module.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);

    try {
      await authAPI.resetPassword(token, { password });
      setSuccess('Password reset successfully! Redirecting to login...');
      setPassword('');
      setConfirmPassword('');
      // Redirect after 2 seconds
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to reset password. The link may have expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authPage}>
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Reset Password</h1>
          <p className={styles.pageSubtitle}>Create a new password for your account</p>
        </div>
      </section>

      <section className={styles.authSection}>
        <div className={styles.authContainer}>
          <div className={styles.authCard}>
            <h2 className={styles.cardTitle}>Set New Password</h2>
            
            {error && (
              <div className={styles.alert} style={{ borderColor: '#ff3333', backgroundColor: 'rgba(255, 51, 51, 0.1)' }}>
                <span style={{ color: '#ff3333' }}>⚠️ {error}</span>
              </div>
            )}
            
            {success && (
              <div className={styles.alert} style={{ borderColor: '#00ff00', backgroundColor: 'rgba(0, 255, 0, 0.1)' }}>
                <span style={{ color: '#00ff00' }}>✓ {success}</span>
              </div>
            )}

            {!success ? (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="password" className={styles.label}>New Password</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password (min 8 characters)"
                    required
                    minLength={8}
                    className={styles.input}
                  />
                  <p className={styles.helpText}>Must be at least 8 characters long</p>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                    required
                    minLength={8}
                    className={styles.input}
                  />
                </div>

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            ) : null}

            <div className={styles.divider}></div>

            <div className={styles.authLinks}>
              <p><Link to="/" className={styles.link}>Back to Home</Link></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
