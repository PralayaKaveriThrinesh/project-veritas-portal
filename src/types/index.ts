
export interface User {
  id: string;
  name: string;
  email: string;
  collegeName?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  collegeName: string;
  thumbnail?: string;
  createdAt: string;
  tags?: string[];
}

export interface College {
  id: string;
  name: string;
  projectCount: number;
  location?: string;
  logo?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface VerificationResult {
  status: 'granted' | 'denied' | 'pending';
  message: string;
}
