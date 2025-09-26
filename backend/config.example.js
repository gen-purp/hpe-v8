// Environment Configuration Example
// Copy this file to .env in the backend directory

module.exports = {
  // Backend Configuration
  PORT: 5001,
  NODE_ENV: 'development',
  
  // Supabase Configuration
  SUPABASE_URL: 'https://blmsyylecjxjwqttlxaf.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsbXN5eWxlY2p4andxdHRseGFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDYwNTgsImV4cCI6MjA3NDIyMjA1OH0.2rMzSCCUBULcEuQzbnmiGh-IZ1AwljrpOHvZtWkXDLg',
  
  // Email Service Configuration
  RESEND_API_KEY: 'your_resend_api_key_here',
  FRONTEND_URL: 'http://localhost:3000'
};

