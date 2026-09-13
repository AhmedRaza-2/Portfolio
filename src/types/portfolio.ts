export interface Project {
  id: string;
  title: string;
  category: 'AI & ML' | 'Web Development' | 'Mobile Application' | 'Desktop & Tools' | 'Enterprise Automation' | 'AI & Web';
  description: string;
  image: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  bullets?: string[];
  metrics?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  tags: string[];
}

export interface TimelineItem {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  bullets?: string[];
  grade?: string;
  badge?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  skills: string[];
  icon?: string;
}

export interface Activity {
  id: string;
  title: string;
  category: 'Hackathon' | 'Community' | 'Leadership';
  organization: string;
  period?: string;
  description: string;
  highlight?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  level: 'Expert' | 'Advanced' | 'Proficient';
  percentage: number;
  tools: string[];
  description: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  quote: string;
  avatarLetter: string;
  rating: number;
  projectTag?: string;
  date?: string;
}
