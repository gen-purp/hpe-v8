import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Shield, Clock, Award, CheckCircle, Star, Settings } from 'lucide-react';
import AdminLoginModal from '../components/AdminLoginModal';
import './Home.css';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const Home: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  useEffect(() => {
    // Fetch services from API
    fetch('/api/services')
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error('Error fetching services:', error));
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Power Your Future with Horsepower Electrical</h1>
            <p>
              Professional electrical services for residential and commercial properties. 
              Licensed, insured, and committed to excellence in every project.
            </p>
            <div className="hero-buttons">
              <Link to="/contact" className="btn">
                Get Free Quote
              </Link>
              <Link to="/services" className="btn btn-secondary">
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features section">
        <div className="container">
          <h2 className="section-title">Why Choose Horsepower Electrical?</h2>
          <p className="section-subtitle">
            We bring decades of experience and cutting-edge technology to every electrical project
          </p>
          
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">
                <Shield />
              </div>
              <h3>Licensed & Insured</h3>
              <p>Fully licensed electrical contractors with comprehensive insurance coverage for your peace of mind.</p>
            </div>
            
            <div className="feature">
              <div className="feature-icon">
                <Clock />
              </div>
              <h3>24/7 Emergency Service</h3>
              <p>Round-the-clock emergency electrical services when you need them most.</p>
            </div>
            
            <div className="feature">
              <div className="feature-icon">
                <Award />
              </div>
              <h3>Quality Guarantee</h3>
              <p>We stand behind our work with comprehensive warranties and satisfaction guarantees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services section">
        <div className="container">
          <h2 className="section-title">Our Electrical Services</h2>
          <p className="section-subtitle">
            Comprehensive electrical solutions for homes and businesses
          </p>
          
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <span className="service-icon">{service.icon}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/services" className="btn">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials section">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">
            Don't just take our word for it - hear from our satisfied customers
          </p>
          
          <div className="testimonials-grid">
            <div className="testimonial">
              <div className="testimonial-content">
                <p>"Horsepower Electrical did an outstanding job rewiring our entire house. Professional, clean, and on time. Highly recommended!"</p>
              </div>
              <div className="testimonial-author">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#ff6b35" color="#ff6b35" />
                  ))}
                </div>
                <strong>Sarah Johnson</strong>
                <span>Homeowner</span>
              </div>
            </div>
            
            <div className="testimonial">
              <div className="testimonial-content">
                <p>"Excellent service for our commercial building. They completed the electrical upgrade ahead of schedule and under budget."</p>
              </div>
              <div className="testimonial-author">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#ff6b35" color="#ff6b35" />
                  ))}
                </div>
                <strong>Mike Chen</strong>
                <span>Business Owner</span>
              </div>
            </div>
            
            <div className="testimonial">
              <div className="testimonial-content">
                <p>"Called them for an emergency repair at 2 AM. They arrived within 30 minutes and fixed the issue quickly. Amazing service!"</p>
              </div>
              <div className="testimonial-author">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#ff6b35" color="#ff6b35" />
                  ))}
                </div>
                <strong>Lisa Rodriguez</strong>
                <span>Property Manager</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Power Your Project?</h2>
            <p>Get a free estimate for your electrical needs. No obligation, just professional service.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn">
                Get Free Estimate
              </Link>
              <a href="tel:5551234567" className="btn btn-secondary">
                Call (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Login Button */}
      <button 
        className="admin-login-button"
        onClick={() => setIsAdminModalOpen(true)}
        title="Admin Login"
      >
        <Settings size={20} />
        Admin Login
      </button>

      {/* Admin Login Modal */}
      <AdminLoginModal 
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
};

export default Home;
