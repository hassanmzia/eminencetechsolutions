export interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  icon: string;
  features: string[];
  technologies: string[];
  order: number;
  is_active: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client_name: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  technologies_used: string[];
  metrics: Record<string, string>;
  service_title?: string;
  is_featured: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  specializations: string[];
  linkedin_url: string;
  order: number;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_title: string;
  company: string;
  content: string;
  rating: number;
  is_featured: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author_name: string;
  category: string;
  tags: string[];
  published_at: string;
}

export interface Partner {
  id: string;
  name: string;
  description: string;
  website_url: string;
  partnership_type: string;
}

export interface CompanyMetric {
  id: string;
  label: string;
  value: string;
  icon: string;
}

export interface JobPosting {
  id: string;
  title: string;
  slug: string;
  department: string;
  employment_type: string;
  experience_level: string;
  location: string;
  location_type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  salary_range: string;
  benefits: string[];
}

export interface ConsultingInquiry {
  company_name: string;
  contact_name: string;
  contact_title: string;
  email: string;
  phone: string;
  company_website: string;
  industry: string;
  company_size: string;
  service_type: string;
  project_title: string;
  project_description: string;
  business_objectives: string;
  current_technology_stack: string;
  timeline: string;
  budget_range: string;
  urgency: string;
  how_did_you_hear: string;
  additional_notes: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  company: string;
  inquiry_type: string;
  subject: string;
  message: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  agent_name: string;
  created_at: string;
}

export interface ChatResponse {
  response: string;
  agent: string;
  session_key: string;
  message_id: string;
}

export interface JobApplication {
  job: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  linkedin_url: string;
  portfolio_url: string;
  resume: File | null;
  cover_letter: string;
  years_of_experience: number;
  skills: string[];
  availability: string;
}
