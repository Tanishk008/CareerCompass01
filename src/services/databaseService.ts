import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { UserProfile, PredictionResult } from '../types'
import type { UserAnalysis, PlatformCache, CourseRecommendation } from '../lib/supabase'

class DatabaseService {
  // Check if database is available
  private isDatabaseAvailable(): boolean {
    return isSupabaseConfigured && supabase !== null
  }

  // Generate a session-based user ID
  private getUserId(): string {
    let userId = localStorage.getItem('placement_user_id')
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now()
      localStorage.setItem('placement_user_id', userId)
    }
    return userId
  }

  // Save user analysis to database
  async saveUserAnalysis(
    profile: UserProfile,
    results: PredictionResult,
    platformData: any
  ): Promise<UserAnalysis | null> {
    if (!this.isDatabaseAvailable()) {
      console.log('Database not configured, skipping save')
      return null
    }

    try {
      const userId = this.getUserId()
      
      const analysisData = {
        user_id: userId,
        cgpa: profile.cgpa,
        leetcode_problems: platformData.leetcode?.problemsSolved || 0,
        codeforces_rating: platformData.codeforces?.rating || 0,
        github_repos: platformData.github?.repositories || 0,
        project_count: profile.projectCount,
        skills_count: profile.skills.length,
        work_experience: profile.workExperience,
        overall_score: results.overallScore,
        predicted_company_type: results.companyMatches[0]?.type || null,
        profile_data: profile,
        prediction_results: results
      }

      const { data, error } = await supabase!
        .from('user_analyses')
        .insert(analysisData)
        .select()
        .single()

      if (error) {
        console.error('Error saving user analysis:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Database error:', error)
      return null
    }
  }

  // Get user's analysis history
  async getUserAnalysisHistory(): Promise<UserAnalysis[]> {
    if (!this.isDatabaseAvailable()) {
      return []
    }

    try {
      const userId = this.getUserId()
      
      const { data, error } = await supabase!
        .from('user_analyses')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(10)

      if (error) {
        console.error('Error fetching user history:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Database error:', error)
      return []
    }
  }

  // Cache platform data
  async cachePlatformData(
    username: string,
    platform: string,
    data: any
  ): Promise<void> {
    if (!this.isDatabaseAvailable()) {
      console.log('Database not configured, skipping cache')
      return
    }

    try {
      const cacheData = {
        username: username.toLowerCase(),
        platform,
        data,
        expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString() // 1 hour
      }

      const { error } = await supabase!
        .from('platform_cache')
        .upsert(cacheData, {
          onConflict: 'username,platform'
        })

      if (error) {
        console.error('Error caching platform data:', error)
      }
    } catch (error) {
      console.error('Database error:', error)
    }
  }

  // Get cached platform data
  async getCachedPlatformData(
    username: string,
    platform: string
  ): Promise<any | null> {
    if (!this.isDatabaseAvailable()) {
      return null
    }

    try {
      const { data, error } = await supabase!
        .from('platform_cache')
        .select('data')
        .eq('username', username.toLowerCase())
        .eq('platform', platform)
        .eq('is_valid', true)
        .gt('expires_at', new Date().toISOString())
        .single()

      if (error || !data) {
        return null
      }

      return data.data
    } catch (error) {
      console.error('Database error:', error)
      return null
    }
  }

  // Get course recommendations based on focus areas
  async getCourseRecommendations(focusAreas: string[]): Promise<CourseRecommendation[]> {
    if (!this.isDatabaseAvailable()) {
      // Return mock course recommendations if database not available
      return this.getMockCourseRecommendations(focusAreas)
    }

    try {
      const { data, error } = await supabase!
        .from('course_recommendations')
        .select('*')
        .eq('is_active', true)
        .overlaps('focus_areas', focusAreas)
        .order('rating', { ascending: false })
        .limit(6)

      if (error) {
        console.error('Error fetching course recommendations:', error)
        return this.getMockCourseRecommendations(focusAreas)
      }

      // If no courses match focus areas, get general recommendations
      if (!data || data.length === 0) {
        const { data: generalData, error: generalError } = await supabase!
          .from('course_recommendations')
          .select('*')
          .eq('is_active', true)
          .order('rating', { ascending: false })
          .limit(6)

        if (generalError) {
          console.error('Error fetching general course recommendations:', generalError)
          return this.getMockCourseRecommendations(focusAreas)
        }

        return generalData || this.getMockCourseRecommendations(focusAreas)
      }

      return data
    } catch (error) {
      console.error('Database error:', error)
      return this.getMockCourseRecommendations(focusAreas)
    }
  }

  // Mock course recommendations fallback
  private getMockCourseRecommendations(focusAreas: string[]): CourseRecommendation[] {
    const mockCourses: CourseRecommendation[] = [
      {
        id: '1',
        title: 'Master the Coding Interview: Data Structures + Algorithms',
        provider: 'Udemy',
        duration: '19 hours',
        difficulty: 'Intermediate',
        rating: 4.6,
        price: '$84.99',
        description: 'Complete guide to ace coding interviews at top tech companies',
        skills: ['Data Structures', 'Algorithms', 'Problem Solving'],
        url: 'https://www.udemy.com/course/master-the-coding-interview-data-structures-algorithms/',
        category: 'DSA',
        focus_areas: ['Data Structures & Algorithms'],
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '2',
        title: 'The Complete Web Developer Bootcamp',
        provider: 'Udemy',
        duration: '65 hours',
        difficulty: 'Beginner',
        rating: 4.7,
        price: '$84.99',
        description: 'Full-stack web development from scratch',
        skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
        url: 'https://www.udemy.com/course/the-complete-web-development-bootcamp/',
        category: 'Web Development',
        focus_areas: ['Project Development', 'Technical Skills'],
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '3',
        title: 'System Design Interview Course',
        provider: 'Educative',
        duration: '12 weeks',
        difficulty: 'Advanced',
        rating: 4.7,
        price: '$79/month',
        description: 'Master system design for FAANG interviews',
        skills: ['System Design', 'Scalability', 'Architecture'],
        url: 'https://www.educative.io/courses/grokking-the-system-design-interview',
        category: 'System Design',
        focus_areas: ['System Design'],
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]

    return mockCourses.slice(0, 6)
  }

  // Get analytics data (for admin/insights)
  async getAnalytics(): Promise<{
    totalAnalyses: number
    averageScore: number
    topSkills: string[]
    popularCountries: string[]
  }> {
    if (!this.isDatabaseAvailable()) {
      return {
        totalAnalyses: 0,
        averageScore: 0,
        topSkills: [],
        popularCountries: []
      }
    }

    try {
      // Get total analyses count
      const { count: totalAnalyses } = await supabase!
        .from('user_analyses')
        .select('*', { count: 'exact', head: true })

      // Get average score
      const { data: scoreData } = await supabase!
        .from('user_analyses')
        .select('overall_score')

      const averageScore = scoreData?.length 
        ? scoreData.reduce((sum, item) => sum + item.overall_score, 0) / scoreData.length
        : 0

      // Get top skills and countries from profile data
      const { data: profileData } = await supabase!
        .from('user_analyses')
        .select('profile_data')
        .not('profile_data', 'is', null)

      const skillsCount: { [key: string]: number } = {}
      const countriesCount: { [key: string]: number } = {}

      profileData?.forEach(item => {
        const profile = item.profile_data
        if (profile?.skills) {
          profile.skills.forEach((skill: string) => {
            skillsCount[skill] = (skillsCount[skill] || 0) + 1
          })
        }
        if (profile?.preferredCountries) {
          profile.preferredCountries.forEach((country: string) => {
            countriesCount[country] = (countriesCount[country] || 0) + 1
          })
        }
      })

      const topSkills = Object.entries(skillsCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([skill]) => skill)

      const popularCountries = Object.entries(countriesCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([country]) => country)

      return {
        totalAnalyses: totalAnalyses || 0,
        averageScore: Math.round(averageScore),
        topSkills,
        popularCountries
      }
    } catch (error) {
      console.error('Database error:', error)
      return {
        totalAnalyses: 0,
        averageScore: 0,
        topSkills: [],
        popularCountries: []
      }
    }
  }

  // Clean up expired cache entries
  async cleanupExpiredCache(): Promise<void> {
    if (!this.isDatabaseAvailable()) {
      return
    }

    try {
      const { error } = await supabase!
        .from('platform_cache')
        .delete()
        .lt('expires_at', new Date().toISOString())

      if (error) {
        console.error('Error cleaning up cache:', error)
      }
    } catch (error) {
      console.error('Database error:', error)
    }
  }
}

export const databaseService = new DatabaseService()