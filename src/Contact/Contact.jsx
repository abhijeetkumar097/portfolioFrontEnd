import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-item">
        <div className="contact-message">Will get back to you soon...</div>
        <form>
          <label htmlFor="name">Name</label>
          <input type="text" placeholder="Name" id="name" />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Email" />

          <label htmlFor="subject">Subject</label>
          <input type="text" id="subject" placeholder="Subject" />

          <label htmlFor="description">Description</label>
          <textarea id="description" rows="4" placeholder="Your message..."></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
