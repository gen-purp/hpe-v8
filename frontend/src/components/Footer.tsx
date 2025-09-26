import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Zap } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <Zap className="logo-icon" />
              <span>Horsepower Electrical</span>
            </div>
            <p className="footer-description">
              Professional electrical services for residential and commercial properties. 
              Licensed, insured, and committed to excellence.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <Phone size={16} />
                <span>(555) 123-4567</span>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <span>info@horsepowerelectrical.com</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>123 Electric Ave, Power City, PC 12345</span>
              </div>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Services</h3>
            <ul className="footer-links">
              <li><Link to="/services">Residential Services</Link></li>
              <li><Link to="/services">Commercial Services</Link></li>
              <li><Link to="/services">Emergency Repairs</Link></li>
              <li><Link to="/services">Electrical Inspections</Link></li>
              <li><Link to="/services">Smart Home Installation</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/contact">Get Quote</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Business Hours</h3>
            <div className="business-hours">
              <div className="hours-item">
                <Clock size={16} />
                <div>
                  <strong>Monday - Friday:</strong><br />
                  8:00 AM - 6:00 PM
                </div>
              </div>
              <div className="hours-item">
                <Clock size={16} />
                <div>
                  <strong>Saturday:</strong><br />
                  9:00 AM - 4:00 PM
                </div>
              </div>
              <div className="hours-item">
                <Clock size={16} />
                <div>
                  <strong>Emergency:</strong><br />
                  24/7 Available
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Horsepower Electrical. All rights reserved.</p>
          <p>Licensed & Insured | License #EL123456</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

