export interface Project {
  id: string;
  name: string;
  progress: number;
  activePhase: string;
  lastUpdated: string;
  deliveryCountdown: number;
  constructionPhaseProgress: number;
}

export interface Phase {
  id: string;
  projectId: string;
  name: string;
  status: 'completed' | 'in-progress' | 'pending' | 'not-started';
  progress: number;
  order: number;
}

export interface Deadline {
  id: string;
  projectId: string;
  title: string;
  date: string;
  sector: string;
  priority: 'critical' | 'active' | 'routine';
}

export interface ProjectFile {
  id: string;
  projectId: string;
  name: string;
  date: string;
  size: string;
  category: 'blueprints' | 'legal' | 'safety';
}

export interface Post {
  id: string;
  projectId: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  content: string;
  timestamp: string;
  priority?: string;
  avatar?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  photoUrl: string;
}
