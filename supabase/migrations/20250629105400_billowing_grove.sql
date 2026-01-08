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