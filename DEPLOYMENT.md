# 🚀 Free Deployment Guide

This guide shows you how to deploy your Student Placement Predictor for **FREE** using modern cloud platforms.

## 🎯 Quick Deploy Options

### Option 1: Frontend Only (Recommended for MVP)
Deploy just the frontend with mock data - **100% FREE**

### Option 2: Full Stack (Frontend + Database)
Deploy frontend with Supabase database - **FREE tier available**

### Option 3: Complete Solution (Frontend + Backend + Database)
Full ML backend deployment - **Mostly free with some limitations**

---

## 🌐 Frontend Deployment (FREE)

### Deploy to Netlify (Recommended)
1. **Connect Repository**
   ```bash
   # Push your code to GitHub first
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Build settings are auto-detected from `netlify.toml`
   - Click "Deploy site"

3. **Set Environment Variables**
   - Go to Site settings > Environment variables
   - Add your Supabase credentials (if using database)

### Deploy to Vercel (Alternative)
1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

### Deploy to GitHub Pages (Free)
1. **Add deployment workflow**
   ```bash
   # Create .github/workflows/deploy.yml
   mkdir -p .github/workflows
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings > Pages
   - Select "GitHub Actions" as source

---

## 🗄️ Database Setup (FREE)

### Supabase (Recommended - FREE tier)
1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose organization and create project

2. **Run Migrations**
   - Go to SQL Editor in Supabase dashboard
   - Copy and run each migration file from `supabase/migrations/`
   - Run in order: `create_user_analyses.sql`, `create_platform_cache.sql`, etc.

3. **Get API Keys**
   - Go to Settings > API
   - Copy `Project URL` and `anon public` key
   - Add to your environment variables

4. **Environment Variables**
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

---

## 🤖 Backend Deployment (FREE/LOW COST)

### Railway (Recommended - FREE tier)
1. **Connect Repository**
   - Go to [railway.app](https://railway.app)
   - Click "Deploy from GitHub"
   - Select your repository
   - Choose the `backend` folder

2. **Environment Variables**
   ```env
   DATABASE_URL=postgresql://...
   GITHUB_TOKEN=your_token
   ```

3. **Deploy**
   - Railway auto-deploys from your `backend/` folder
   - Uses `Dockerfile` for containerized deployment

### Render (Alternative - FREE tier)
1. **Create Web Service**
   - Go to [render.com](https://render.com)
   - Click "New Web Service"
   - Connect your repository

2. **Build Settings**
   ```
   Build Command: cd backend && pip install -r requirements.txt
   Start Command: cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```

### Heroku (Alternative - FREE tier limited)
1. **Install Heroku CLI**
   ```bash
   # Install Heroku CLI
   npm install -g heroku
   ```

2. **Deploy**
   ```bash
   cd backend
   heroku create your-app-name
   git subtree push --prefix backend heroku main
   ```

---

## 🔧 Complete Setup Steps

### 1. Prepare Your Code
```bash
# Clone and setup
git clone your-repo
cd student-placement-predictor
npm install

# Add environment variables
cp .env.example .env
# Edit .env with your keys
```

### 2. Setup Database (Supabase)
```bash
# Go to supabase.com and create project
# Run migrations in SQL editor
# Get API keys and add to .env
```

### 3. Deploy Frontend
```bash
# Option A: Netlify
# - Connect GitHub repo to Netlify
# - Add environment variables in Netlify dashboard

# Option B: Vercel
vercel --prod

# Option C: Manual build
npm run build
# Upload dist/ folder to any static hosting
```

### 4. Deploy Backend (Optional)
```bash
# Option A: Railway
# - Connect GitHub repo to Railway
# - Select backend folder
# - Add environment variables

# Option B: Render
# - Create web service on Render
# - Connect repository
# - Set build/start commands
```

---

## 💰 Cost Breakdown

### FREE Tier Limits
| Service | FREE Tier | Paid Starts At |
|---------|-----------|----------------|
| **Netlify** | 100GB bandwidth/month | $19/month |
| **Vercel** | 100GB bandwidth/month | $20/month |
| **Supabase** | 500MB database, 2GB bandwidth | $25/month |
| **Railway** | $5 credit/month | $5/month |
| **Render** | 750 hours/month | $7/month |

### Recommended FREE Stack
- **Frontend**: Netlify (FREE)
- **Database**: Supabase (FREE tier)
- **Backend**: Railway (FREE $5 credit)
- **Total Cost**: $0/month for moderate usage

---

## 🚀 One-Click Deploy

### Deploy Frontend to Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/student-placement-predictor)

### Deploy Backend to Railway
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/your-username/student-placement-predictor&plugins=postgresql)

---

## 🔍 Monitoring & Analytics

### Free Monitoring Tools
- **Netlify Analytics**: Built-in traffic analytics
- **Supabase Dashboard**: Database usage and performance
- **Railway Metrics**: Backend performance monitoring
- **Google Analytics**: User behavior tracking

### Setup Analytics
```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🛠️ Troubleshooting

### Common Issues
1. **Build Fails**
   - Check Node.js version (use 18+)
   - Verify all dependencies are installed
   - Check environment variables

2. **Database Connection Issues**
   - Verify Supabase URL and keys
   - Check RLS policies
   - Ensure migrations ran successfully

3. **API Errors**
   - Check CORS settings
   - Verify backend deployment
   - Check environment variables

### Debug Commands
```bash
# Check build locally
npm run build
npm run preview

# Check backend locally
cd backend
python -m uvicorn app.main:app --reload

# Check database connection
# Use Supabase dashboard SQL editor
```

---

## 📈 Scaling Up

### When to Upgrade
- **Traffic**: >100GB/month bandwidth
- **Database**: >500MB storage
- **Backend**: >750 hours/month runtime

### Upgrade Path
1. **Netlify Pro**: $19/month for more bandwidth
2. **Supabase Pro**: $25/month for larger database
3. **Railway Pro**: $5/month for more backend resources

---

## 🎉 Success!

Your Student Placement Predictor is now live! 🚀

### Next Steps
1. **Share your app** with friends and get feedback
2. **Monitor usage** through platform dashboards
3. **Add features** based on user feedback
4. **Scale up** when you hit free tier limits

### Support
- Check platform documentation for issues
- Use community forums for help
- Monitor your app's performance regularly

**Your app is now helping students worldwide achieve their career dreams!** 🌟