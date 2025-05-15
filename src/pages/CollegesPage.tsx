
import React from 'react';
import { Link } from 'react-router-dom';
import { mockColleges, getCollegeProjects } from '@/services/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const CollegesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Participating Colleges</h1>
      
      <div className="grid grid-cols-1 gap-8">
        {mockColleges.map((college) => {
          const collegeProjects = getCollegeProjects(college.name);
          
          return (
            <Card key={college.id} className="college-card overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="p-6 md:border-r border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{college.name}</h2>
                  <p className="text-gray-500 mb-4">{college.location}</p>
                  <div className="mb-6">
                    <span className="bg-college-light text-college-primary text-sm px-3 py-1 rounded-full">
                      {college.projectCount} {college.projectCount === 1 ? 'Project' : 'Projects'}
                    </span>
                  </div>
                  <Button asChild className="w-full bg-college-primary hover:bg-college-tertiary">
                    <Link to={`/projects?college=${encodeURIComponent(college.name)}`}>
                      View All Projects
                    </Link>
                  </Button>
                </div>
                
                <div className="col-span-2 p-6 bg-gray-50">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Latest Projects</h3>
                  <div className="space-y-4">
                    {collegeProjects.slice(0, 2).map((project) => (
                      <div key={project.id} className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="font-medium text-gray-900 mb-1">{project.title}</h4>
                        <p className="text-sm text-gray-500 mb-2">{new Date(project.createdAt).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                        <div className="flex justify-end">
                          <Button asChild variant="link" size="sm" className="text-college-primary">
                            <Link to={`/projects/${project.id}`}>View Details &rarr;</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    {collegeProjects.length === 0 && (
                      <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                        <p className="text-gray-500">No projects available from this college yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CollegesPage;
