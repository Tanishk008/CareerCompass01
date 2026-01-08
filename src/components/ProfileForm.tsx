import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Code, 
  Trophy, 
  Github, 
  Brain, 
  GraduationCap, 
  Briefcase, 
  Upload,
  Plus,
  X,
  Linkedin,
  Globe,
  MessageCircle
} from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
  loading: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, loading }) => {
  const [profile, setProfile] = useState<UserProfile>({
    leetcodeUsername: '',
    codeforcesUsername: '',
    codechefUsername: '',
    githubUsername: '',
    hackerrankUsername: '',
    linkedinProfile: '',
    cgpa: 0,
    skills: [],
    projectCount: 0,
    preferredCountries: [],
    workExperience: 0,
    englishProficiency: 'Intermediate',
  });

  const [currentSkill, setCurrentSkill] = useState('');
  const [currentCountry, setCurrentCountry] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const platforms = [
    { key: 'leetcodeUsername', label: 'LeetCode', icon: Code, color: 'text-orange-500' },
    { key: 'codeforcesUsername', label: 'Codeforces', icon: Trophy, color: 'text-red-500' },
    { key: 'codechefUsername', label: 'CodeChef', icon: Brain, color: 'text-brown-500' },
    { key: 'githubUsername', label: 'GitHub', icon: Github, color: 'text-gray-700' },
    { key: 'hackerrankUsername', label: 'HackerRank', icon: Code, color: 'text-green-500' },
  ];

  const popularCountries = [
    'United States', 'Canada', 'Germany', 'Netherlands', 'Australia', 
    'United Kingdom', 'Singapore', 'Switzerland', 'Sweden', 'Denmark',
    'Norway', 'New Zealand', 'Ireland', 'Luxembourg', 'Austria'
  ];

  const handleInputChange = (field: keyof UserProfile, value: string | number) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (currentSkill.trim() && !profile.skills.includes(currentSkill.trim())) {
      setProfile(prev => ({ 
        ...prev, 
        skills: [...prev.skills, currentSkill.trim()] 
      }));
      setCurrentSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setProfile(prev => ({ 
      ...prev, 
      skills: prev.skills.filter(s => s !== skill) 
    }));
  };

  const addCountry = () => {
    if (currentCountry.trim() && !profile.preferredCountries.includes(currentCountry.trim())) {
      setProfile(prev => ({ 
        ...prev, 
        preferredCountries: [...prev.preferredCountries, currentCountry.trim()] 
      }));
      setCurrentCountry('');
    }
  };

  const removeCountry = (country: string) => {
    setProfile(prev => ({ 
      ...prev, 
      preferredCountries: prev.preferredCountries.filter(c => c !== country) 
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setProfile(prev => ({ ...prev, resumeFile: file }));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'application/pdf') {
      setProfile(prev => ({ ...prev, resumeFile: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with profile:', profile);
    onSubmit(profile);
  };

  // More lenient validation - only require CGPA to be set
  const isFormValid = profile.cgpa > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Let's Analyze Your Global Career Profile
        </h2>
        <p className="text-gray-600 text-lg">
          Fill in your details to get personalized placement readiness insights and international opportunities
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Platform Usernames */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <User className="mr-3 text-blue-600" />
            Platform Usernames
            <span className="text-sm font-normal text-gray-500 ml-2">(Optional)</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {platforms.map(({ key, label, icon: Icon, color }) => (
              <div key={key} className="space-y-2">
                <label className="flex items-center text-gray-700 font-medium">
                  <Icon className={`w-5 h-5 mr-2 ${color}`} />
                  {label}
                </label>
                <input
                  type="text"
                  value={profile[key as keyof UserProfile] as string}
                  onChange={(e) => handleInputChange(key as keyof UserProfile, e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder={`Enter your ${label} username`}
                />
              </div>
            ))}
            
            {/* LinkedIn Profile */}
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center text-gray-700 font-medium">
                <Linkedin className="w-5 h-5 mr-2 text-blue-600" />
                LinkedIn Profile URL
                <span className="text-sm font-normal text-gray-500 ml-2">(Recommended for better company matching)</span>
              </label>
              <input
                type="url"
                value={profile.linkedinProfile}
                onChange={(e) => handleInputChange('linkedinProfile', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="https://linkedin.com/in/your-profile"
              />
            </div>
          </div>
        </div>

        {/* Academic & Professional Experience */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <GraduationCap className="mr-3 text-purple-600" />
            Academic & Professional Details
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">
                CGPA <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={profile.cgpa || ''}
                onChange={(e) => handleInputChange('cgpa', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter your CGPA (e.g., 8.5)"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Number of Projects</label>
              <input
                type="number"
                min="0"
                value={profile.projectCount || ''}
                onChange={(e) => handleInputChange('projectCount', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter number of projects"
              />
            </div>
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Work Experience (Years)</label>
              <input
                type="number"
                min="0"
                step="0.5"
                value={profile.workExperience || ''}
                onChange={(e) => handleInputChange('workExperience', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Years of work experience"
              />
            </div>
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">English Proficiency</label>
              <select
                value={profile.englishProficiency}
                onChange={(e) => handleInputChange('englishProficiency', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <option value="Basic">Basic</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Native">Native</option>
              </select>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-6 space-y-4">
            <label className="text-gray-700 font-medium">
              Technical Skills
              <span className="text-sm font-normal text-gray-500 ml-2">(Optional but recommended)</span>
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Add a skill (e.g., JavaScript, Python, React)"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            {profile.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-2 text-purple-600 hover:text-purple-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* International Preferences */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Globe className="mr-3 text-green-600" />
            International Career Preferences
            <span className="text-sm font-normal text-gray-500 ml-2">(Optional)</span>
          </h2>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="text-gray-700 font-medium">
                Preferred Countries for Work
                <span className="text-sm font-normal text-gray-500 ml-2">(Select countries you're interested in working)</span>
              </label>
              
              <div className="flex space-x-2">
                <select
                  value={currentCountry}
                  onChange={(e) => setCurrentCountry(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  <option value="">Select a country</option>
                  {popularCountries.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={addCountry}
                  disabled={!currentCountry}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center disabled:bg-gray-300"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              
              <div className="text-sm text-gray-600">
                <p className="mb-2">Or type a custom country:</p>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={currentCountry}
                    onChange={(e) => setCurrentCountry(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCountry())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Type country name"
                  />
                </div>
              </div>
              
              {profile.preferredCountries.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {profile.preferredCountries.map((country) => (
                    <span
                      key={country}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                    >
                      {country}
                      <button
                        type="button"
                        onClick={() => removeCountry(country)}
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Resume Upload */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Briefcase className="mr-3 text-indigo-600" />
            Resume Upload (Optional)
          </h2>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
              dragActive
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-300 hover:border-indigo-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">
              Drag and drop your resume (PDF) here, or click to select
            </p>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="resume-upload"
            />
            <label
              htmlFor="resume-upload"
              className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <Upload className="w-5 h-5 mr-2" />
              Choose File
            </label>
            {profile.resumeFile && (
              <p className="mt-4 text-indigo-600 font-medium">
                ✓ {profile.resumeFile.name} uploaded
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={!isFormValid || loading}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
            isFormValid && !loading
              ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white hover:from-blue-700 hover:via-purple-700 hover:to-green-700 shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          whileHover={isFormValid && !loading ? { scale: 1.02 } : {}}
          whileTap={isFormValid && !loading ? { scale: 0.98 } : {}}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
              Analyzing Your Global Career Profile...
            </div>
          ) : (
            'Predict My Global Placement Readiness'
          )}
        </motion.button>

        {!isFormValid && (
          <p className="text-center text-red-500 text-sm">
            Please enter your CGPA to continue
          </p>
        )}
      </form>
    </motion.div>
  );
};

export default ProfileForm;