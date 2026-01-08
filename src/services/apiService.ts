const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface ApiUserProfile {
  leetcode_username?: string;
  codeforces_username?: string;
  codechef_username?: string;
  github_username?: string;
  hackerrank_username?: string;
  linkedin_profile?: string;
  cgpa: number;
  skills: string[];
  project_count: number;
  preferred_countries: string[];
  work_experience: number;
  english_proficiency: string;
}

export interface ApiPredictionResult {
  overall_score: number;
  company_matches: Array<{
    type: string;
    match_percentage: number;
    description: string;
    requirements: string[];
    suggestions: string[];
    salary_range?: string;
    locations?: string[];
  }>;
  focus_areas: string[];
  strengths: string[];
  course_recommendations: Array<{
    title: string;
    provider: string;
    duration: string;
    difficulty: string;
    rating: number;
    price: string;
    url: string;
  }>;
  international_opportunities: Array<{
    country: string;
    match_score: number;
    visa_type: string;
    average_salary: string;
    top_companies: string[];
  }>;
  linkedin_insights?: {
    profile_strength: number;
    network_quality: number;
    industry_alignment: number;
    suggestions: string[];
  };
}

class ApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    const response = await fetch(url, { ...defaultOptions, ...options });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async predictPlacement(profile: ApiUserProfile): Promise<ApiPredictionResult> {
    return this.makeRequest<ApiPredictionResult>('/api/predict-placement', {
      method: 'POST',
      body: JSON.stringify(profile),
    });
  }

  async uploadResume(file: File): Promise<{
    score: number;
    keywords: string[];
    experience_years: number;
    education: string;
  }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.makeRequest('/api/upload-resume', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  }

  async fetchPlatformData(profile: ApiUserProfile): Promise<{
    leetcode_problems: number;
    leetcode_rating: number;
    codeforces_rating: number;
    github_repos: number;
    github_followers: number;
  }> {
    return this.makeRequest('/api/fetch-platform-data', {
      method: 'POST',
      body: JSON.stringify(profile),
    });
  }

  async healthCheck(): Promise<{ message: string; version: string }> {
    return this.makeRequest('/');
  }
}

export const apiService = new ApiService();