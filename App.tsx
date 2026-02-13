
import React, { useState } from 'react';
import { 
  Sparkles, Layout, Video, QrCode, 
  ChevronRight, ArrowRight, CheckCircle2, 
  Target, Zap, 
  Plus, Minus,
  Lock, Layers, PlayCircle, Star, Quote,
  Users, Home as HomeIcon, Briefcase, ExternalLink,
  Clock, MessageSquare, Headphones
} from 'lucide-react';
import { Page, BlogPost, Service, Project, UgcAd, SiteContent } from './types';
import { AIConsultant } from './components/AIConsultant';
import { UgcLanding } from './pages/UgcLanding';
import { WebDesignLanding } from './pages/WebDesignLanding';
import { QrScreenLanding } from './pages/QrScreenLanding';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { AutoPlayingVideo } from './components/AutoPlayingVideo';
import { Breadcrumbs, SectionHeader } from './components/Shared';

const LOGO_URL = "https://lh3.googleusercontent.com/a/ACg8ocJoqFrWgOQ0WElWvr4IsZUCF6IUmNAxphg9XsImWylZijxOgg8=s400-c";

const INITIAL_SITE_CONTENT: SiteContent = {
  landing: {
    heroHeadline: "Build Smarter.\nConvert Faster.",
    heroSubheadline: "We combine cutting-edge AI strategy with high-performance design to create digital systems that actually drive revenue in the Indian market.",
    heroCtaPrimary: "Get Free Consultation",
    heroCtaSecondary: "Book a Demo",
    features: [
      { title: "AI-Driven UX", desc: "Predictive interfaces that adapt to user behavior.", icon: "Sparkles" },
      { title: "Conversion First", desc: "Every pixel engineered for lead generation.", icon: "Target" },
      { title: "Cloud Scale", desc: "High-speed hosting optimized for Indian networks.", icon: "Zap" }
    ],
    testimonials: [
      { id: '1', name: "Julian Thorne", company: "Lumina Tech", quote: "Web Prime AI didn't just redesign our site; they rebuilt our entire sales process.", rating: 5 },
      { id: '2', name: "Sarah Jenkins", company: "Aura Skincare", quote: "The UGC ads they produced feel so authentic that our target audience stopped scrolling.", rating: 5 }
    ]
  },
  about: {
    missionHeadline: "Design Meets Intelligence.",
    missionBody: "To democratize high-performance AI tech for every ambitious brand.",
    storyBody: "Web Prime AI started with a single realization: the gap between standard web design and real business performance was widening. Most sites looked great but failed to adapt to user intent.\n\nWe built this agency to bridge that gap by infusing every project with AI-driven strategy. We don't just build pages; we build automated growth machines that learn, adapt, and convert.",
    team: [
      { id: '1', name: "Julian Thorne", role: "Creative Director", image: "https://picsum.photos/seed/t1/400/400" },
      { id: '2', name: "Sarah Jenkins", role: "AI Strategist", image: "https://picsum.photos/seed/t2/400/400" }
    ]
  },
  footer: {
    tagline: "Empowering Your Website with AI. We build high-performance business machines designed to turn visitors into lifelong customers.",
    email: "support@webprimeai.com",
    location: "New Delhi, IN",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com"
    }
  }
};

const INITIAL_SERVICES: Service[] = [
  {
    id: 'service-web',
    name: 'Website Design',
    slug: 'website-design',
    shortDescription: 'Optimized for Indian mobile networks. Predictive UI that converts traffic.',
    fullDescription: 'We build high-performance business machines designed to turn visitors into lifelong customers with Hinglish support and local payment integration.',
    icon: 'Layout',
    features: [
      { title: "Mobile-First for India", desc: "90%+ traffic is mobile in India. We prioritize speed." },
      { title: "Local Payment Ready", desc: "Razorpay, Paytm, and UPI gateways integration." },
      { title: "AI Hinglish Copy", desc: "Communicate like your local customers." }
    ],
    process: [
      { step: "01", title: "Strategy Audit", desc: "Analyzing your conversion gaps." },
      { step: "02", title: "AI Build", desc: "Engineering your custom solution." }
    ],
    faqs: [
      { question: "How long is delivery?", answer: "Usually within 7-14 days depending on plan." }
    ],
    pricingPlans: [
      { id: 'p1', name: 'Starter', price: '₹24,999', description: 'Ideal for Indian startups.', features: ['Landing Page', 'Maintenance: ₹7,000/mo', 'Razorpay Ready'], ctaText: 'Launch Site', isHighlighted: false },
      { id: 'p2', name: 'Growth', price: '₹59,999', description: 'Scale your business.', features: ['Up to 5 Pages', 'Maintenance: ₹7,000/mo', 'WhatsApp API'], ctaText: 'Get Growth', isHighlighted: true },
      { id: 'p3', name: 'Elite', price: 'Custom', description: 'Enterprise solutions.', features: ['D2C Store', 'Custom Support', 'AI Chatbots'], ctaText: 'Contact Strategy', isHighlighted: false }
    ],
    image: 'https://picsum.photos/seed/web/800/600',
    status: 'active',
    visibility: 'show',
    isFeatured: true,
    sortOrder: 1
  },
  {
    id: 'service-ugc',
    name: 'UGC Ads',
    slug: 'ugc-ads',
    shortDescription: 'Authentic creator-style ads designed to scale Indian D2C brands.',
    fullDescription: 'Stop the scroll with authentic creator content that builds trust and drives ROAS for Indian audiences.',
    icon: 'Video',
    features: [
      { title: "Regional Creators", desc: "Access creators across Tier-1 and Tier-2 cities." },
      { title: "Trust Building", desc: "Authentic storytelling that relates to locals." }
    ],
    process: [
      { step: "01", title: "Hook Creation", desc: "Writing scripts that grab attention." }
    ],
    faqs: [
      { question: "Can we use regional languages?", answer: "Yes, we support Hindi and major regional dialects." }
    ],
    pricingPlans: [
      { id: 'u1', name: 'Flash', price: '₹19,999', description: 'Testing ad hooks.', features: ['3 Videos', '1 Local Creator', 'Reels Format'], ctaText: 'Buy Flash', isHighlighted: false },
      { id: 'u2', name: 'Ignite', price: '₹49,999', description: 'Scale profitably.', features: ['10 Videos', '3 Creators', 'Data Audit'], ctaText: 'Scale Now', isHighlighted: true },
      { id: 'u3', name: 'Dominate', price: '₹99,999', description: 'Full coverage.', features: ['25+ Videos', 'Unlimited Network', 'Daily Sync'], ctaText: 'Book Strategy', isHighlighted: false }
    ],
    image: 'https://picsum.photos/seed/ugc/800/600',
    status: 'active',
    visibility: 'show',
    isFeatured: true,
    sortOrder: 2
  },
  {
    id: 'service-qr',
    name: 'AI QR Solutions',
    slug: 'ai-qr-solutions',
    shortDescription: 'Smart engagement systems for local Indian retail and malls.',
    fullDescription: 'Transform offline footfall into digital leads instantly using AI-powered smart screens.',
    icon: 'QrCode',
    features: [
      { title: "WhatsApp First", desc: "Direct-to-chat redirections for Indian consumers." },
      { title: "Live Footfall", desc: "Track every scan in real-time." }
    ],
    process: [
      { step: "01", title: "Deployment", desc: "Setting up screens in prime locations." }
    ],
    faqs: [
      { question: "Is it subscription based?", answer: "Yes, with a monthly maintenance fee." }
    ],
    pricingPlans: [
      { id: 'q1', name: 'Boutique', price: '₹4,999/mo', description: 'Local shop owners.', features: ['5 Screens', 'Maintenance: ₹7,000/mo', 'WhatsApp Link'], ctaText: 'Equip Store', isHighlighted: false },
      { id: 'q2', name: 'Standard', price: '₹14,999/mo', description: 'Multi-location venues.', features: ['50 Screens', 'Maintenance: ₹7,000/mo', 'Heatmaps'], ctaText: 'Go Pro', isHighlighted: true },
      { id: 'q3', name: 'Enterprise', price: 'Custom', description: 'Shopping mall scale.', features: ['Unlimited Fleet', 'White-label UI', 'Custom API'], ctaText: 'Talk Sales', isHighlighted: false }
    ],
    image: 'https://picsum.photos/seed/qr/800/600',
    status: 'active',
    visibility: 'show',
    isFeatured: true,
    sortOrder: 3
  }
];

const INITIAL_BLOGS: BlogPost[] = [
  { id: '1', title: 'Why UGC Wins in 2025', slug: 'ugc-wins-2025', excerpt: 'Authentic content is winning.', content: 'Full content here...', date: 'Oct 12, 2024', category: 'Advertising', image: 'https://picsum.photos/seed/blog1/800/400', status: 'published', visibility: 'show' }
];

const INITIAL_PORTFOLIO: Project[] = [
  { id: 'p1', name: "LUMINA TECH REDESIGN", client: "Lumina Tech", category: "WEB DESIGN", stat: "+42% CONVERSION", description: "Strategic UI overhaul for a global SaaS leader.", image: "https://picsum.photos/seed/web/800/600", mediaType: 'image', visibility: 'show', tags: ['SaaS', 'UI/UX'] },
  { id: 'p2', name: "UGC AD STRATEGY VAULT", client: "D2C Brand X", category: "UGC ADS", stat: "3.8X ROAS", description: "Performance video showcase for a high-growth skincare brand.", image: "https://picsum.photos/seed/portfolio1/400/700", mediaType: 'video', videoUrl: "https://drive.google.com/file/d/1f622woUhNYgi-WjspbjecdTfCzaw02Eo/view?usp=drive_link", visibility: 'show', tags: ['Ads', 'Video'] },
  { id: 'p3', name: "RETAIL SMART SCREEN FLEET", client: "Select Citywalk", category: "QR SOLUTIONS", stat: "15K SCANS/MO", description: "Smart engagement deployment across 50 retail locations.", image: "https://picsum.photos/seed/qr/800/600", mediaType: 'link', externalLink: "https://webprimeai.in", visibility: 'show', tags: ['Retail', 'QR'] }
];

const INITIAL_UGC_ADS: UgcAd[] = [
  { 
    id: 'u-portfolio-1', 
    title: "AGENCY STRATEGIC SHOWCASE", 
    creator: "Web Prime Studio", 
    description: "Our premier strategic campaign showcase.", 
    category: "STRATEGY",
    platform: 'Custom', 
    thumbnail: "https://picsum.photos/seed/portfolio1/400/700", 
    videoUrl: "https://drive.google.com/file/d/1f622woUhNYgi-WjspbjecdTfCzaw02Eo/view?usp=drive_link", 
    status: 'published', 
    isFeatured: true, 
    metrics: { views: "128k", roas: "4.8x" }, 
    visibility: 'show' 
  },
  { 
    id: 'u1', 
    title: "ORGANIC SKINCARE TESTIMONIAL", 
    creator: "Sarah J.", 
    description: "Authentic product review for D2C skincare.", 
    category: "SKINCARE",
    platform: 'Meta', 
    thumbnail: "https://picsum.photos/seed/v1/400/700", 
    videoUrl: "", 
    status: 'published', 
    isFeatured: true, 
    metrics: { views: "45k", roas: "3.2x" }, 
    visibility: 'show' 
  }
];

const NavBar = ({ onNavigate }: { onNavigate: (p: Page) => void }) => (
  <nav className="fixed top-0 w-full z-[100] py-8 bg-black/50 backdrop-blur-xl border-b border-white/5">
    <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 cursor-pointer group" onClick={() => onNavigate('home')}>
        <div className="relative">
          <div className="absolute inset-0 bg-blue-600 blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <img 
            src={LOGO_URL} 
            alt="Web Prime AI Logo" 
            className="relative z-10 w-11 h-11 rounded-xl object-cover border border-white/10 animate-subtle-float" 
          />
        </div>
        <span className="font-black text-3xl tracking-tighter uppercase gradient-text transition-all group-hover:scale-105 origin-left">
          WEB PRIME AI
        </span>
      </div>
      <div className="hidden md:flex gap-8 font-bold text-[13px] text-zinc-500 uppercase tracking-widest items-center">
        {['home', 'about', 'services', 'portfolio', 'blog'].map(p => (
          <button key={p} onClick={() => onNavigate(p as Page)} className="hover:text-white transition-colors">{p.toUpperCase()}</button>
        ))}
        <button onClick={() => onNavigate('contact')} className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl text-white transition-all shadow-lg shadow-blue-600/20 active:scale-95 ml-4 text-[11px] font-black uppercase">GET STARTED</button>
      </div>
    </div>
  </nav>
);

const Home = ({ onNavigate, services, ugcAds, siteContent }: { onNavigate: (p: Page) => void, services: Service[], ugcAds: UgcAd[], siteContent: SiteContent }) => (
  <div className="animate-in fade-in duration-1000">
    <section className="relative pt-64 pb-32 md:pb-48 px-6 text-center overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-blue-600/10 blur-[140px] rounded-full -z-10" />
      <div className="max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-900/30 border border-blue-500/20 text-blue-400 text-[10px] font-black mb-12 tracking-[0.2em] uppercase">
          <Sparkles className="w-3.5 h-3.5" /> NEXT-GEN AI AGENCY
        </div>
        <h1 className="text-7xl md:text-[10rem] font-black leading-[0.9] tracking-tighter mb-12 whitespace-pre-line uppercase">
          {siteContent.landing.heroHeadline.toUpperCase()}
        </h1>
        <p className="text-xl md:text-3xl text-zinc-400 max-w-4xl mx-auto mb-16 leading-relaxed font-light">
          {siteContent.landing.heroSubheadline}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button onClick={() => onNavigate('contact')} className="w-full sm:w-auto px-12 py-6 bg-white text-black font-black rounded-3xl text-xl hover:bg-zinc-200 shadow-2xl shadow-white/10 active:scale-95 transition-all flex items-center justify-center gap-3 uppercase">
            {siteContent.landing.heroCtaPrimary.toUpperCase()} <ArrowRight />
          </button>
          <button onClick={() => onNavigate('services')} className="w-full sm:w-auto px-12 py-6 bg-zinc-900 text-white border border-zinc-800 font-black rounded-3xl text-xl hover:bg-zinc-800 transition-all uppercase">
            {siteContent.landing.heroCtaSecondary.toUpperCase()}
          </button>
        </div>
      </div>
    </section>

    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader centered highlight="CAPABILITIES" title="CORE GROWTH ENGINES" subtitle="Tailored solutions for modern brands." />
        <div className="grid md:grid-cols-3 gap-10">
          {services.filter(s => s.visibility === 'show').map(s => (
            <div key={s.id} onClick={() => onNavigate(s.id as Page)} className="glass-card p-12 rounded-[50px] cursor-pointer hover:border-blue-500/30 group transition-all">
              <div className="mb-10 w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                 {s.icon === 'Layout' ? <Layout className="text-blue-500" /> : s.icon === 'Video' ? <Video className="text-purple-500" /> : <QrCode className="text-pink-500" />}
              </div>
              <h3 className="text-3xl font-black mb-4 uppercase">{s.name}</h3>
              <p className="text-zinc-500 mb-10 leading-relaxed">{s.shortDescription}</p>
              <div className="text-blue-500 font-black flex items-center gap-2 uppercase tracking-widest text-[10px] group-hover:gap-4 transition-all">
                EXPLORE ENGINE <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-32 px-6">
       <div className="max-w-7xl mx-auto">
          <SectionHeader centered highlight="SUCCESS STORIES" title="TRUSTED BY GLOBAL FOUNDERS" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {siteContent.landing.testimonials.map((t, i) => (
                <div key={i} className="glass-card p-10 rounded-[40px] border-white/5 relative">
                   <Quote className="absolute top-10 right-10 text-blue-500/10 w-20 h-20" />
                   <div className="flex gap-1 mb-8">
                      {Array.from({ length: t.rating }).map((_, s) => <Star key={s} size={14} className="fill-blue-500 text-blue-500" />)}
                   </div>
                   <p className="text-xl text-white font-light italic leading-relaxed mb-10">"{t.quote}"</p>
                   <div>
                      <div className="font-bold text-lg">{t.name}</div>
                      <div className="text-zinc-500 text-xs font-black uppercase tracking-widest">{t.company}</div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </section>

    <section className="py-48 px-6 text-center relative overflow-hidden">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-purple-600/20 blur-[140px] rounded-full -z-10" />
       <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 whitespace-pre-line uppercase">Start Your AI-Powered <br /><span className="gradient-text">Website Today.</span></h2>
          <p className="text-xl text-zinc-400 mb-12 font-light">Join the ranks of high-performance brands scaling with Web Prime AI.</p>
          <button onClick={() => onNavigate('contact')} className="px-16 py-8 bg-blue-600 text-white font-black rounded-3xl text-2xl hover:bg-blue-700 shadow-2xl shadow-blue-600/30 active:scale-95 transition-all uppercase">
             BEGIN THE PROTOCOL
          </button>
       </div>
    </section>
  </div>
);

const Blog = ({ blogs, onNavigate }: { blogs: BlogPost[], onNavigate: (p: Page) => void }) => (
  <section className="pt-48 pb-32 px-6 animate-in slide-in-from-bottom-8">
    <div className="max-w-7xl mx-auto">
      <Breadcrumbs path={[{ label: 'Blog' }]} onNavigate={onNavigate} />
      <SectionHeader title="AGENCY INSIGHTS" subtitle="Design, AI, and performance marketing." highlight="THOUGHT LEADERSHIP" />
      <div className="grid md:grid-cols-2 gap-10">
        {blogs.filter(b => b.status === 'published' && b.visibility === 'show').map(b => (
          <div key={b.id} className="group cursor-pointer">
            <div className="aspect-video rounded-[32px] overflow-hidden mb-6 border border-white/5">
              <img src={b.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={b.title} />
            </div>
            <h3 className="text-2xl font-bold mb-4 uppercase">{b.title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">{b.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Portfolio = ({ portfolio, onNavigate }: { portfolio: Project[], onNavigate: (p: Page) => void }) => {
  const [filter, setFilter] = useState('ALL');
  const categories = ['ALL', ...new Set(portfolio.map(p => p.category))];

  const filteredItems = filter === 'ALL' 
    ? portfolio.filter(p => p.visibility === 'show')
    : portfolio.filter(p => p.visibility === 'show' && p.category === filter);

  const handleAction = (item: Project) => {
    if (item.mediaType === 'video' && item.videoUrl) {
      window.open(item.videoUrl, '_blank');
    } else if (item.mediaType === 'link' && item.externalLink) {
      window.open(item.externalLink, '_blank');
    }
  };

  return (
    <section className="pt-48 pb-32 px-6 animate-in slide-in-from-bottom-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs path={[{ label: 'Portfolio' }]} onNavigate={onNavigate} />
        <SectionHeader title="THE RESULTS VAULT" subtitle="Measuring success through data and high-performance engineering." highlight="PROVEN RESULTS" />
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-20 justify-center">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${filter === cat ? 'bg-blue-600 border-blue-400 text-white shadow-xl shadow-blue-600/20' : 'bg-white/5 border-white/10 text-zinc-500 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredItems.map(p => (
            <div key={p.id} onClick={() => handleAction(p)} className={`glass-card rounded-[50px] overflow-hidden group border-white/5 hover:border-blue-500/30 transition-all ${p.mediaType !== 'image' ? 'cursor-pointer hover:scale-[1.02]' : ''}`}>
              <div className="relative aspect-[4/3] overflow-hidden">
                {p.mediaType === 'video' && p.videoUrl ? (
                  <AutoPlayingVideo src={p.videoUrl} poster={p.image} className="opacity-50 group-hover:opacity-70 transition-opacity" />
                ) : (
                  <img src={p.image} className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-1000" alt={p.name} />
                )}
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                   {p.mediaType === 'video' && <div className="bg-blue-600 p-5 rounded-full shadow-2xl"><PlayCircle size={32} /></div>}
                   {p.mediaType === 'link' && <div className="bg-zinc-900/80 p-5 rounded-full shadow-2xl backdrop-blur-md"><ExternalLink size={32} /></div>}
                </div>
                <div className="absolute top-6 right-6 pointer-events-none">
                  <div className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 text-[10px] font-black text-white">{p.stat}</div>
                </div>
              </div>
              <div className="p-10">
                <div className="text-[10px] font-black text-blue-500 uppercase mb-4 tracking-widest">{p.category}</div>
                <h3 className="text-2xl font-black mb-4 uppercase group-hover:text-blue-400 transition-colors">{p.name}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-light">{p.description}</p>
                
                {(p.mediaType === 'video' || p.mediaType === 'link') && (
                   <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">
                        {p.mediaType === 'video' ? 'VIEW PERFORMANCE AD' : 'EXPLORE LIVE ENGINE'}
                      </span>
                      <ArrowRight size={16} className="text-blue-500 group-hover:translate-x-2 transition-transform" />
                   </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = ({ onNavigate }: { onNavigate: (p: Page) => void }) => {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', service: 'web', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', phone: '', service: 'web', message: '' });
    }, 2000);
  };

  return (
    <section className="relative pt-48 pb-32 px-6 overflow-hidden">
      {/* Decorative Blurs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs path={[{ label: 'Contact Terminal' }]} onNavigate={onNavigate} />
        
        <div className="flex flex-col lg:flex-row gap-24 items-start">
          <div className="flex-1 w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-black mb-6 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> AVAILABLE: Q3 2025
            </div>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] uppercase">
              Initiate <br />
              <span className="gradient-text">The Protocol.</span>
            </h2>
            <p className="text-xl text-zinc-400 font-light mb-12 max-w-lg leading-relaxed">
              We don't just "take jobs." we build strategic partnerships. Tell us about your vision, and we'll engineer the intelligence to make it a reality.
            </p>

            {/* Quick Links Sub-section */}
            <div className="mb-16">
              <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4">QUICK LINKS</h4>
              <div className="flex flex-wrap gap-4">
                {[
                  { label: 'HOME', page: 'home', icon: <HomeIcon size={14} /> },
                  { label: 'SERVICES', page: 'services', icon: <Layers size={14} /> },
                  { label: 'ABOUT US', page: 'about', icon: <Users size={14} /> },
                  { label: 'PORTFOLIO', page: 'portfolio', icon: <Briefcase className="w-[14px] h-[14px]" /> }
                ].map((link) => (
                  <button
                    key={link.page}
                    onClick={() => onNavigate(link.page as Page)}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/5 text-[11px] font-bold text-zinc-400 hover:text-white hover:bg-white/10 transition-all uppercase tracking-widest"
                  >
                    {link.icon} {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Growth Protocol Timeline */}
            <div className="space-y-12">
              {[
                { step: "01", icon: <MessageSquare className="text-blue-500" />, title: "Discovery Audit", desc: "A 30-minute deep dive into your current conversion bottlenecks." },
                { step: "02", icon: <Target className="text-purple-500" />, title: "Strategy Blueprint", desc: "A custom-engineered roadmap detailing exactly how we scale your brand." },
                { step: "03", icon: <Zap className="text-pink-500" />, title: "Engine Deployment", desc: "Full execution of high-performance web and UGC systems." }
              ].map((p, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-zinc-900 border border-white/5 rounded-2xl flex items-center justify-center group-hover:border-blue-500/30 transition-all">
                      {p.icon}
                    </div>
                    {i < 2 && <div className="w-px h-full bg-gradient-to-b from-white/5 to-transparent mt-4" />}
                  </div>
                  <div className="pt-1 pb-4">
                    <div className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-1">PHASE {p.step}</div>
                    <h4 className="text-xl font-bold mb-2 uppercase">{p.title}</h4>
                    <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Support Trust Elements */}
            <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap gap-10">
              <div className="flex items-center gap-4">
                <Clock className="text-zinc-700" size={20} />
                <span className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">AVG RESPONSE: &lt; 2H</span>
              </div>
              <div className="flex items-center gap-4">
                <Headphones className="text-zinc-700" size={20} />
                <span className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">REGIONAL SUPPORT: PAN-INDIA</span>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="glass-card p-12 rounded-[60px] relative overflow-hidden shadow-3xl">
              {/* Card Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl -z-10" />
              
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-20 animate-in fade-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-10 shadow-2xl shadow-green-500/10">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-4xl font-black mb-4 tracking-tighter uppercase">REQUEST LOGGED.</h3>
                  <p className="text-zinc-500 max-w-xs mb-12 text-lg font-light leading-relaxed">A strategist is reviewing your profile and will contact you shortly.</p>
                  <button onClick={() => setSubmitted(false)} className="text-blue-500 font-black uppercase tracking-[0.2em] text-[10px] hover:text-white transition-colors flex items-center gap-2">
                    OPEN NEW CHANNEL <ArrowRight size={14} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black tracking-tight uppercase">PROJECT DETAILS</h3>
                    <p className="text-zinc-500 text-sm">Tell us what you're looking to build.</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">IDENTITY</label>
                      <input 
                        required 
                        value={formState.name} 
                        onChange={e => setFormState({...formState, name: e.target.value})} 
                        placeholder="Your full name" 
                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4 focus:border-blue-500 transition-all focus:outline-none focus:bg-white/[0.05] text-sm" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">DIGITAL TERMINAL (EMAIL)</label>
                      <input 
                        required 
                        type="email" 
                        value={formState.email} 
                        onChange={e => setFormState({...formState, email: e.target.value})} 
                        placeholder="name@brand.com" 
                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4 focus:border-blue-500 transition-all focus:outline-none focus:bg-white/[0.05] text-sm" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">SERVICE ENGINE SELECTION</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        { id: 'web', label: 'WEB DESIGN' },
                        { id: 'ugc', label: 'UGC ADS' },
                        { id: 'qr', label: 'AI SCREENS' }
                      ].map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setFormState({...formState, service: s.id})}
                          className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${formState.service === s.id ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/20' : 'bg-white/5 border-white/10 text-zinc-500 hover:text-white'}`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">STRATEGIC BRIEF</label>
                    <textarea 
                      required 
                      rows={4}
                      value={formState.message} 
                      onChange={e => setFormState({...formState, message: e.target.value})} 
                      placeholder="Briefly describe your goals..." 
                      className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4 focus:border-blue-500 transition-all focus:outline-none focus:bg-white/[0.05] text-sm resize-none" 
                    />
                  </div>

                  <button 
                    disabled={isSubmitting} 
                    className="group w-full py-6 bg-blue-600 hover:bg-blue-700 font-black rounded-3xl active:scale-95 transition-all shadow-2xl shadow-blue-600/30 flex items-center justify-center gap-4 text-xl disabled:opacity-50 uppercase"
                  >
                    {isSubmitting ? (
                      <>PROCESSING INBOUND... <Zap className="w-5 h-5 animate-pulse" /></>
                    ) : (
                      <>LAUNCH PROTOCOL <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>
                  
                  <p className="text-center text-zinc-700 text-[10px] font-black uppercase tracking-widest">SECURE ENCRYPTED TERMINAL • WEB PRIME AI v1.2</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onNavigate, siteContent }: { onNavigate: (p: Page) => void, siteContent: SiteContent }) => (
  <footer className="pt-32 pb-12 px-6 bg-[#020202] border-t border-white/5">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
      <div className="space-y-8">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
          <img 
            src={LOGO_URL} 
            alt="Web Prime AI" 
            className="w-10 h-10 rounded-xl object-cover border border-white/5" 
          />
          <span className="font-black text-2xl tracking-tighter uppercase text-white">WEB PRIME AI</span>
        </div>
        <p className="text-zinc-500 text-sm leading-relaxed font-medium">{siteContent.footer.tagline}</p>
      </div>
      <div>
        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white mb-8">SOLUTIONS</h4>
        <ul className="space-y-4">
          {[
            { label: 'WEBSITE DESIGN', page: 'service-web' },
            { label: 'UGC ADS', page: 'service-ugc' },
            { label: 'AI QR INTEGRATION', page: 'service-qr' }
          ].map((item, i) => (
            <li key={i}><button onClick={() => onNavigate(item.page as Page)} className="text-zinc-500 hover:text-blue-500 transition-colors text-sm font-medium uppercase">{item.label}</button></li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white mb-8">COMPANY</h4>
        <ul className="space-y-4">
          {[
            { label: 'ABOUT US', page: 'about' },
            { label: 'PORTFOLIO', page: 'portfolio' },
            { label: 'INSIGHTS BLOG', page: 'blog' }
          ].map((item, i) => (
            <li key={i}><button onClick={() => onNavigate(item.page as Page)} className="text-zinc-500 hover:text-blue-500 transition-colors text-sm font-medium uppercase">{item.label}</button></li>
          ))}
        </ul>
      </div>
      <div className="space-y-8">
        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white mb-8">NEWSLETTER</h4>
        <div className="relative group">
          <input type="email" placeholder="Your email address" className="w-full bg-zinc-900 border border-white/5 rounded-2xl px-6 py-4 text-xs font-medium focus:outline-none focus:border-blue-500/50 transition-all pr-12" />
          <button className="absolute right-2 top-2 bottom-2 aspect-square bg-blue-600 rounded-xl flex items-center justify-center text-white hover:bg-blue-700 transition-colors"><ArrowRight size={16} /></button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex items-center justify-between">
      <div className="text-zinc-600 text-[11px] font-black uppercase tracking-widest">© 2025 WEB PRIME AI. ALL RIGHTS RESERVED.</div>
      <button onClick={() => onNavigate('admin-login')} className="flex items-center gap-2 text-zinc-800 hover:text-zinc-400 transition-colors text-[10px] uppercase font-black tracking-widest"><Lock size={12} /> COMMAND CENTER</button>
    </div>
  </footer>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  
  const [siteContent, setSiteContent] = useState<SiteContent>(INITIAL_SITE_CONTENT);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [portfolio, setPortfolio] = useState<Project[]>(INITIAL_PORTFOLIO);
  const [ugcAds, setUgcAds] = useState<UgcAd[]>(INITIAL_UGC_ADS);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'admin-login': return <AdminLogin onLogin={() => { setIsAdminAuth(true); navigate('admin'); }} onBack={() => navigate('home')} />;
      case 'admin': return isAdminAuth ? <AdminDashboard services={services} setServices={setServices} blogs={blogs} setBlogs={setBlogs} portfolio={portfolio} setPortfolio={setPortfolio} ugcAds={ugcAds} setUgcAds={setUgcAds} siteContent={siteContent} setSiteContent={setSiteContent} onLogout={() => { setIsAdminAuth(false); navigate('home'); }} /> : null;
      case 'home': return <Home onNavigate={navigate} services={services} ugcAds={ugcAds} siteContent={siteContent} />;
      case 'about': return <About onNavigate={navigate} siteContent={siteContent} />;
      case 'services': return <Services onNavigate={navigate} services={services} />;
      case 'blog': return <Blog blogs={blogs} onNavigate={navigate} />;
      case 'portfolio': return <Portfolio portfolio={portfolio} onNavigate={navigate} />;
      case 'service-ugc': 
        const s = services.find(x => x.id === 'service-ugc');
        return s ? <UgcLanding service={s} ugcAds={ugcAds} onNavigate={navigate} /> : null;
      case 'service-web': 
        const w = services.find(x => x.id === 'service-web');
        return w ? <WebDesignLanding service={w} onNavigate={navigate} /> : null;
      case 'service-qr': 
        const q = services.find(x => x.id === 'service-qr');
        return q ? <QrScreenLanding service={q} onNavigate={navigate} /> : null;
      case 'contact': return <Contact onNavigate={navigate} />;
      default: return <Home onNavigate={navigate} services={services} ugcAds={ugcAds} siteContent={siteContent} />;
    }
  };

  const isFullPage = currentPage === 'admin' || currentPage === 'admin-login';

  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-blue-500 selection:text-white">
      {!isFullPage && <NavBar onNavigate={navigate} />}
      <main className="flex-grow">{renderPage()}</main>
      {!isFullPage && <Footer onNavigate={navigate} siteContent={siteContent} />}
      {!isFullPage && <AIConsultant />}
    </div>
  );
};

export default App;
