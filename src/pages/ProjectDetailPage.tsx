
import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getProjectById, verifyCollegeId } from '@/services/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { VerificationResult } from '@/types';
import { useToast } from '@/components/ui/use-toast';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const project = id ? getProjectById(id) : undefined;
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!isAuthenticated) {
    toast({
      title: "Authentication Required",
      description: "Please sign in to view project details",
      variant: "destructive"
    });
    return <Navigate to="/login" />;
  }

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
          <p className="text-gray-600 mb-6">The project you are looking for does not exist or has been removed.</p>
          <Button asChild className="bg-college-primary hover:bg-college-tertiary">
            <Link to="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleVerification = async () => {
    if (!selectedFile || !user) return;
    
    setIsVerifying(true);
    
    try {
      const result = await verifyCollegeId(project.collegeName, selectedFile, user.id);
      setVerificationResult(result);
      
      toast({
        title: result.status === 'granted' ? 'Access Granted' : 'Access Denied',
        description: result.message,
        variant: result.status === 'granted' ? 'default' : 'destructive'
      });
      
    } catch (error) {
      toast({
        title: 'Verification Error',
        description: 'An error occurred during verification. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/projects" className="text-college-primary hover:underline mb-6 inline-flex items-center">
        &larr; Back to Projects
      </Link>
      
      {/* Project header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge className="bg-college-primary hover:bg-college-primary">{project.collegeName}</Badge>
          <span className="text-gray-500 text-sm">Added on {new Date(project.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tags?.map((tag) => (
            <Badge key={tag} variant="outline" className="bg-college-light border-none text-college-primary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Project content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Preview image */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md mb-8">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-64 object-cover"
            />
          </div>
          
          {/* Check if verification is needed */}
          {verificationResult?.status === 'granted' ? (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Project Details</h2>
                <p className="text-gray-600 mb-6">{project.description}</p>
                
                <h3 className="text-lg font-bold text-gray-900 mb-3">Project Goals</h3>
                <p className="text-gray-600 mb-6">
                  This project aims to innovate in the field of {project.tags?.[0]} by implementing cutting-edge
                  technologies and methodologies. The team at {project.collegeName} has been working on this
                  initiative for several months, with promising results in early testing phases.
                </p>
                
                <h3 className="text-lg font-bold text-gray-900 mb-3">Technical Implementation</h3>
                <p className="text-gray-600 mb-6">
                  The implementation leverages modern frameworks and tools, ensuring scalability and 
                  maintainability. The architecture follows industry best practices, with a focus on
                  performance optimization and user experience.
                </p>
                
                <h3 className="text-lg font-bold text-gray-900 mb-3">Results & Impact</h3>
                <p className="text-gray-600">
                  Early adopters of this project have reported significant improvements in efficiency
                  and effectiveness. The project is currently in its beta phase, with plans for a full
                  release in the coming months.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Restricted Content</h2>
                <p className="text-gray-600 mb-6">
                  Detailed information about this project is restricted to members of {project.collegeName}.
                  Please verify your college affiliation to access the full project details.
                </p>
                
                <Button 
                  onClick={() => setIsVerificationModalOpen(true)} 
                  className="bg-college-primary hover:bg-college-tertiary"
                >
                  Verify College Affiliation
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Sidebar */}
        <div>
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">College Information</h3>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Institution:</span> {project.collegeName}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Department:</span> {project.tags?.[0]} Research
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-medium">Project Status:</span> Active
              </p>
              
              <Button asChild className="w-full" variant="outline">
                <a href="#" target="_blank" rel="noreferrer">
                  Visit College Website
                </a>
              </Button>
            </CardContent>
          </Card>
          
          {verificationResult?.status === 'granted' && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Contact Information</h3>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Project Lead:</span> Prof. James Wilson
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Email:</span> j.wilson@{project.collegeName.split(' ')[0].toLowerCase()}.edu
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">Office:</span> Science Building, Room 402
                </p>
                
                <Button className="w-full bg-college-primary hover:bg-college-tertiary">
                  Request Collaboration
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      {/* Verification Modal */}
      <Dialog open={isVerificationModalOpen} onOpenChange={setIsVerificationModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify College Affiliation</DialogTitle>
            <DialogDescription>
              Please upload your college ID card to verify your affiliation with {project.collegeName}.
              Your ID will be scanned to confirm your enrollment status.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {selectedFile ? (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Selected file:</p>
                  <p className="font-medium">{selectedFile.name}</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedFile(null)}
                    className="mt-2"
                  >
                    Change file
                  </Button>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-500 mb-4">
                    Click to upload or drag and drop your college ID card image (JPG, PNG)
                  </p>
                  <Button variant="outline" asChild>
                    <label className="cursor-pointer">
                      Upload ID Card
                      <input
                        type="file"
                        className="hidden"
                        accept="image/jpeg,image/png"
                        onChange={handleFileChange}
                      />
                    </label>
                  </Button>
                </div>
              )}
            </div>
            
            {verificationResult && (
              <div className={`p-4 rounded-lg ${
                verificationResult.status === 'granted' 
                  ? 'bg-green-50 text-green-800' 
                  : 'bg-red-50 text-red-800'
              }`}>
                <p className="font-medium">
                  {verificationResult.status === 'granted' ? 'Access Granted' : 'Access Denied'}
                </p>
                <p className="text-sm mt-1">{verificationResult.message}</p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsVerificationModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleVerification}
              disabled={!selectedFile || isVerifying}
              className="bg-college-primary hover:bg-college-tertiary"
            >
              {isVerifying ? 'Verifying...' : 'Verify ID'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectDetailPage;
