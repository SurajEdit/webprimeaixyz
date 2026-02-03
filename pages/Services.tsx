
import React from 'react';
import { 
  ArrowRight, Layout, Video, QrCode, Zap, BarChart3, 
  Code, Megaphone, Smartphone, Search, Layers, PlayCircle, Check
} from 'lucide-react';
import { Breadcrumbs, SectionHeader } from '../App';
import { Page, Service } from '../types';

export const Services: React.FC<{ onNavigate: (p: Page) => void, services: Service[] }> = ({ onNavigate, services }) => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* 1. Hero Section */}
      <section className="relative pt-56 pb-32 md:pt-64 md:pb-40 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs path={[{ label: 'Our Services' }]} onNavigate={onNavigate} />
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter">
            Next-Gen <br /><span className="gradient-text">Indian Digital Engines.</span>
          </h1>
          <p className="text-xl md:text-3xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            High-performance AI strategies tailored for the unique dynamics of the Indian market, from emerging D2C brands to established retail giants.
          </p>
          <button onClick={() => onNavigate('contact')} className="px-12 py-6 bg-white text-black font-black rounded-3xl text-xl hover:bg-zinc-200 transition-all active:scale-95 shadow-xl shadow-white/5">
             Inquire Now
          </button>
        </div>
      </section>

      {/* 2. Service List Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader highlight="The Toolkit" title="Growth Engines" subtitle="Every service is engineered to outperform local competition using global AI standards." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
               { id: 'service-web', icon: <Layout />, title: "AI Website Builder", desc: "Optimized for Indian mobile networks. Predictive UI that converts high-intent traffic across Tier-1 and Tier-2 cities." },
               { id: 'service-ugc', icon: <Video />, title: "UGC Ads Content", desc: "Authentic creator-style ads in English, Hindi, and Hinglish. Designed to scale Indian D2C brands profitably." },
               { id: 'seo', icon: <Search />, title: "SEO Optimization", desc: "Rank for high-volume local keywords and dominate search results in your specific region or across Pan-India." },
               { id: 'analytics', icon: <BarChart3 />, title: "Insights Dashboard", desc: "Advanced visualization of your customer's journey, helping you understand Indian consumer behavior better." },
               { id: 'automation', icon: <Zap />, title: "Integrations & Tools", desc: "Automate your workflows with Razorpay, WhatsApp Business, and local CRM integrations for seamless operations." },
               { id: 'service-qr', icon: <QrCode />, title: "AI QR Screens", desc: "Offline-to-online engagement for local Indian retail shops. Turn physical footfall into digital assets instantly." }
            ].map((s, i) => (
              <div 
                key={i} 
                onClick={() => {
                  if (['service-web', 'service-ugc', 'service-qr'].includes(s.id)) {
                    onNavigate(s.id as Page);
                  }
                }}
                className={`glass-card p-12 rounded-[50px] border-white/5 group hover:border-blue-500/30 transition-all cursor-pointer`}
              >
                <div className="mb-8 w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center border border-white/5 text-blue-500 group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-10">{s.desc}</p>
                {['service-web', 'service-ugc', 'service-qr'].includes(s.id) && (
                   <div className="text-blue-500 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                      Explore Engine <ArrowRight size={14} />
                   </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Detailed Pricing Section (INR) */}
      <section className="py-32 px-6 bg-zinc-950/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionHeader centered highlight="Investment" title="Transparent INR Pricing" subtitle="Optimized for growth-focused Indian enterprises. Prices are exclusive of 18% GST." />
          
          {/* Website Design Pricing */}
          <div className="mb-24">
            <div className="flex items-center gap-3 mb-10">
              <Layout className="text-blue-500" />
              <h3 className="text-3xl font-black">Website Design Plans</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { tier: "Starter", price: "₹24,999", features: ["High-Impact Landing Page", "Standard Maintenance: ₹7,000/mo", "Hinglish/English AI Copy", "Razorpay Integration Ready", "7-Day Rapid Launch"], cta: "Start Basic" },
                { tier: "Growth", price: "₹59,999", features: ["Full Business Website", "Standard Maintenance: ₹7,000/mo", "WhatsApp API Integration", "SEO Performance Pack", "30 Days Optimization"], cta: "Go Growth", highlight: true },
                { tier: "Elite", price: "Custom", features: ["D2C Store / Custom App", "Enterprise Maintenance Plan", "Advanced AI Workflows", "Priority Indian Cloud Hosting", "Dedicated Support Lead"], cta: "Contact for Quote" }
              ].map((p, i) => (
                <div key={i} className={`p-10 rounded-[40px] border transition-all ${p.highlight ? 'bg-blue-600 border-blue-400 shadow-2xl shadow-blue-600/20' : 'glass-card border-white/5'}`}>
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">{p.tier}</div>
                  <div className="text-3xl font-black mb-10">{p.price}</div>
                  <div className="space-y-4 mb-10">
                    {p.features.map((f, fi) => (
                      <div key={fi} className="flex items-start gap-3 text-sm font-medium leading-tight">
                        <Check size={14} className="shrink-0 mt-0.5" /> {f}
                      </div>
                    ))}
                  </div>
                  <button onClick={() => onNavigate('contact')} className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 ${p.highlight ? 'bg-white text-blue-600' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                    {p.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* UGC Ads Pricing */}
          <div className="mb-24">
            <div className="flex items-center gap-3 mb-10">
              <Video className="text-purple-500" />
              <h3 className="text-3xl font-black">UGC Ad Packages (India)</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { tier: "Flash", price: "₹19,999", features: ["3 High-Intent Videos", "Local Indian Creator", "Engaging Hook Scripts", "Pro Indian Market Editing", "Meta/Reels Optimization"], cta: "Buy Pack" },
                { tier: "Ignite", price: "₹44,999", features: ["10 Custom UGC Ads", "3 Regional Creators", "English/Hinglish Options", "Performance Data Audit", "Monthly Content Cycle"], cta: "Scale Now", highlight: true },
                { tier: "Dominate", price: "₹99,999", features: ["25+ Monthly Content", "Unlimited Creator Network", "Managed Creative Strategy", "Indian Market Ad Analysis", "Daily Performance Sync"], cta: "Book Strategy" }
              ].map((p, i) => (
                <div key={i} className={`p-10 rounded-[40px] border transition-all ${p.highlight ? 'bg-purple-600 border-purple-400 shadow-2xl shadow-purple-600/20' : 'glass-card border-white/5'}`}>
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">{p.tier}</div>
                  <div className="text-3xl font-black mb-10">{p.price}</div>
                  <div className="space-y-4 mb-10">
                    {p.features.map((f, fi) => (
                      <div key={fi} className="flex items-start gap-3 text-sm font-medium leading-tight">
                        <Check size={14} className="shrink-0 mt-0.5" /> {f}
                      </div>
                    ))}
                  </div>
                  <button onClick={() => onNavigate('contact')} className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 ${p.highlight ? 'bg-white text-purple-600' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                    {p.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* AI QR Screen Solutions Pricing */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              <QrCode className="text-pink-500" />
              <h3 className="text-3xl font-black">AI QR Screen Tiers</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { tier: "Boutique", price: "₹4,999/mo", features: ["Up to 5 Smart Screens", "Standard Maintenance: ₹7,000/mo", "Local Footfall Analytics", "WhatsApp Link Integration", "Online Setup Support"], cta: "Equip Store" },
                { tier: "Standard", price: "₹14,999/mo", features: ["Up to 50 Screens", "Standard Maintenance: ₹7,000/mo", "Region-wise Heatmaps", "Fleet Dashboard (Mobile)", "Priority Technical Call"], cta: "Go Pro", highlight: true },
                { tier: "Enterprise", price: "Custom", features: ["Unlimited Fleet Size", "Enterprise Maintenance Support", "Mall-wide Integration", "Custom BI Dashboard", "24/7 Remote Monitoring"], cta: "Talk to Sales" }
              ].map((p, i) => (
                <div key={i} className={`p-10 rounded-[40px] border transition-all ${p.highlight ? 'bg-pink-600 border-pink-400 shadow-2xl shadow-pink-600/30' : 'glass-card border-white/5'}`}>
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">{p.tier}</div>
                  <div className="text-3xl font-black mb-10">{p.price}</div>
                  <div className="space-y-4 mb-10">
                    {p.features.map((f, fi) => (
                      <div key={fi} className="flex items-start gap-3 text-sm font-medium leading-tight">
                        <Check size={14} className="shrink-0 mt-0.5" /> {f}
                      </div>
                    ))}
                  </div>
                  <button onClick={() => onNavigate('contact')} className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 ${p.highlight ? 'bg-white text-pink-600' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                    {p.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. How We Deliver / Process Section */}
      <section className="py-32 px-6">
         <div className="max-w-7xl mx-auto">
            <SectionHeader centered highlight="The Protocol" title="Shipping Success Across India" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative">
               <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-px bg-white/5 -z-10" />
               {[
                 { step: "01", title: "Strategy Audit", icon: <Layers /> },
                 { step: "02", title: "AI Deployment", icon: <Zap /> },
                 { step: "03", title: "Market Launch", icon: <PlayCircle /> },
                 { step: "04", title: "ROAS Optimization", icon: <BarChart3 /> }
               ].map((p, i) => (
                  <div key={i} className="flex flex-col items-center text-center max-w-[200px]">
                     <div className="w-20 h-20 rounded-3xl bg-black border border-white/10 flex items-center justify-center mb-6 text-blue-500 shadow-xl">
                        {p.icon}
                     </div>
                     <div className="text-[10px] font-black uppercase text-zinc-600 mb-2">{p.step}</div>
                     <h4 className="text-xl font-bold">{p.title}</h4>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-48 px-6 text-center">
         <SectionHeader centered title="Ready for an Indian Growth Demo?" subtitle="Join 500+ Indian founders scaling with Web Prime AI." />
         <button onClick={() => onNavigate('contact')} className="px-16 py-8 bg-blue-600 text-white font-black rounded-3xl text-2xl hover:bg-blue-700 shadow-2xl shadow-blue-600/30 active:scale-95 transition-all">
            Schedule Strategy Call
         </button>
      </section>
      
      <div className="text-center pb-12 text-zinc-700 text-[10px] font-black uppercase tracking-widest">
        * A recurring monthly maintenance fee of ₹7,000/- applies to all active website and smart screen deployments.
      </div>
    </div>
  );
};
