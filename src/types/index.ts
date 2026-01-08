export interface UserProfile {
  leetcodeUsername: string;
  codeforcesUsername: string;
  codechefUsername: string;
  githubUsername: string;
  hackerrankUsername: string;
  linkedinProfile: string;
  cgpa: number;
  skills: string[];
  projectCount: number;
  resumeFile?: File;
  preferredCountries: string[];
  workExperience: number;
  englishProficiency: 'Basic' | 'Intermediate' | 'Advanced' | 'Native';
}

export interface PlatformData {
  leetcode: {
    problemsSolved: number;
    contestRating: number;
    contestsParticipated: number;
  };
  codeforces: {
    rating: number;
    maxRating: number;
    contestsParticipated: number;
  };
  codechef: {
    rating: number;
    stars: number;
    contestsParticipated: number;
  };
  github: {
    repositories: number;
    contributions: number;
    followers: number;
    languages: string[];
  };
  hackerrank: {
    problemsSolved: number;
    badges: number;
    certifications: number;
  };
  linkedin: {
    connections: number;
    endorsements: number;
    recommendations: number;
    experience: string[];
    education: string[];
    certifications: string[];
    skills: string[];
  };
}

export interface CompanyMatch {
  type: string;
  matchPercentage: number;
  description: string;
  requirements: string[];
  suggestions: string[];
  salaryRange?: string;
  locations?: string[];
}

export interface InternationalOpportunity {
  country: string;
  flag: string;
  visaType: string;
  averageSalary: string;
  topCompanies: string[];
  requirements: string[];
  advantages: string[];
  challenges: string[];
  timeToProcess: string;
  matchScore: number;
  popularCities: string[];
  workCulture: string;
}

export interface CourseRecommendation {
  title: string;
  provider: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  price: string;
  description: string;
  skills: string[];
  url: string;
  category: string;
}

export interface PredictionResult {
  overallScore: number;
  companyMatches: CompanyMatch[];
  focusAreas: string[];
  strengths: string[];
  improvements: string[];
  courseRecommendations: CourseRecommendation[];
  internationalOpportunities: InternationalOpportunity[];
  linkedinInsights?: {
    profileStrength: number;
    networkQuality: number;
    industryAlignment: number;
    suggestions: string[];
  };
  resumeScore?: number;
  resumeKeywords?: string[];
}