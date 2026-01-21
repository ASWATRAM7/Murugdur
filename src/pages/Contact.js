import React, { useState } from 'react';
import './Contact.css';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for contacting Murgdur. We will respond to your inquiry shortly.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <main className="contact-page">
            <div className="container">
                <div className="page-title">
                    <h1>Contact Us</h1>
                    <p>We're here to assist you with any inquiries</p>
                </div>

                <div className="contact-layout">
                    <div className="contact-form-section">
                        <div className="panel padded">
                            <h2 className="form-title">Send us a message</h2>
                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-group">
                                    <label htmlFor="name">Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject">Subject *</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Message *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="6"
                                        className="input"
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn-lv btn-lv-primary btn-full">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="contact-info-section">
                        <div className="panel padded">
                            <h3 className="info-title">Get in Touch</h3>
                            <div className="contact-info">
                                <div className="info-item">
                                    <h4>Email</h4>
                                    <p>
                                        <a href="mailto:concierge@murgdur.com">concierge@murgdur.com</a>
                                    </p>
                                </div>

                                <div className="info-item">
                                    <h4>Phone</h4>
                                    <p>
                                        <a href="tel:+911234567890">+91 123 456 7890</a>
                                    </p>
                                </div>

                                <div className="info-item">
                                    <h4>Address</h4>
                                    <p>
                                        Murgdur Atelier<br />
                                        123 Luxury Lane<br />
                                        Mumbai, Maharashtra 400001<br />
                                        India
                                    </p>
                                </div>

                                <div className="info-item">
                                    <h4>Hours</h4>
                                    <p>
                                        Monday - Saturday: 10:00 AM - 8:00 PM<br />
                                        Sunday: 11:00 AM - 6:00 PM
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="panel padded" style={{ marginTop: 'var(--spacing-md)' }}>
                            <h4 className="info-title">Concierge Services</h4>
                            <p style={{ fontSize: '13px', lineHeight: '1.7', color: 'var(--lv-gray)' }}>
                                Our dedicated concierge team is available to assist with product inquiries, custom orders, care
                                instructions, and any other questions you may have about Murgdur.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Contact;
