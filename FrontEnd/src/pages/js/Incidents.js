import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { incidentsAPI } from '../../services/backendApi';
import { AuthContext } from '../../contexts/AuthContext';
import incidentsData from '../../data/incidents.json';
import styles from '../css/Incidents.module.css';

const Incidents = () => {
  const { user } = useContext(AuthContext);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Fetch incidents from API
  const fetchIncidents = async (searchTerm = '', pageNum = 1) => {
    try {
      setLoading(true);
      setError(null);
      const res = await incidentsAPI.getAll({
        page: pageNum,
        limit: 10,
        search: searchTerm || undefined,
      });
      setIncidents(res.data.data);
    } catch (err) {
      console.error('Failed to fetch incidents:', err);
      // Fallback to local data if API fails
      setIncidents(incidentsData);
      setError('Using cached data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents(search, page);
  }, [search, page]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this incident?')) {
      try {
        await incidentsAPI.delete(id);
        fetchIncidents(search, page);
      } catch (err) {
        console.error('Failed to delete incident:', err);
        alert('Failed to delete incident');
      }
    }
  };

  return (
    <div className={styles.incidents}>
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Famous Cybersecurity Incidents</h1>
          <p className={styles.pageSubtitle}>
            Real-world examples of major cybersecurity breaches and their impact
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className={styles.searchSection}>
        <div className={styles.container}>
          <input
            type="text"
            placeholder="Search incidents..."
            value={search}
            onChange={handleSearch}
            className={styles.searchInput}
          />
        </div>
      </section>

      {/* User Create Button */}
      {user && (
        <section className={styles.actionSection}>
          <div className={styles.container}>
            <button 
              className={styles.createButton}
              onClick={() => navigate('/incidents/new')}
            >
              + Create New Incident
            </button>
          </div>
        </section>
      )}

      {/* Loading State */}
      {loading && <p className={styles.loading}>Loading incidents...</p>}

      {/* Error State */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Incidents List */}
      {incidents && incidents.length > 0 ? (
        incidents.map((incident, index) => (
          <section key={incident._id || index} className={styles.incidentsSection}>
            <div className={styles.container}>
              <div className={styles.incidentHeader}>
                <h2 className={styles.sectionTitle}>
                  {incident.name} ({incident.year})
                </h2>
                {user && (
                  <div className={styles.incidentActions}>
                    <button 
                      className={styles.editBtn}
                      onClick={() => navigate(`/incidents/edit/${incident._id}`)}
                    >
                      Edit
                    </button>
                    <button 
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(incident._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <p className={styles.incidentDescription}>{incident.description}</p>

              <div className={styles.incidentTimeline}>
                {incident.timeline && incident.timeline.length > 0 ? (
                  incident.timeline.map((event, eventIndex) => (
                    <div key={eventIndex} className={styles.timelineItem}>
                      <div className={styles.timelineDate}>
                        {event.date || 'Date TBA'}
                      </div>
                      <div className={styles.timelineContent}>
                        <h3>{event.event}</h3>
                        <p>{event.details}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No timeline available</p>
                )}
              </div>

              <div className={styles.impact}>
                <strong>Impact:</strong> {incident.impact}
              </div>
            </div>
          </section>
        ))
      ) : (
        !loading && <p className={styles.noData}>No incidents found</p>
      )}
    </div>
  );
};

export default Incidents;

