import { UserProfile, PlatformData, PredictionResult, CompanyMatch, CourseRecommendation, InternationalOpportunity } from '../types';

// Mock course database
const courseDatabase: CourseRecommendation[] = [
  // DSA Courses
  {
    title: "Master the Coding Interview: Data Structures + Algorithms",
    provider: "Udemy",
    duration: "19 hours",
    difficulty: "Intermediate",
    rating: 4.6,
    price: "$84.99",
    description: "Complete guide to ace coding interviews at top tech companies",
    skills: ["Data Structures", "Algorithms", "Problem Solving"],
    url: "https://www.udemy.com/course/master-the-coding-interview-data-structures-algorithms/",
    category: "DSA"
  },
  {
    title: "Algorithms Specialization",
    provider: "Coursera (Stanford)",
    duration: "4 months",
    difficulty: "Advanced",
    rating: 4.8,
    price: "$49/month",
    description: "Comprehensive algorithms course from Stanford University",
    skills: ["Advanced Algorithms", "Graph Theory", "Dynamic Programming"],
    url: "https://www.coursera.org/specializations/algorithms",
    category: "DSA"
  },
  {
    title: "Data Structures and Algorithms in Python",
    provider: "Udacity",
    duration: "4 months",
    difficulty: "Intermediate",
    rating: 4.4,
    price: "$399/month",
    description: "Learn DSA with Python implementation and real-world projects",
    skills: ["Python", "Data Structures", "Algorithms"],
    url: "https://www.udacity.com/course/data-structures-and-algorithms-nanodegree--nd256",
    category: "DSA"
  },

  // System Design Courses
  {
    title: "System Design Interview Course",
    provider: "Educative",
    duration: "12 weeks",
    difficulty: "Advanced",
    rating: 4.7,
    price: "$79/month",
    description: "Master system design for FAANG interviews",
    skills: ["System Design", "Scalability", "Architecture"],
    url: "https://www.educative.io/courses/grokking-the-system-design-interview",
    category: "System Design"
  },
  {
    title: "Designing Data-Intensive Applications",
    provider: "O'Reilly",
    duration: "Self-paced",
    difficulty: "Advanced",
    rating: 4.9,
    price: "$49.99",
    description: "Deep dive into building scalable, reliable systems",
    skills: ["Distributed Systems", "Database Design", "System Architecture"],
    url: "https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/",
    category: "System Design"
  },

  // Web Development Courses
  {
    title: "The Complete Web Developer Bootcamp",
    provider: "Udemy",
    duration: "65 hours",
    difficulty: "Beginner",
    rating: 4.7,
    price: "$84.99",
    description: "Full-stack web development from scratch",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    url: "https://www.udemy.com/course/the-complete-web-development-bootcamp/",
    category: "Web Development"
  },
  {
    title: "React - The Complete Guide",
    provider: "Udemy",
    duration: "48 hours",
    difficulty: "Intermediate",
    rating: 4.6,
    price: "$84.99",
    description: "Master React with hooks, context, and advanced patterns",
    skills: ["React", "JavaScript", "Frontend Development"],
    url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
    category: "Web Development"
  },
  {
    title: "Full Stack Open",
    provider: "University of Helsinki",
    duration: "12 weeks",
    difficulty: "Intermediate",
    rating: 4.8,
    price: "Free",
    description: "Modern full stack development with React, Node.js, and GraphQL",
    skills: ["React", "Node.js", "GraphQL", "MongoDB"],
    url: "https://fullstackopen.com/en/",
    category: "Web Development"
  },

  // Machine Learning Courses
  {
    title: "Machine Learning Course",
    provider: "Coursera (Stanford)",
    duration: "11 weeks",
    difficulty: "Intermediate",
    rating: 4.9,
    price: "$49/month",
    description: "Andrew Ng's famous machine learning course",
    skills: ["Machine Learning", "Python", "Statistics"],
    url: "https://www.coursera.org/learn/machine-learning",
    category: "Machine Learning"
  },
  {
    title: "Deep Learning Specialization",
    provider: "Coursera (deeplearning.ai)",
    duration: "4 months",
    difficulty: "Advanced",
    rating: 4.8,
    price: "$49/month",
    description: "Comprehensive deep learning specialization",
    skills: ["Deep Learning", "Neural Networks", "TensorFlow"],
    url: "https://www.coursera.org/specializations/deep-learning",
    category: "Machine Learning"
  },

  // Mobile Development Courses
  {
    title: "React Native - The Practical Guide",
    provider: "Udemy",
    duration: "32 hours",
    difficulty: "Intermediate",
    rating: 4.6,
    price: "$84.99",
    description: "Build native mobile apps with React Native",
    skills: ["React Native", "Mobile Development", "JavaScript"],
    url: "https://www.udemy.com/course/react-native-the-practical-guide/",
    category: "Mobile Development"
  },
  {
    title: "Flutter & Dart - The Complete Guide",
    provider: "Udemy",
    duration: "40 hours",
    difficulty: "Beginner",
    rating: 4.5,
    price: "$84.99",
    description: "Build beautiful native apps with Flutter",
    skills: ["Flutter", "Dart", "Mobile Development"],
    url: "https://www.udemy.com/course/learn-flutter-dart-to-build-ios-android-apps/",
    category: "Mobile Development"
  },

  // DevOps Courses
  {
    title: "Docker and Kubernetes: The Complete Guide",
    provider: "Udemy",
    duration: "21 hours",
    difficulty: "Intermediate",
    rating: 4.6,
    price: "$84.99",
    description: "Master containerization and orchestration",
    skills: ["Docker", "Kubernetes", "DevOps"],
    url: "https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/",
    category: "DevOps"
  },
  {
    title: "AWS Certified Solutions Architect",
    provider: "A Cloud Guru",
    duration: "20 hours",
    difficulty: "Intermediate",
    rating: 4.5,
    price: "$39/month",
    description: "Prepare for AWS certification and cloud architecture",
    skills: ["AWS", "Cloud Computing", "System Architecture"],
    url: "https://acloudguru.com/course/aws-certified-solutions-architect-associate-saa-c02",
    category: "Cloud Computing"
  },

  // Competitive Programming
  {
    title: "Competitive Programming Essentials",
    provider: "CodeChef",
    duration: "8 weeks",
    difficulty: "Intermediate",
    rating: 4.4,
    price: "Free",
    description: "Master competitive programming techniques",
    skills: ["Competitive Programming", "Algorithms", "Problem Solving"],
    url: "https://www.codechef.com/ide",
    category: "Competitive Programming"
  },
  {
    title: "Advanced Algorithms and Data Structures",
    provider: "Codeforces",
    duration: "Self-paced",
    difficulty: "Advanced",
    rating: 4.6,
    price: "Free",
    description: "Advanced topics for competitive programming",
    skills: ["Advanced Algorithms", "Graph Theory", "Number Theory"],
    url: "https://codeforces.com/edu/courses",
    category: "Competitive Programming"
  }
];

// International opportunities database
const internationalOpportunities: InternationalOpportunity[] = [
  {
    country: "United States",
    flag: "🇺🇸",
    visaType: "H1-B / L1 / O1",
    averageSalary: "$120,000 - $200,000",
    topCompanies: ["Google", "Microsoft", "Amazon", "Apple", "Meta"],
    requirements: ["Bachelor's degree", "Strong technical skills", "English proficiency", "3+ years experience"],
    advantages: ["High salaries", "Innovation hub", "Career growth", "Diverse opportunities"],
    challenges: ["Visa lottery system", "High competition", "Cost of living", "Work-life balance"],
    timeToProcess: "6-12 months",
    matchScore: 0,
    popularCities: ["San Francisco", "Seattle", "New York", "Austin", "Boston"],
    workCulture: "Fast-paced, innovation-focused, long hours but high rewards"
  },
  {
    country: "Canada",
    flag: "🇨🇦",
    visaType: "Express Entry / PNP",
    averageSalary: "$80,000 - $130,000 CAD",
    topCompanies: ["Shopify", "Wealthsimple", "Hootsuite", "Cohere", "Nuvei"],
    requirements: ["Bachelor's degree", "IELTS/CELPIP", "Work experience", "Age under 35 preferred"],
    advantages: ["Path to PR", "Healthcare", "Quality of life", "Multicultural"],
    challenges: ["Weather", "Higher taxes", "Smaller tech market", "French requirement in Quebec"],
    timeToProcess: "6-18 months",
    matchScore: 0,
    popularCities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
    workCulture: "Work-life balance focused, collaborative, inclusive environment"
  },
  {
    country: "Germany",
    flag: "🇩🇪",
    visaType: "EU Blue Card / Job Seeker",
    averageSalary: "€60,000 - €90,000",
    topCompanies: ["SAP", "Siemens", "BMW", "Mercedes-Benz", "Zalando"],
    requirements: ["University degree", "Job offer", "German language (B1-B2)", "Health insurance"],
    advantages: ["Strong economy", "Job security", "Social benefits", "Central Europe location"],
    challenges: ["Language barrier", "Bureaucracy", "Cultural adaptation", "Lower salaries vs US"],
    timeToProcess: "3-6 months",
    matchScore: 0,
    popularCities: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Stuttgart"],
    workCulture: "Structured, punctual, work-life balance, direct communication"
  },
  {
    country: "Netherlands",
    flag: "🇳🇱",
    visaType: "Highly Skilled Migrant",
    averageSalary: "€55,000 - €85,000",
    topCompanies: ["Booking.com", "Adyen", "Philips", "ASML", "ING"],
    requirements: ["University degree", "Salary threshold €38,961", "Recognized sponsor", "English proficiency"],
    advantages: ["English-friendly", "Bike culture", "Central location", "Progressive society"],
    challenges: ["Housing shortage", "High cost of living", "Weather", "Dutch language for long-term"],
    timeToProcess: "2-4 months",
    matchScore: 0,
    popularCities: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven"],
    workCulture: "Flat hierarchy, direct feedback, flexible hours, cycling to work"
  },
  {
    country: "Australia",
    flag: "🇦🇺",
    visaType: "Skilled Independent / Employer Sponsored",
    averageSalary: "$90,000 - $140,000 AUD",
    topCompanies: ["Atlassian", "Canva", "Afterpay", "REA Group", "Seek"],
    requirements: ["Skills assessment", "English test", "Age under 45", "Points test"],
    advantages: ["High quality of life", "Beautiful nature", "Multicultural", "Strong economy"],
    challenges: ["Distance from family", "High cost of living", "Visa complexity", "Limited tech scene"],
    timeToProcess: "8-12 months",
    matchScore: 0,
    popularCities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
    workCulture: "Relaxed, outdoor lifestyle, work-life balance, 'fair dinkum' attitude"
  },
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    visaType: "Skilled Worker / Global Talent",
    averageSalary: "£45,000 - £80,000",
    topCompanies: ["DeepMind", "Revolut", "Monzo", "Deliveroo", "ARM"],
    requirements: ["Job offer", "English proficiency", "Salary threshold £26,200", "Sponsor license"],
    advantages: ["English speaking", "Financial hub", "Rich culture", "Gateway to Europe"],
    challenges: ["Brexit impact", "Weather", "High taxes", "Cost of living in London"],
    timeToProcess: "3-8 weeks",
    matchScore: 0,
    popularCities: ["London", "Manchester", "Edinburgh", "Bristol", "Cambridge"],
    workCulture: "Professional, polite, pub culture, queue etiquette, dry humor"
  },
  {
    country: "Singapore",
    flag: "🇸🇬",
    visaType: "Employment Pass / Tech.Pass",
    averageSalary: "$70,000 - $120,000 SGD",
    topCompanies: ["Grab", "Sea Limited", "Shopee", "Razer", "PropertyGuru"],
    requirements: ["University degree", "Salary threshold $5,000", "Relevant experience", "English proficiency"],
    advantages: ["Tax benefits", "Strategic location", "Multicultural", "Safety"],
    challenges: ["High cost of living", "Humid weather", "Competitive market", "Small country"],
    timeToProcess: "2-4 weeks",
    matchScore: 0,
    popularCities: ["Singapore City", "Jurong", "Tampines", "Woodlands", "Punggol"],
    workCulture: "Efficient, multicultural, long hours, hierarchy-conscious, food-centric"
  },
  {
    country: "Switzerland",
    flag: "🇨🇭",
    visaType: "L / B Permit",
    averageSalary: "CHF 90,000 - 140,000",
    topCompanies: ["Google Zurich", "Microsoft", "IBM", "Credit Suisse", "UBS"],
    requirements: ["University degree", "Job offer", "Language skills", "High salary threshold"],
    advantages: ["Highest salaries", "Beautiful nature", "Stability", "Central Europe"],
    challenges: ["Very high cost of living", "Language requirements", "Conservative culture", "Limited social life"],
    timeToProcess: "2-6 months",
    matchScore: 0,
    popularCities: ["Zurich", "Geneva", "Basel", "Bern", "Lausanne"],
    workCulture: "Precise, punctual, high-quality work, formal, outdoor activities"
  }
];

// Mock function to simulate fetching platform data
export const fetchPlatformData = async (profile: UserProfile): Promise<PlatformData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Generate mock LinkedIn data
  const linkedinData = profile.linkedinProfile ? {
    connections: Math.floor(Math.random() * 500) + 100,
    endorsements: Math.floor(Math.random() * 50) + 10,
    recommendations: Math.floor(Math.random() * 10) + 2,
    experience: ['Software Developer', 'Intern', 'Freelancer'],
    education: ['Computer Science', 'Engineering'],
    certifications: ['AWS', 'Google Cloud', 'Microsoft Azure'],
    skills: profile.skills.concat(['Leadership', 'Communication', 'Project Management'])
  } : {
    connections: 0,
    endorsements: 0,
    recommendations: 0,
    experience: [],
    education: [],
    certifications: [],
    skills: []
  };

  // Generate mock data based on usernames (in reality, this would call actual APIs)
  const mockData: PlatformData = {
    leetcode: {
      problemsSolved: profile.leetcodeUsername ? Math.floor(Math.random() * 500) + 100 : 0,
      contestRating: profile.leetcodeUsername ? Math.floor(Math.random() * 1000) + 1200 : 0,
      contestsParticipated: profile.leetcodeUsername ? Math.floor(Math.random() * 20) + 5 : 0,
    },
    codeforces: {
      rating: profile.codeforcesUsername ? Math.floor(Math.random() * 800) + 1200 : 0,
      maxRating: profile.codeforcesUsername ? Math.floor(Math.random() * 900) + 1300 : 0,
      contestsParticipated: profile.codeforcesUsername ? Math.floor(Math.random() * 30) + 10 : 0,
    },
    codechef: {
      rating: profile.codechefUsername ? Math.floor(Math.random() * 600) + 1400 : 0,
      stars: profile.codechefUsername ? Math.floor(Math.random() * 5) + 2 : 0,
      contestsParticipated: profile.codechefUsername ? Math.floor(Math.random() * 25) + 8 : 0,
    },
    github: {
      repositories: profile.githubUsername ? Math.floor(Math.random() * 50) + 10 : 0,
      contributions: profile.githubUsername ? Math.floor(Math.random() * 1000) + 200 : 0,
      followers: profile.githubUsername ? Math.floor(Math.random() * 100) + 5 : 0,
      languages: profile.githubUsername ? ['JavaScript', 'Python', 'Java', 'C++', 'React'] : [],
    },
    hackerrank: {
      problemsSolved: profile.hackerrankUsername ? Math.floor(Math.random() * 200) + 50 : 0,
      badges: profile.hackerrankUsername ? Math.floor(Math.random() * 15) + 3 : 0,
      certifications: profile.hackerrankUsername ? Math.floor(Math.random() * 5) + 1 : 0,
    },
    linkedin: linkedinData,
  };

  return mockData;
};

// Function to get course recommendations based on focus areas
const getCourseRecommendations = (focusAreas: string[], userSkills: string[]): CourseRecommendation[] => {
  const recommendations: CourseRecommendation[] = [];
  
  // Map focus areas to course categories
  const categoryMapping: { [key: string]: string[] } = {
    'Data Structures & Algorithms': ['DSA', 'Competitive Programming'],
    'Project Development': ['Web Development', 'Mobile Development'],
    'Technical Skills': ['Web Development', 'Machine Learning', 'Mobile Development'],
    'Open Source Contributions': ['Web Development', 'DevOps'],
    'System Design': ['System Design', 'Cloud Computing'],
    'Competitive Programming': ['Competitive Programming', 'DSA'],
    'LinkedIn Profile': ['Web Development', 'DevOps'],
    'International Readiness': ['System Design', 'Cloud Computing']
  };

  // Get relevant categories based on focus areas
  const relevantCategories = new Set<string>();
  focusAreas.forEach(area => {
    const categories = categoryMapping[area] || ['Web Development'];
    categories.forEach(cat => relevantCategories.add(cat));
  });

  // Add some general recommendations if no specific focus areas
  if (relevantCategories.size === 0) {
    relevantCategories.add('DSA');
    relevantCategories.add('Web Development');
  }

  // Filter courses by relevant categories
  const filteredCourses = courseDatabase.filter(course => 
    relevantCategories.has(course.category)
  );

  // Sort by rating and pick top recommendations
  const sortedCourses = filteredCourses.sort((a, b) => b.rating - a.rating);
  
  // Take top 6 courses, ensuring variety
  const categoriesUsed = new Set<string>();
  for (const course of sortedCourses) {
    if (recommendations.length >= 6) break;
    
    // Ensure we don't have too many courses from the same category
    const categoryCount = recommendations.filter(r => r.category === course.category).length;
    if (categoryCount < 2) {
      recommendations.push(course);
      categoriesUsed.add(course.category);
    }
  }

  return recommendations;
};

// Function to calculate international opportunity match scores
const calculateInternationalMatches = (
  profile: UserProfile, 
  platformData: PlatformData, 
  overallScore: number
): InternationalOpportunity[] => {
  const opportunities = [...internationalOpportunities];
  
  opportunities.forEach(opportunity => {
    let matchScore = 0;
    
    // Base score from overall readiness
    matchScore += overallScore * 0.4;
    
    // English proficiency bonus
    const englishBonus = {
      'Basic': 0,
      'Intermediate': 10,
      'Advanced': 20,
      'Native': 25
    };
    matchScore += englishBonus[profile.englishProficiency];
    
    // Work experience bonus
    matchScore += Math.min(profile.workExperience * 5, 20);
    
    // CGPA bonus
    matchScore += (profile.cgpa / 10) * 15;
    
    // Skills alignment bonus
    if (profile.skills.length > 5) matchScore += 10;
    if (profile.skills.length > 10) matchScore += 5;
    
    // LinkedIn profile bonus
    if (profile.linkedinProfile) matchScore += 10;
    
    // Platform activity bonus
    if (platformData.github.repositories > 10) matchScore += 5;
    if (platformData.leetcode.problemsSolved > 100) matchScore += 5;
    
    // Country-specific adjustments
    switch (opportunity.country) {
      case 'United States':
        // Requires very high skills
        if (overallScore < 70) matchScore *= 0.7;
        if (platformData.leetcode.problemsSolved > 300) matchScore += 10;
        break;
      case 'Canada':
        // More accessible, bonus for younger candidates
        matchScore += 5;
        if (profile.englishProficiency === 'Advanced' || profile.englishProficiency === 'Native') {
          matchScore += 10;
        }
        break;
      case 'Germany':
        // Requires some German language skills
        if (profile.englishProficiency === 'Basic') matchScore *= 0.8;
        break;
      case 'Singapore':
        // Prefers experienced candidates
        if (profile.workExperience > 2) matchScore += 10;
        break;
    }
    
    // Preferred countries bonus
    if (profile.preferredCountries.includes(opportunity.country)) {
      matchScore += 15;
    }
    
    opportunity.matchScore = Math.min(Math.round(matchScore), 100);
  });
  
  // Sort by match score and return top matches
  return opportunities
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6);
};

// Mock ML prediction function
export const predictPlacementReadiness = (
  profile: UserProfile, 
  platformData: PlatformData
): PredictionResult => {
  // Calculate individual scores
  const cgpaScore = (profile.cgpa / 10) * 100;
  const dsaScore = Math.min(
    ((platformData.leetcode.problemsSolved * 0.4) + 
     (platformData.codeforces.rating * 0.03) + 
     (platformData.codechef.rating * 0.03)) / 10, 
    100
  );
  const projectScore = Math.min(profile.projectCount * 15, 100);
  const skillsScore = Math.min(profile.skills.length * 8, 100);
  const githubScore = Math.min(
    (platformData.github.repositories * 2) + 
    (platformData.github.contributions * 0.05), 
    100
  );
  const linkedinScore = profile.linkedinProfile ? Math.min(
    (platformData.linkedin.connections * 0.1) + 
    (platformData.linkedin.endorsements * 1.5) + 
    (platformData.linkedin.recommendations * 5), 
    100
  ) : 0;
  const experienceScore = Math.min(profile.workExperience * 20, 100);

  // Calculate overall score with weights
  const overallScore = Math.round(
    (cgpaScore * 0.2) + 
    (dsaScore * 0.25) + 
    (projectScore * 0.15) + 
    (skillsScore * 0.1) + 
    (githubScore * 0.1) + 
    (linkedinScore * 0.1) + 
    (experienceScore * 0.1)
  );

  // Generate company matches with international focus
  const companyMatches: CompanyMatch[] = [
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

  // Generate focus areas based on weak points
  const focusAreas: string[] = [];
  if (dsaScore < 60) focusAreas.push('Data Structures & Algorithms');
  if (projectScore < 60) focusAreas.push('Project Development');
  if (skillsScore < 60) focusAreas.push('Technical Skills');
  if (cgpaScore < 70) focusAreas.push('Academic Performance');
  if (githubScore < 50) focusAreas.push('Open Source Contributions');
  if (linkedinScore < 40 && !profile.linkedinProfile) focusAreas.push('LinkedIn Profile');
  if (profile.englishProficiency === 'Basic' || profile.englishProficiency === 'Intermediate') {
    focusAreas.push('English Communication');
  }
  if (profile.preferredCountries.length === 0) focusAreas.push('International Career Planning');
  
  // Add system design for high performers
  if (overallScore > 70 && dsaScore > 60) {
    focusAreas.push('System Design');
  }

  // Generate strengths based on strong points
  const strengths: string[] = [];
  if (cgpaScore >= 80) strengths.push('Strong Academic Performance');
  if (dsaScore >= 70) strengths.push('Excellent Problem Solving Skills');
  if (projectScore >= 70) strengths.push('Strong Project Portfolio');
  if (skillsScore >= 70) strengths.push('Diverse Technical Skills');
  if (githubScore >= 60) strengths.push('Active in Open Source');
  if (linkedinScore >= 60) strengths.push('Strong Professional Network');
  if (profile.englishProficiency === 'Advanced' || profile.englishProficiency === 'Native') {
    strengths.push('Excellent English Communication');
  }
  if (profile.workExperience > 1) strengths.push('Relevant Work Experience');
  if (profile.preferredCountries.length > 0) strengths.push('Clear International Goals');

  // Get course recommendations based on focus areas
  const courseRecommendations = getCourseRecommendations(focusAreas, profile.skills);

  // Calculate international opportunities
  const internationalOpportunities = calculateInternationalMatches(profile, platformData, overallScore);

  // Generate LinkedIn insights if profile provided
  let linkedinInsights;
  if (profile.linkedinProfile) {
    linkedinInsights = {
      profileStrength: Math.floor(Math.random() * 40) + 60,
      networkQuality: Math.floor(Math.random() * 30) + 70,
      industryAlignment: Math.floor(Math.random() * 35) + 65,
      suggestions: [
        'Add more technical skills to your profile',
        'Get recommendations from colleagues',
        'Share technical articles and insights',
        'Connect with professionals in target countries'
      ]
    };
  }

  // Mock resume analysis if file provided
  let resumeScore: number | undefined;
  let resumeKeywords: string[] | undefined;
  
  if (profile.resumeFile) {
    resumeScore = Math.floor(Math.random() * 40) + 60;
    resumeKeywords = profile.skills.slice(0, 5).concat(['Leadership', 'Teamwork', 'Problem Solving']);
  }

  return {
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
    linkedinInsights,
    resumeScore,
    resumeKeywords
  };
};