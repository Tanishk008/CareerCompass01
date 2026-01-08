import { UserProfile, PlatformData, PredictionResult, CourseRecommendation } from '../types';
import { databaseService } from './databaseService';

// Enhanced ML service that uses database for course recommendations and caching
export const fetchPlatformData = async (profile: UserProfile): Promise<PlatformData> => {
  const platformData: PlatformData = {
    leetcode: { problemsSolved: 0, contestRating: 0, contestsParticipated: 0 },
    codeforces: { rating: 0, maxRating: 0, contestsParticipated: 0 },
    codechef: { rating: 0, stars: 0, contestsParticipated: 0 },
    github: { repositories: 0, contributions: 0, followers: 0, languages: [] },
    hackerrank: { problemsSolved: 0, badges: 0, certifications: 0 },
    linkedin: { connections: 0, endorsements: 0, recommendations: 0, experience: [], education: [], certifications: [], skills: [] }
  };

  // Try to get cached data first
  const cachePromises = [];
  
  if (profile.leetcodeUsername) {
    cachePromises.push(
      databaseService.getCachedPlatformData(profile.leetcodeUsername, 'leetcode')
        .then(cached => {
          if (cached) {
            platformData.leetcode = cached;
            return true;
          }
          return false;
        })
    );
  }

  if (profile.codeforcesUsername) {
    cachePromises.push(
      databaseService.getCachedPlatformData(profile.codeforcesUsername, 'codeforces')
        .then(cached => {
          if (cached) {
            platformData.codeforces = cached;
            return true;
          }
          return false;
        })
    );
  }

  if (profile.githubUsername) {
    cachePromises.push(
      databaseService.getCachedPlatformData(profile.githubUsername, 'github')
        .then(cached => {
          if (cached) {
            platformData.github = cached;
            return true;
          }
          return false;
        })
    );
  }

  // Wait for cache checks
  await Promise.all(cachePromises);

  // Fetch fresh data for non-cached platforms (mock implementation with realistic data)
  const fetchPromises = [];

  if (profile.leetcodeUsername && platformData.leetcode.problemsSolved === 0) {
    // Generate realistic LeetCode data based on username patterns
    const baseScore = profile.leetcodeUsername.length * 23 + profile.cgpa * 15;
    const mockData = {
      problemsSolved: Math.floor(baseScore % 800) + 50,
      contestRating: Math.floor((baseScore * 1.3) % 1000) + 1200,
      contestsParticipated: Math.floor((baseScore * 0.1) % 25) + 5
    };
    platformData.leetcode = mockData;
    fetchPromises.push(
      databaseService.cachePlatformData(profile.leetcodeUsername, 'leetcode', mockData)
    );
  }

  if (profile.codeforcesUsername && platformData.codeforces.rating === 0) {
    const baseScore = profile.codeforcesUsername.length * 31 + profile.cgpa * 20;
    const mockData = {
      rating: Math.floor((baseScore * 1.2) % 1200) + 1000,
      maxRating: Math.floor((baseScore * 1.4) % 1400) + 1100,
      contestsParticipated: Math.floor((baseScore * 0.15) % 40) + 8
    };
    platformData.codeforces = mockData;
    fetchPromises.push(
      databaseService.cachePlatformData(profile.codeforcesUsername, 'codeforces', mockData)
    );
  }

  if (profile.githubUsername && platformData.github.repositories === 0) {
    const baseScore = profile.githubUsername.length * 17 + profile.projectCount * 5;
    const mockData = {
      repositories: Math.floor((baseScore * 0.8) % 40) + 5,
      contributions: Math.floor((baseScore * 15) % 1500) + 100,
      followers: Math.floor((baseScore * 0.3) % 80) + 2,
      languages: ['JavaScript', 'Python', 'Java', 'TypeScript', 'C++'].slice(0, Math.floor(baseScore % 5) + 2)
    };
    platformData.github = mockData;
    fetchPromises.push(
      databaseService.cachePlatformData(profile.githubUsername, 'github', mockData)
    );
  }

  // Generate LinkedIn data if profile provided
  if (profile.linkedinProfile) {
    const baseScore = profile.skills.length * 10 + profile.workExperience * 50;
    platformData.linkedin = {
      connections: Math.floor((baseScore * 3) % 800) + 100,
      endorsements: Math.floor((baseScore * 0.5) % 50) + 5,
      recommendations: Math.floor((baseScore * 0.1) % 15) + 1,
      experience: profile.workExperience > 0 ? ['Software Developer', 'Intern'] : ['Student'],
      education: ['Computer Science', 'Engineering'],
      certifications: profile.skills.slice(0, 3),
      skills: profile.skills.concat(['Communication', 'Leadership', 'Teamwork'])
    };
  }

  // Cache new data
  await Promise.all(fetchPromises);

  return platformData;
};

export const predictPlacementReadiness = async (
  profile: UserProfile, 
  platformData: PlatformData
): Promise<PredictionResult> => {
  // Calculate individual scores with improved algorithm
  const cgpaScore = (profile.cgpa / 10) * 100;
  
  const dsaScore = Math.min(
    ((platformData.leetcode.problemsSolved * 0.3) + 
     (platformData.codeforces.rating * 0.04) + 
     (platformData.codechef.rating * 0.03) +
     (platformData.leetcode.contestRating * 0.02)) / 8, 
    100
  );
  
  const projectScore = Math.min(profile.projectCount * 12, 100);
  const skillsScore = Math.min(profile.skills.length * 6, 100);
  
  const githubScore = Math.min(
    (platformData.github.repositories * 1.5) + 
    (platformData.github.contributions * 0.03) +
    (platformData.github.followers * 0.8), 
    100
  );
  
  const linkedinScore = profile.linkedinProfile ? Math.min(
    (platformData.linkedin.connections * 0.08) + 
    (platformData.linkedin.endorsements * 1.2) + 
    (platformData.linkedin.recommendations * 4) +
    (platformData.linkedin.certifications.length * 3), 
    100
  ) : 0;
  
  const experienceScore = Math.min(profile.workExperience * 25, 100);
  
  const englishScore = {
    'Basic': 40,
    'Intermediate': 65,
    'Advanced': 85,
    'Native': 100
  }[profile.englishProficiency];

  // Calculate overall score with improved weights
  const overallScore = Math.round(
    (cgpaScore * 0.18) + 
    (dsaScore * 0.22) + 
    (projectScore * 0.15) + 
    (skillsScore * 0.12) + 
    (githubScore * 0.12) + 
    (linkedinScore * 0.08) + 
    (experienceScore * 0.08) +
    (englishScore * 0.05)
  );

  // Generate focus areas based on weak points
  const focusAreas: string[] = [];
  if (dsaScore < 60) focusAreas.push('Data Structures & Algorithms');
  if (projectScore < 60) focusAreas.push('Project Development');
  if (skillsScore < 60) focusAreas.push('Technical Skills');
  if (cgpaScore < 70) focusAreas.push('Academic Performance');
  if (githubScore < 50) focusAreas.push('Open Source Contributions');
  if (linkedinScore < 40 && !profile.linkedinProfile) focusAreas.push('LinkedIn Profile');
  if (englishScore < 70) focusAreas.push('English Communication');
  if (profile.preferredCountries.length === 0) focusAreas.push('International Career Planning');
  if (overallScore > 70 && dsaScore > 60) focusAreas.push('System Design');

  // Generate strengths based on strong points
  const strengths: string[] = [];
  if (cgpaScore >= 80) strengths.push('Strong Academic Performance');
  if (dsaScore >= 70) strengths.push('Excellent Problem Solving Skills');
  if (projectScore >= 70) strengths.push('Strong Project Portfolio');
  if (skillsScore >= 70) strengths.push('Diverse Technical Skills');
  if (githubScore >= 60) strengths.push('Active in Open Source');
  if (linkedinScore >= 60) strengths.push('Strong Professional Network');
  if (englishScore >= 85) strengths.push('Excellent English Communication');
  if (profile.workExperience > 1) strengths.push('Relevant Work Experience');
  if (profile.preferredCountries.length > 0) strengths.push('Clear International Goals');

  // Get course recommendations from database
  const dbCourseRecommendations = await databaseService.getCourseRecommendations(focusAreas);
  
  // Convert database courses to frontend format
  const courseRecommendations: CourseRecommendation[] = dbCourseRecommendations.map(course => ({
    title: course.title,
    provider: course.provider,
    duration: course.duration,
    difficulty: course.difficulty,
    rating: course.rating,
    price: course.price,
    description: course.description || '',
    skills: course.skills,
    url: course.url,
    category: course.category
  }));

  // Generate company matches with international focus
  const companyMatches = [
    {
      type: 'Global Tech Giants (FAANG)',
      matchPercentage: Math.max(overallScore - 15, 0),
      description: 'Top-tier global tech companies with offices worldwide',
      requirements: [
        'Strong DSA skills (500+ LeetCode problems)',
        'System design knowledge',
        'International experience preferred',
        'Strong LinkedIn presence'
      ],
      suggestions: [
        'Focus on advanced DSA problems',
        'Practice system design interviews',
        'Build international network on LinkedIn'
      ],
      salaryRange: '$120k - $300k+',
      locations: ['USA', 'Canada', 'UK', 'Singapore', 'Australia']
    },
    {
      type: 'International Startups',
      matchPercentage: Math.min(overallScore + 5, 100),
      description: 'Fast-growing startups with global ambitions',
      requirements: [
        'Versatile skill set',
        'Quick learning ability',
        'Cultural adaptability',
        'Remote work experience'
      ],
      suggestions: [
        'Develop diverse technical skills',
        'Build portfolio of international projects',
        'Improve English communication'
      ],
      salaryRange: '$60k - $150k + equity',
      locations: ['Remote', 'Berlin', 'Amsterdam', 'Toronto', 'Singapore']
    },
    {
      type: 'European Tech Companies',
      matchPercentage: Math.min(overallScore + 10, 100),
      description: 'Established tech companies in Europe with visa sponsorship',
      requirements: [
        'EU Blue Card eligibility',
        'English proficiency',
        'Relevant degree',
        'Clean background check'
      ],
      suggestions: [
        'Learn basic German/Dutch',
        'Research EU visa requirements',
        'Network with European professionals'
      ],
      salaryRange: '€50k - €90k',
      locations: ['Germany', 'Netherlands', 'Switzerland', 'Sweden']
    },
    {
      type: 'Remote-First Companies',
      matchPercentage: Math.min(overallScore + 15, 100),
      description: 'Companies offering full remote work with global teams',
      requirements: [
        'Strong communication skills',
        'Self-motivated',
        'Reliable internet',
        'Overlap with team timezones'
      ],
      suggestions: [
        'Improve async communication',
        'Build remote work portfolio',
        'Get timezone management tools'
      ],
      salaryRange: '$50k - $120k',
      locations: ['Remote Worldwide', 'Flexible Location']
    }
  ];

  // Calculate international opportunities with enhanced matching
  const internationalOpportunities = [
    {
      country: 'United States',
      flag: '🇺🇸',
      visaType: 'H1-B / L1 / O1',
      averageSalary: '$120,000 - $200,000',
      topCompanies: ['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta'],
      requirements: ['Bachelor\'s degree', 'Strong technical skills', 'English proficiency', '3+ years experience'],
      advantages: ['High salaries', 'Innovation hub', 'Career growth', 'Diverse opportunities'],
      challenges: ['Visa lottery system', 'High competition', 'Cost of living', 'Work-life balance'],
      timeToProcess: '6-12 months',
      matchScore: Math.min(overallScore + (englishScore > 80 ? 10 : 0) + (dsaScore > 70 ? 5 : 0), 100),
      popularCities: ['San Francisco', 'Seattle', 'New York', 'Austin', 'Boston'],
      workCulture: 'Fast-paced, innovation-focused, long hours but high rewards'
    },
    {
      country: 'Canada',
      flag: '🇨🇦',
      visaType: 'Express Entry / PNP',
      averageSalary: '$80,000 - $130,000 CAD',
      topCompanies: ['Shopify', 'Wealthsimple', 'Hootsuite', 'Cohere', 'Nuvei'],
      requirements: ['Bachelor\'s degree', 'IELTS/CELPIP', 'Work experience', 'Age under 35 preferred'],
      advantages: ['Path to PR', 'Healthcare', 'Quality of life', 'Multicultural'],
      challenges: ['Weather', 'Higher taxes', 'Smaller tech market', 'French requirement in Quebec'],
      timeToProcess: '6-18 months',
      matchScore: Math.min(overallScore + 8 + (englishScore > 70 ? 7 : 0), 100),
      popularCities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
      workCulture: 'Work-life balance focused, collaborative, inclusive environment'
    },
    {
      country: 'Germany',
      flag: '🇩🇪',
      visaType: 'EU Blue Card / Job Seeker',
      averageSalary: '€60,000 - €90,000',
      topCompanies: ['SAP', 'Siemens', 'BMW', 'Mercedes-Benz', 'Zalando'],
      requirements: ['University degree', 'Job offer', 'German language (B1-B2)', 'Health insurance'],
      advantages: ['Strong economy', 'Job security', 'Social benefits', 'Central Europe location'],
      challenges: ['Language barrier', 'Bureaucracy', 'Cultural adaptation', 'Lower salaries vs US'],
      timeToProcess: '3-6 months',
      matchScore: Math.min(overallScore + 3 + (englishScore > 60 ? 5 : 0), 100),
      popularCities: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Stuttgart'],
      workCulture: 'Structured, punctual, work-life balance, direct communication'
    }
  ].sort((a, b) => b.matchScore - a.matchScore);

  // Generate LinkedIn insights if profile provided
  let linkedinInsights;
  if (profile.linkedinProfile) {
    linkedinInsights = {
      profileStrength: Math.min(linkedinScore + 20, 100),
      networkQuality: Math.min(linkedinScore + 15, 100),
      industryAlignment: Math.min(linkedinScore + 10, 100),
      suggestions: [
        'Add more technical skills to your profile',
        'Get recommendations from colleagues',
        'Share technical articles and insights',
        'Connect with professionals in target countries',
        'Optimize headline for international opportunities'
      ]
    };
  }

  const result: PredictionResult = {
    overallScore,
    companyMatches,
    focusAreas: focusAreas.length > 0 ? focusAreas : ['Continue building on your strengths'],
    strengths: strengths.length > 0 ? strengths : ['Dedicated to learning and growth'],
    improvements: [
      'Practice more coding problems daily',
      'Build larger scale projects',
      'Contribute to open source projects',
      'Improve system design knowledge',
      'Strengthen LinkedIn profile',
      'Research visa requirements for target countries'
    ],
    courseRecommendations,
    internationalOpportunities,
    linkedinInsights
  };

  // Save analysis to database
  try {
    await databaseService.saveUserAnalysis(profile, result, platformData);
  } catch (error) {
    console.error('Failed to save analysis to database:', error);
    // Continue without failing the prediction
  }

  return result;
};