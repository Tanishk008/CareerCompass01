/*
  # Seed course recommendations data

  This migration adds comprehensive course data to help users get personalized recommendations
  across different skill areas and difficulty levels.
*/

INSERT INTO course_recommendations (title, provider, duration, difficulty, rating, price, description, skills, url, category, focus_areas) VALUES

-- Data Structures & Algorithms Courses
('Master the Coding Interview: Data Structures + Algorithms', 'Udemy', '19 hours', 'Intermediate', 4.6, '$84.99', 'Complete guide to ace coding interviews at top tech companies with comprehensive DSA coverage', ARRAY['Data Structures', 'Algorithms', 'Problem Solving', 'Interview Prep'], 'https://www.udemy.com/course/master-the-coding-interview-data-structures-algorithms/', 'DSA', ARRAY['Data Structures & Algorithms']),

('Algorithms Specialization', 'Coursera (Stanford)', '4 months', 'Advanced', 4.8, '$49/month', 'Comprehensive algorithms course from Stanford University covering advanced topics', ARRAY['Advanced Algorithms', 'Graph Theory', 'Dynamic Programming', 'Complexity Analysis'], 'https://www.coursera.org/specializations/algorithms', 'DSA', ARRAY['Data Structures & Algorithms']),

('Data Structures and Algorithms in Python', 'Udacity', '4 months', 'Intermediate', 4.4, '$399/month', 'Learn DSA with Python implementation and real-world projects', ARRAY['Python', 'Data Structures', 'Algorithms', 'Problem Solving'], 'https://www.udacity.com/course/data-structures-and-algorithms-nanodegree--nd256', 'DSA', ARRAY['Data Structures & Algorithms']),

-- System Design Courses
('System Design Interview Course', 'Educative', '12 weeks', 'Advanced', 4.7, '$79/month', 'Master system design for FAANG interviews with real-world examples', ARRAY['System Design', 'Scalability', 'Architecture', 'Distributed Systems'], 'https://www.educative.io/courses/grokking-the-system-design-interview', 'System Design', ARRAY['System Design']),

('Designing Data-Intensive Applications', 'O''Reilly', 'Self-paced', 'Advanced', 4.9, '$49.99', 'Deep dive into building scalable, reliable systems', ARRAY['Distributed Systems', 'Database Design', 'System Architecture'], 'https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/', 'System Design', ARRAY['System Design']),

-- Web Development Courses
('The Complete Web Developer Bootcamp', 'Udemy', '65 hours', 'Beginner', 4.7, '$84.99', 'Full-stack web development from scratch with modern technologies', ARRAY['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'], 'https://www.udemy.com/course/the-complete-web-development-bootcamp/', 'Web Development', ARRAY['Project Development', 'Technical Skills']),

('React - The Complete Guide', 'Udemy', '48 hours', 'Intermediate', 4.6, '$84.99', 'Master React with hooks, context, and advanced patterns', ARRAY['React', 'JavaScript', 'Frontend Development', 'State Management'], 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/', 'Web Development', ARRAY['Technical Skills']),

('Full Stack Open', 'University of Helsinki', '12 weeks', 'Intermediate', 4.8, 'Free', 'Modern full stack development with React, Node.js, and GraphQL', ARRAY['React', 'Node.js', 'GraphQL', 'MongoDB', 'TypeScript'], 'https://fullstackopen.com/en/', 'Web Development', ARRAY['Project Development']),

-- Machine Learning Courses
('Machine Learning Course', 'Coursera (Stanford)', '11 weeks', 'Intermediate', 4.9, '$49/month', 'Andrew Ng''s famous machine learning course with practical applications', ARRAY['Machine Learning', 'Python', 'Statistics', 'Neural Networks'], 'https://www.coursera.org/learn/machine-learning', 'Machine Learning', ARRAY['Technical Skills']),

('Deep Learning Specialization', 'Coursera (deeplearning.ai)', '4 months', 'Advanced', 4.8, '$49/month', 'Comprehensive deep learning specialization', ARRAY['Deep Learning', 'Neural Networks', 'TensorFlow', 'Computer Vision'], 'https://www.coursera.org/specializations/deep-learning', 'Machine Learning', ARRAY['Technical Skills']),

-- Mobile Development Courses
('React Native - The Practical Guide', 'Udemy', '32 hours', 'Intermediate', 4.6, '$84.99', 'Build native mobile apps with React Native', ARRAY['React Native', 'Mobile Development', 'JavaScript', 'iOS', 'Android'], 'https://www.udemy.com/course/react-native-the-practical-guide/', 'Mobile Development', ARRAY['Technical Skills', 'Project Development']),

('Flutter & Dart - The Complete Guide', 'Udemy', '40 hours', 'Beginner', 4.5, '$84.99', 'Build beautiful native apps with Flutter', ARRAY['Flutter', 'Dart', 'Mobile Development', 'Cross-platform'], 'https://www.udemy.com/course/learn-flutter-dart-to-build-ios-android-apps/', 'Mobile Development', ARRAY['Technical Skills']),

-- DevOps & Cloud Courses
('Docker and Kubernetes: The Complete Guide', 'Udemy', '21 hours', 'Intermediate', 4.6, '$84.99', 'Master containerization and orchestration', ARRAY['Docker', 'Kubernetes', 'DevOps', 'Container Orchestration'], 'https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/', 'DevOps', ARRAY['Open Source Contributions']),

('AWS Certified Solutions Architect', 'A Cloud Guru', '20 hours', 'Intermediate', 4.5, '$39/month', 'Prepare for AWS certification and cloud architecture', ARRAY['AWS', 'Cloud Computing', 'System Architecture', 'Infrastructure'], 'https://acloudguru.com/course/aws-certified-solutions-architect-associate-saa-c02', 'Cloud Computing', ARRAY['System Design']),

-- Competitive Programming
('Competitive Programming Essentials', 'CodeChef', '8 weeks', 'Intermediate', 4.4, 'Free', 'Master competitive programming techniques', ARRAY['Competitive Programming', 'Algorithms', 'Problem Solving', 'Contest Strategy'], 'https://www.codechef.com/ide', 'Competitive Programming', ARRAY['Data Structures & Algorithms']),

('Advanced Algorithms and Data Structures', 'Codeforces', 'Self-paced', 'Advanced', 4.6, 'Free', 'Advanced topics for competitive programming', ARRAY['Advanced Algorithms', 'Graph Theory', 'Number Theory', 'Geometry'], 'https://codeforces.com/edu/courses', 'Competitive Programming', ARRAY['Data Structures & Algorithms']),

-- Communication & Soft Skills
('English for Career Development', 'Coursera (University of Pennsylvania)', '4 weeks', 'Beginner', 4.5, 'Free', 'Improve English communication for international careers', ARRAY['English Communication', 'Professional Writing', 'Interview Skills'], 'https://www.coursera.org/learn/careerdevelopment', 'Communication', ARRAY['English Communication']),

('LinkedIn Learning: Professional Networking', 'LinkedIn Learning', '2 hours', 'Beginner', 4.3, '$29.99/month', 'Build and optimize your professional LinkedIn presence', ARRAY['LinkedIn Optimization', 'Professional Networking', 'Personal Branding'], 'https://www.linkedin.com/learning/', 'Professional Development', ARRAY['LinkedIn Profile']),

-- International Career Preparation
('Working Abroad: Cultural Intelligence', 'edX', '6 weeks', 'Intermediate', 4.4, 'Free', 'Develop cultural intelligence for international work environments', ARRAY['Cultural Intelligence', 'International Business', 'Cross-cultural Communication'], 'https://www.edx.org/course/cultural-intelligence', 'International', ARRAY['International Career Planning']),

('Visa and Immigration Basics for Tech Workers', 'Udemy', '3 hours', 'Beginner', 4.2, '$49.99', 'Understanding visa processes for tech professionals', ARRAY['Visa Process', 'Immigration Law', 'Work Authorization'], 'https://www.udemy.com/course/visa-immigration-tech-workers/', 'International', ARRAY['International Career Planning']);