# 🚀 Complete Deployment Guide

## Step 1: Setup Supabase Database (5 minutes)

### Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up
2. Click "New Project"
3. Choose organization and create project:
   - Name: `student-placement-predictor`
   - Database password: Generate strong password
   - Region: Choose closest to you
4. Wait for project creation (~2 minutes)

### Run Database Migrations
1. Go to **SQL Editor** in Supabase dashboard
2. Copy and run each migration file in order:

**Migration 1 - User Analyses Table:**
```sql
-- Copy content from supabase/migrations/create_user_analyses.sql
```

**Migration 2 - Platform Cache Table:**
```sql
-- Copy content from supabase/migrations/create_platform_cache.sql
```

**Migration 3 - Course Recommendations Table:**
```sql
-- Copy content from supabase/migrations/create_course_recommendations.sql
```

**Migration 4 - Seed Course Data:**
```sql
-- Copy content from supabase/migrations/seed_course_data.sql
```

### Get API Keys
1. Go to **Settings** → **API**
2. Copy:
   - Project URL
   - anon public key

## Step 2: Configure Environment Variables

Create `.env` file in project root:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_ENVIRONMENT=production
```

## Step 3: Deploy to Netlify (FREE)

### Option A: GitHub + Netlify (Recommended)
1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add database integration"
   git push origin main
   ```

2. **Deploy on Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect GitHub repository
   - Build settings (auto-detected):
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Add environment variables in Netlify dashboard
   - Deploy!

### Option B: Drag & Drop Deploy
1. **Build locally:**
   ```bash
   npm run build
   ```
2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Drag `dist` folder to deploy area
   - Add environment variables in site settings

## Step 4: Alternative Deployment Options

### Deploy to Vercel (FREE)
```bash
npm i -g vercel
vercel --prod
```
Add environment variables in Vercel dashboard.

### Deploy to Railway (FREE tier)
1. Connect GitHub repo to Railway
2. Add environment variables
3. Auto-deploy on push

## ✅ What You Get After Deployment

### Database Features
- ✅ User analysis storage and history
- ✅ Platform data caching (1-hour TTL)
- ✅ 20+ course recommendations with filtering
- ✅ Analytics and user insights
- ✅ Secure RLS policies

### Production Features
- ✅ Real-time data persistence
- ✅ Performance optimization with caching
- ✅ Scalable database architecture
- ✅ Free hosting (Netlify/Vercel)
- ✅ Custom domain support
- ✅ SSL certificates
- ✅ Global CDN

### Cost Breakdown
- **Supabase**: Free (500MB DB, 2GB bandwidth)
- **Netlify/Vercel**: Free (100GB bandwidth)
- **Total Monthly Cost**: $0

## 🔧 Post-Deployment

### Monitor Your App
- **Supabase Dashboard**: Database usage and performance
- **Netlify Analytics**: Traffic and user behavior
- **Browser DevTools**: Check for any errors

### Scale When Needed
- **Database**: Upgrade Supabase when you hit limits
- **Hosting**: Upgrade Netlify/Vercel for more bandwidth
- **Features**: Add authentication, payments, etc.

## 🚀 Your App is Live!

After deployment, your Student Placement Predictor will:
1. **Store user analyses** in Supabase database
2. **Cache platform data** for better performance
3. **Provide personalized course recommendations**
4. **Track user analytics** for insights
5. **Work globally** with CDN distribution

**Deployment time: ~10 minutes**
**Monthly cost: $0**
**Global availability: ✅**

---

*Your AI-powered career guidance platform is now helping students worldwide achieve their placement dreams!* 🌟