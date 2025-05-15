
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { mockColleges, mockProjects } from '@/services/mockData';
import { Card, CardContent } from '@/components/ui/card';

const HomePage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const featuredProjects = mockProjects.slice(0, 3);
  
  return (
    <div className="py-12">
      {/* Hero Section */}
      <div className="bg-college-light py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              <span className="text-college-primary">College Project</span>{" "}
              <span className="text-college-secondary">Portal</span>
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
              Discover and access innovative projects from top colleges and universities
            </p>
            <div className="mt-8 flex justify-center">
              {isAuthenticated ? (
                <Button asChild className="bg-college-primary hover:bg-college-tertiary">
                  <Link to="/projects">Explore Projects</Link>
                </Button>
              ) : (
                <Button asChild className="bg-college-primary hover:bg-college-tertiary">
                  <Link to="/login">Sign In to Explore</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <Card key={project.id} className="college-card">
              <div className="h-48 overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{project.collegeName}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="bg-college-light text-college-primary text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link to={`/projects/${project.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild variant="outline" className="border-college-primary text-college-primary hover:bg-college-light">
            <Link to="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>

      {/* Colleges Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Participating Colleges</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockColleges.map((college) => (
              <Card key={college.id} className="college-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">{college.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{college.location}</p>
                  <p className="text-sm text-gray-600 mb-4">
                    {college.projectCount} {college.projectCount === 1 ? 'Project' : 'Projects'}
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/colleges/${college.id}`}>View Projects</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-college-light text-college-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-bold text-lg">1</span>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Browse Projects</h3>
            <p className="text-gray-600">
              Explore innovative projects from various colleges and universities across different fields.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-college-light text-college-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-bold text-lg">2</span>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Verify Your Affiliation</h3>
            <p className="text-gray-600">
              Upload your college ID card to verify your affiliation with the institution.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-college-light text-college-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-bold text-lg">3</span>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Access Project Details</h3>
            <p className="text-gray-600">
              Once verified, access detailed information about projects from your affiliated institution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
