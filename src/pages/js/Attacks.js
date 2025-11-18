import React, { useState } from 'react';
import '../css/Attacks.css';

const Attacks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const attacks = [
    { name: 'Phishing', description: 'Deceptive emails to steal credentials', threatLevel: 'high', icon: '🎣' },
    { name: 'Malware', description: 'Malicious software to damage systems', threatLevel: 'critical', icon: '🦠' },
    { name: 'DDoS', description: 'Denial of Service attacks', threatLevel: 'medium', icon: '🌊' },
    { name: 'SQL Injection', description: 'Exploiting database vulnerabilities', threatLevel: 'high', icon: '💉' }
  ];

  return (
    <div>
      <h1>Types of Cyber Attacks</h1>
      <p>Understanding the various threats that target individuals and organizations</p>
      
      <input
        type="text"
        placeholder="Search attacks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <h2>Cyber Attacks</h2>
      <div>
        {attacks.map((attack, index) => (
          <div key={index}>
            <div>{attack.icon}</div>
            <h3>{attack.name}</h3>
            <p>{attack.description}</p>
            <span>{attack.threatLevel}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attacks;