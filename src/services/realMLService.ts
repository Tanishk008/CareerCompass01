import { UserProfile, PredictionResult } from '../types';
import { apiService, ApiUserProfile } from './apiService';

// Convert frontend types to API types
const convertProfileToApi = (profile: UserProfile): ApiUserProfile => ({
  leetcode_username: profile.leetcodeUsername,
  codeforces_username: profile.codeforcesUsername,
  codechef_username: profile.codechefUsername,
  github_username: profile.githubUsername,
  hackerrank_username: profile.hackerrankUsername,
  linkedin_profile: profile.linkedinProfile,
  cgpa: profile.cgpa,
  skills: profile.skills,
  project_count: profile.projectCount,
  preferred_countries: profile.preferredCountries,
  work_experience: profile.workExperience,
  english_proficiency: profile.englishProficiency,
});

// Convert API response to frontend types
const convertApiResultToFrontend = (apiResult: any): PredictionResult => ({
  overallScore: apiResult.overall_score,
  companyMatches: apiResult.company_matches.map((match: any) => ({
    type: match.type,
    matchPercentage: match.match_percentage,
    description: match.description,
    requirements: match.requirements,
    suggestions: match.suggestions,
    salaryRange: match.salary_range,
    locations: match.locations,
  })),
  focusAreas: apiResult.focus_areas,
  strengths: apiResult.strengths,
  improvements: [], // This would come from suggestions
  courseRecommendations: apiResult.course_recommendations.map((course: any) => ({
    title: course.title,
    provider: course.provider,
    duration: course.duration,
    difficulty: course.difficulty as 'Beginner' | 'Intermediate' | 'Advanced',
    rating: course.rating,
    price: course.price,
    description: course.description || '',
    skills: course.skills || [],
    url: course.url,
    category: course.category || 'General',
  })),
  internationalOpportunities: apiResult.international_opportunities.map((opp: any) => ({
    country: opp.country,
    flag: getCountryFlag(opp.country),
    visaType: opp.visa_type,
    averageSalary: opp.average_salary,
    topCompanies: opp.top_companies,
    requirements: opp.requirements || [],
    advantages: opp.advantages || [],
    challenges: opp.challenges || [],
    timeToProcess: opp.time_to_process || 'N/A',
    matchScore: opp.match_score,
    popularCities: opp.popular_cities || [],
    workCulture: opp.work_culture || 'Professional environment',
  })),
  linkedinInsights: apiResult.linkedin_insights ? {
    profileStrength: apiResult.linkedin_insights.profile_strength,
    networkQuality: apiResult.linkedin_insights.network_quality,
    industryAlignment: apiResult.linkedin_insights.industry_alignment,
    suggestions: apiResult.linkedin_insights.suggestions,
  } : undefined,
});

const getCountryFlag = (country: string): string => {
  const flags: { [key: string]: string } = {
    'United States': '🇺🇸',
    'Canada': '🇨🇦',
    'Germany': '🇩🇪',
    'Netherlands': '🇳🇱',
    'Australia': '🇦🇺',
    'United Kingdom': '🇬🇧',
    'Singapore': '🇸🇬',
    'Switzerland': '🇨🇭',
  };
  return flags[country] || '🌍';
};

export const fetchPlatformData = async (profile: UserProfile) => {
  try {
    const apiProfile = convertProfileToApi(profile);
    const platformData = await apiService.fetchPlatformData(apiProfile);
    
    // Convert to expected format
    return {
      leetcode: {
        problemsSolved: platformData.leetcode_problems,
        contestRating: platformData.leetcode_rating,
        contestsParticipated: 0, // Would need additional API call
      },
      codeforces: {
        rating: platformData.codeforces_rating,
        maxRating: platformData.codeforces_rating,
        contestsParticipated: 0, // Would need additional API call
      },
      codechef: {
        rating: 0, // Would need CodeChef API
        stars: 0,
        contestsParticipated: 0,
      },
      github: {
        repositories: platformData.github_repos,
        contributions: 0, // Would need GitHub contributions API
        followers: platformData.github_followers,
        languages: [], // Would need additional API call
      },
      hackerrank: {
        problemsSolved: 0, // Would need HackerRank API
        badges: 0,
        certifications: 0,
      },
      linkedin: {
        connections: 0, // LinkedIn API is restricted
        endorsements: 0,
        recommendations: 0,
        experience: [],
        education: [],
        certifications: [],
        skills: [],
      },
    };
  } catch (error) {
    console.error('Error fetching platform data:', error);
    throw error;
  }
};

export const predictPlacementReadiness = async (
  profile: UserProfile,
  platformData: any
): Promise<PredictionResult> => {
  try {
    const apiProfile = convertProfileToApi(profile);
    const apiResult = await apiService.predictPlacement(apiProfile);
    
    return convertApiResultToFrontend(apiResult);
  } catch (error) {
    console.error('Error predicting placement readiness:', error);
    throw error;
  }
};

export const uploadAndAnalyzeResume = async (file: File) => {
  try {
    const result = await apiService.uploadResume(file);
    return {
      score: result.score,
      keywords: result.keywords,
      experienceYears: result.experience_years,
      education: result.education,
    };
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw error;
  }
};