import React, { useEffect, useState } from 'react';
import './Contact.css';
import { motion, AnimatePresence } from 'framer-motion';

function Contact() {
  const [mail, setMail] = useState({
    name: '',
    email: '',
    subject: '',
    description: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMail = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(import.meta.env.VITE_MAIL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mail),
      });

      if (!response.ok) {
        throw new Error('Server responded with error');
      }

      setSuccess('Successfully sent, will get back to you soon!');
      setError('');
      setMail({ name: '', email: '', subject: '', description: '' });
    } catch (err) {
      setError('Error sending mail, try again later');
      setSuccess('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setMail({ ...mail, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (success || error) {
      const timeout = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 8000);
      return () => clearTimeout(timeout);
    }
  }, [success, error]);

  return (
    <div className="contact-container">
      <div className="contact-item">

        <AnimatePresence>
          {success && (
            <motion.div
              className="success-msg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {success}
            </motion.div>
          )}
          {error && (
            <motion.div
              className="error-msg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="contact-message">Will get back to you soon...</div>

        <form onSubmit={(e) => {
          e.preventDefault();
          if (!isLoading) sendMail();
        }}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Name"
            id="name"
            name="name"
            value={mail.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            value={mail.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            placeholder="Subject"
            name="subject"
            value={mail.subject}
            onChange={handleChange}
            required
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            placeholder="Your message..."
            value={mail.description}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
