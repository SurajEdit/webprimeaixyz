
import React from 'react';
import { 
  ArrowRight, Layout, Video, QrCode, Zap, Check
} from 'lucide-react';
import { Breadcrumbs, SectionHeader } from '../components/Shared';
import { Page, Service } from '../types';

export const Services: React.FC<{ onNavigate: (p: Page) => void, services: Service[] }> = ({ onNavigate, services }) => {
  const getIcon = (icon: string) => {
    switch(icon) {
      case 'Layout': return <Layout className="text-blue-500" />;
      case 'Video': return <Video className="text-purple-500" />;
      case 'QrCode': return <QrCode className="text-pink-500" />;
      default: return <Zap className="text-blue-500" />;
    }
  };

  const sortedServices = [...services]
    .filter(s => s.visibility === 'show')
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative pt-56 pb-32 md:pt-64 md:pb-40 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs path={[{ label: 'Our Services' }]} onNavigate={onNavigate} />
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter">
            Next-Gen <br /><span className="gradient-text">Indian Digital Engines.</span>
          </h1>
          <p className="text-xl md:text-3xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            High-performance AI strategies tailored for the unique dynamics of the Indian market.
          </p>
          <button onClick={() => onNavigate('contact')} className="px-12 py-6 bg-white text-black font-black rounded-3xl text-xl hover:bg-zinc-200 transition-all active:scale-95 shadow-xl shadow-white/5">
             Inquire Now
          </button>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader highlight="The Toolkit" title="Growth Engines" subtitle="Every service is engineered to outperform local competition using global AI standards." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {sortedServices.map((s) => (
              <div 
                key={s.id} 
                onClick={() => onNavigate(s.id as Page)}
                className="glass-card p-12 rounded-[50px] border-white/5 group hover:border-blue-500/30 transition-all cursor-pointer"
              >
                <div className="mb-8 w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                  {getIcon(s.icon)}
                </div>
                <h3 className="text-2xl font-bold mb-4">{s.name}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-10">{s.shortDescription}</p>
                <div className="text-blue-500 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                  Explore Engine <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-zinc-950/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionHeader centered highlight="Investment" title="Transparent INR Pricing" subtitle="Optimized for growth-focused Indian enterprises. Prices are exclusive of 18% GST." />
          
          {sortedServices.map((s) => (
            <div key={s.id} className="mb-32 last:mb-0">
              <div className="flex items-center gap-3 mb-10">
                <div className="p-3 bg-white/5 rounded-xl">{getIcon(s.icon)}</div>
                <h3 className="text-3xl font-black">{s.name} Plans</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {s.pricingPlans.map((p) => (
                  <div key={p.id} className={`p-10 rounded-[40px] border transition-all flex flex-col ${p.isHighlighted ? 'bg-blue-600 border-blue-400 shadow-2xl shadow-blue-600/20 scale-105' : 'glass-card border-white/5'}`}>
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">{p.name}</div>
                    <div className="text-3xl font-black mb-6">{p.price}</div>
                    <p className={`text-sm mb-10 leading-relaxed flex-grow ${p.isHighlighted ? 'text-blue-100' : 'text-zinc-500'}`}>{p.description}</p>
                    <div className="space-y-4 mb-12">
                      {p.features.map((f, fi) => (
                        <div key={fi} className="flex items-start gap-3 text-sm font-medium leading-tight">
                          <Check size={14} className="shrink-0 mt-0.5" /> {f}
                        </div>
                      ))}
                    </div>
                    <button onClick={() => onNavigate('contact')} className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 ${p.isHighlighted ? 'bg-white text-blue-600' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                      {p.ctaText}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <div className="text-center py-24 text-zinc-700 text-[10px] font-black uppercase tracking-widest">
        * A recurring monthly maintenance fee of ₹7,000/- applies to all active website and smart screen deployments.
      </div>
    </div>
  );
};
