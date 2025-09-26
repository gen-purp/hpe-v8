import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, Shield, Award } from 'lucide-react';
import './Services.css';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    // Fetch services from API
    fetch('/api/services')
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error('Error fetching services:', error));
  }, []);

  const serviceDetails = [
    {
      title: 'Residential Electrical Services',
      description: 'Complete electrical solutions for your home',
      features: [
        'Electrical panel upgrades and replacements',
        'Outlet and switch installation',
        'Lighting design and installation',
        'Ceiling fan installation',
        'GFCI outlet installation',
        'Whole house surge protection'
      ],
      icon: '🏠'
    },
    {
      title: 'Commercial Electrical Services',
      description: 'Professional electrical services for businesses',
      features: [
        'Office building electrical systems',
        'Retail space electrical setup',
        'Industrial electrical maintenance',
        'Energy-efficient lighting solutions',
        'Power distribution systems',
        'Emergency lighting systems'
      ],
      icon: '🏢'
    },
    {
      title: 'Emergency Electrical Repairs',
      description: '24/7 emergency electrical services',
      features: [
        'Power outage diagnosis and repair',
        'Electrical fire prevention',
        'Circuit breaker troubleshooting',
        'Electrical safety inspections',
        'Rapid response service',
        'After-hours emergency calls'
      ],
      icon: '⚡'
    },
    {
      title: 'Electrical Inspections',
      description: 'Comprehensive electrical safety assessments',
      features: [
        'Home electrical safety inspections',
        'Code compliance assessments',
        'Electrical system evaluations',
        'Safety hazard identification',
        'Detailed inspection reports',
        'Recommendations for improvements'
      ],
      icon: '🔍'
    },
    {
      title: 'Smart Home Installation',
      description: 'Modern smart home electrical systems',
      features: [
        'Smart lighting systems',
        'Home automation setup',
        'Smart thermostat installation',
        'Security system integration',
        'Energy monitoring systems',
        'Voice-controlled devices'
      ],
      icon: '🏡'
    },
    {
      title: 'Generator Installation',
      description: 'Backup power solutions for your property',
      features: [
        'Standby generator installation',
        'Transfer switch setup',
        'Generator maintenance',
        'Load calculation and sizing',
        'Automatic backup systems',
        'Generator testing and service'
      ],
      icon: '🔋'
    }
  ];

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <h1>Our Electrical Services</h1>
          <p>Professional electrical solutions for residential and commercial properties</p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="services-overview section">
        <div className="container">
          <h2 className="section-title">Complete Electrical Solutions</h2>
          <p className="section-subtitle">
            From simple repairs to complex installations, we handle all your electrical needs
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
        </div>
      </section>

      {/* Detailed Services */}
      <section className="detailed-services section">
        <div className="container">
          <h2 className="section-title">Service Details</h2>
          <p className="section-subtitle">
            Learn more about our comprehensive electrical services
          </p>
          
          <div className="service-details">
            {serviceDetails.map((service, index) => (
              <div key={index} className="service-detail">
                <div className="service-detail-header">
                  <span className="service-detail-icon">{service.icon}</span>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                </div>
                <div className="service-features">
                  <h4>What We Include:</h4>
                  <ul>
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>
                        <CheckCircle size={16} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us section">
        <div className="container">
          <h2 className="section-title">Why Choose Horsepower Electrical?</h2>
          <p className="section-subtitle">
            We bring expertise, reliability, and quality to every project
          </p>
          
          <div className="benefits-grid">
            <div className="benefit">
              <div className="benefit-icon">
                <Shield />
              </div>
              <h3>Licensed & Insured</h3>
              <p>Fully licensed electrical contractors with comprehensive insurance coverage for your protection and peace of mind.</p>
            </div>
            
            <div className="benefit">
              <div className="benefit-icon">
                <Clock />
              </div>
              <h3>24/7 Emergency Service</h3>
              <p>Round-the-clock emergency electrical services when you need them most. We're always here to help.</p>
            </div>
            
            <div className="benefit">
              <div className="benefit-icon">
                <Award />
              </div>
              <h3>Quality Guarantee</h3>
              <p>We stand behind our work with comprehensive warranties and satisfaction guarantees on all our services.</p>
            </div>
            
            <div className="benefit">
              <div className="benefit-icon">
                <CheckCircle />
              </div>
              <h3>Code Compliance</h3>
              <p>All work performed to current electrical codes and standards, ensuring safety and compliance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Contact us today for a free estimate on your electrical project</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn">
                Get Free Quote
              </Link>
              <a href="tel:5551234567" className="btn btn-secondary">
                Call (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

