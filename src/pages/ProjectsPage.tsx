
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockProjects, mockColleges } from '@/services/mockData';
import { Project } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [collegeFilter, setCollegeFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');

  // Get unique tags from all projects
  const allTags = Array.from(
    new Set(mockProjects.flatMap((project) => project.tags || []))
  ).sort();

  // Filter projects based on search term, college filter, and tag filter
  useEffect(() => {
    let filtered = [...mockProjects];

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(search) ||
          project.description.toLowerCase().includes(search)
      );
    }

    if (collegeFilter) {
      filtered = filtered.filter((project) => project.collegeName === collegeFilter);
    }

    if (tagFilter) {
      filtered = filtered.filter((project) => project.tags?.includes(tagFilter));
    }

    setProjects(filtered);
  }, [searchTerm, collegeFilter, tagFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setCollegeFilter('');
    setTagFilter('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">College Projects</h1>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search Projects
            </label>
            <Input
              id="search"
              type="text"
              placeholder="Search by title or description"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="college-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by College
            </label>
            <Select value={collegeFilter} onValueChange={setCollegeFilter}>
              <SelectTrigger id="college-filter">
                <SelectValue placeholder="All Colleges" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Colleges</SelectItem>
                {mockColleges.map((college) => (
                  <SelectItem key={college.id} value={college.name}>
                    {college.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="tag-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Tag
            </label>
            <Select value={tagFilter} onValueChange={setTagFilter}>
              <SelectTrigger id="tag-filter">
                <SelectValue placeholder="All Tags" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Tags</SelectItem>
                {allTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {projects.length} of {mockProjects.length} projects
          </div>
          {(searchTerm || collegeFilter || tagFilter) && (
            <Button variant="outline" onClick={clearFilters} size="sm">
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Project Grid */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="college-card">
              <div className="h-48 overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-1">{project.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{project.collegeName}</p>
                <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags?.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-college-light border-none text-college-primary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button asChild className="w-full bg-college-primary hover:bg-college-tertiary">
                  <Link to={`/projects/${project.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
          <Button onClick={clearFilters} className="bg-college-primary hover:bg-college-tertiary">
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
