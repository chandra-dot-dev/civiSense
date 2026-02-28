# Supabase Database Setup Guide

To complete the hackathon demo setup, run the following SQL script in your Supabase project's SQL Editor. This will create the necessary tables, types, and security policies.

```sql
-- 1. Create custom types
CREATE TYPE user_role AS ENUM ('CITIZEN', 'OFFICER', 'ADMIN');
CREATE TYPE status_type AS ENUM ('SUBMITTED', 'UNDER_REVIEW', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');
CREATE TYPE urgency_type AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- 2. Complaints Table
CREATE TABLE complaints (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  category_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location_text TEXT,
  image_url TEXT,
  status status_type DEFAULT 'SUBMITTED',
  urgency urgency_type DEFAULT 'MEDIUM',
  priority_score INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- 3. Complaint Status History
CREATE TABLE complaint_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  complaint_id UUID REFERENCES complaints(id) ON DELETE CASCADE,
  changed_by UUID REFERENCES auth.users(id),
  old_status TEXT,
  new_status TEXT NOT NULL,
  comments TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaint_history ENABLE ROW LEVEL SECURITY;

-- 5. Simplified Policies for Hackathon
-- WARNING: These are permissive policies designed to let the demo work instantly.
-- In a real app, you would restrict updates to only officers/admins.
CREATE POLICY "Public can read complaints" ON complaints FOR SELECT USING (true);
CREATE POLICY "Public can read history" ON complaint_history FOR SELECT USING (true);

-- Allow authenticated users to insert complaints
CREATE POLICY "Users can insert complaints" ON complaints FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
-- Allow anyone to update complaints (for easy officer demo)
CREATE POLICY "Anyone can update complaints" ON complaints FOR UPDATE TO authenticated USING (true);

-- Allow inserting history
CREATE POLICY "Anyone can insert history" ON complaint_history FOR INSERT TO authenticated WITH CHECK (true);
```

## Next Steps
1. Create a Supabase Project.
2. Run the above SQL in the SQL Editor.
3. Add your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to your `.env.local` file.
4. Run `npm run dev`!
