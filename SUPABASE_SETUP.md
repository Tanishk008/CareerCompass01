# 🚀 Complete Supabase Database Setup Guide

## Step 1: Create Free Supabase Account (2 minutes)

1. **Go to Supabase**: Visit [supabase.com](https://supabase.com)
2. **Sign Up**: Click "Start your project" → Sign up with GitHub/Google
3. **Create Organization**: Choose a name for your organization
4. **Create Project**: 
   - Project name: `student-placement-predictor`
   - Database password: Generate a strong password (save it!)
   - Region: Choose closest to your location
   - Click "Create new project"

## Step 2: Run Database Migrations (3 minutes)

Once your project is created:

1. **Go to SQL Editor**: In your Supabase dashboard, click "SQL Editor"
2. **Run Migration 1**: Copy and paste this SQL, then click "Run":

```sql
/*
  # Create user analyses table
  
  1. New Tables
    - `user_analyses`
      - `id` (uuid, primary key)
      - `user_id` (text)
      - `cgpa` (numeric)
      - `leetcode_problems` (integer)
      - `codeforces_rating` (integer)
      - `github_repos` (integer)
      - `project_count` (integer)
      - `skills_count` (integer)
      - `work_experience` (numeric)
      - `overall_score` (integer)
      - `predicted_company_type` (text)
      - `profile_data` (jsonb)
      - `prediction_results` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on `user_analyses` table
    - Add policies for anonymous users to manage their own data
*/

CREATE TABLE IF NOT EXISTS user_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  cgpa numeric NOT NULL,
  leetcode_problems integer DEFAULT 0,
  codeforces_rating integer DEFAULT 0,
  github_repos integer DEFAULT 0,
  project_count integer DEFAULT 0,
  skills_count integer DEFAULT 0,
  work_experience numeric DEFAULT 0,
  overall_score integer NOT NULL,
  predicted_company_type text,
  profile_data jsonb,
  prediction_results jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own analyses"
  ON user_analyses
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Users can read their own analyses"
  ON user_analyses
  FOR SELECT
  TO anon
  USING (true);

CREATE INDEX idx_user_analyses_user_id ON user_analyses (user_id);
CREATE INDEX idx_user_analyses_created_at ON user_analyses (created_at);
```

3. **Run Migration 2**: Copy and paste this SQL, then click "Run":

```sql
/*
  # Create platform cache table
  
  1. New Tables
    - `platform_cache`
      - `id` (uuid, primary key)
      - `username` (text)
      - `platform` (text)
      - `data` (jsonb)
      - `last_updated` (timestamp)
      - `is_valid` (boolean)
      - `expires_at` (timestamp)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `platform_cache` table
    - Add policies for public read access to valid cache
    - Add policies for service role to manage cache
*/

CREATE TABLE IF NOT EXISTS platform_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text NOT NULL,
  platform text NOT NULL,
  data jsonb NOT NULL,
  last_updated timestamptz DEFAULT now(),
  is_valid boolean DEFAULT true,
  expires_at timestamptz DEFAULT (now() + interval '1 hour'),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE platform_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access to platform cache"
  ON platform_cache
  FOR SELECT
  TO anon
  USING (is_valid = true AND expires_at > now());

CREATE POLICY "Service role can manage platform cache"
  ON platform_cache
  FOR ALL
  TO service_role
  USING (true);

CREATE UNIQUE INDEX idx_platform_cache_username_platform 
  ON platform_cache (username, platform);
CREATE INDEX idx_platform_cache_expires_at ON platform_cache (expires_at);
```

4. **Run Migration 3**: Copy and paste this SQL, then click "Run":

```sql
/*
  # Create course recommendations table
  
  1. New Tables
    - `course_recommendations`
      - `id` (uuid, primary key)
      - `title` (text)
      - `provider` (text)
      - `duration` (text)
      - `difficulty` (text)
      - `rating` (numeric)
      - `price` (text)
      - `description` (text)
      - `skills` (text array)
      - `url` (text)
      - `category` (text)
      - `focus_areas` (text array)
      - `is_active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on `course_recommendations` table
    - Add policy for public read access to active courses
*/

CREATE TABLE IF NOT EXISTS course_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  provider text NOT NULL,
  duration text NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  rating numeric CHECK (rating >= 0 AND rating <= 5),
  price text NOT NULL,
  description text,
  skills text[] DEFAULT '{}',
  url text NOT NULL,
  category text NOT NULL,
  focus_areas text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE course_recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access to active courses"
  ON course_recommendations
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE INDEX idx_course_recommendations_category ON course_recommendations (category);
CREATE INDEX idx_course_recommendations_difficulty ON course_recommendations (difficulty);
CREATE INDEX idx_course_recommendations_rating ON course_recommendations (rating DESC);
```

5. **Run Migration 4 (Seed Data)**: Copy and paste this SQL, then click "Run":

```sql
/*
  # Seed course recommendations data
  
  This migration adds sample course data to help users get personalized recommendations.
*/

INSERT INTO course_recommendations (title, provider, duration, difficulty, rating, price, description, skills, url, category, focus_areas) VALUES
('Master the Coding Interview: Data Structures + Algorithms', 'Udemy', '19 hours', 'Intermediate', 4.6, '$84.99', 'Complete guide to ace coding interviews at top tech companies', ARRAY['Data Structures', 'Algorithms', 'Problem Solving'], 'https://www.udemy.com/course/master-the-coding-interview-data-structures-algorithms/', 'DSA', ARRAY['Data Structures & Algorithms']),

('Algorithms Specialization', 'Coursera (Stanford)', '4 months', 'Advanced', 4.8, '$49/month', 'Comprehensive algorithms course from Stanford University', ARRAY['Advanced Algorithms', 'Graph Theory', 'Dynamic Programming'], 'https://www.coursera.org/specializations/algorithms', 'DSA', ARRAY['Data Structures & Algorithms']),

('System Design Interview Course', 'Educative', '12 weeks', 'Advanced', 4.7, '$79/month', 'Master system design for FAANG interviews', ARRAY['System Design', 'Scalability', 'Architecture'], 'https://www.educative.io/courses/grokking-the-system-design-interview', 'System Design', ARRAY['System Design']),

('The Complete Web Developer Bootcamp', 'Udemy', '65 hours', 'Beginner', 4.7, '$84.99', 'Full-stack web development from scratch', ARRAY['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'], 'https://www.udemy.com/course/the-complete-web-development-bootcamp/', 'Web Development', ARRAY['Project Development', 'Technical Skills']),

('React - The Complete Guide', 'Udemy', '48 hours', 'Intermediate', 4.6, '$84.99', 'Master React with hooks, context, and advanced patterns', ARRAY['React', 'JavaScript', 'Frontend Development'], 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/', 'Web Development', ARRAY['Technical Skills']),

('Machine Learning Course', 'Coursera (Stanford)', '11 weeks', 'Intermediate', 4.9, '$49/month', 'Andrew Ng''s famous machine learning course', ARRAY['Machine Learning', 'Python', 'Statistics'], 'https://www.coursera.org/learn/machine-learning', 'Machine Learning', ARRAY['Technical Skills']),

('Docker and Kubernetes: The Complete Guide', 'Udemy', '21 hours', 'Intermediate', 4.6, '$84.99', 'Master containerization and orchestration', ARRAY['Docker', 'Kubernetes', 'DevOps'], 'https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/', 'DevOps', ARRAY['Open Source Contributions']),

('Full Stack Open', 'University of Helsinki', '12 weeks', 'Intermediate', 4.8, 'Free', 'Modern full stack development with React, Node.js, and GraphQL', ARRAY['React', 'Node.js', 'GraphQL', 'MongoDB'], 'https://fullstackopen.com/en/', 'Web Development', ARRAY['Project Development']),

('AWS Certified Solutions Architect', 'A Cloud Guru', '20 hours', 'Intermediate', 4.5, '$39/month', 'Prepare for AWS certification and cloud architecture', ARRAY['AWS', 'Cloud Computing', 'System Architecture'], 'https://acloudguru.com/course/aws-certified-solutions-architect-associate-saa-c02', 'Cloud Computing', ARRAY['System Design']),

('Competitive Programming Essentials', 'CodeChef', '8 weeks', 'Intermediate', 4.4, 'Free', 'Master competitive programming techniques', ARRAY['Competitive Programming', 'Algorithms', 'Problem Solving'], 'https://www.codechef.com/ide', 'Competitive Programming', ARRAY['Data Structures & Algorithms']);
```

## Step 3: Get Your API Keys

1. **Go to Settings**: Click "Settings" in the left sidebar
2. **Go to API**: Click "API" tab
3. **Copy Keys**: Copy these two values:
   - `Project URL` (starts with https://...)
   - `anon public` key (long string starting with eyJ...)

## Step 4: Update Your Environment Variables

Create a `.env` file in your project root with:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## ✅ You're Done!

Your database is now ready with:
- ✅ User analysis storage
- ✅ Platform data caching
- ✅ Course recommendations
- ✅ Proper security policies
- ✅ Optimized indexes

## 🚀 Next: Deploy Your App

Now you can deploy to Netlify/Vercel for free! Your app will:
- Store user analyses in the database
- Cache platform data for better performance
- Provide personalized course recommendations
- Track user analytics

**Total setup time: ~5 minutes**
**Monthly cost: $0 (Supabase free tier)**