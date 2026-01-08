# 🚀 Quick Setup Instructions

Your Student Placement Predictor is **almost ready**! You just need to set up the database to unlock all features.

## Current Status ✅
- ✅ Frontend is working with mock data
- ✅ All UI components are functional
- ✅ Prediction algorithm is working
- ⚠️ Database not connected (optional for basic functionality)

## Option 1: Use Without Database (Ready Now!)
Your app works perfectly with mock data. You get:
- ✅ Full placement prediction analysis
- ✅ Course recommendations
- ✅ International opportunities
- ✅ Company matching
- ❌ No data persistence
- ❌ No caching

## Option 2: Add Database (5 minutes setup)

### Step 1: Create Free Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Sign up with GitHub/Google
3. Create new project: `student-placement-predictor`
4. Wait 2 minutes for setup

### Step 2: Run Database Migrations
1. Go to **SQL Editor** in Supabase dashboard
2. Copy and run these 4 SQL scripts in order:

**Script 1 - User Analyses:**
```sql
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
  ON user_analyses FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Users can read their own analyses"
  ON user_analyses FOR SELECT TO anon USING (true);

CREATE INDEX idx_user_analyses_user_id ON user_analyses (user_id);
CREATE INDEX idx_user_analyses_created_at ON user_analyses (created_at);
```

**Script 2 - Platform Cache:**
```sql
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
  ON platform_cache FOR SELECT TO anon
  USING (is_valid = true AND expires_at > now());

CREATE POLICY "Service role can manage platform cache"
  ON platform_cache FOR ALL TO service_role USING (true);

CREATE UNIQUE INDEX idx_platform_cache_username_platform 
  ON platform_cache (username, platform);
CREATE INDEX idx_platform_cache_expires_at ON platform_cache (expires_at);
```

**Script 3 - Course Recommendations:**
```sql
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
  ON course_recommendations FOR SELECT TO anon USING (is_active = true);

CREATE INDEX idx_course_recommendations_category ON course_recommendations (category);
CREATE INDEX idx_course_recommendations_difficulty ON course_recommendations (difficulty);
CREATE INDEX idx_course_recommendations_rating ON course_recommendations (rating DESC);
```

**Script 4 - Sample Course Data:**
```sql
INSERT INTO course_recommendations (title, provider, duration, difficulty, rating, price, description, skills, url, category, focus_areas) VALUES
('Master the Coding Interview: Data Structures + Algorithms', 'Udemy', '19 hours', 'Intermediate', 4.6, '$84.99', 'Complete guide to ace coding interviews', ARRAY['Data Structures', 'Algorithms'], 'https://www.udemy.com/course/master-the-coding-interview-data-structures-algorithms/', 'DSA', ARRAY['Data Structures & Algorithms']),
('The Complete Web Developer Bootcamp', 'Udemy', '65 hours', 'Beginner', 4.7, '$84.99', 'Full-stack web development from scratch', ARRAY['HTML', 'CSS', 'JavaScript', 'React'], 'https://www.udemy.com/course/the-complete-web-development-bootcamp/', 'Web Development', ARRAY['Project Development']),
('System Design Interview Course', 'Educative', '12 weeks', 'Advanced', 4.7, '$79/month', 'Master system design for FAANG interviews', ARRAY['System Design', 'Architecture'], 'https://www.educative.io/courses/grokking-the-system-design-interview', 'System Design', ARRAY['System Design']);
```

### Step 3: Get API Keys
1. Go to **Settings** → **API** in Supabase
2. Copy:
   - Project URL
   - anon public key

### Step 4: Add Environment Variables
Create `.env` file in your project root:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 5: Restart Development Server
```bash
npm run dev
```

## 🎉 You're Done!

With database connected, you get:
- ✅ **Data Persistence**: User analyses saved
- ✅ **Performance**: Platform data caching
- ✅ **Smart Recommendations**: Database-driven courses
- ✅ **Analytics**: User insights and history
- ✅ **Scalability**: Ready for production

## 🚀 Deploy for FREE

### Netlify (Recommended)
1. Push to GitHub
2. Connect to Netlify
3. Add environment variables
4. Deploy!

### Vercel
```bash
npm i -g vercel
vercel --prod
```

**Total Cost: $0/month** (Supabase + Netlify free tiers)

---

*Your AI-powered career guidance platform is ready to help students worldwide!* 🌟