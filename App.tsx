
import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Sparkles, Layout, Video, QrCode, 
  Instagram, Twitter, Linkedin, Mail, Phone,
  ChevronRight, ArrowRight, CheckCircle2, 
  ArrowUpRight, Target, Zap, ShieldCheck,
  Rocket, Store, Megaphone, ShoppingBag, Plus, Minus,
  Lock
} from 'lucide-react';
import { Page, BlogPost } from './types';
import { AIConsultant } from './components/AIConsultant';
import { UgcLanding } from './pages/UgcLanding';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';

// --- Shared Components ---

const Breadcrumbs: React.FC<{ path: { label: string; page?: Page }[]; onNavigate: (page: Page) => void }> = ({ path, onNavigate }) => (
  <nav className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase mb-12">
    <button onClick={() => onNavigate('home')} className="hover:text-blue-500 transition-colors">Home</button>
    {path.map((item, i) => (
      <React.Fragment key={i}>
        <ChevronRight size={10} className="text-zinc-700" />
        {item.page ? (
          <button onClick={() => onNavigate(item.page!)} className="hover:text-blue-500 transition-colors">{item.label}</button>
        ) : (
          <span className="text-zinc-300">{item.label}</span>
        )}
      </React.Fragment>
    ))}
  </nav>
);

const SectionHeader: React.FC<{ title: string; subtitle?: string; highlight?: string; centered?: boolean }> = ({ title, subtitle, highlight, centered = false }) => (
  <div className={`mb-20 ${centered ? 'text-center mx-auto max-w-4xl' : ''}`}>
    <div className="text-blue-500 font-bold tracking-[0.3em] mb-4 text-xs uppercase">{highlight}</div>
    <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight">{title}</h2>
    {subtitle && <p className="text-zinc-400 text-xl mt-6 font-light leading-relaxed">{subtitle}</p>}
  </div>
);

const FAQItem: React.FC<{ question: string; answer: React.ReactNode }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`glass-card rounded-3xl border-white/5 overflow-hidden transition-all duration-300 ${isOpen ? 'border-blue-500/30 ring-1 ring-blue-500/20' : ''}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-8 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
      >
        <h4 className="text-xl font-bold pr-8">{question}</h4>
        <div className={`shrink-0 w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center border border-white/5 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-blue-600/10' : ''}`}>
          {isOpen ? <Minus size={18} className="text-blue-500" /> : <Plus size={18} className="text-zinc-500" />}
        </div>
      </button>
      <div className={`px-8 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] pb-8 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="text-zinc-400 leading-relaxed font-light">{answer}</div>
      </div>
    </div>
  );
};

// --- Pages ---

const Home: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => (
  <div className="animate-in fade-in duration-1000">
    {/* Hero Section */}
    <section className="relative pt-48 pb-32 md:pt-64 md:pb-48 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[700px] bg-gradient-to-b from-blue-600/20 via-transparent to-transparent blur-[140px] rounded-full -z-10" />
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-900/30 border border-blue-500/20 text-blue-400 text-[10px] font-black mb-12 tracking-[0.2em] uppercase">
          <Sparkles className="w-3.5 h-3.5" /> Web Prime AI Agency
        </div>
        <h1 className="text-7xl md:text-[10rem] font-black mb-12 leading-[0.9] tracking-tighter">
          Build Smarter.<br />
          <span className="gradient-text">Convert Faster.</span>
        </h1>
        <p className="text-xl md:text-3xl text-zinc-400 max-w-4xl mx-auto mb-16 leading-relaxed font-light">
          At Web Prime AI, we create <strong>high-converting websites</strong>, <strong>authentic UGC ads</strong>, and <strong>AI-powered QR experiences</strong> that turn attention into measurable growth.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <button onClick={() => onNavigate('contact')} className="group w-full sm:w-auto px-12 py-6 bg-white text-black font-black rounded-3xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-4 text-xl shadow-2xl shadow-white/10">
            Get Free Consultation <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button onClick={() => onNavigate('services')} className="w-full sm:w-auto px-12 py-6 bg-zinc-900 text-white border border-zinc-800 font-black rounded-3xl hover:bg-zinc-800 transition-all text-xl">
            View Our Services
          </button>
        </div>
      </div>
    </section>

    {/* Brief Why Choose Us Section */}
    <section className="py-24 px-6 bg-zinc-950/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 text-center">
          {[
            { icon: <Target className="text-blue-500" />, title: "Conversion-First", text: "Theory nahi, results. Every pixel is engineered to generate leads." },
            { icon: <ShieldCheck className="text-purple-500" />, title: "Authentic Content", text: "Real creators, real trust. We avoid generic, boring commercials." },
            { icon: <Zap className="text-pink-500" />, title: "AI Intelligence", text: "Smart QR systems and data-driven insights for offline traffic." }
          ].map((item, i) => (
            <div key={i} className="glass-card p-10 rounded-[40px] border-white/5">
              <div className="mb-6 flex justify-center">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-zinc-500 font-light leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Built for Real Businesses Section */}
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          centered
          highlight="Target Audience"
          title="🔍 Built for Real Businesses"
          subtitle="Web Prime AI ke solutions theory ke liye nahi, real business problems solve karne ke liye banaye gaye hain."
        />
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Startups & D2C */}
          <div className="glass-card p-10 rounded-[50px] border-blue-500/10 hover:border-blue-500/30 transition-all group">
            <div className="flex items-start justify-between mb-8">
              <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500">
                <Rocket size={32} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-4 py-2 bg-zinc-900 rounded-full border border-white/5">
                Best for: New launches, scaling brands
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-6">🚀 Startups & D2C Brands</h3>
            <ul className="space-y-4 mb-8">
              {["High-converting websites", "Performance-driven UGC ads", "Faster brand trust & sales growth"].map((li, idx) => (
                <li key={idx} className="flex items-center gap-3 text-zinc-400">
                  <CheckCircle2 size={18} className="text-blue-500 shrink-0" />
                  <span>{li}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Retail & Franchises */}
          <div className="glass-card p-10 rounded-[50px] border-purple-500/10 hover:border-purple-500/30 transition-all group">
            <div className="flex items-start justify-between mb-8">
              <div className="w-16 h-16 bg-purple-600/10 rounded-2xl flex items-center justify-center text-purple-500">
                <Store size={32} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-4 py-2 bg-zinc-900 rounded-full border border-white/5">
                Best for: Stores, chains, franchises
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-6">🏪 Retail Stores & Franchises</h3>
            <ul className="space-y-4 mb-8">
              {["AI QR Screens for in-store engagement", "Lead capture from walk-in customers", "Offline traffic ko online action mein convert karna"].map((li, idx) => (
                <li key={idx} className="flex items-center gap-3 text-zinc-400">
                  <CheckCircle2 size={18} className="text-purple-500 shrink-0" />
                  <span>{li}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Events & Promotions */}
          <div className="glass-card p-10 rounded-[50px] border-pink-500/10 hover:border-pink-500/30 transition-all group">
            <div className="flex items-start justify-between mb-8">
              <div className="w-16 h-16 bg-pink-600/10 rounded-2xl flex items-center justify-center text-pink-500">
                <Megaphone size={32} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-4 py-2 bg-zinc-900 rounded-full border border-white/5">
                Best for: Events, expos, product launches
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-6">📢 Events & Exhibitions</h3>
            <ul className="space-y-4 mb-8">
              {["Interactive QR screen experiences", "Instant registrations & data capture", "Better engagement than flyers or banners"].map((li, idx) => (
                <li key={idx} className="flex items-center gap-3 text-zinc-400">
                  <CheckCircle2 size={18} className="text-pink-500 shrink-0" />
                  <span>{li}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Local & Service Businesses */}
          <div className="glass-card p-10 rounded-[50px] border-green-500/10 hover:border-green-500/30 transition-all group">
            <div className="flex items-start justify-between mb-8">
              <div className="w-16 h-16 bg-green-600/10 rounded-2xl flex items-center justify-center text-green-500">
                <ShoppingBag size={32} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-4 py-2 bg-zinc-900 rounded-full border border-white/5">
                Best for: Clinics, gyms, agencies
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-6">🛍️ Local Service Businesses</h3>
            <ul className="space-y-4 mb-8">
              {["Simple websites that generate inquiries", "Trust-building UGC content", "Smart QR solutions for local reach"].map((li, idx) => (
                <li key={idx} className="flex items-center gap-3 text-zinc-400">
                  <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                  <span>{li}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* Mid-Section CTA */}
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto glass-card p-12 md:p-20 rounded-[60px] border-white/5 text-center shadow-3xl bg-gradient-to-br from-blue-600/5 to-purple-600/5">
        <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">Not sure which solution fits your business?</h2>
        <p className="text-xl text-zinc-400 mb-12 font-light">We’ll help you choose the right one based on your goals.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button onClick={() => onNavigate('contact')} className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
            Book a Free Call
          </button>
          <button onClick={() => onNavigate('contact')} className="w-full sm:w-auto px-10 py-5 bg-zinc-900 text-white border border-zinc-800 font-black rounded-2xl hover:bg-zinc-800 transition-all">
            Request a Demo
          </button>
        </div>
      </div>
    </section>

    {/* How It Works Section */}
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          highlight="Process" 
          title="Simple. Scalable. Transparent." 
          subtitle="Our streamlined process ensures we move from initial strategy to high-performance launch with maximum efficiency."
        />
        <div className="grid md:grid-cols-4 gap-12">
          {[
            { step: "01", title: "Strategy", text: "Understanding your goals, audience, and market landscape." },
            { step: "02", title: "Design/Build", text: "Tailored creative and technical development phase." },
            { step: "03", title: "Optimize", text: "Fine-tuning for maximum engagement and conversion." },
            { step: "04", title: "Launch/Scale", text: "Deploying the solution and monitoring for growth." }
          ].map((item, i) => (
            <div key={i} className="relative group">
              <div className="text-6xl font-black text-white/5 group-hover:text-blue-500/10 transition-colors mb-6">{item.step}</div>
              <h4 className="text-xl font-bold mb-4">{item.title}</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Frequently Asked Questions */}
    <section className="py-32 px-6 bg-zinc-950/30">
      <div className="max-w-4xl mx-auto">
        <SectionHeader 
          centered
          highlight="Support"
          title="❓ Frequently Asked Questions"
          subtitle="Answering your most common questions about how Web Prime AI can transform your business."
        />
        
        <div className="space-y-6">
          <FAQItem 
            question="Web Prime AI kis type ke businesses ke saath kaam karta hai?" 
            answer="Hum startups, D2C brands, retail stores, local businesses, aur growing companies ke saath kaam karte hain. Small ho ya scaling brand — solution goal ke hisaab se customize hota hai." 
          />
          <FAQItem 
            question="Kya aap sirf design karte ho ya results pe bhi focus hota hai?" 
            answer="Hum sirf design nahi, conversion & engagement pe focus karte hain. Chahe website ho, UGC ads ho, ya AI QR Screen — har solution ka goal leads, interaction, ya sales hota hai." 
          />
          <FAQItem 
            question="UGC Ads aur normal ads mein kya difference hai?" 
            answer={
              <ul className="space-y-3">
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-1" /> Zyada trust build hota hai kyunki ye real lagte hain.</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-1" /> Scroll-stopping hote hain compared to generic commercials.</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-1" /> Paid ads mein consistently better ROAS (Return on Ad Spend) dete hain.</li>
              </ul>
            } 
          />
          <FAQItem 
            question="AI QR Screen use karna mushkil to nahi hai?" 
            answer="Bilkul nahi. AI QR Screen simple, user-friendly aur fully managed hota hai. Scan karte hi user ko smart interaction milta hai — bina kisi technical headache ke." 
          />
          <FAQItem 
            question="Kya aap custom solutions dete ho?" 
            answer="Haan. Har business alag hota hai, isliye: Website structure, UGC ad format, aur AI QR Screen workflow — sab business goal ke according customize kiya jata hai." 
          />
          <FAQItem 
            question="Project start karne ka process kya hai?" 
            answer={
              <div className="space-y-2">
                <p>Simple 3 steps:</p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Free discussion / demo</li>
                  <li>Requirement & strategy final</li>
                  <li>Build, launch & optimize</li>
                </ol>
                <p className="mt-2">No confusion. No unnecessary delays.</p>
              </div>
            } 
          />
        </div>
        
        <div className="mt-20 text-center glass-card p-12 rounded-[40px] border-white/5">
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="text-zinc-500 mb-8 font-light">Let’s talk and find the right solution for your business.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => onNavigate('contact')} className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all">
              Book a Free Call
            </button>
            <button onClick={() => onNavigate('contact')} className="w-full sm:w-auto px-8 py-4 bg-zinc-800 text-white font-bold rounded-2xl hover:bg-zinc-700 transition-all">
              Request a Demo
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* Final CTA Section */}
    <section className="py-40 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-600/5 -z-10" />
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl md:text-[8rem] font-black mb-12 leading-[0.9] tracking-tighter">
          Ready to <br />
          <span className="gradient-text">Dominate?</span>
        </h2>
        <p className="text-2xl text-zinc-400 mb-16 max-w-3xl mx-auto leading-relaxed font-light">
          Join the forward-thinking brands that are scaling faster with Web Prime AI.
        </p>
        <button onClick={() => onNavigate('contact')} className="px-16 py-8 bg-white text-black font-black rounded-3xl hover:bg-zinc-200 transition-all text-2xl shadow-2xl active:scale-95">
          Start Your Project
        </button>
      </div>
    </section>
  </div>
);

const About: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => (
  <section className="pt-48 pb-32 px-6 animate-in slide-in-from-bottom-8 duration-700">
    <div className="max-w-7xl mx-auto">
      <Breadcrumbs path={[{ label: 'About Us' }]} onNavigate={onNavigate} />
      <SectionHeader 
        highlight="Our Story" 
        title="Where Design Meets Intelligence" 
        subtitle="Web Prime AI was built to help brands grow using design, authenticity, and AI-driven interaction. We focus on what matters: clear messaging, real engagement, and measurable results."
      />
      
      <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
        <div className="space-y-12">
          <div className="space-y-4">
            <h3 className="text-3xl font-bold">Our Mission</h3>
            <p className="text-zinc-400 text-lg leading-relaxed font-light">To bridge the gap between human creativity and artificial intelligence, delivering digital experiences that aren't just beautiful, but strategically engineered to convert.</p>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div>
              <div className="text-4xl font-black text-blue-500 mb-2">100+</div>
              <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Projects Delivered</div>
            </div>
            <div>
              <div className="text-4xl font-black text-purple-500 mb-2">24h</div>
              <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Response Time</div>
            </div>
          </div>
          <button onClick={() => onNavigate('contact')} className="px-10 py-5 bg-blue-600 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
            Work With Us
          </button>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] glass-card rounded-[60px] p-4 rotate-3 hover:rotate-0 transition-transform duration-1000 shadow-3xl overflow-hidden">
            <img src="https://picsum.photos/id/2/800/1000" alt="Team" className="w-full h-full object-cover rounded-[48px]" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ServicesHub: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => (
  <section className="pt-48 pb-32 px-6 animate-in slide-in-from-bottom-8 duration-700">
    <div className="max-w-7xl mx-auto">
      <Breadcrumbs path={[{ label: 'Services' }]} onNavigate={onNavigate} />
      <SectionHeader 
        highlight="Expertise" 
        title="Smart Digital Solutions" 
        subtitle="We specialize in three core pillars that drive modern business growth."
      />
      <div className="grid md:grid-cols-3 gap-10">
        {[
          { id: 'service-web', title: 'Website Design', desc: 'Performance-driven websites built for speed, clarity, and conversions.', icon: <Layout className="text-blue-500" /> },
          { id: 'service-ugc', title: 'UGC Ads', desc: 'Creator-style video ads that feel real, earn trust, and scale profitably.', icon: <Video className="text-purple-500" /> },
          { id: 'service-qr', title: 'AI QR Solutions', desc: 'Intelligent QR screen systems that connect offline audiences to online action.', icon: <QrCode className="text-pink-500" /> }
        ].map((s, i) => (
          <div key={i} className="glass-card p-12 rounded-[50px] hover:border-blue-500/30 transition-all group cursor-pointer" onClick={() => onNavigate(s.id as Page)}>
            <div className="mb-10 w-20 h-20 bg-zinc-900 rounded-3xl flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
              {s.icon}
            </div>
            <h3 className="text-3xl font-bold mb-6 group-hover:text-blue-400 transition-colors">{s.title}</h3>
            <p className="text-zinc-400 text-lg mb-10 leading-relaxed font-light">{s.desc}</p>
            <div className="flex items-center gap-3 text-sm font-black text-blue-500 uppercase tracking-widest group-hover:gap-5 transition-all">
              Explore Service <ArrowRight size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Portfolio: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => (
  <section className="pt-48 pb-32 px-6 animate-in slide-in-from-bottom-8 duration-700">
    <div className="max-w-7xl mx-auto">
      <Breadcrumbs path={[{ label: 'Portfolio' }]} onNavigate={onNavigate} />
      <SectionHeader highlight="Case Studies" title="Real Work. Real Impact." subtitle="Explore how our integrated digital systems deliver measurable ROI." />
      <div className="grid md:grid-cols-3 gap-10">
        {[
          { title: "E-commerce Redesign", type: "Web Design", stat: "+42% Conversion", img: "https://picsum.photos/seed/web/800/600" },
          { title: "D2C Ad Campaign", type: "UGC Ads", stat: "2.8x ROAS", img: "https://picsum.photos/seed/ugc/800/600" },
          { title: "Retail Engagement", type: "AI QR Screen", stat: "3.5x Scan Rate", img: "https://picsum.photos/seed/qr/800/600" }
        ].map((p, i) => (
          <div key={i} className="glass-card rounded-[40px] overflow-hidden group border-white/5">
            <div className="aspect-video bg-zinc-900 relative overflow-hidden">
              <img src={p.img} alt={p.title} className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000" />
            </div>
            <div className="p-10">
              <div className="text-[10px] font-black text-blue-500 mb-2 uppercase tracking-widest">{p.type}</div>
              <h3 className="text-2xl font-bold mb-4">{p.title}</h3>
              <div className="text-xl font-black text-white">{p.stat}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Blog: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const posts: BlogPost[] = [
    { id: '1', title: 'Why UGC is Outperforming High-Budget Ads in 2025', excerpt: 'Traditional commercials are losing trust. Here is why authentic content is winning.', date: 'Oct 12, 2024', category: 'Advertising', image: 'https://picsum.photos/seed/blog1/800/400' },
    { id: '2', title: 'The Future of Offline-to-Online Retail Marketing', excerpt: 'How AI QR screens are changing the way people shop in physical stores.', date: 'Nov 05, 2024', category: 'Innovation', image: 'https://picsum.photos/seed/blog2/800/400' }
  ];

  return (
    <section className="pt-48 pb-32 px-6 animate-in slide-in-from-bottom-8 duration-700">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs path={[{ label: 'Blog' }]} onNavigate={onNavigate} />
        <SectionHeader highlight="Insights" title="Web Prime Updates" subtitle="The latest trends in design, AI, and performance marketing." />
        <div className="grid md:grid-cols-2 gap-10">
          {posts.map((post) => (
            <div key={post.id} className="group cursor-pointer">
              <div className="aspect-[16/9] rounded-[32px] overflow-hidden mb-8 border border-white/5">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              </div>
              <div className="flex items-center gap-4 text-xs font-bold text-zinc-500 mb-4 uppercase tracking-widest">
                <span className="text-blue-500">{post.category}</span>
                <span>{post.date}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors leading-tight">{post.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{post.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => (
  <section className="pt-48 pb-32 px-6 animate-in slide-in-from-bottom-8 duration-700">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24">
      <div className="flex-1">
        <Breadcrumbs path={[{ label: 'Contact' }]} onNavigate={onNavigate} />
        <SectionHeader highlight="Get In Touch" title="Let's Build Something That Converts." />
        <div className="space-y-12">
          <div className="flex items-center gap-6 group">
            <div className="w-16 h-16 bg-zinc-900 rounded-[24px] flex items-center justify-center border border-white/5 group-hover:border-blue-500 transition-colors">
              <Mail className="w-7 h-7 text-blue-500" />
            </div>
            <div>
              <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Email Us</div>
              <a href="mailto:hello@webprimai.in" className="text-2xl font-bold hover:text-blue-500 transition-colors">hello@webprimai.in</a>
            </div>
          </div>
          <div className="flex items-center gap-6 group">
            <div className="w-16 h-16 bg-zinc-900 rounded-[24px] flex items-center justify-center border border-white/5 group-hover:border-purple-500 transition-colors">
              <Phone className="w-7 h-7 text-purple-500" />
            </div>
            <div>
              <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">WhatsApp</div>
              <a href="tel:+919599203951" className="text-2xl font-bold hover:text-purple-500 transition-colors">+91 95992 03951</a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="bg-zinc-900/50 p-12 rounded-[60px] border border-white/5 shadow-3xl">
          <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert("Project inquiry received! We'll contact you within 24 hours."); }}>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Name</label>
                <input type="text" placeholder="John Doe" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" required />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Email</label>
                <input type="email" placeholder="john@brand.com" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" required />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Message</label>
              <textarea rows={4} placeholder="Tell us about your project..." className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" required></textarea>
            </div>
            <button type="submit" className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black rounded-2xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all text-xl">
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

// --- Main App & Navigation ---

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  const NavLink: React.FC<{ label: string; page: Page }> = ({ label, page }) => {
    const isActive = currentPage === page || (page === 'services' && ['service-web', 'service-ugc', 'service-qr'].includes(currentPage));
    return (
      <button 
        onClick={() => navigate(page)} 
        className={`text-sm font-bold tracking-tight transition-all relative group ${isActive ? 'text-white' : 'text-zinc-500 hover:text-white'}`}
      >
        {label}
        {isActive && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 rounded-full" />}
      </button>
    );
  };

  const renderPage = () => {
    if (currentPage === 'admin-login') {
      return <AdminLogin onLogin={() => { setIsAdminAuthenticated(true); navigate('admin'); }} onBack={() => navigate('home')} />;
    }
    
    if (currentPage === 'admin') {
      if (!isAdminAuthenticated) {
        navigate('admin-login');
        return null;
      }
      return <AdminDashboard onLogout={() => { setIsAdminAuthenticated(false); navigate('home'); }} />;
    }

    switch (currentPage) {
      case 'home': return <Home onNavigate={navigate} />;
      case 'about': return <About onNavigate={navigate} />;
      case 'services': return <ServicesHub onNavigate={navigate} />;
      case 'service-ugc': return <UgcLanding onNavigate={navigate} />;
      case 'portfolio': return <Portfolio onNavigate={navigate} />;
      case 'blog': return <Blog onNavigate={navigate} />;
      case 'contact': return <Contact onNavigate={navigate} />;
      default: return <Home onNavigate={navigate} />;
    }
  };

  const isFullPage = currentPage === 'admin' || currentPage === 'admin-login';

  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-blue-500 selection:text-white">
      {/* Navbar - Hidden on Admin */}
      {!isFullPage && (
        <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled || currentPage !== 'home' ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-5' : 'bg-transparent py-8'}`}>
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('home')}>
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center font-black text-2xl group-hover:rotate-12 transition-transform shadow-xl shadow-blue-600/20">W</div>
              <span className="font-black text-2xl tracking-tighter">WEB PRIME AI</span>
            </div>

            <div className="hidden md:flex items-center gap-10">
              <NavLink label="Home" page="home" />
              <NavLink label="About" page="about" />
              <NavLink label="Services" page="services" />
              <NavLink label="Portfolio" page="portfolio" />
              <NavLink label="Blog" page="blog" />
              <button onClick={() => navigate('contact')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl text-sm font-black transition-all active:scale-95 shadow-xl shadow-blue-600/30">
                Get Consultation
              </button>
            </div>

            <button className="md:hidden p-2 text-zinc-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && !isFullPage && (
        <div className="fixed inset-0 z-[110] bg-black p-6 pt-32 animate-in fade-in duration-300">
           <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-6 p-2 text-zinc-400"><X size={32} /></button>
           <div className="flex flex-col gap-10 text-center">
            {['home', 'about', 'services', 'portfolio', 'blog', 'contact'].map((p) => (
              <button key={p} onClick={() => navigate(p as Page)} className={`text-4xl font-black capitalize ${currentPage === p ? 'text-blue-500' : 'text-zinc-500'}`}>{p}</button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Footer - Hidden on Admin */}
      {!isFullPage && (
        <footer className="py-32 px-6 border-t border-white/5 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-24 mb-24">
              <div className="max-w-md">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl shadow-blue-600/20">W</div>
                  <span className="font-black text-3xl tracking-tighter">WEB PRIME AI</span>
                </div>
                <p className="text-zinc-500 text-xl leading-relaxed mb-10 font-light">
                  Design • Engagement • Conversion. We build intelligence-driven digital ecosystems that scale modern brands globally.
                </p>
                <div className="flex gap-6">
                  {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                    <a key={i} href="#" className="w-14 h-14 bg-zinc-900/50 rounded-[24px] flex items-center justify-center text-zinc-500 hover:text-white transition-all border border-white/5 hover:border-white/20">
                      <Icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-20">
                <div>
                  <h4 className="text-[10px] font-black mb-10 text-white tracking-[0.4em] uppercase opacity-30">Agency</h4>
                  <ul className="space-y-6 text-base text-zinc-500">
                    <li><button onClick={() => navigate('about')} className="hover:text-white transition-colors">Company</button></li>
                    <li><button onClick={() => navigate('portfolio')} className="hover:text-white transition-colors">Case Studies</button></li>
                    <li><button onClick={() => navigate('blog')} className="hover:text-white transition-colors">Updates</button></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] font-black mb-10 text-white tracking-[0.4em] uppercase opacity-30">Expertise</h4>
                  <ul className="space-y-6 text-base text-zinc-500">
                    <li><button onClick={() => navigate('services')} className="hover:text-white transition-colors">Web Design</button></li>
                    <li><button onClick={() => navigate('service-ugc')} className="hover:text-white transition-colors">UGC Ads</button></li>
                    <li><button onClick={() => navigate('services')} className="hover:text-white transition-colors">AI QR Screens</button></li>
                  </ul>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <h4 className="text-[10px] font-black mb-10 text-white tracking-[0.4em] uppercase opacity-30">Connect</h4>
                  <ul className="space-y-6 text-base text-zinc-500">
                    <li><a href="mailto:hello@webprimai.in" className="hover:text-white transition-colors">hello@webprimai.in</a></li>
                    <li><a href="tel:+919599203951" className="hover:text-white transition-colors">+91 95992 03951</a></li>
                    <li className="pt-4"><button onClick={() => navigate('admin-login')} className="flex items-center gap-2 text-zinc-700 hover:text-zinc-400 transition-colors text-[10px] uppercase font-black tracking-widest"><Lock size={10} /> Admin Portal</button></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left">
              <p className="text-zinc-600 text-sm font-medium">© {new Date().getFullYear()} Web Prime AI. Build Smarter. Convert Faster.</p>
              <div className="flex items-center gap-4 text-zinc-600 text-xs font-black uppercase tracking-[0.2em]">
                Scale Globally <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" /> Intelligence Driven
              </div>
            </div>
          </div>
        </footer>
      )}

      {!isFullPage && <AIConsultant />}
    </div>
  );
}

export default App;
