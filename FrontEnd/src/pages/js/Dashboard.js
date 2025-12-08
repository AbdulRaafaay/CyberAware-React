import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { usersAPI } from '../../services/backendApi';
import styles from '../css/Dashboard.module.css';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await usersAPI.getDashboard();
        setStats(res.data.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <div className={styles.dashboard}><div className={styles.container}>Loading...</div></div>;

  return (
    <div className={styles.dashboard}>
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageSubtitle}>Welcome back, {user?.name}</p>
        </div>
      </section>

      <section className={styles.dashboardSection}>
        <div className={styles.container}>
          {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
          
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>{stats?.totalIncidents || 0}</div>
              <div className={styles.statLabel}>Total Incidents</div>
            </div>
            {/* Add more stats as they become available from API */}
          </div>

          <div className={styles.actionSection}>
             <button onClick={logout} className={styles.logoutBtn}>Logout</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
