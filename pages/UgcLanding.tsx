
import React from 'react';
import { 
  ArrowRight, CheckCircle2, Video, Target, Zap, PlayCircle, Star, Users, MessageSquare, Check
} from 'lucide-react';
import { Breadcrumbs, SectionHeader } from '../App';
import { Page, Service, UgcAd } from '../types';

interface UgcLandingProps {
  service: Service;
  ugcAds: UgcAd[];
  onNavigate: (page: Page) => void;
}

export const UgcLanding: React.FC<UgcLandingProps> = ({ service, ugcAds, onNavigate }) => {
  const packages = [
    {
      name: "Flash",
      price: "₹19,999",
      desc: "Perfect for testing ad hooks with real Indian creators.",
      features: ["3 High-Performance Videos", "1 Hand-Picked Creator", "English/Hinglish Hook Scripts", "Meta & Reels Optimization", "Fast 7-Day Turnaround"],
      cta: "Buy Flash Pack",
      highlight: false
    },
    {
      name: "Ignite",
      price: "₹49,999",
      desc: "The sweet spot for scaling active campaigns for Indian D2C brands.",
      features: ["10 Custom UGC Videos", "3 Professional Creators", "3 Hook Variations per Video", "Professional Sound Design", "Bi-weekly Strategy Call"],
      cta: "Get Ignite Pack",
      highlight: true
    },
    {
      name: "Dominate",
      price: "₹99,999",
      desc: "Full monthly creative coverage for high-growth national brands.",
      features: ["25+ Monthly Content Pieces", "Unlimited Creator Access", "Managed Ad Strategy", "Competitor Ad Breakdown", "Dedicated Account Manager"],
      cta: "Dominate the Market",
      highlight: false
    }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative pt-40 pb-24 md:pt-56 md:pb-40 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-purple-600/10 blur-[120px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1">
            <Breadcrumbs path={[{ label: 'Services', page: 'services' }, { label: service.name }]} onNavigate={onNavigate} />
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter">
              Ads That <span className="gradient-text">Stop the Scroll.</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 mb-12 leading-relaxed font-light">
              We create authentic, high-converting UGC ads with regional Indian creators that build trust and drive massive ROAS.
            </p>
            <div className="flex gap-4">
               <button onClick={() => onNavigate('contact')} className="group px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 text-lg shadow-2xl shadow-white/10">
                 Launch Indian Campaign <ArrowRight className="w-5 h-5 group-hover:translate-x-1" />
               </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="aspect-[9/16] max-w-sm mx-auto glass-card rounded-[50px] overflow-hidden relative group">
               <img src={service.image} className="w-full h-full object-cover opacity-60" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle size={80} className="text-white fill-white/10 animate-subtle-float" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic UGC Showcase Grid */}
      <section className="py-32 px-6 bg-zinc-950/50">
         <div className="max-w-7xl mx-auto">
            <SectionHeader highlight="The Indian Vault" title="High-Performance Creative" subtitle="Real results from our network of Indian creators." />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
               {ugcAds.filter(u => u.status === 'published' && u.visibility === 'show').map((u, i) => (
                 <div key={i} className="aspect-[9/16] glass-card rounded-[40px] overflow-hidden group relative border-white/5 hover:border-blue-500/20 transition-all">
                    <img src={u.thumbnail} className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 flex flex-col justify-end">
                       <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">{u.platform}</div>
                       <h4 className="text-lg font-bold leading-tight mb-4">{u.title}</h4>
                       <div className="flex items-center justify-between border-t border-white/5 pt-4">
                          <div>
                             <div className="text-[10px] font-black uppercase text-zinc-500">Views</div>
                             <div className="text-sm font-black text-white">{u.metrics.views}</div>
                          </div>
                          <div className="text-right">
                             <div className="text-[10px] font-black uppercase text-zinc-500">ROAS</div>
                             <div className="text-sm font-black text-green-500">{u.metrics.roas}</div>
                          </div>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionHeader centered highlight="Packages" title="Production Tiers (INR)" subtitle="Tailored pricing for Indian D2C growth and enterprise scaling." />
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <div key={i} className={`p-10 rounded-[50px] border transition-all flex flex-col ${pkg.highlight ? 'bg-purple-600 border-purple-400 scale-105 shadow-2xl shadow-purple-600/30' : 'glass-card border-white/5'}`}>
                <h4 className={`text-[10px] font-black uppercase tracking-widest mb-4 ${pkg.highlight ? 'text-purple-100' : 'text-zinc-500'}`}>{pkg.name}</h4>
                <div className="text-3xl font-black mb-4">{pkg.price}</div>
                <p className={`text-sm mb-10 leading-relaxed ${pkg.highlight ? 'text-purple-100' : 'text-zinc-400'}`}>{pkg.desc}</p>
                <div className="space-y-4 mb-12 flex-grow">
                  {pkg.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-3 text-sm font-medium">
                      <Check size={16} className={pkg.highlight ? 'text-white' : 'text-purple-400'} /> 
                      <span className={pkg.highlight ? 'text-purple-50' : 'text-zinc-300'}>{f}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => onNavigate('contact')} 
                  className={`w-full py-5 rounded-2xl font-black transition-all active:scale-95 ${pkg.highlight ? 'bg-white text-purple-600 shadow-xl' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  {pkg.cta}
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-zinc-600 text-[10px] mt-12 uppercase tracking-widest font-black">* Standard 18% GST applies to all production packages.</p>
        </div>
      </section>

      {/* Why UGC Section */}
      <section className="py-32 px-6 bg-zinc-950/30">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
           {[
             { icon: <Users className="text-blue-500" />, title: "Regional Creators", desc: "Access a network of creators across Tier-1 and Tier-2 Indian cities for diverse representation." },
             { icon: <Star className="text-purple-500" />, title: "Trust & Relatability", desc: "Indian audiences trust faces they can relate to. We focus on authentic local storytelling." },
             { icon: <MessageSquare className="text-pink-500" />, title: "Multi-Lingual Strategy", desc: "Expertise in English, Hindi, and Hinglish hooks to maximize engagement and conversion." }
           ].map((item, i) => (
             <div key={i} className="glass-card p-12 rounded-[50px] border-white/5">
                <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mb-8">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-zinc-500 leading-relaxed font-light">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 px-6 text-center">
         <SectionHeader centered title="Ready for High-ROAS Content?" subtitle="Join the 100+ Indian D2C brands winning with our UGC strategy." />
         <button onClick={() => onNavigate('contact')} className="px-16 py-8 bg-blue-600 text-white font-black rounded-3xl text-2xl hover:bg-blue-700 transition-all active:scale-95 shadow-2xl shadow-blue-600/20">
            Book Creative Call
         </button>
      </section>
    </div>
  );
};
