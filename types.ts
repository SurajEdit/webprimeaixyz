
import React from 'react';

export type Page = 'home' | 'about' | 'services' | 'portfolio' | 'blog' | 'contact' | 'service-web' | 'service-ugc' | 'service-qr' | 'admin' | 'admin-login';

export interface ServiceFeature {
  title: string;
  desc: string;
}

export interface ServiceProcessStep {
  step: string;
  title: string;
  desc: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  ctaText: string;
  isHighlighted: boolean;
  maintenanceFee?: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: 'Layout' | 'Video' | 'QrCode';
  features: ServiceFeature[];
  process: ServiceProcessStep[];
  faqs: ServiceFAQ[];
  pricingPlans: PricingPlan[];
  image: string;
  status: 'active' | 'inactive';
  visibility: 'show' | 'hide';
  isFeatured: boolean;
  sortOrder: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image: string;
  status: 'draft' | 'published';
  visibility: 'show' | 'hide';
  seoTitle?: string;
  seoDescription?: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  category: string;
  stat: string;
  description: string;
  image: string;
  url?: string;
  status: 'live' | 'planning' | 'hidden';
  visibility: 'show' | 'hide';
}

export interface UgcAd {
  id: string;
  title: string;
  creator: string;
  description: string;
  platform: 'TikTok' | 'Meta' | 'YouTube' | 'Custom';
  thumbnail: string;
  videoUrl: string;
  status: 'published' | 'draft';
  isFeatured: boolean;
  metrics: { views: string; roas: string };
  visibility: 'show' | 'hide';
  autoplay: boolean;
  mute: boolean;
  loop: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface SiteContent {
  landing: {
    heroHeadline: string;
    heroSubheadline: string;
    heroCtaPrimary: string;
    heroCtaSecondary: string;
  };
  about: {
    missionHeadline: string;
    missionBody: string;
    storyBody: string;
    team: TeamMember[];
  };
  footer: {
    tagline: string;
    email: string;
    location: string;
    socials: {
      linkedin: string;
      twitter: string;
      instagram: string;
      youtube: string;
    };
  };
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  status: 'new' | 'contacted' | 'closed';
  date: string;
  message: string;
}

export interface Message {
  role: 'user' | 'ai';
  content: string;
}
