import { createClient } from '@supabase/supabase-js';

// ConfiguraciÃ³n de Supabase para SoluciÃ³n Digital 360
// La Anon Key es pÃºblica por diseÃ±o y cuenta con Row Level Security (RLS) en PostgreSQL
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  'https://ygrwgvfqcercavykelsx.supabase.co';

const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlncndndmZxY2VyY2F2eWtlbHN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExNTcwNTYsImV4cCI6MjEwNjczMzA1Nn0.glOSbD9PXPFjWpIMD-DpZGqCKJXgSIQa1f6KValfGFc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});