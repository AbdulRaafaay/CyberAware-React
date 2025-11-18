import React from 'react';
import '../css/Practices.css';

const Practices = () => {
  const practices = [
    { title: 'Use Strong Passwords', icon: '🔐', priority: 'critical', description: 'Create complex passwords' },
    { title: 'Enable 2FA', icon: '🔑', priority: 'high', description: 'Add extra security layer' },
    { title: 'Update Software', icon: '🔄', priority: 'high', description: 'Keep systems current' }
  ];

  return (
    <div>
      <h1>Cybersecurity Best Practices</h1>
      <p>Essential security measures to protect yourself and your organization online</p>

      <div>
        {practices.map((practice, index) => (
          <div key={index}>
            <div>{practice.icon}</div>
            <h3>{practice.title}</h3>
            <p>{practice.description}</p>
            <span>{practice.priority}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Practices;