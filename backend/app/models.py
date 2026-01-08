from sqlalchemy import Column, Integer, String, Float, DateTime, Text, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from datetime import datetime

Base = declarative_base()

class UserAnalysis(Base):
    __tablename__ = "user_analyses"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)
    cgpa = Column(Float)
    leetcode_problems = Column(Integer, default=0)
    codeforces_rating = Column(Integer, default=0)
    github_repos = Column(Integer, default=0)
    project_count = Column(Integer, default=0)
    skills_count = Column(Integer, default=0)
    work_experience = Column(Float, default=0)
    overall_score = Column(Integer)
    predicted_company_type = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
class PlatformCache(Base):
    __tablename__ = "platform_cache"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True)
    platform = Column(String)
    data = Column(Text)  # JSON data
    last_updated = Column(DateTime, default=datetime.utcnow)
    is_valid = Column(Boolean, default=True)

# Database setup
DATABASE_URL = "sqlite:///./placement_predictor.db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables
Base.metadata.create_all(bind=engine)