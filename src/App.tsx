import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import ProfileForm from './components/ProfileForm';
import ResultsDashboard from './components/ResultsDashboard';
import { UserProfile, PredictionResult } from './types';
import { fetchPlatformData, predictPlacementReadiness } from './services/mockMLService';

function App() {
  const [currentStep, setCurrentStep] = useState<'form' | 'results'>('form');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PredictionResult | null>(null);

  const handleFormSubmit = async (profile: UserProfile) => {
    setLoading(true);
    
    try {
      // Fetch platform data (using mock service for now)
      const platformData = await fetchPlatformData(profile);
      
      // Generate ML predictions
      const predictionResults = await predictPlacementReadiness(profile, platformData);
      
      setResults(predictionResults);
      setCurrentStep('results');
    } catch (error) {
      console.error('Error processing profile:', error);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentStep('form');
    setResults(null);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {currentStep === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
            >
              <ProfileForm onSubmit={handleFormSubmit} loading={loading} />
            </motion.div>
          )}
          
          {currentStep === 'results' && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <ResultsDashboard results={results} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-300">About the Platform</h3>
              <p className="text-gray-300 leading-relaxed">
                AI-powered career guidance platform helping students achieve global placement success through personalized analysis and recommendations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-purple-300">Features</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Comprehensive skill analysis</li>
                <li>• International job opportunities</li>
                <li>• LinkedIn profile optimization</li>
                <li>• Personalized course recommendations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-green-300">Global Reach</h3>
              <p className="text-gray-300 leading-relaxed">
                Covering opportunities in 50+ countries including USA, Canada, Germany, Netherlands, Australia, and more.
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-300 mb-2">
              Built with React, TypeScript, Tailwind CSS, and Supabase
            </p>
            <p className="text-gray-400 text-sm">
              AI-powered career guidance for student placement success
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <span className="text-blue-400 text-sm">Empowering Future Technologists</span>
              <span className="text-purple-400 text-sm">Global Career Opportunities</span>
              <span className="text-green-400 text-sm">Personalized Growth Path</span>
            </div>
            <div className="mt-6 border-t border-gray-700 pt-6">
              <p className="text-gray-300 font-medium mb-2">Made by Runtime Terrors</p>
              <p className="text-gray-400 text-sm">
                Copyright 2026 CareerCompass. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;