// Email service for sending verification and notification emails
// Currently using console logging, but can be easily integrated with Resend

import { Resend } from 'resend';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

class EmailService {
  private isProduction: boolean;

  constructor() {
    this.isProduction = process.env.NODE_ENV === 'production';
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const resendApiKey = process.env.RESEND_API_KEY;
      
      if (resendApiKey && resendApiKey !== 'your_resend_api_key_here') {
        // Use Resend for actual email sending
        const resend = new Resend(resendApiKey);
        
        await resend.emails.send({
          from: 'Horsepower Electrical <noreply@horsepowerelectrical.online>',
          to: options.to,
          subject: options.subject,
          html: options.html,
        });
        
        console.log('📧 Email sent successfully via Resend:', {
          to: options.to,
          subject: options.subject
        });
      } else {
        // Development mode - log email content
        console.log('📧 Development Email (Resend not configured):', {
          to: options.to,
          subject: options.subject,
          html: options.html
        });
      }
      
      return true;
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      return false;
    }
  }

  async sendVerificationCode(to: string, code: string, type: 'email_change' | 'password_change'): Promise<boolean> {
    const action = type === 'email_change' ? 'email address change' : 'password change';
    const instructions = type === 'email_change' 
      ? 'To complete your email address change, please enter the verification code below:'
      : 'To complete your password change, please enter the verification code below:';
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff6b35;">Horsepower Electrical - Verification Code</h2>
        <p>Hello,</p>
        <p>You requested a ${action} for your Horsepower Electrical admin account.</p>
        <p>${instructions}</p>
        <div style="text-align: center; margin: 30px 0;">
          <div style="background: #f8f9fa; border: 2px solid #ff6b35; border-radius: 8px; padding: 20px; display: inline-block;">
            <h1 style="color: #ff6b35; font-size: 32px; margin: 0; letter-spacing: 4px;">${code}</h1>
          </div>
        </div>
        <p><strong>Important:</strong></p>
        <ul style="color: #666;">
          <li>This code will expire in 10 minutes</li>
          <li>Do not share this code with anyone</li>
          <li>If you didn't request this change, please contact support immediately</li>
        </ul>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">
          Horsepower Electrical<br>
          Professional Electrical Services
        </p>
      </div>
    `;

    return this.sendEmail({
      to,
      subject: `Verification Code for ${action.charAt(0).toUpperCase() + action.slice(1)} - Horsepower Electrical`,
      html
    });
  }

  async sendPasswordChangeNotification(to: string): Promise<boolean> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff6b35;">Horsepower Electrical - Password Changed</h2>
        <p>Hello,</p>
        <p>Your password has been successfully changed for your Horsepower Electrical admin account.</p>
        <p><strong>If you did not make this change, please contact support immediately.</strong></p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">
          Horsepower Electrical<br>
          Professional Electrical Services
        </p>
      </div>
    `;

    return this.sendEmail({
      to,
      subject: 'Password Changed - Horsepower Electrical',
      html
    });
  }
}

export default new EmailService();
