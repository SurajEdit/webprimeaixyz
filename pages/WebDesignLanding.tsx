
import React from 'react';
import { 
  ArrowRight, 
  Layout, 
  Smartphone, 
  Zap, 
  MessageCircle, 
  Check
} from 'lucide-react';
import { Breadcrumbs, SectionHeader, FAQItem } from '../App';
import { Page, Service } from '../types';

interface WebDesignLandingProps {
  service: Service;
  onNavigate: (page: Page) => void;
}

export const WebDesignLanding: React.FC<WebDesignLandingProps> = ({ service, onNavigate }) => {
  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative pt-40 pb-24 md:pt-56 md:pb-40 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs path={[{ label: 'Services', page: 'services' }, { label: service.name }]} onNavigate={onNavigate} />
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/30 border border-blue-500/20 text-blue-400 text-[10px] font-black mb-10 tracking-[0.2em] uppercase">
                <Layout className="w-4 h-4" /> Pan-India Service
              </div>
              <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter">
                {service.name.split(' ')[0]} <br />
                <span className="gradient-text">{service.name.split(' ').slice(1).join(' ')}</span>
              </h1>
              <p className="text-xl md:text-2xl text-zinc-400 mb-12 leading-relaxed font-light">
                {service.fullDescription}
              </p>
              <button onClick={() => onNavigate('contact')} className="group px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-zinc-200 transition-all flex items-center gap-3 text-lg">
                Book My Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1" />
              </button>
            </div>
            <div className="flex-1 relative">
               <div className="aspect-square glass-card rounded-[60px] p-12 overflow-hidden flex items-center justify-center">
                  <img src={service.image} className="w-full h-full object-cover rounded-[40px] opacity-40 group-hover:opacity-100 transition-opacity" />
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-zinc-950/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionHeader highlight="Capabilities" title="Engineered for Performance" subtitle="Tailored for the Indian digital ecosystem." />
          <div className="grid md:grid-cols-3 gap-8">
            {service.features.map((f, i) => (
              <div key={i} className="glass-card p-10 rounded-[40px] border-white/5">
                <div className="mb-8 w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center text-blue-500">
                  <Zap size={24} />
                </div>
                <h4 className="text-xl font-bold mb-4">{f.title}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader centered highlight="Investment" title="Strategic Tiers" subtitle="High-performance web architecture with transparent INR pricing." />
          <div className="grid md:grid-cols-3 gap-8">
            {service.pricingPlans.map((plan) => (
              <div key={plan.id} className={`p-10 rounded-[50px] border transition-all flex flex-col ${plan.isHighlighted ? 'bg-blue-600 border-blue-400 scale-105 shadow-2xl shadow-blue-600/30' : 'glass-card border-white/5'}`}>
                <h4 className={`text-[10px] font-black uppercase tracking-widest mb-4 ${plan.isHighlighted ? 'text-blue-100' : 'text-zinc-500'}`}>{plan.name}</h4>
                <div className="text-3xl font-black mb-4">{plan.price}</div>
                <p className={`text-sm mb-10 leading-relaxed ${plan.isHighlighted ? 'text-blue-100' : 'text-zinc-400'}`}>{plan.description}</p>
                <div className="space-y-4 mb-12 flex-grow">
                  {plan.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-3 text-sm font-medium">
                      <Check size={16} className={plan.isHighlighted ? 'text-white' : 'text-blue-500'} /> 
                      <span className={plan.isHighlighted ? 'text-blue-50' : 'text-zinc-300'}>{f}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => onNavigate('contact')} 
                  className={`w-full py-5 rounded-2xl font-black transition-all active:scale-95 ${plan.isHighlighted ? 'bg-white text-blue-600 shadow-xl' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  {plan.ctaText}
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-zinc-600 text-[10px] mt-12 uppercase tracking-widest font-black">* Standard 18% GST applies. Recurring maintenance fee applies to active plans.</p>
        </div>
      </section>

      {service.faqs.length > 0 && (
        <section className="py-32 px-6 bg-zinc-950/30 border-t border-white/5">
           <div className="max-w-4xl mx-auto">
             <SectionHeader centered title="Common Questions" />
             <div className="space-y-4">
                {service.faqs.map((faq, i) => (
                   <FAQItem key={i} question={faq.question} answer={faq.answer} />
                ))}
             </div>
           </div>
        </section>
      )}
    </div>
  );
};
