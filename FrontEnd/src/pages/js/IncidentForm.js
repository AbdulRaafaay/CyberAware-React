import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { incidentsAPI, uploadAPI } from '../../services/backendApi';
import styles from '../css/IncidentForm.module.css';

const IncidentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    year: new Date().getFullYear(),
    description: '',
    impact: '',
    timeline: [{ date: '', event: '', details: '' }],
    images: [] // Array of image IDs or objects
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      fetchIncident();
    }
  }, [id]);

  const fetchIncident = async () => {
    try {
      setLoading(true);
      const res = await incidentsAPI.getById(id);
      const incident = res.data.data;
      setFormData({
        name: incident.name,
        year: incident.year,
        description: incident.description,
        impact: incident.impact,
        timeline: incident.timeline || [{ date: '', event: '', details: '' }],
        images: incident.images || []
      });
    } catch (err) {
      setError('Failed to fetch incident details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTimelineChange = (index, field, value) => {
    const newTimeline = [...formData.timeline];
    newTimeline[index][field] = value;
    setFormData(prev => ({
      ...prev,
      timeline: newTimeline
    }));
  };

  const addTimelineEvent = () => {
    setFormData(prev => ({
      ...prev,
      timeline: [...prev.timeline, { date: '', event: '', details: '' }]
    }));
  };

  const removeTimelineEvent = (index) => {
    if (formData.timeline.length > 1) {
      const newTimeline = formData.timeline.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        timeline: newTimeline
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let imageIds = [...formData.images];

      // Upload image if selected
      if (file) {
        const imageData = new FormData();
        imageData.append('image', file);
        const uploadRes = await uploadAPI.uploadImage(imageData);
        // Extract only the filename or ID string from the response
        if (uploadRes.data.data) {
          const imageData = uploadRes.data.data;
          // Push only the filename string, not the entire object
          if (imageData.filename) {
            imageIds.push(imageData.filename);
          } else if (imageData._id) {
            imageIds.push(imageData._id);
          }
        }
      }

      const payload = {
        ...formData,
        images: imageIds
      };

      if (isEditMode) {
        await incidentsAPI.update(id, payload);
      } else {
        await incidentsAPI.create(payload);
      }
      navigate('/incidents');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to save incident');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode && !formData.name) {
      return <div className={styles.pageContainer}><div className={styles.container}>Loading...</div></div>;
  }

  return (
    <div className={styles.pageContainer}>
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>
            {isEditMode ? 'Edit Incident' : 'Create New Incident'}
          </h1>
        </div>
      </section>

      <div className={styles.container}>
        {error && <div className={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Incident Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              required
              minLength={3}
              maxLength={200}
              placeholder="Minimum 3 characters"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className={styles.input}
              required
              min={1900}
              max={2100}
              placeholder="YYYY (e.g., 2017)"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={styles.textarea}
              required
              minLength={10}
              maxLength={2000}
              placeholder="Minimum 10 characters required"
            />
            <small className={styles.charCount}>
              {formData.description.length} / 2000 characters
            </small>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Impact</label>
            <input
              type="text"
              name="impact"
              value={formData.impact}
              onChange={handleChange}
              className={styles.input}
              required
              minLength={5}
              maxLength={500}
              placeholder="Minimum 5 characters"
            />
          </div>

          <div className={styles.timelineSection}>
            <label className={styles.label}>Timeline Events</label>
            {formData.timeline.map((event, index) => (
              <div key={index} className={styles.timelineEvent}>
                <div className={styles.timelineHeader}>
                  <span className={styles.eventLabel}>Event {index + 1}</span>
                  {formData.timeline.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTimelineEvent(index)}
                      className={styles.removeBtn}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    placeholder="Date (e.g., 2023-01-15)"
                    value={event.date}
                    onChange={(e) => handleTimelineChange(index, 'date', e.target.value)}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    placeholder="Event title"
                    value={event.event}
                    onChange={(e) => handleTimelineChange(index, 'event', e.target.value)}
                    className={styles.input}
                    required
                    maxLength={100}
                  />
                </div>
                <div className={styles.formGroup}>
                  <textarea
                    placeholder="Event details (required)"
                    value={event.details}
                    onChange={(e) => handleTimelineChange(index, 'details', e.target.value)}
                    className={styles.textarea}
                    rows="3"
                    required
                    maxLength={1000}
                  />
                  <small className={styles.charCount}>
                    {event.details.length} / 1000
                  </small>
                </div>
              </div>
            ))}
            <button type="button" onClick={addTimelineEvent} className={styles.addBtn}>
              + Add Timeline Event
            </button>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Image (Optional)</label>
            <input
              type="file"
              onChange={handleFileChange}
              className={styles.input}
              accept="image/*"
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Saving...' : (isEditMode ? 'Update Incident' : 'Create Incident')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default IncidentForm;
