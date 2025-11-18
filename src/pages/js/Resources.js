import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import styles from '../css/Resources.module.css';

const Resources = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Store form data in Firebase Firestore
      await addDoc(collection(db, 'contacts'), {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        timestamp: new Date()
      });

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.resources}>
      

      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Resources & Contact</h1>
          <p className={styles.pageSubtitle}>
            Learning materials, tools, and ways to get in touch with our cybersecurity experts
          </p>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Get in Touch</h2>
          <div className={styles.contactContainer}>
            <div className={styles.contactInfo}>
              <h3>Contact Information</h3>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>📧</div>
                <div className={styles.contactDetails}>
                  <h4>Email</h4>
                  <p>info@cyberaware.edu</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>📞</div>
                <div className={styles.contactDetails}>
                  <h4>Phone</h4>
                  <p>051-2494297</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>📍</div>
                <div className={styles.contactDetails}>
                  <h4>Address</h4>
                  <p>123 Cybersecurity Ave<br />Tech City, TC 12345</p>
                </div>
              </div>
            </div>
            <div className={styles.contactForm}>
              <h3>Send us a Message</h3>
              {submitted && (
                <div className={styles.successMessage}>
                  Thank you! Your message has been submitted successfully.
                </div>
              )}
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className={styles.textarea}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={styles.submitBtn}
                >
                  {loading ? 'Submitting...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;

