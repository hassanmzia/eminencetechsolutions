import axios from 'axios';
import type {
  Service, CaseStudy, TeamMember, Testimonial, BlogPost,
  Partner, CompanyMetric, JobPosting, ConsultingInquiry,
  ContactMessage, ChatResponse,
} from '../types';

const API_BASE = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Core endpoints
export const getServices = () => api.get<{ results: Service[] }>('/services/');
export const getService = (slug: string) => api.get<Service>(`/services/${slug}/`);
export const getCaseStudies = () => api.get<{ results: CaseStudy[] }>('/case-studies/');
export const getTeamMembers = () => api.get<{ results: TeamMember[] }>('/team/');
export const getTestimonials = () => api.get<{ results: Testimonial[] }>('/testimonials/');
export const getBlogPosts = () => api.get<{ results: BlogPost[] }>('/blog/');
export const getBlogPost = (slug: string) => api.get<BlogPost>(`/blog/${slug}/`);
export const getPartners = () => api.get<{ results: Partner[] }>('/partners/');
export const getMetrics = () => api.get<{ results: CompanyMetric[] }>('/metrics/');

// Careers
export const getJobPostings = () => api.get<{ results: JobPosting[] }>('/careers/jobs/');
export const getJobPosting = (slug: string) => api.get<JobPosting>(`/careers/jobs/${slug}/`);
export const submitApplication = (data: FormData) =>
  api.post('/careers/applications/', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// Consulting
export const submitConsultingInquiry = (data: ConsultingInquiry) =>
  api.post('/consulting/inquiries/', data);
export const getServiceTypes = () => api.get('/consulting/service-types/');

// Contact
export const submitContactMessage = (data: ContactMessage) =>
  api.post('/contact/messages/', data);
export const subscribeNewsletter = (data: { email: string; name?: string }) =>
  api.post('/contact/newsletter/', data);

// AI Chat
export const sendChatMessage = (data: { message: string; session_key?: string }) =>
  api.post<ChatResponse>('/ai/chat/', data);
export const getChatHistory = (sessionKey: string) =>
  api.get(`/ai/chat/history/${sessionKey}/`);
export const getAgentInfo = () => api.get('/ai/agents/');

export default api;
