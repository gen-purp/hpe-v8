import React, { useState } from 'react';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { LogOut, Users, FileText, Settings, BarChart3, Shield, Database, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LeadsCRM from '../components/LeadsCRM';
import ProfileManagement from '../components/ProfileManagement';
import './AdminCentre.css';

const AdminCentre: React.FC = () => {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!admin) {
    return (
      <div className="admin-centre">
        <div className="unauthorized">
          <h1>Access Denied</h1>
          <p>You must be logged in to access the admin centre.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-centre">
      <div className="admin-header">
        <div className="admin-info">
          <h1>Admin Centre</h1>
          <p>Welcome back, {admin.full_name}</p>
          <span className="admin-role">{admin.role}</span>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={20} />
          Logout
        </button>
      </div>

      <div className="admin-dashboard">
        <div className="admin-tabs">
          <button 
            className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <BarChart3 size={20} />
            Dashboard
          </button>
          <button 
            className={`tab-button ${activeTab === 'leads' ? 'active' : ''}`}
            onClick={() => setActiveTab('leads')}
          >
            <Database size={20} />
            Leads CRM
          </button>
          <button 
            className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={20} />
            Profile
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <>
            <div className="admin-stats">
              <div className="stat-card">
                <div className="stat-icon">
                  <Users />
                </div>
                <div className="stat-content">
                  <h3>Contact Leads</h3>
                  <p className="stat-number">0</p>
                  <p className="stat-label">New this month</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <FileText />
                </div>
                <div className="stat-content">
                  <h3>Service Requests</h3>
                  <p className="stat-number">0</p>
                  <p className="stat-label">Pending review</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <BarChart3 />
                </div>
                <div className="stat-content">
                  <h3>Website Views</h3>
                  <p className="stat-number">0</p>
                  <p className="stat-label">This month</p>
                </div>
              </div>
            </div>

            <div className="admin-sections">
              <div className="admin-section">
                <h2>Quick Actions</h2>
                <div className="action-grid">
                  <button 
                    className="action-button"
                    onClick={() => setActiveTab('leads')}
                  >
                    <Users size={24} />
                    <span>View Leads</span>
                  </button>
                  <button className="action-button">
                    <FileText size={24} />
                    <span>Manage Content</span>
                  </button>
                  <button className="action-button">
                    <Settings size={24} />
                    <span>Site Settings</span>
                  </button>
                  <button className="action-button">
                    <Shield size={24} />
                    <span>User Management</span>
                  </button>
                </div>
              </div>

              <div className="admin-section">
                <h2>Recent Activity</h2>
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-icon">
                      <Users />
                    </div>
                    <div className="activity-content">
                      <p>No recent activity</p>
                      <span className="activity-time">-</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'leads' && (
          <LeadsCRM />
        )}

        {activeTab === 'profile' && (
          <ProfileManagement />
        )}
      </div>
    </div>
  );
};

export default AdminCentre;
