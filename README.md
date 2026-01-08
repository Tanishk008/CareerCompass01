🔗 **Live Website**:(https://tanishk008-careercom-x1jq.bolt.host/)

# 🎯 CareerCompass

An AI-powered web application that analyzes students' coding profiles and technical skills to predict global placement readiness and suggest personalized career paths.

![Student Placement Predictor](https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## 🌟 Features

### 🤖 AI-Powered Analysis
- **Smart Profile Analysis**: Analyzes coding platform data, academic performance, and skills
- **Placement Readiness Score**: Get a comprehensive score out of 100
- **Company Matching**: AI-driven recommendations for FAANG, startups, and international companies
- **Focus Areas**: Personalized improvement suggestions based on weak points

### 🌍 Global Career Opportunities
- **International Job Markets**: Detailed analysis for 8+ countries (USA, Canada, Germany, etc.)
- **Visa Information**: Complete visa requirements, processing times, and salary ranges
- **Work Culture Insights**: Understand work environments in different countries
- **City Recommendations**: Popular tech hubs and their advantages/challenges

### 📚 Personalized Learning Path
- **Course Recommendations**: 20+ curated courses based on your focus areas
- **Skill Gap Analysis**: Identify missing skills for target companies
- **Learning Roadmap**: Step-by-step guidance for career advancement
- **Progress Tracking**: Monitor your improvement over time

### 💼 Professional Development
- **LinkedIn Profile Analysis**: Optimize your professional presence
- **Resume Insights**: Upload and analyze your resume for keyword matching
- **Network Building**: Connect with professionals in target countries
- **Interview Preparation**: Company-specific interview guidance

## 🚀 Live Demo

**🌐 [Try the App Live](https://tanishk008-careercom-x1jq.bolt.host/)**

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Vite** for build tooling

### Backend & Database
- **Supabase** for database and authentication
- **PostgreSQL** with Row Level Security
- **Real-time subscriptions** for live updates
- **Edge Functions** for serverless computing

### AI & Analytics
- **Machine Learning Models** for placement prediction
- **Platform APIs** integration (LeetCode, Codeforces, GitHub)
- **Smart Caching** for performance optimization
- **Analytics Dashboard** for insights

## 🎯 How It Works

### 1. Profile Input
- Enter your coding platform usernames
- Add academic details (CGPA, projects, skills)
- Upload resume (optional)
- Select preferred countries

### 2. AI Analysis
- Fetches real data from coding platforms
- Analyzes your strengths and weaknesses
- Calculates placement readiness score
- Generates personalized recommendations

### 3. Results Dashboard
- **Overall Score**: Your global placement readiness
- **Company Matches**: Best-fit companies with match percentages
- **International Opportunities**: Country-wise analysis with visa info
- **Learning Path**: Personalized course recommendations
- **Action Plan**: Step-by-step improvement guide

## 🌍 Supported Countries

| Country | Visa Type | Avg Salary | Processing Time |
|---------|-----------|------------|-----------------|
| 🇺🇸 USA | H1-B, L1, O1 | $120k-$200k | 6-12 months |
| 🇨🇦 Canada | Express Entry | $80k-$130k CAD | 6-18 months |
| 🇩🇪 Germany | EU Blue Card | €60k-€90k | 3-6 months |
| 🇳🇱 Netherlands | HSM Visa | €55k-€85k | 2-4 months |
| 🇦🇺 Australia | Skilled Independent | $90k-$140k AUD | 8-12 months |
| 🇬🇧 UK | Skilled Worker | £45k-£80k | 3-8 weeks |
| 🇸🇬 Singapore | Employment Pass | $70k-$120k SGD | 2-4 weeks |
| 🇨🇭 Switzerland | L/B Permit | CHF 90k-140k | 2-6 months |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/student-placement-predictor.git
cd student-placement-predictor
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
cp .env.example .env
# Edit .env with your Supabase credentials
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Open in Browser
Visit `http://localhost:5173`

## 🗄️ Database Setup (Optional)

The app works with mock data by default. For full functionality:

### 1. Create Supabase Project
- Go to [supabase.com](https://supabase.com)
- Create new project: `student-placement-predictor`

### 2. Run Migrations
Copy and run SQL files from `supabase/migrations/` in order

### 3. Get API Keys
- Project URL and anon key from Supabase dashboard
- Add to `.env` file

**See [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md) for detailed guide**

## 🚀 Deployment

### Deploy to Netlify (FREE)
```bash
# Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# Deploy on Netlify
# 1. Connect GitHub repo
# 2. Add environment variables
# 3. Deploy!
```

### Deploy to Vercel (FREE)
```bash
npm i -g vercel
vercel --prod
```

**See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for complete instructions**

## 📊 Features Breakdown

### 🎯 Placement Prediction Algorithm
- **Academic Performance** (18%): CGPA and educational background
- **DSA Skills** (22%): LeetCode, Codeforces performance
- **Project Portfolio** (15%): Number and quality of projects
- **Technical Skills** (12%): Programming languages and frameworks
- **Open Source** (12%): GitHub activity and contributions
- **Professional Network** (8%): LinkedIn presence and connections
- **Work Experience** (8%): Internships and job experience
- **Communication** (5%): English proficiency level

### 🏢 Company Categories
- **FAANG**: Google, Meta, Amazon, Apple, Netflix
- **International Startups**: High-growth companies with global presence
- **European Tech**: SAP, Spotify, Klarna, Adyen
- **Remote-First**: Companies offering worldwide remote work

### 📈 Analytics & Insights
- **User Journey Tracking**: Monitor progress over time
- **Popular Skills**: Trending technologies in your target market
- **Success Patterns**: Learn from successful placements
- **Market Trends**: Stay updated with industry demands

## 🤝 Contributing

We welcome contributions! Here's how:

### 1. Fork the Repository
```bash
git fork https://github.com/YOUR_USERNAME/student-placement-predictor.git
```

### 2. Create Feature Branch
```bash
git checkout -b feature/amazing-feature
```

### 3. Make Changes
- Follow TypeScript best practices
- Add tests for new features
- Update documentation

### 4. Submit Pull Request
```bash
git commit -m "Add amazing feature"
git push origin feature/amazing-feature
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

Created by Runtime Terrors:

- **Tanishk Gupta** - Full-stack Development & AI Integration
- **Srashti Gupta** - Machine Learning & Frontend Development

## 🙏 Acknowledgments

- **Platform APIs**: LeetCode, Codeforces, GitHub for data integration
- **UI Framework**: React, Tailwind CSS, Framer Motion for beautiful interfaces
- **Database**: Supabase for real-time data and authentication
- **Deployment**: Netlify and Vercel for free hosting
- **Community**: Open source contributors and beta testers

## 📞 Support

- **Documentation**: Check our detailed guides
- **Issues**: Report bugs on GitHub Issues
- **Discussions**: Join GitHub Discussions for questions
- **Email**: Contact us for enterprise inquiries

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=YOUR_USERNAME/student-placement-predictor&type=Date)](https://star-history.com/#YOUR_USERNAME/student-placement-predictor&Date)

---

**Empowering students worldwide to achieve their career dreams through AI-driven insights**

*Made by Runtime Terrors*

Copyright 2026 CareerCompass. All rights reserved.

