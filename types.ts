
export interface Profile {
  id: string;
  name: string;
  title: string;
  about: string;
  email: string;
  phone: string;
  location: string;
  photoUrl: string;
}

export interface Skill {
  id: string;
  name: string;
  percentage: number;
  category: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Portfolio {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  categoryId: string;
  link?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatarUrl: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
}

export interface SocialMedia {
  id: string;
  platform: 'Instagram' | 'TikTok' | 'WhatsApp' | 'LinkedIn' | 'GitHub';
  url: string;
  icon: string;
}

export interface SecurityLog {
  id: string;
  action: string;
  timestamp: string;
  ip?: string;
  status: 'success' | 'warning' | 'danger';
}

export interface AppData {
  admin: {
    username: string;
    passwordHash: string;
    lastLogin: string;
  };
  profile: Profile;
  skills: Skill[];
  categories: Category[];
  portfolio: Portfolio[];
  testimonials: Testimonial[];
  messages: Message[];
  socials: SocialMedia[];
  logs: SecurityLog[];
}
