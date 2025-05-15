
import { Project, College, VerificationResult } from '@/types';

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Smart Campus System',
    description: 'An integrated system that uses artificial intelligence to optimize campus operations including energy management, security surveillance, and student attendance tracking.',
    collegeName: 'MIT University',
    thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&h=300',
    createdAt: '2023-06-15',
    tags: ['AI', 'IoT', 'Machine Learning']
  },
  {
    id: '2',
    title: 'Blockchain-Based Academic Credential Verification',
    description: 'A secure platform that uses blockchain technology to issue, store, and verify academic credentials, eliminating certificate forgery.',
    collegeName: 'Stanford University',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&h=300',
    createdAt: '2023-05-20',
    tags: ['Blockchain', 'Security', 'EdTech']
  },
  {
    id: '3',
    title: 'Virtual Reality Biology Lab',
    description: 'An immersive VR biology lab that allows students to conduct complex experiments virtually with realistic simulations.',
    collegeName: 'Harvard University',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&h=300',
    createdAt: '2023-07-05',
    tags: ['VR', 'Education', 'Biology']
  },
  {
    id: '4',
    title: 'Student Mental Health Support App',
    description: 'A mobile application that provides mental health resources, anonymous peer support, and direct connections to campus counselors.',
    collegeName: 'Yale University',
    thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&h=300',
    createdAt: '2023-04-10',
    tags: ['Mental Health', 'Mobile App', 'Support Services']
  },
  {
    id: '5',
    title: 'Sustainable Campus Water Management',
    description: 'An innovative water management system that captures rainwater, processes greywater, and reduces campus water consumption by 40%.',
    collegeName: 'MIT University',
    thumbnail: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=500&h=300',
    createdAt: '2023-03-22',
    tags: ['Sustainability', 'Water Management', 'Environmental']
  },
  {
    id: '6',
    title: 'Adaptive Learning Platform',
    description: 'A personalized learning platform that adapts course materials based on individual student performance and learning styles.',
    collegeName: 'Stanford University',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&h=300',
    createdAt: '2023-08-01',
    tags: ['EdTech', 'Personalization', 'AI']
  }
];

export const mockColleges: College[] = [
  {
    id: '1',
    name: 'MIT University',
    projectCount: 2,
    location: 'Cambridge, MA'
  },
  {
    id: '2',
    name: 'Stanford University',
    projectCount: 2,
    location: 'Stanford, CA'
  },
  {
    id: '3',
    name: 'Harvard University',
    projectCount: 1,
    location: 'Cambridge, MA'
  },
  {
    id: '4',
    name: 'Yale University',
    projectCount: 1,
    location: 'New Haven, CT'
  }
];

// Mock function to verify college ID card
export const verifyCollegeId = (
  projectCollegeName: string,
  idCardFile: File,
  userId: string
): Promise<VerificationResult> => {
  return new Promise((resolve) => {
    // Simulate processing time
    setTimeout(() => {
      // For demo purposes, we'll approve for the user with ID 1
      if (userId === '1') {
        resolve({
          status: 'granted',
          message: 'College ID verification successful. Access granted to view project details.'
        });
      } else {
        resolve({
          status: 'denied',
          message: 'College ID verification failed. You must be affiliated with this college to access project details.'
        });
      }
    }, 2000);
  });
};

// Mock function to get projects from a specific college
export const getCollegeProjects = (collegeName: string): Project[] => {
  return mockProjects.filter(project => project.collegeName === collegeName);
};

// Mock function to get project by ID
export const getProjectById = (id: string): Project | undefined => {
  return mockProjects.find(project => project.id === id);
};
