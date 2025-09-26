import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://blmsyylecjxjwqttlxaf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsbXN5eWxlY2p4andxdHRseGFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDYwNTgsImV4cCI6MjA3NDIyMjA1OH0.2rMzSCCUBULcEuQzbnmiGh-IZ1AwljrpOHvZtWkXDLg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface AdminUser {
  id: string;
  full_name: string;
  email: string;
  password_hash: string;
  role: 'superadmin' | 'admin' | 'moderator';
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

