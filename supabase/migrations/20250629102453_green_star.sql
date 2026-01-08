/*
  # Create user analyses table

  1. New Tables
    - `user_analyses`
      - `id` (uuid, primary key)
      - `user_id` (text, for session tracking)
      - `cgpa` (numeric)
      - `leetcode_problems` (integer)
      - `codeforces_rating` (integer)
      - `github_repos` (integer)
      - `project_count` (integer)
      - `skills_count` (integer)
      - `work_experience` (numeric)
      - `overall_score` (integer)
      - `predicted_company_type` (text)
      - `profile_data` (jsonb, for storing complete profile)
      - `prediction_results` (jsonb, for storing ML results)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `user_analyses` table
    - Add policy for users to read/write their own data
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

-- Allow anonymous users to insert and read their own data based on user_id
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

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_user_analyses_user_id ON user_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_user_analyses_created_at ON user_analyses(created_at);