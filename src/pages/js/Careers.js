import React from 'react';
import '../css/Careers.css';

const Careers = () => {
  const careers = [
    { title: 'Security Analyst', icon: '🔍', description: 'Analyze security threats', level: 'entry' },
    { title: 'Network Security Engineer', icon: '🛡️', description: 'Design secure networks', level: 'mid' },
    { title: 'Chief Security Officer', icon: '👑', description: 'Lead security strategy', level: 'senior' }
  ];

  return (
    <div>
      <h1>Careers in Cybersecurity</h1>
      <p>Explore exciting career opportunities in the growing field of cybersecurity</p>

      <h2>Popular Career Paths</h2>
      <div>
        {careers.map((career, index) => (
          <div key={index}>
            <div>{career.icon}</div>
            <h3>{career.title}</h3>
            <p>{career.description}</p>
            <span>{career.level}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Careers;