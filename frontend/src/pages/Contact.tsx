import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import './Contact.css';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <h1>Contact Horsepower Electrical</h1>
          <p>Get in touch for a free estimate or emergency service</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info">
              <h2>Get In Touch</h2>
              <p>Ready to power your project? Contact us today for professional electrical services.</p>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-method-icon">
                    <Phone />
                  </div>
                  <div>
                    <h3>Phone</h3>
                    <p>(555) 123-4567</p>
                    <a href="tel:5551234567" className="contact-link">Call Now</a>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-method-icon">
                    <Mail />
                  </div>
                  <div>
                    <h3>Email</h3>
                    <p>info@horsepowerelectrical.com</p>
                    <a href="mailto:info@horsepowerelectrical.com" className="contact-link">Send Email</a>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-method-icon">
                    <MapPin />
                  </div>
                  <div>
                    <h3>Address</h3>
                    <p>123 Electric Ave<br />Power City, PC 12345</p>
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="contact-link">Get Directions</a>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-method-icon">
                    <Clock />
                  </div>
                  <div>
                    <h3>Business Hours</h3>
                    <p>
                      Monday - Friday: 8:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 4:00 PM<br />
                      <strong>Emergency: 24/7</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-container">
              <h2>Request a Quote</h2>
              <p>Fill out the form below and we'll get back to you within 24 hours.</p>
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please describe your electrical needs..."
                    required
                  />
                </div>
                
                {submitStatus === 'success' && (
                  <div className="success-message">
                    <CheckCircle size={20} />
                    <span>Thank you! We'll get back to you soon.</span>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="error-message">
                    <span>Sorry, there was an error. Please try again or call us directly.</span>
                  </div>
                )}
                
                <button 
                  type="submit" 
                  className="btn btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="emergency-section section">
        <div className="container">
          <div className="emergency-content">
            <h2>Electrical Emergency?</h2>
            <p>Don't wait - electrical emergencies can be dangerous. Call us immediately for 24/7 emergency service.</p>
            <div className="emergency-buttons">
              <a href="tel:5551234567" className="btn emergency-btn">
                <Phone size={20} />
                Call Emergency Line
              </a>
              <a href="tel:5551234567" className="btn btn-secondary">
                (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

