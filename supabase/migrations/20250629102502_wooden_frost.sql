/*
  # Create platform cache table

  1. New Tables
    - `platform_cache`
      - `id` (uuid, primary key)
      - `username` (text)
      - `platform` (text)
      - `data` (jsonb, cached API response)
      - `last_updated` (timestamp)
      - `is_valid` (boolean)
      - `expires_at` (timestamp)

  2. Security
    - Enable RLS on `platform_cache` table
    - Add policy for public read access (cached data is not sensitive)
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

-- Allow public read access to cached platform data
CREATE POLICY "Public read access to platform cache"
  ON platform_cache
  FOR SELECT
  TO anon
  USING (is_valid = true AND expires_at > now());

-- Allow service role to manage cache
CREATE POLICY "Service role can manage platform cache"
  ON platform_cache
  FOR ALL
  TO service_role
  USING (true);

-- Create unique index to prevent duplicate cache entries
CREATE UNIQUE INDEX IF NOT EXISTS idx_platform_cache_username_platform 
  ON platform_cache(username, platform);

-- Create index for cleanup queries
CREATE INDEX IF NOT EXISTS idx_platform_cache_expires_at ON platform_cache(expires_at);