/*
  # Seed course recommendations data

  Insert comprehensive course data for different categories and focus areas
*/

INSERT INTO course_recommendations (title, provider, duration, difficulty, rating, price, description, skills, url, category, focus_areas) VALUES
-- DSA Courses
('Master the Coding Interview: Data Structures + Algorithms', 'Udemy', '19 hours', 'Intermediate', 4.6, '$84.99', 'Complete guide to ace coding interviews at top tech companies', ARRAY['Data Structures', 'Algorithms', 'Problem Solving'], 'https://www.udemy.com/course/master-the-coding-interview-data-structures-algorithms/', 'DSA', ARRAY['Data Structures & Algorithms', 'Technical Skills']),

('Algorithms Specialization', 'Coursera (Stanford)', '4 months', 'Advanced', 4.8, '$49/month', 'Comprehensive algorithms course from Stanford University', ARRAY['Advanced Algorithms', 'Graph Theory', 'Dynamic Programming'], 'https://www.coursera.org/specializations/algorithms', 'DSA', ARRAY['Data Structures & Algorithms', 'System Design']),

('Data Structures and Algorithms in Python', 'Udacity', '4 months', 'Intermediate', 4.4, '$399/month', 'Learn DSA with Python implementation and real-world projects', ARRAY['Python', 'Data Structures', 'Algorithms'], 'https://www.udacity.com/course/data-structures-and-algorithms-nanodegree--nd256', 'DSA', ARRAY['Data Structures & Algorithms', 'Technical Skills']),

-- System Design Courses
('System Design Interview Course', 'Educative', '12 weeks', 'Advanced', 4.7, '$79/month', 'Master system design for FAANG interviews', ARRAY['System Design', 'Scalability', 'Architecture'], 'https://www.educative.io/courses/grokking-the-system-design-interview', 'System Design', ARRAY['System Design', 'Technical Skills']),

('Designing Data-Intensive Applications', 'O''Reilly', 'Self-paced', 'Advanced', 4.9, '$49.99', 'Deep dive into building scalable, reliable systems', ARRAY['Distributed Systems', 'Database Design', 'System Architecture'], 'https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/', 'System Design', ARRAY['System Design', 'Technical Skills']),

-- Web Development Courses
('The Complete Web Developer Bootcamp', 'Udemy', '65 hours', 'Beginner', 4.7, '$84.99', 'Full-stack web development from scratch', ARRAY['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'], 'https://www.udemy.com/course/the-complete-web-development-bootcamp/', 'Web Development', ARRAY['Project Development', 'Technical Skills']),

('React - The Complete Guide', 'Udemy', '48 hours', 'Intermediate', 4.6, '$84.99', 'Master React with hooks, context, and advanced patterns', ARRAY['React', 'JavaScript', 'Frontend Development'], 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/', 'Web Development', ARRAY['Project Development', 'Technical Skills']),

('Full Stack Open', 'University of Helsinki', '12 weeks', 'Intermediate', 4.8, 'Free', 'Modern full stack development with React, Node.js, and GraphQL', ARRAY['React', 'Node.js', 'GraphQL', 'MongoDB'], 'https://fullstackopen.com/en/', 'Web Development', ARRAY['Project Development', 'Technical Skills', 'Open Source Contributions']),

-- Machine Learning Courses
('Machine Learning Course', 'Coursera (Stanford)', '11 weeks', 'Intermediate', 4.9, '$49/month', 'Andrew Ng''s famous machine learning course', ARRAY['Machine Learning', 'Python', 'Statistics'], 'https://www.coursera.org/learn/machine-learning', 'Machine Learning', ARRAY['Technical Skills', 'Project Development']),

('Deep Learning Specialization', 'Coursera (deeplearning.ai)', '4 months', 'Advanced', 4.8, '$49/month', 'Comprehensive deep learning specialization', ARRAY['Deep Learning', 'Neural Networks', 'TensorFlow'], 'https://www.coursera.org/specializations/deep-learning', 'Machine Learning', ARRAY['Technical Skills', 'Project Development']),

-- Mobile Development Courses
('React Native - The Practical Guide', 'Udemy', '32 hours', 'Intermediate', 4.6, '$84.99', 'Build native mobile apps with React Native', ARRAY['React Native', 'Mobile Development', 'JavaScript'], 'https://www.udemy.com/course/react-native-the-practical-guide/', 'Mobile Development', ARRAY['Project Development', 'Technical Skills']),

('Flutter & Dart - The Complete Guide', 'Udemy', '40 hours', 'Beginner', 4.5, '$84.99', 'Build beautiful native apps with Flutter', ARRAY['Flutter', 'Dart', 'Mobile Development'], 'https://www.udemy.com/course/learn-flutter-dart-to-build-ios-android-apps/', 'Mobile Development', ARRAY['Project Development', 'Technical Skills']),

-- DevOps Courses
('Docker and Kubernetes: The Complete Guide', 'Udemy', '21 hours', 'Intermediate', 4.6, '$84.99', 'Master containerization and orchestration', ARRAY['Docker', 'Kubernetes', 'DevOps'], 'https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/', 'DevOps', ARRAY['Technical Skills', 'System Design']),

('AWS Certified Solutions Architect', 'A Cloud Guru', '20 hours', 'Intermediate', 4.5, '$39/month', 'Prepare for AWS certification and cloud architecture', ARRAY['AWS', 'Cloud Computing', 'System Architecture'], 'https://acloudguru.com/course/aws-certified-solutions-architect-associate-saa-c02', 'Cloud Computing', ARRAY['Technical Skills', 'System Design']),

-- Competitive Programming
('Competitive Programming Essentials', 'CodeChef', '8 weeks', 'Intermediate', 4.4, 'Free', 'Master competitive programming techniques', ARRAY['Competitive Programming', 'Algorithms', 'Problem Solving'], 'https://www.codechef.com/ide', 'Competitive Programming', ARRAY['Data Structures & Algorithms', 'Technical Skills']),

('Advanced Algorithms and Data Structures', 'Codeforces', 'Self-paced', 'Advanced', 4.6, 'Free', 'Advanced topics for competitive programming', ARRAY['Advanced Algorithms', 'Graph Theory', 'Number Theory'], 'https://codeforces.com/edu/courses', 'Competitive Programming', ARRAY['Data Structures & Algorithms', 'Technical Skills']),

-- Communication & Professional Skills
('Improve Your English Communication Skills', 'Coursera', '6 weeks', 'Beginner', 4.5, '$39/month', 'Enhance English communication for international careers', ARRAY['English Communication', 'Presentation Skills', 'Professional Writing'], 'https://www.coursera.org/specializations/improve-english', 'Communication', ARRAY['English Communication', 'International Career Planning']),

('LinkedIn Learning: Professional Networking', 'LinkedIn Learning', '2 hours', 'Beginner', 4.3, '$29.99/month', 'Build and leverage your professional network', ARRAY['Networking', 'LinkedIn Optimization', 'Career Development'], 'https://www.linkedin.com/learning/professional-networking', 'Professional Development', ARRAY['LinkedIn Profile', 'Professional Networking']),

-- International Career Preparation
('Working Abroad: International Career Guide', 'Udemy', '8 hours', 'Beginner', 4.2, '$54.99', 'Complete guide to working internationally', ARRAY['International Career', 'Visa Process', 'Cultural Adaptation'], 'https://www.udemy.com/course/working-abroad-international-career/', 'Career Development', ARRAY['International Career Planning', 'Professional Development']),

('IELTS Preparation Course', 'British Council', '12 weeks', 'Intermediate', 4.7, '$199', 'Prepare for IELTS exam for international opportunities', ARRAY['English Proficiency', 'IELTS', 'Academic English'], 'https://www.britishcouncil.org/exam/ielts/prepare', 'Language', ARRAY['English Communication', 'International Career Planning']);