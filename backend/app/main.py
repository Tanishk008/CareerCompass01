from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier, GradientBoostingRegressor
from sklearn.preprocessing import StandardScaler
import joblib
import requests
from bs4 import BeautifulSoup
import json
import os
from datetime import datetime

app = FastAPI(title="Student Placement Predictor API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class UserProfile(BaseModel):
    leetcode_username: Optional[str] = ""
    codeforces_username: Optional[str] = ""
    codechef_username: Optional[str] = ""
    github_username: Optional[str] = ""
    hackerrank_username: Optional[str] = ""
    linkedin_profile: Optional[str] = ""
    cgpa: float
    skills: List[str] = []
    project_count: int = 0
    preferred_countries: List[str] = []
    work_experience: float = 0
    english_proficiency: str = "Intermediate"

class PlatformData(BaseModel):
    leetcode_problems: int = 0
    leetcode_rating: int = 0
    codeforces_rating: int = 0
    codeforces_contests: int = 0
    codechef_rating: int = 0
    codechef_stars: int = 0
    github_repos: int = 0
    github_contributions: int = 0
    github_followers: int = 0
    hackerrank_problems: int = 0
    hackerrank_badges: int = 0
    linkedin_connections: int = 0

class PredictionResponse(BaseModel):
    overall_score: int
    company_matches: List[dict]
    focus_areas: List[str]
    strengths: List[str]
    course_recommendations: List[dict]
    international_opportunities: List[dict]
    linkedin_insights: Optional[dict] = None

# Load or create ML models
def load_or_create_models():
    """Load existing models or create new ones if they don't exist"""
    try:
        # Try to load existing models
        placement_model = joblib.load('models/placement_model.pkl')
        company_model = joblib.load('models/company_model.pkl')
        scaler = joblib.load('models/scaler.pkl')
        print("Loaded existing ML models")
    except FileNotFoundError:
        # Create and train new models with synthetic data
        print("Creating new ML models with synthetic data...")
        placement_model, company_model, scaler = create_and_train_models()
        
        # Save models
        os.makedirs('models', exist_ok=True)
        joblib.dump(placement_model, 'models/placement_model.pkl')
        joblib.dump(company_model, 'models/company_model.pkl')
        joblib.dump(scaler, 'models/scaler.pkl')
        print("Created and saved new ML models")
    
    return placement_model, company_model, scaler

def create_and_train_models():
    """Create and train ML models with synthetic data"""
    # Generate synthetic training data
    np.random.seed(42)
    n_samples = 5000
    
    # Features: CGPA, LeetCode problems, Codeforces rating, Projects, Skills count, Experience
    X = np.random.rand(n_samples, 6)
    X[:, 0] = np.random.normal(7.5, 1.2, n_samples)  # CGPA (5-10)
    X[:, 1] = np.random.exponential(100, n_samples)  # LeetCode problems
    X[:, 2] = np.random.normal(1400, 300, n_samples)  # Codeforces rating
    X[:, 3] = np.random.poisson(3, n_samples)  # Projects
    X[:, 4] = np.random.poisson(8, n_samples)  # Skills count
    X[:, 5] = np.random.exponential(1.5, n_samples)  # Experience
    
    # Clip values to realistic ranges
    X[:, 0] = np.clip(X[:, 0], 5, 10)
    X[:, 1] = np.clip(X[:, 1], 0, 2000)
    X[:, 2] = np.clip(X[:, 2], 800, 3000)
    X[:, 3] = np.clip(X[:, 3], 0, 20)
    X[:, 4] = np.clip(X[:, 4], 1, 25)
    X[:, 5] = np.clip(X[:, 5], 0, 8)
    
    # Generate target variables
    # Overall placement score (0-100)
    placement_score = (
        X[:, 0] * 10 +  # CGPA weight
        X[:, 1] * 0.05 +  # LeetCode weight
        X[:, 2] * 0.03 +  # Codeforces weight
        X[:, 3] * 3 +  # Projects weight
        X[:, 4] * 2 +  # Skills weight
        X[:, 5] * 5  # Experience weight
    )
    placement_score = np.clip(placement_score / 2, 0, 100)
    
    # Company type (0: Service, 1: Product, 2: Startup, 3: FAANG)
    company_type = np.zeros(n_samples)
    company_type[placement_score > 60] = 1
    company_type[placement_score > 75] = 2
    company_type[placement_score > 85] = 3
    
    # Create and train models
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    # Placement score regression model
    placement_model = GradientBoostingRegressor(n_estimators=100, random_state=42)
    placement_model.fit(X_scaled, placement_score)
    
    # Company type classification model
    company_model = RandomForestClassifier(n_estimators=100, random_state=42)
    company_model.fit(X_scaled, company_type)
    
    return placement_model, company_model, scaler

# Initialize models
placement_model, company_model, scaler = load_or_create_models()

# Platform data fetching functions
async def fetch_leetcode_data(username: str) -> dict:
    """Fetch LeetCode user data"""
    try:
        # LeetCode GraphQL API
        url = "https://leetcode.com/graphql"
        query = """
        query getUserProfile($username: String!) {
            matchedUser(username: $username) {
                submitStats: submitStatsGlobal {
                    acSubmissionNum {
                        difficulty
                        count
                    }
                }
                profile {
                    ranking
                }
            }
        }
        """
        
        response = requests.post(url, json={
            'query': query,
            'variables': {'username': username}
        }, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get('data', {}).get('matchedUser'):
                user_data = data['data']['matchedUser']
                total_solved = sum([
                    item['count'] for item in 
                    user_data.get('submitStats', {}).get('acSubmissionNum', [])
                ])
                return {
                    'problems_solved': total_solved,
                    'ranking': user_data.get('profile', {}).get('ranking', 0)
                }
    except Exception as e:
        print(f"Error fetching LeetCode data: {e}")
    
    return {'problems_solved': 0, 'ranking': 0}

async def fetch_codeforces_data(username: str) -> dict:
    """Fetch Codeforces user data"""
    try:
        url = f"https://codeforces.com/api/user.info?handles={username}"
        response = requests.get(url, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data['status'] == 'OK':
                user = data['result'][0]
                return {
                    'rating': user.get('rating', 0),
                    'max_rating': user.get('maxRating', 0),
                    'rank': user.get('rank', 'unrated')
                }
    except Exception as e:
        print(f"Error fetching Codeforces data: {e}")
    
    return {'rating': 0, 'max_rating': 0, 'rank': 'unrated'}

async def fetch_github_data(username: str) -> dict:
    """Fetch GitHub user data"""
    try:
        # GitHub API
        headers = {'Accept': 'application/vnd.github.v3+json'}
        
        # User info
        user_url = f"https://api.github.com/users/{username}"
        user_response = requests.get(user_url, headers=headers, timeout=10)
        
        if user_response.status_code == 200:
            user_data = user_response.json()
            
            # Repositories
            repos_url = f"https://api.github.com/users/{username}/repos"
            repos_response = requests.get(repos_url, headers=headers, timeout=10)
            
            repos_data = repos_response.json() if repos_response.status_code == 200 else []
            
            return {
                'public_repos': user_data.get('public_repos', 0),
                'followers': user_data.get('followers', 0),
                'following': user_data.get('following', 0),
                'total_stars': sum([repo.get('stargazers_count', 0) for repo in repos_data])
            }
    except Exception as e:
        print(f"Error fetching GitHub data: {e}")
    
    return {'public_repos': 0, 'followers': 0, 'following': 0, 'total_stars': 0}

@app.get("/")
async def root():
    return {"message": "Student Placement Predictor API", "version": "1.0.0"}

@app.post("/api/fetch-platform-data")
async def fetch_platform_data(profile: UserProfile):
    """Fetch data from various coding platforms"""
    platform_data = PlatformData()
    
    # Fetch LeetCode data
    if profile.leetcode_username:
        leetcode_data = await fetch_leetcode_data(profile.leetcode_username)
        platform_data.leetcode_problems = leetcode_data['problems_solved']
        platform_data.leetcode_rating = leetcode_data['ranking']
    
    # Fetch Codeforces data
    if profile.codeforces_username:
        cf_data = await fetch_codeforces_data(profile.codeforces_username)
        platform_data.codeforces_rating = cf_data['rating']
    
    # Fetch GitHub data
    if profile.github_username:
        github_data = await fetch_github_data(profile.github_username)
        platform_data.github_repos = github_data['public_repos']
        platform_data.github_followers = github_data['followers']
    
    return platform_data

@app.post("/api/predict-placement", response_model=PredictionResponse)
async def predict_placement(profile: UserProfile):
    """Main prediction endpoint"""
    try:
        # Fetch platform data
        platform_data = await fetch_platform_data(profile)
        
        # Prepare features for ML model
        features = np.array([[
            profile.cgpa,
            platform_data.leetcode_problems,
            platform_data.codeforces_rating,
            profile.project_count,
            len(profile.skills),
            profile.work_experience
        ]])
        
        # Scale features
        features_scaled = scaler.transform(features)
        
        # Make predictions
        overall_score = int(placement_model.predict(features_scaled)[0])
        company_type_prob = company_model.predict_proba(features_scaled)[0]
        
        # Generate company matches
        company_types = ['Service-based', 'Product-based', 'Startup', 'FAANG']
        company_matches = []
        
        for i, (company_type, prob) in enumerate(zip(company_types, company_type_prob)):
            company_matches.append({
                'type': company_type,
                'match_percentage': int(prob * 100),
                'description': f'Match probability for {company_type} companies',
                'requirements': get_company_requirements(company_type),
                'suggestions': get_improvement_suggestions(profile, platform_data)
            })
        
        # Sort by match percentage
        company_matches.sort(key=lambda x: x['match_percentage'], reverse=True)
        
        # Generate focus areas and strengths
        focus_areas = generate_focus_areas(profile, platform_data, overall_score)
        strengths = generate_strengths(profile, platform_data, overall_score)
        
        # Get course recommendations
        course_recommendations = get_course_recommendations(focus_areas)
        
        # Get international opportunities
        international_opportunities = get_international_opportunities(profile, overall_score)
        
        # LinkedIn insights
        linkedin_insights = None
        if profile.linkedin_profile:
            linkedin_insights = generate_linkedin_insights(profile)
        
        return PredictionResponse(
            overall_score=overall_score,
            company_matches=company_matches,
            focus_areas=focus_areas,
            strengths=strengths,
            course_recommendations=course_recommendations,
            international_opportunities=international_opportunities,
            linkedin_insights=linkedin_insights
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

def get_company_requirements(company_type: str) -> List[str]:
    """Get requirements for different company types"""
    requirements = {
        'FAANG': [
            'Strong DSA skills (500+ problems)',
            'System design knowledge',
            'Previous internship experience',
            'High CGPA (8.5+)'
        ],
        'Product-based': [
            'Good DSA skills (200+ problems)',
            'Project experience',
            'Technology stack expertise',
            'Problem-solving ability'
        ],
        'Startup': [
            'Versatile skill set',
            'Quick learning ability',
            'Hands-on project experience',
            'Adaptability'
        ],
        'Service-based': [
            'Basic programming skills',
            'Good communication',
            'Willingness to learn',
            'Team collaboration'
        ]
    }
    return requirements.get(company_type, [])

def get_improvement_suggestions(profile: UserProfile, platform_data: PlatformData) -> List[str]:
    """Generate improvement suggestions"""
    suggestions = []
    
    if platform_data.leetcode_problems < 100:
        suggestions.append('Solve more LeetCode problems daily')
    
    if platform_data.codeforces_rating < 1200:
        suggestions.append('Participate in Codeforces contests')
    
    if profile.project_count < 3:
        suggestions.append('Build more projects to showcase skills')
    
    if len(profile.skills) < 5:
        suggestions.append('Learn more relevant technologies')
    
    if not profile.linkedin_profile:
        suggestions.append('Create a professional LinkedIn profile')
    
    return suggestions

def generate_focus_areas(profile: UserProfile, platform_data: PlatformData, score: int) -> List[str]:
    """Generate focus areas based on weak points"""
    focus_areas = []
    
    if platform_data.leetcode_problems < 100:
        focus_areas.append('Data Structures & Algorithms')
    
    if profile.project_count < 3:
        focus_areas.append('Project Development')
    
    if len(profile.skills) < 5:
        focus_areas.append('Technical Skills')
    
    if score > 70:
        focus_areas.append('System Design')
    
    if not profile.linkedin_profile:
        focus_areas.append('Professional Networking')
    
    return focus_areas if focus_areas else ['Continue building on strengths']

def generate_strengths(profile: UserProfile, platform_data: PlatformData, score: int) -> List[str]:
    """Generate strengths based on strong points"""
    strengths = []
    
    if profile.cgpa >= 8.0:
        strengths.append('Strong Academic Performance')
    
    if platform_data.leetcode_problems >= 200:
        strengths.append('Excellent Problem Solving')
    
    if profile.project_count >= 5:
        strengths.append('Strong Project Portfolio')
    
    if len(profile.skills) >= 8:
        strengths.append('Diverse Technical Skills')
    
    if profile.work_experience > 0:
        strengths.append('Relevant Work Experience')
    
    return strengths if strengths else ['Dedicated to learning']

def get_course_recommendations(focus_areas: List[str]) -> List[dict]:
    """Get course recommendations based on focus areas"""
    # This would typically query a course database
    # For now, returning mock data
    courses = [
        {
            'title': 'Master the Coding Interview: Data Structures + Algorithms',
            'provider': 'Udemy',
            'duration': '19 hours',
            'difficulty': 'Intermediate',
            'rating': 4.6,
            'price': '$84.99',
            'url': 'https://www.udemy.com/course/master-the-coding-interview-data-structures-algorithms/'
        }
    ]
    return courses

def get_international_opportunities(profile: UserProfile, score: int) -> List[dict]:
    """Get international job opportunities"""
    # Mock international opportunities
    opportunities = [
        {
            'country': 'United States',
            'match_score': min(score + 10, 100),
            'visa_type': 'H1-B',
            'average_salary': '$120,000 - $200,000',
            'top_companies': ['Google', 'Microsoft', 'Amazon']
        }
    ]
    return opportunities

def generate_linkedin_insights(profile: UserProfile) -> dict:
    """Generate LinkedIn profile insights"""
    return {
        'profile_strength': 75,
        'network_quality': 80,
        'industry_alignment': 70,
        'suggestions': [
            'Add more technical skills',
            'Get recommendations from colleagues',
            'Share technical articles'
        ]
    }

@app.post("/api/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    """Upload and analyze resume"""
    try:
        # Save uploaded file
        file_path = f"uploads/{file.filename}"
        os.makedirs("uploads", exist_ok=True)
        
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Parse resume (mock implementation)
        resume_data = {
            'score': 75,
            'keywords': ['Python', 'JavaScript', 'React', 'Machine Learning'],
            'experience_years': 2,
            'education': 'Computer Science'
        }
        
        return resume_data
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Resume upload error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)