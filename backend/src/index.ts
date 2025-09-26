import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcryptjs';
import emailService from './services/emailService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Horsepower Electrical API is running' });
});

app.get('/api/services', (req, res) => {
  const services = [
    {
      id: 1,
      title: 'Residential Electrical Services',
      description: 'Complete electrical solutions for your home including wiring, outlets, lighting, and electrical panel upgrades.',
      icon: '🏠'
    },
    {
      id: 2,
      title: 'Commercial Electrical Services',
      description: 'Professional electrical services for businesses, offices, and commercial properties.',
      icon: '🏢'
    },
    {
      id: 3,
      title: 'Emergency Electrical Repairs',
      description: '24/7 emergency electrical services for urgent repairs and power restoration.',
      icon: '⚡'
    },
    {
      id: 4,
      title: 'Electrical Inspections',
      description: 'Comprehensive electrical safety inspections and code compliance assessments.',
      icon: '🔍'
    },
    {
      id: 5,
      title: 'Smart Home Installation',
      description: 'Modern smart home electrical systems including automation and energy management.',
      icon: '🏡'
    },
    {
      id: 6,
      title: 'Generator Installation',
      description: 'Backup power solutions including generator installation and maintenance.',
      icon: '🔋'
    }
  ];
  
  res.json(services);
});

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;
  
  try {
    // Save lead to Supabase database
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(
      process.env.SUPABASE_URL || 'https://blmsyylecjxjwqttlxaf.supabase.co',
      process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsbXN5eWxlY2p4andxdHRseGFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDYwNTgsImV4cCI6MjA3NDIyMjA1OH0.2rMzSCCUBULcEuQzbnmiGh-IZ1AwljrpOHvZtWkXDLg'
    );

    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          name,
          email,
          phone: phone || null,
          message,
          status: 'new',
          priority: 'medium',
          source: 'website'
        }
      ]);

    if (error) {
      console.error('Error saving lead:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Error saving your message. Please try again.' 
      });
    }

    console.log('Lead saved successfully:', data);
    
    res.json({ 
      success: true, 
      message: 'Thank you for your message. We will get back to you soon!' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error processing your request. Please try again.' 
    });
  }
});

// CRM API endpoints
app.get('/api/leads', async (req, res) => {
  try {
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(
      process.env.SUPABASE_URL || 'https://blmsyylecjxjwqttlxaf.supabase.co',
      process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsbXN5eWxlY2p4andxdHRseGFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDYwNTgsImV4cCI6MjA3NDIyMjA1OH0.2rMzSCCUBULcEuQzbnmiGh-IZ1AwljrpOHvZtWkXDLg'
    );

    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching leads:', error);
      return res.status(500).json({ error: 'Failed to fetch leads' });
    }

    res.json(data);
  } catch (error) {
    console.error('Leads API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, priority, notes, assigned_to } = req.body;
    
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(
      process.env.SUPABASE_URL || 'https://blmsyylecjxjwqttlxaf.supabase.co',
      process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsbXN5eWxlY2p4andxdHRseGFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDYwNTgsImV4cCI6MjA3NDIyMjA1OH0.2rMzSCCUBULcEuQzbnmiGh-IZ1AwljrpOHvZtWkXDLg'
    );

    const updateData: any = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (notes !== undefined) updateData.notes = notes;
    if (assigned_to) updateData.assigned_to = assigned_to;
    
    if (status === 'contacted' && !req.body.contacted_at) {
      updateData.contacted_at = new Date().toISOString();
    }
    
    if (status === 'closed_won' || status === 'closed_lost') {
      updateData.closed_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('leads')
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error('Error updating lead:', error);
      return res.status(500).json({ error: 'Failed to update lead' });
    }

    res.json({ success: true, data });
  } catch (error) {
    console.error('Update lead error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin Profile Management API endpoints
app.post('/api/admin/verify-password', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(
      process.env.SUPABASE_URL || 'https://blmsyylecjxjwqttlxaf.supabase.co',
      process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsbXN5eWxlY2p4andxdHRseGFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDYwNTgsImV4cCI6MjA3NDIyMjA1OH0.2rMzSCCUBULcEuQzbnmiGh-IZ1AwljrpOHvZtWkXDLg'
    );

    const { data, error } = await supabase
      .from('admin_users')
      .select('password_hash')
      .eq('email', email)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      return res.status(401).json({ valid: false });
    }

    const isValid = await bcrypt.compare(password, data.password_hash);
    res.json({ valid: isValid });
  } catch (error) {
    console.error('Password verification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/admin/update-profile', async (req, res) => {
  try {
    const { newEmail, newPassword, currentPassword } = req.body;
    
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(
      process.env.SUPABASE_URL || 'https://blmsyylecjxjwqttlxaf.supabase.co',
      process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsbXN5eWxlY2p4andxdHRseGFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDYwNTgsImV4cCI6MjA3NDIyMjA1OH0.2rMzSCCUBULcEuQzbnmiGh-IZ1AwljrpOHvZtWkXDLg'
    );

    // Get current admin user
    const { data: currentAdmin, error: fetchError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', req.body.currentEmail || req.headers['x-admin-email'])
      .single();

    if (fetchError || !currentAdmin) {
      return res.status(404).json({ error: 'Admin user not found' });
    }

    // Verify current password
    if (currentPassword) {
      const isValidPassword = await bcrypt.compare(currentPassword, currentAdmin.password_hash);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Current password is incorrect' });
      }
    }

    const updateData: any = {};

    // Update email if provided
    if (newEmail && newEmail !== currentAdmin.email) {
      // Check if email already exists
      const { data: existingUser } = await supabase
        .from('admin_users')
        .select('id')
        .eq('email', newEmail)
        .single();

      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      updateData.email = newEmail;
    }

    // Update password if provided
    if (newPassword) {
      const saltRounds = 10;
      updateData.password_hash = await bcrypt.hash(newPassword, saltRounds);
    }

    // Update the admin user
    const { data, error } = await supabase
      .from('admin_users')
      .update(updateData)
      .eq('id', currentAdmin.id)
      .select();

    if (error) {
      console.error('Error updating admin profile:', error);
      return res.status(500).json({ error: 'Failed to update profile' });
    }

    // Send email notifications
    if (newPassword) {
      // Send password change notification
      await emailService.sendPasswordChangeNotification(currentAdmin.email);
    }

    res.json({ success: true, data: data[0] });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Verification Code API endpoints
app.post('/api/admin/request-verification', async (req, res) => {
  try {
    const { currentEmail, newEmail, newPassword, currentPassword } = req.body;
    console.log('Request verification data:', { currentEmail, newEmail, newPassword: !!newPassword });
    
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(
      process.env.SUPABASE_URL || 'https://blmsyylecjxjwqttlxaf.supabase.co',
      process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsbXN5eWxlY2p4andxdHRseGFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDYwNTgsImV4cCI6MjA3NDIyMjA1OH0.2rMzSCCUBULcEuQzbnmiGh-IZ1AwljrpOHvZtWkXDLg'
    );

    // Get current admin user
    const { data: currentAdmin, error: fetchError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', currentEmail)
      .single();

    if (fetchError || !currentAdmin) {
      return res.status(404).json({ error: 'Admin user not found' });
    }

    // Verify current password
    if (currentPassword) {
      const isValidPassword = await bcrypt.compare(currentPassword, currentAdmin.password_hash);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Current password is incorrect' });
      }
    }

    // Determine what type of change is being requested
    let changeType: 'email_change' | 'password_change';
    let newValue: string;

    if (newEmail && newEmail !== currentEmail) {
      console.log('Email change requested:', { newEmail, currentEmail });
      // Check if email already exists
      const { data: existingUser } = await supabase
        .from('admin_users')
        .select('id')
        .eq('email', newEmail)
        .single();

      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      
      changeType = 'email_change';
      newValue = newEmail;
    } else if (newEmail && newEmail === currentEmail) {
      return res.status(400).json({ error: 'New email must be different from current email' });
    } else if (newPassword) {
      changeType = 'password_change';
      const saltRounds = 10;
      newValue = await bcrypt.hash(newPassword, saltRounds);
    } else {
      console.log('No valid changes requested:', { newEmail, newPassword: !!newPassword, currentEmail });
      return res.status(400).json({ error: 'No valid changes requested' });
    }

    // Generate 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Store verification code in database
    const { data: verificationData, error: verificationError } = await supabase
      .from('verification_codes')
      .insert([
        {
          admin_id: currentAdmin.id,
          code: verificationCode,
          type: changeType,
          new_value: newValue,
          expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutes
        }
      ]);

    if (verificationError) {
      console.error('Error storing verification code:', verificationError);
      return res.status(500).json({ error: 'Failed to generate verification code' });
    }

    // Send verification code via email
    const emailSent = await emailService.sendVerificationCode(
      currentAdmin.email,
      verificationCode,
      changeType
    );

    if (!emailSent) {
      return res.status(500).json({ error: 'Failed to send verification code' });
    }

    res.json({ 
      success: true, 
      message: 'Verification code sent to your email',
      changeType 
    });
  } catch (error) {
    console.error('Verification request error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/admin/verify-code', async (req, res) => {
  try {
    const { currentEmail, code } = req.body;
    
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(
      process.env.SUPABASE_URL || 'https://blmsyylecjxjwqttlxaf.supabase.co',
      process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsbXN5eWxlY2p4andxdHRseGFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDYwNTgsImV4cCI6MjA3NDIyMjA1OH0.2rMzSCCUBULcEuQzbnmiGh-IZ1AwljrpOHvZtWkXDLg'
    );

    // Get current admin user
    const { data: currentAdmin, error: fetchError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', currentEmail)
      .single();

    if (fetchError || !currentAdmin) {
      return res.status(404).json({ error: 'Admin user not found' });
    }

    // Find valid verification code
    const { data: verificationData, error: verificationError } = await supabase
      .from('verification_codes')
      .select('*')
      .eq('admin_id', currentAdmin.id)
      .eq('code', code)
      .eq('used', false)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (verificationError || !verificationData) {
      return res.status(400).json({ error: 'Invalid or expired verification code' });
    }

    // Apply the change based on type
    const updateData: any = {};
    
    if (verificationData.type === 'email_change') {
      updateData.email = verificationData.new_value;
    } else if (verificationData.type === 'password_change') {
      updateData.password_hash = verificationData.new_value;
    }

    // Update the admin user
    const { data: updatedAdmin, error: updateError } = await supabase
      .from('admin_users')
      .update(updateData)
      .eq('id', currentAdmin.id)
      .select();

    if (updateError) {
      console.error('Error updating admin profile:', updateError);
      return res.status(500).json({ error: 'Failed to update profile' });
    }

    // Mark verification code as used
    await supabase
      .from('verification_codes')
      .update({ used: true })
      .eq('id', verificationData.id);

    // Send confirmation email
    if (verificationData.type === 'password_change') {
      await emailService.sendPasswordChangeNotification(currentAdmin.email);
    }

    res.json({ 
      success: true, 
      message: 'Profile updated successfully',
      data: updatedAdmin[0]
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve static files from React build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../frontend/build'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Horsepower Electrical API server running on port ${PORT}`);
});
