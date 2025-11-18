import React from 'react';
import '../css/Incidents.css';

const Incidents = () => {
  const incidents = [
    { name: 'Equifax Breach', year: 2017, description: 'Massive data breach affecting millions' },
    { name: 'Target Breach', year: 2013, description: 'Retail giant compromised' },
    { name: 'Facebook Leak', year: 2019, description: 'User data exposed' }
  ];

  return (
    <div>
      <h1>Famous Cybersecurity Incidents</h1>
      <p>Real-world examples of major cybersecurity breaches and their impact</p>

      {incidents.map((incident, index) => (
        <div key={index}>
          <h2>{incident.name} ({incident.year})</h2>
          <p>{incident.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Incidents;