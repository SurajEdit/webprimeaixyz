
import React from 'react';
import { 
  ArrowRight, 
  QrCode, 
  Sparkles,
  Check
} from 'lucide-react';
import { Breadcrumbs, SectionHeader } from '../components/Shared';
import { Page, Service } from '../types';

interface QrScreenLandingProps {
  service: Service;
  onNavigate: (page: Page) => void;
}

export const QrScreenLanding: React.FC<QrScreenLandingProps> = ({ service, onNavigate }) => {
  const tiers = [
    {
      name: "Boutique",
      price: "₹2,499/mo",
      desc: "Perfect for local Indian retail shops and independent restaurants.",
      features: ["Up to 5 Smart Screens", "Standard Maintenance: ₹7,000/mo", "Real-time Footfall Data", "Dynamic WhatsApp Redirection", "Online Setup Support"],
      cta: "Equip My Shop",
      highlight: false
    },
    {
      name: "Standard",
      price: "₹7,499/mo",
      desc: "Built for multi-location Indian venues and regional shopping events.",
      features: ["Up to 50 Screens", "Standard Maintenance: ₹7,000/mo", "Regional Heatmap Analytics", "Fleet Management Dashboard", "Priority Technical Support"],
      cta: "Deploy Fleet",
      highlight: true
    },
    {
      name: "Enterprise",
      price: "Custom Quote",
      desc: "Massive scale solutions for Indian shopping malls and national chains.",
      features: ["Unlimited Screen Fleet", "Enterprise Maintenance Support", "White-label Enterprise UI", "Custom API Integrations", "Full BI & Retail Reporting"],
      cta: "Contact Enterprise",
      highlight: false
    }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative pt-40 pb-24 md:pt-56 md:pb-40 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-pink-600/10 blur-[120px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs path={[{ label: 'Services', page: 'services' }, { label: service.name }]} onNavigate={onNavigate} />
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-900/30 border border-pink-500/20 text-pink-400 text-[10px] font-black mb-10 tracking-[0.2em] uppercase">
                <Sparkles className="w-4 h-4" /> Next-Gen Retail AI
              </div>
              <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter">
                Smart Screens for <br />
                <span className="gradient-text">Indian Retail.</span>
              </h1>
              <p className="text-xl md:text-2xl text-zinc-400 mb-12 leading-relaxed font-light">
                Turn your physical store traffic into digital assets. Our AI QR screens bridge the gap between offline footfall and online conversion.
              </p>
              <button onClick={() => onNavigate('contact')} className="group px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-zinc-200 transition-all flex items-center gap-3 text-lg shadow-2xl shadow-white/5">
                Book My Demo <ArrowRight className="w-5 h-5 group-hover:translate-x-1" />
              </button>
            </div>
            <div className="flex-1 relative">
               <div className="aspect-video glass-card rounded-[60px] flex items-center justify-center p-12">
                  <QrCode size={120} className="text-pink-500" />
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
           <SectionHeader highlight="Intelligence" title="Optimized for Local Markets" subtitle="Digital engagement engineered for the Indian consumer behavior." />
           <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: "WhatsApp First", desc: "Indian consumers prefer WhatsApp. We integrate direct-to-chat redirections in every smart QR scan." },
                { title: "Low-Bandwidth Optimized", desc: "Ensuring scans work seamlessly even in areas with inconsistent 4G/5G signals." },
                { title: "Tier-1 to Tier-3 Insights", desc: "Granular data reporting that works whether you're in a Delhi mall or a local shop in Jaipur." },
                { title: "Dynamic Ad Content", desc: "Update your screen offers in real-time based on local inventory or regional festivals." }
              ].map((f, i) => (
                <div key={i} className="glass-card p-12 rounded-[50px] border-white/5 hover:border-pink-500/20 transition-all">
                  <h4 className="text-2xl font-bold mb-4">{f.title}</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed font-light">{f.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionHeader centered highlight="Tiers" title="Network Subscription (INR)" subtitle="Flexible monthly plans for every Indian retail scale. Exclusive of 18% GST." />
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier, i) => (
              <div key={i} className={`p-10 rounded-[50px] border transition-all flex flex-col ${tier.highlight ? 'bg-pink-600 border-pink-400 scale-105 shadow-2xl shadow-pink-600/30' : 'glass-card border-white/5'}`}>
                <h4 className={`text-[10px] font-black uppercase tracking-widest mb-4 ${tier.highlight ? 'text-pink-100' : 'text-zinc-500'}`}>{tier.name}</h4>
                <div className="text-3xl font-black mb-4">{tier.price}</div>
                <p className={`text-sm mb-10 leading-relaxed ${tier.highlight ? 'text-pink-100' : 'text-zinc-400'}`}>{tier.desc}</p>
                <div className="space-y-4 mb-12 flex-grow">
                  {tier.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-3 text-sm font-medium">
                      <Check size={16} className={tier.highlight ? 'text-white' : 'text-pink-400'} /> 
                      <span className={tier.highlight ? 'text-pink-50' : 'text-zinc-300'}>{f}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => onNavigate('contact')} 
                  className={`w-full py-5 rounded-2xl font-black transition-all active:scale-95 ${tier.highlight ? 'bg-white text-pink-600 shadow-xl' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-zinc-600 text-[10px] mt-12 uppercase tracking-widest font-black">* Standard monthly billing cycle. A baseline maintenance fee of ₹7,000/mo applies per deployment.</p>
        </div>
      </section>

      <section className="py-40 px-6 text-center">
         <SectionHeader centered title="Ready for Smart Retail?" subtitle="Turn your mall or store footfall into digital customers today." />
         <button onClick={() => onNavigate('contact')} className="px-16 py-8 bg-blue-600 text-white font-black rounded-3xl text-2xl hover:bg-blue-700 transition-all active:scale-95 shadow-2xl shadow-blue-600/20">
            Book My Retail Demo
         </button>
      </section>
    </div>
  );
};
