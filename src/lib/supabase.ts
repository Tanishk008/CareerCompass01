import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if Supabase is configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)

// Create client only if configured, otherwise use null
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Database types
export interface UserAnalysis {
  id: string
  user_id: string
  cgpa: number
  leetcode_problems: number
  codeforces_rating: number
  github_repos: number
  project_count: number
  skills_count: number
  work_experience: number
  overall_score: number
  predicted_company_type?: string
  profile_data?: any
  prediction_results?: any
  created_at: string
  updated_at: string
}

export interface PlatformCache {
  id: string
  username: string
  platform: string
  data: any
  last_updated: string
  is_valid: boolean
  expires_at: string
  created_at: string
}

export interface CourseRecommendation {
  id: string
  title: string
  provider: string
  duration: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  rating: number
  price: string
  description?: string
  skills: string[]
  url: string
  category: string
  focus_areas: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}