import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../../services/backendApi';
import styles from '../css/Auth.module.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await authAPI.forgotPassword({ email });
      setSuccess('Password reset link has been sent to your email. Check your inbox!');
      setEmail('');
      // Redirect after 3 seconds
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authPage}>
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Forgot Password?</h1>
          <p className={styles.pageSubtitle}>We'll help you recover your account</p>
        </div>
      </section>

      <section className={styles.authSection}>
        <div className={styles.authContainer}>
          <div className={styles.authCard}>
            <h2 className={styles.cardTitle}>Reset Your Password</h2>
            
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
                  <label htmlFor="email" className={styles.label}>Email Address</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    required
                    className={styles.input}
                  />
                  <p className={styles.helpText}>We'll send a password reset link to this email</p>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? 'Sending...' : 'Send Reset Link'}
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

export default ForgotPassword;
