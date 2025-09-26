import React, { useState } from 'react';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  CheckCircle,
  AlertCircle,
  Shield
} from 'lucide-react';
import './ProfileManagement.css';

const ProfileManagement: React.FC = () => {
  const { admin, login } = useAdminAuth();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [waitingForVerification, setWaitingForVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [changeType, setChangeType] = useState<'email_change' | 'password_change' | null>(null);
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    currentPassword: '',
    newEmail: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRequestVerification = async () => {
    setLoading(true);
    setMessage(null);

    try {
      // Frontend validation
      if (changeType === 'email_change' && formData.newEmail === admin?.email) {
        throw new Error('New email must be different from current email');
      }

      // Request verification code
      const response = await fetch('/api/admin/request-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentEmail: admin?.email,
          newEmail: changeType === 'email_change' ? formData.newEmail : undefined,
          newPassword: changeType === 'password_change' ? formData.newPassword : undefined,
          currentPassword: formData.currentPassword
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to request verification');
      }

      const result = await response.json();
      setWaitingForVerification(true);
      setMessage({ 
        type: 'success', 
        text: 'Verification code sent to your email. Please check your inbox.' 
      });

    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to request verification' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/admin/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentEmail: admin?.email,
          code: verificationCode
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Invalid verification code');
      }

      const result = await response.json();
      const successMessage = changeType === 'email_change' 
        ? 'Your email has been changed' 
        : 'Your password has been changed';
      setMessage({ type: 'success', text: successMessage });
      setWaitingForVerification(false);
      setIsChangingEmail(false);
      setIsChangingPassword(false);
      setVerificationCode('');
      setChangeType(null);
      
      // Clear form
      setFormData({
        currentPassword: '',
        newEmail: '',
        newPassword: '',
        confirmPassword: ''
      });

    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Verification failed' });
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEmail = () => {
    setIsChangingEmail(true);
    setChangeType('email_change');
    setFormData(prev => ({ ...prev, newEmail: '' }));
    setMessage(null);
  };

  const handleChangePassword = () => {
    setIsChangingPassword(true);
    setChangeType('password_change');
    setFormData(prev => ({ 
      ...prev, 
      newPassword: '', 
      confirmPassword: '',
      currentPassword: ''
    }));
    setMessage(null);
  };

  const handleCancel = () => {
    setIsChangingEmail(false);
    setIsChangingPassword(false);
    setWaitingForVerification(false);
    setVerificationCode('');
    setChangeType(null);
    setFormData({
      currentPassword: '',
      newEmail: '',
      newPassword: '',
      confirmPassword: ''
    });
    setMessage(null);
  };

  if (!admin) {
    return (
      <div className="profile-management">
        <div className="unauthorized">
          <AlertCircle size={48} />
          <h3>Access Denied</h3>
          <p>You must be logged in to access profile management.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-management">
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-avatar">
            <User size={32} />
          </div>
          <div>
            <h2>Profile Management</h2>
            <p>Manage your account settings and security</p>
          </div>
        </div>
        <div className="admin-badge">
          <Shield size={16} />
          <span>{admin.role}</span>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <h3>Profile Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Full Name</label>
              <div className="info-value">{admin.full_name}</div>
            </div>
            <div className="info-item">
              <label>Email Address</label>
              <div className="info-value-container">
                <div className="info-value">{admin.email}</div>
                <button 
                  className="btn-change"
                  onClick={handleChangeEmail}
                  disabled={isChangingEmail || isChangingPassword}
                >
                  Change email
                </button>
              </div>
            </div>
            <div className="info-item">
              <label>Role</label>
              <div className="info-value">
                <span className="role-badge">{admin.role}</span>
              </div>
            </div>
            <div className="info-item">
              <label>Password</label>
              <div className="info-value-container">
                <div className="info-value">••••••••</div>
                <button 
                  className="btn-change"
                  onClick={handleChangePassword}
                  disabled={isChangingEmail || isChangingPassword}
                >
                  Change password
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Email Change Section */}
        {isChangingEmail && (
          <div className="profile-section">
            <h3>Change Email Address</h3>
            <div className="form-group">
              <label htmlFor="newEmail">New Email Address</label>
              <input
                type="email"
                id="newEmail"
                name="newEmail"
                value={formData.newEmail}
                onChange={handleInputChange}
                placeholder="Enter new email address"
                className="form-input"
                required
              />
            </div>
            <div className="form-actions">
              <button 
                className="btn-secondary"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={handleRequestVerification}
                disabled={loading || !formData.newEmail}
              >
                <Mail size={20} />
                {loading ? 'Sending Code...' : 'Send verification code'}
              </button>
            </div>
          </div>
        )}

        {/* Password Change Section */}
        {isChangingPassword && (
          <div className="profile-section">
            <h3>Change Password</h3>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password *</label>
              <div className="password-input">
                <Lock size={20} />
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <div className="password-input">
                <Lock size={20} />
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <div className="password-input">
                <Lock size={20} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="form-actions">
              <button 
                className="btn-secondary"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={handleRequestVerification}
                disabled={loading || !formData.newPassword || formData.newPassword !== formData.confirmPassword}
              >
                <Shield size={20} />
                {loading ? 'Sending Code...' : 'Send verification code'}
              </button>
            </div>
          </div>
        )}

        {/* Verification Section */}
        {waitingForVerification && (
          <div className="verification-section">
            <div className="verification-header">
              <Shield size={24} />
              <h3>Verify Your {changeType === 'email_change' ? 'Email Change' : 'Password Change'}</h3>
            </div>
            <p className="verification-text">
              We've sent a 6-digit verification code to your email address. 
              Please enter it below to complete the {changeType === 'email_change' ? 'email change' : 'password change'}.
            </p>
            <div className="verification-input">
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter 6-digit code"
                maxLength={6}
                className="code-input"
              />
            </div>
            <div className="verification-actions">
              <button 
                className="btn-secondary"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={handleVerifyCode}
                disabled={loading || verificationCode.length !== 6}
              >
                <Shield size={20} />
                {loading ? 'Verifying...' : 'Verify'}
              </button>
            </div>
          </div>
        )}

        {message && (
          <div className={`message ${message.type}`}>
            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{message.text}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileManagement;