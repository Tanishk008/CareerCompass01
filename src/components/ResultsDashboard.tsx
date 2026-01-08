import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  Star, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight,
  Building,
  FileText,
  BookOpen,
  Clock,
  DollarSign,
  ExternalLink,
  Award,
  Globe,
  Linkedin,
  MapPin,
  Users,
  Briefcase,
  Calendar,
  TrendingDown
} from 'lucide-react';
import { PredictionResult } from '../types';

interface ResultsDashboardProps {
  results: PredictionResult;
  onReset: () => void;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ results, onReset }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto space-y-8"
    >
      {/* Overall Score */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-lg p-8 text-center"
      >
        <div className="flex items-center justify-center mb-6">
          <TrendingUp className="w-8 h-8 text-blue-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-800">Global Career Readiness Score</h2>
        </div>
        <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getScoreBg(results.overallScore)} mb-4`}>
          <span className={`text-4xl font-bold ${getScoreColor(results.overallScore)}`}>
            {results.overallScore}%
          </span>
        </div>
        <p className="text-gray-600 text-lg">
          {results.overallScore >= 80 
            ? "Excellent! You're ready for international opportunities!" 
            : results.overallScore >= 60 
            ? "Good progress! Focus on improvement areas for global roles." 
            : "Keep working! Build your skills for international career success."}
        </p>
      </motion.div>

      {/* International Opportunities */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <Globe className="w-8 h-8 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">International Opportunities</h2>
          <span className="ml-3 text-sm text-gray-500">Countries ranked by your match score</span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.internationalOpportunities.map((opportunity, index) => (
            <motion.div
              key={opportunity.country}
              variants={itemVariants}
              className="border rounded-xl p-6 hover:shadow-lg transition-all bg-gradient-to-br from-white to-blue-50"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{opportunity.flag}</span>
                  <h3 className="font-bold text-gray-800">{opportunity.country}</h3>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(opportunity.matchScore)} ${getScoreBg(opportunity.matchScore)}`}>
                  {opportunity.matchScore}%
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Briefcase className="w-4 h-4 mr-2" />
                  {opportunity.visaType}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  {opportunity.averageSalary}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {opportunity.timeToProcess}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-xs font-medium text-gray-700 mb-2">Top Companies:</h4>
                <div className="flex flex-wrap gap-1">
                  {opportunity.topCompanies.slice(0, 3).map((company, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {company}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-xs font-medium text-gray-700 mb-2">Popular Cities:</h4>
                <p className="text-xs text-gray-600">{opportunity.popularCities.slice(0, 3).join(', ')}</p>
              </div>

              <div className="mb-4">
                <h4 className="text-xs font-medium text-green-700 mb-1">Advantages:</h4>
                <ul className="space-y-1">
                  {opportunity.advantages.slice(0, 2).map((advantage, i) => (
                    <li key={i} className="text-xs text-green-600 flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {advantage}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="text-xs font-medium text-red-700 mb-1">Challenges:</h4>
                <ul className="space-y-1">
                  {opportunity.challenges.slice(0, 2).map((challenge, i) => (
                    <li key={i} className="text-xs text-red-600 flex items-center">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                <strong>Work Culture:</strong> {opportunity.workCulture}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Course Recommendations */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <BookOpen className="w-8 h-8 text-indigo-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Recommended Courses</h2>
          <span className="ml-3 text-sm text-gray-500">Personalized for your growth areas</span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.courseRecommendations.map((course, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="border rounded-xl p-6 hover:shadow-lg transition-all bg-gradient-to-br from-white to-gray-50"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{course.provider}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                  {course.difficulty}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{course.description}</p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  {course.duration}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  {course.price}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Award className="w-4 h-4 mr-2" />
                  {course.rating}/5.0 rating
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-xs font-medium text-gray-700 mb-2">Skills you'll learn:</h4>
                <div className="flex flex-wrap gap-1">
                  {course.skills.slice(0, 3).map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                  {course.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      +{course.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <a
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center w-full justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
              >
                View Course
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Company Matches */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <Building className="w-8 h-8 text-purple-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Global Company Readiness</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {results.companyMatches.map((match, index) => (
            <motion.div
              key={match.type}
              variants={itemVariants}
              className="border rounded-xl p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">{match.type}</h3>
                <span className={`text-lg font-bold ${getScoreColor(match.matchPercentage)}`}>
                  {match.matchPercentage}%
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{match.description}</p>
              
              {match.salaryRange && (
                <div className="mb-4 p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center text-sm text-green-700">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <strong>Salary Range: {match.salaryRange}</strong>
                  </div>
                </div>
              )}

              {match.locations && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2 text-sm flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    Locations:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {match.locations.map((location, i) => (
                      <span key={i} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                        {location}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2 text-sm">Requirements:</h4>
                <ul className="space-y-1">
                  {match.requirements.slice(0, 3).map((req, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-center">
                      <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2 text-sm">Suggestions:</h4>
                <ul className="space-y-1">
                  {match.suggestions.slice(0, 3).map((suggestion, i) => (
                    <li key={i} className="text-sm text-blue-600 flex items-center">
                      <ArrowRight className="w-3 h-3 mr-2" />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* LinkedIn Insights */}
      {results.linkedinInsights && (
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <Linkedin className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">LinkedIn Profile Analysis</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <h3 className="font-semibold text-gray-700 mb-2">Profile Strength</h3>
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getScoreBg(results.linkedinInsights.profileStrength)}`}>
                <span className={`text-xl font-bold ${getScoreColor(results.linkedinInsights.profileStrength)}`}>
                  {results.linkedinInsights.profileStrength}%
                </span>
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-700 mb-2">Network Quality</h3>
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getScoreBg(results.linkedinInsights.networkQuality)}`}>
                <span className={`text-xl font-bold ${getScoreColor(results.linkedinInsights.networkQuality)}`}>
                  {results.linkedinInsights.networkQuality}%
                </span>
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-700 mb-2">Industry Alignment</h3>
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getScoreBg(results.linkedinInsights.industryAlignment)}`}>
                <span className={`text-xl font-bold ${getScoreColor(results.linkedinInsights.industryAlignment)}`}>
                  {results.linkedinInsights.industryAlignment}%
                </span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-4">Improvement Suggestions:</h3>
            <div className="space-y-2">
              {results.linkedinInsights.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <ArrowRight className="w-4 h-4 text-blue-600 mr-3" />
                  <span className="text-gray-800">{suggestion}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Focus Areas & Strengths */}
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <Target className="w-8 h-8 text-orange-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Focus Areas</h2>
          </div>
          <div className="space-y-4">
            {results.focusAreas.map((area, index) => (
              <div key={index} className="flex items-center p-4 bg-orange-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-orange-600 mr-3" />
                <span className="text-gray-800 font-medium">{area}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <Star className="w-8 h-8 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Your Strengths</h2>
          </div>
          <div className="space-y-4">
            {results.strengths.map((strength, index) => (
              <div key={index} className="flex items-center p-4 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-gray-800 font-medium">{strength}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Resume Analysis */}
      {results.resumeScore && (
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <FileText className="w-8 h-8 text-indigo-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Resume Analysis</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-700 mb-4">Resume Score</h3>
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getScoreBg(results.resumeScore)}`}>
                <span className={`text-2xl font-bold ${getScoreColor(results.resumeScore)}`}>
                  {results.resumeScore}%
                </span>
              </div>
            </div>
            {results.resumeKeywords && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-4">Key Skills Found</h3>
                <div className="flex flex-wrap gap-2">
                  {results.resumeKeywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Action Button */}
      <motion.div variants={itemVariants} className="text-center">
        <button
          onClick={onReset}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:via-purple-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl"
        >
          Analyze Another Profile
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ResultsDashboard;