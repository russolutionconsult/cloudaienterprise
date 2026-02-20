-- CloudAI Enterprise - Initial Database Schema
-- Run this in your Supabase SQL editor or via migrations

-- Quiz leads table
CREATE TABLE IF NOT EXISTS quiz_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  score integer NOT NULL,
  level text NOT NULL,
  answers jsonb,
  created_at timestamptz DEFAULT now()
);

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  package text,
  message text,
  created_at timestamptz DEFAULT now()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_quiz_leads_email ON quiz_leads (email);
CREATE INDEX IF NOT EXISTS idx_quiz_leads_created_at ON quiz_leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts (email);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts (created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE quiz_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (API routes use service role key)
CREATE POLICY "Service role full access on quiz_leads"
  ON quiz_leads
  FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access on contacts"
  ON contacts
  FOR ALL
  USING (true)
  WITH CHECK (true);
