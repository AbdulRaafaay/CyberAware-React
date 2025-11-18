import React, { useState, useEffect } from 'react';
import incidentsData from '../../data/incidents.json';
import styles from '../css/Incidents.module.css';

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    setIncidents(incidentsData);
  }, []);

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

      {incidents.map((incident, index) => (
        <section key={index} className={styles.incidentsSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>
              {incident.name} ({incident.year})
            </h2>
            <p className={styles.incidentDescription}>{incident.description}</p>
            <div className={styles.incidentTimeline}>
              {incident.timeline.map((event, eventIndex) => (
                <div key={eventIndex} className={styles.timelineItem}>
                  <div className={styles.timelineDate}>{event.date}</div>
                  <div className={styles.timelineContent}>
                    <h3>{event.event}</h3>
                    <p>{event.details}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.impact}>
              <strong>Impact:</strong> {incident.impact}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Incidents;

