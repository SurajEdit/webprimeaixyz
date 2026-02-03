
import React from 'react';

export type Page = 'home' | 'about' | 'services' | 'portfolio' | 'blog' | 'contact' | 'service-web' | 'service-ugc' | 'service-qr' | 'admin' | 'admin-login';

export interface NavItem {
  label: string;
  page: Page;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  bestFor: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

export interface Message {
  role: 'user' | 'ai';
  content: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  service: string;
  status: 'new' | 'contacted' | 'closed';
  date: string;
  message: string;
}

export interface Project {
  id: string;
  client: string;
  name: string;
  status: 'planning' | 'design' | 'development' | 'live';
  progress: number;
  url?: string;
}

export interface UgcAd {
  id: string;
  brand: string;
  platform: 'TikTok' | 'Meta' | 'YouTube';
  thumbnail: string;
  status: 'active' | 'archived';
  metrics: { views: string; roas: string };
}

export interface QrScreen {
  id: string;
  location: string;
  campaign: string;
  scans: number;
  status: 'online' | 'offline';
}

export interface AdminUser {
  id: string;
  name: string;
  role: 'Super Admin' | 'Admin' | 'Editor' | 'Viewer';
  email: string;
}
