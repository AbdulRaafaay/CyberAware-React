import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AIChat from '../../components/AIChat';
import statsData from '../../data/stats.json';
import overviewCardsData from '../../data/overviewCards.json';
import styles from '../css/Home.module.css';

const Home = () => {
  const [stats, setStats] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setStats(statsData);
    setCards(overviewCardsData);
  }, []);

  return (
    <div className={styles.home}>


      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Protect Your Digital World</h1>
            <p className={styles.heroSubtitle}>
              Stay informed about cybersecurity threats and learn how to defend against them
            </p>
            <div className={styles.heroButtons}>
              <Link to="/attacks" className={`${styles.btn} ${styles.btnPrimary}`}>
                Learn About Threats
              </Link>
              <Link to="/practices" className={`${styles.btn} ${styles.btnSecondary}`}>
                Security Tips
              </Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.cyberShield}>
              <div className={styles.shieldIcon}>🛡️</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Cybersecurity Matters Section */}
      <section className={styles.whyCybersecurity}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Why Cybersecurity Matters Today</h2>
          <div className={styles.statsContainer}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview Cards Section */}
      <section className={styles.overview}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Explore Cybersecurity</h2>
          <div className={styles.cardsContainer}>
            {cards.map((card, index) => (
              <div key={index} className={styles.overviewCard}>
                <div className={styles.cardIcon}>{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <Link to={card.link} className={styles.cardLink}>
                  Explore →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Chat Section */}
      <section className={styles.aiChatSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Ask AI About Cybersecurity</h2>
          <AIChat />
        </div>
      </section>

      {/* Video Section */}
      <section className={styles.videoSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Learn More About Cybersecurity</h2>
          
          {/* Local MP4 Video */}
          <div className={styles.videoWrapper}>
            <h3 className={styles.videoTitle}>Introduction to Cybersecurity</h3>
            <video 
              width="100%" 
              controls 
              className={styles.video}
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 360'%3E%3Crect fill='%23222' width='640' height='360'/%3E%3Ctext x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='32' fill='%23fff'%3ECybersecurity Video%3C/text%3E%3C/svg%3E"
            >
              <source src={require('../../assets/cybersecurity-intro.mp4')} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* YouTube Video */}
          <div className={styles.videoWrapper}>
            <h3 className={styles.videoTitle}>Featured: Cybersecurity Best Practices</h3>
            <div className={styles.videoContainer}>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/inWWhr5tnEA"
                title="Cybersecurity Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.video}
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

