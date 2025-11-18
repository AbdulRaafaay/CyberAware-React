import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';

const Home = () => {
  const stats = [
    { number: '4.2B', label: 'Records Breached' },
    { number: '300K', label: 'Cyber Attacks Daily' },
    { number: '2.5M', label: 'Job Openings' }
  ];

  const cards = [
    { icon: '⚔️', title: 'Cyber Attacks', description: 'Learn about different types of attacks', link: '/attacks' },
    { icon: '🛡️', title: 'Best Practices', description: 'Protect yourself and your data', link: '/practices' },
    { icon: '📊', title: 'Incidents', description: 'Real-world security breaches', link: '/incidents' },
    { icon: '💼', title: 'Careers', description: 'Join the cybersecurity field', link: '/careers' }
  ];

  return (
    <div>
      <h1>Protect Your Digital World</h1>
      <p>Stay informed about cybersecurity threats and learn how to defend against them</p>
      
      <div>
        <Link to="/attacks">Learn About Threats</Link>
        <Link to="/practices">Security Tips</Link>
      </div>

      <h2>Why Cybersecurity Matters Today</h2>
      <div>
        {stats.map((stat, index) => (
          <div key={index}>
            <div>{stat.number}</div>
            <div>{stat.label}</div>
          </div>
        ))}
      </div>

      <h2>Explore Cybersecurity</h2>
      <div>
        {cards.map((card, index) => (
          <div key={index}>
            <div>{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <Link to={card.link}>Explore →</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;