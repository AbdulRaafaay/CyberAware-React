import React, { useState } from 'react';
import attacksData from '../../data/attacks.json';
import styles from '../css/Attacks.module.css';

const Attacks = () => {
  const [attacks] = useState(attacksData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['all', 'socialEngineering', 'malware', 'network', 'webApplication'];

  const filteredAttacks = () => {
    let result = [];
    
    if (filterCategory === 'all') {
      result = [
        ...attacks.socialEngineering,
        ...attacks.malware,
        ...attacks.network,
        ...attacks.webApplication
      ];
    } else {
      result = attacks[filterCategory] || [];
    }

    if (searchTerm) {
      result = result.filter(attack =>
        attack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attack.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return result;
  };

  const getThreatLevelClass = (level) => {
    const levelMap = {
      critical: styles.critical,
      high: styles.high,
      medium: styles.medium,
      low: styles.low
    };
    return levelMap[level] || styles.medium;
  };

  const getThreatLevelLabel = (level) => {
    const labelMap = {
      critical: 'Critical Risk',
      high: 'High Risk',
      medium: 'Medium Risk',
      low: 'Low Risk'
    };
    return labelMap[level] || 'Medium Risk';
  };

  return (
    <div className={styles.attacks}>
      

      {/* Page Header */}
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Types of Cyber Attacks</h1>
          <p className={styles.pageSubtitle}>
            Understanding the various threats that target individuals and organizations
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className={styles.searchSection}>
        <div className={styles.container}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search attacks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Categories</option>
              <option value="socialEngineering">Social Engineering</option>
              <option value="malware">Malware</option>
              <option value="network">Network Attacks</option>
              <option value="webApplication">Web Application</option>
            </select>
          </div>
        </div>
      </section>

      {/* Attacks Sections */}
      {filterCategory === 'all' ? (
        <>
          <section className={styles.attacksSection}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>Social Engineering Attacks</h2>
              <div className={styles.attacksGrid}>
                {attacks.socialEngineering.map((attack, index) => (
                  <div key={index} className={styles.attackCard}>
                    <div className={styles.attackIcon}>{attack.icon}</div>
                    <h3>{attack.name}</h3>
                    <p className={styles.attackDescription}>{attack.description}</p>
                    <div className={styles.attackDetails}>
                      <div className={styles.detailItem}>
                        <strong>Common Targets:</strong> {attack.commonTargets}
                      </div>
                      <div className={styles.detailItem}>
                        <strong>Goal:</strong> {attack.goal}
                      </div>
                      <div className={styles.detailItem}>
                        <strong>Prevention:</strong> {attack.prevention}
                      </div>
                    </div>
                    <div className={`${styles.threatLevel} ${getThreatLevelClass(attack.threatLevel)}`}>
                      {getThreatLevelLabel(attack.threatLevel)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.attacksSection}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>Malware Attacks</h2>
              <div className={styles.attacksGrid}>
                {attacks.malware.map((attack, index) => (
                  <div key={index} className={styles.attackCard}>
                    <div className={styles.attackIcon}>{attack.icon}</div>
                    <h3>{attack.name}</h3>
                    <p className={styles.attackDescription}>{attack.description}</p>
                    <div className={styles.attackDetails}>
                      <div className={styles.detailItem}>
                        <strong>Common Targets:</strong> {attack.commonTargets}
                      </div>
                      <div className={styles.detailItem}>
                        <strong>Goal:</strong> {attack.goal}
                      </div>
                      <div className={styles.detailItem}>
                        <strong>Prevention:</strong> {attack.prevention}
                      </div>
                    </div>
                    <div className={`${styles.threatLevel} ${getThreatLevelClass(attack.threatLevel)}`}>
                      {getThreatLevelLabel(attack.threatLevel)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.attacksSection}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>Network Attacks</h2>
              <div className={styles.attacksGrid}>
                {attacks.network.map((attack, index) => (
                  <div key={index} className={styles.attackCard}>
                    <div className={styles.attackIcon}>{attack.icon}</div>
                    <h3>{attack.name}</h3>
                    <p className={styles.attackDescription}>{attack.description}</p>
                    <div className={styles.attackDetails}>
                      <div className={styles.detailItem}>
                        <strong>Common Targets:</strong> {attack.commonTargets}
                      </div>
                      <div className={styles.detailItem}>
                        <strong>Goal:</strong> {attack.goal}
                      </div>
                      <div className={styles.detailItem}>
                        <strong>Prevention:</strong> {attack.prevention}
                      </div>
                    </div>
                    <div className={`${styles.threatLevel} ${getThreatLevelClass(attack.threatLevel)}`}>
                      {getThreatLevelLabel(attack.threatLevel)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.attacksSection}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>Web Application Attacks</h2>
              <div className={styles.attacksGrid}>
                {attacks.webApplication.map((attack, index) => (
                  <div key={index} className={styles.attackCard}>
                    <div className={styles.attackIcon}>{attack.icon}</div>
                    <h3>{attack.name}</h3>
                    <p className={styles.attackDescription}>{attack.description}</p>
                    <div className={styles.attackDetails}>
                      <div className={styles.detailItem}>
                        <strong>Common Targets:</strong> {attack.commonTargets}
                      </div>
                      <div className={styles.detailItem}>
                        <strong>Goal:</strong> {attack.goal}
                      </div>
                      <div className={styles.detailItem}>
                        <strong>Prevention:</strong> {attack.prevention}
                      </div>
                    </div>
                    <div className={`${styles.threatLevel} ${getThreatLevelClass(attack.threatLevel)}`}>
                      {getThreatLevelLabel(attack.threatLevel)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className={styles.attacksSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>
              {filterCategory === 'socialEngineering' && 'Social Engineering Attacks'}
              {filterCategory === 'malware' && 'Malware Attacks'}
              {filterCategory === 'network' && 'Network Attacks'}
              {filterCategory === 'webApplication' && 'Web Application Attacks'}
            </h2>
            <div className={styles.attacksGrid}>
              {filteredAttacks().map((attack, index) => (
                <div key={index} className={styles.attackCard}>
                  <div className={styles.attackIcon}>{attack.icon}</div>
                  <h3>{attack.name}</h3>
                  <p className={styles.attackDescription}>{attack.description}</p>
                  <div className={styles.attackDetails}>
                    <div className={styles.detailItem}>
                      <strong>Common Targets:</strong> {attack.commonTargets}
                    </div>
                    <div className={styles.detailItem}>
                      <strong>Goal:</strong> {attack.goal}
                    </div>
                    <div className={styles.detailItem}>
                      <strong>Prevention:</strong> {attack.prevention}
                    </div>
                  </div>
                  <div className={`${styles.threatLevel} ${getThreatLevelClass(attack.threatLevel)}`}>
                    {getThreatLevelLabel(attack.threatLevel)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Attacks;

