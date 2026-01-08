import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier, GradientBoostingRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, mean_squared_error
import joblib
import os

def generate_training_data(n_samples=10000):
    """Generate synthetic training data for the ML model"""
    np.random.seed(42)
    
    # Generate features
    data = {
        'cgpa': np.random.normal(7.5, 1.2, n_samples),
        'leetcode_problems': np.random.exponential(150, n_samples),
        'codeforces_rating': np.random.normal(1400, 400, n_samples),
        'project_count': np.random.poisson(4, n_samples),
        'skills_count': np.random.poisson(8, n_samples),
        'work_experience': np.random.exponential(1.2, n_samples),
        'github_repos': np.random.poisson(12, n_samples),
        'contest_participation': np.random.poisson(15, n_samples),
        'open_source_contributions': np.random.poisson(5, n_samples),
        'internship_experience': np.random.binomial(1, 0.6, n_samples)
    }
    
    # Clip values to realistic ranges
    data['cgpa'] = np.clip(data['cgpa'], 5.0, 10.0)
    data['leetcode_problems'] = np.clip(data['leetcode_problems'], 0, 2000)
    data['codeforces_rating'] = np.clip(data['codeforces_rating'], 800, 3500)
    data['project_count'] = np.clip(data['project_count'], 0, 25)
    data['skills_count'] = np.clip(data['skills_count'], 1, 30)
    data['work_experience'] = np.clip(data['work_experience'], 0, 8)
    data['github_repos'] = np.clip(data['github_repos'], 0, 100)
    data['contest_participation'] = np.clip(data['contest_participation'], 0, 100)
    data['open_source_contributions'] = np.clip(data['open_source_contributions'], 0, 50)
    
    df = pd.DataFrame(data)
    
    # Generate target variables
    # Overall placement readiness score (0-100)
    placement_score = (
        df['cgpa'] * 8 +
        df['leetcode_problems'] * 0.08 +
        df['codeforces_rating'] * 0.04 +
        df['project_count'] * 4 +
        df['skills_count'] * 2.5 +
        df['work_experience'] * 6 +
        df['github_repos'] * 1.5 +
        df['contest_participation'] * 0.8 +
        df['open_source_contributions'] * 2 +
        df['internship_experience'] * 15
    )
    
    # Normalize to 0-100 scale
    placement_score = np.clip(placement_score / 2.5, 0, 100)
    df['placement_score'] = placement_score
    
    # Company type classification
    # 0: Service-based, 1: Product-based, 2: Startup, 3: FAANG
    company_type = np.zeros(n_samples)
    company_type[(placement_score >= 50) & (placement_score < 70)] = 1  # Product-based
    company_type[(placement_score >= 70) & (placement_score < 85)] = 2  # Startup
    company_type[placement_score >= 85] = 3  # FAANG
    
    # Add some randomness
    noise = np.random.normal(0, 0.1, n_samples)
    company_type = np.clip(company_type + noise, 0, 3).astype(int)
    
    df['company_type'] = company_type
    
    return df

def train_models():
    """Train and save ML models"""
    print("Generating training data...")
    df = generate_training_data(10000)
    
    # Prepare features
    feature_columns = [
        'cgpa', 'leetcode_problems', 'codeforces_rating', 
        'project_count', 'skills_count', 'work_experience',
        'github_repos', 'contest_participation', 'open_source_contributions',
        'internship_experience'
    ]
    
    X = df[feature_columns]
    y_score = df['placement_score']
    y_company = df['company_type']
    
    # Split data
    X_train, X_test, y_score_train, y_score_test, y_company_train, y_company_test = train_test_split(
        X, y_score, y_company, test_size=0.2, random_state=42
    )
    
    # Scale features
    print("Scaling features...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train placement score regression model
    print("Training placement score model...")
    score_model = GradientBoostingRegressor(
        n_estimators=200,
        learning_rate=0.1,
        max_depth=6,
        random_state=42
    )
    score_model.fit(X_train_scaled, y_score_train)
    
    # Train company type classification model
    print("Training company type model...")
    company_model = RandomForestClassifier(
        n_estimators=200,
        max_depth=10,
        random_state=42
    )
    company_model.fit(X_train_scaled, y_company_train)
    
    # Evaluate models
    score_pred = score_model.predict(X_test_scaled)
    company_pred = company_model.predict(X_test_scaled)
    
    score_mse = mean_squared_error(y_score_test, score_pred)
    company_acc = accuracy_score(y_company_test, company_pred)
    
    print(f"Placement Score Model - MSE: {score_mse:.2f}")
    print(f"Company Type Model - Accuracy: {company_acc:.3f}")
    
    # Save models
    os.makedirs('models', exist_ok=True)
    joblib.dump(score_model, 'models/placement_model.pkl')
    joblib.dump(company_model, 'models/company_model.pkl')
    joblib.dump(scaler, 'models/scaler.pkl')
    
    print("Models saved successfully!")
    
    # Save feature importance
    feature_importance = pd.DataFrame({
        'feature': feature_columns,
        'importance': score_model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    print("\nFeature Importance:")
    print(feature_importance)
    
    return score_model, company_model, scaler

if __name__ == "__main__":
    train_models()