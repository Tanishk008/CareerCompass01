import React from 'react';
import { Brain, Target, Users, Globe, Award, TrendingUp } from 'lucide-react';

const Header: React.FC = () => {
  const companies = [
    { name: 'Google', logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { name: 'Microsoft', logo: 'https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { name: 'Amazon', logo: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { name: 'Apple', logo: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { name: 'Meta', logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { name: 'Netflix', logo: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' }
  ];

  const stats = [
    { icon: Users, value: '10,000+', label: 'Students Analyzed' },
    { icon: Globe, value: '50+', label: 'Countries Covered' },
    { icon: Award, value: '95%', label: 'Success Rate' },
    { icon: TrendingUp, value: '85%', label: 'Placement Improvement' }
  ];

  return (
    <header className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black bg-opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        {/* Main Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-75"></div>
              <div className="relative bg-white bg-opacity-10 p-4 rounded-full backdrop-blur-sm">
                <Brain className="w-12 h-12 text-blue-300" />
                <Target className="w-6 h-6 absolute -top-1 -right-1 text-green-400" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 bg-clip-text text-transparent">
            CareerCompass
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            AI-powered career guidance for your global placement success. 
            Analyze your coding profile, get personalized recommendations, and discover international opportunities.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center bg-white bg-opacity-10 px-6 py-3 rounded-full backdrop-blur-sm">
              <Brain className="w-5 h-5 mr-2 text-blue-300" />
              <span className="text-blue-100">AI-Powered Analysis</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-10 px-6 py-3 rounded-full backdrop-blur-sm">
              <Globe className="w-5 h-5 mr-2 text-green-300" />
              <span className="text-blue-100">Global Opportunities</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-10 px-6 py-3 rounded-full backdrop-blur-sm">
              <Target className="w-5 h-5 mr-2 text-purple-300" />
              <span className="text-blue-100">Personalized Guidance</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm hover:bg-opacity-20 transition-all">
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-300" />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-blue-200 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Company Logos Section */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-semibold text-blue-100 mb-8">
            Get Ready for Top Global Companies
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            {companies.map((company, index) => (
              <div key={index} className="group">
                <div className="bg-white bg-opacity-10 p-4 rounded-xl backdrop-blur-sm hover:bg-opacity-20 transition-all group-hover:scale-110 transform duration-300">
                  <img 
                    src={company.logo} 
                    alt={`${company.name} office`}
                    className="w-16 h-16 rounded-lg object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <p className="text-blue-200 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {company.name}
                </p>
              </div>
            ))}
          </div>
          <p className="text-blue-200 text-lg">
            Join thousands of students who landed their dream jobs at FAANG and other top companies
          </p>
        </div>

        {/* Attribution */}
        <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-xl">
          <div className="flex items-center justify-center mb-4">
            <Users className="w-6 h-6 mr-2 text-purple-200" />
            <h4 className="text-lg font-semibold text-white">Created by Visionary Students</h4>
          </div>
          <p className="text-purple-100 mb-4">
            This innovative platform was conceptualized and developed by a team of passionate computer science students:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Tanishk Gupta', 'Srashti Gupta'].map((name, index) => (
              <span key={index} className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-white font-medium">
                {name}
              </span>
            ))}
          </div>
          <p className="text-purple-200 text-sm mt-4">
            "Empowering students worldwide to achieve their career dreams through AI-driven insights"
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;