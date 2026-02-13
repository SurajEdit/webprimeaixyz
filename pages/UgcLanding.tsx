
import React from 'react';
import { 
  ArrowRight, PlayCircle, Check, ExternalLink
} from 'lucide-react';
import { Breadcrumbs, SectionHeader } from '../components/Shared';
import { Page, Service, UgcAd } from '../types';
import { AutoPlayingVideo } from '../components/AutoPlayingVideo';

interface UgcLandingProps {
  service: Service;
  ugcAds: UgcAd[];
  onNavigate: (page: Page) => void;
}

export const UgcLanding: React.FC<UgcLandingProps> = ({ service, ugcAds, onNavigate }) => {
  const packages = [
    {
      name: "FLASH",
      price: "₹19,999",
      desc: "Perfect for testing ad hooks with real Indian creators.",
      features: ["3 High-Performance Videos", "1 Hand-Picked Creator", "English/Hinglish Hook Scripts", "Meta & Reels Optimization", "Fast 7-Day Turnaround"],
      cta: "BUY FLASH PACK",
      highlight: false
    },
    {
      name: "IGNITE",
      price: "₹49,999",
      desc: "The sweet spot for scaling active campaigns for Indian D2C brands.",
      features: ["10 Custom UGC Videos", "3 Professional Creators", "3 Hook Variations per Video", "Professional Sound Design", "Bi-weekly Strategy Call"],
      cta: "GET IGNITE PACK",
      highlight: true
    },
    {
      name: "DOMINATE",
      price: "₹99,999",
      desc: "Full monthly creative coverage for high-growth national brands.",
      features: ["25+ Monthly Content Pieces", "Unlimited Creator Access", "Managed Ad Strategy", "Competitor Ad Breakdown", "Dedicated Account Manager"],
      cta: "DOMINATE THE MARKET",
      highlight: false
    }
  ];

  const differentiators = [
    {
      title: "Performance-driven content",
      desc: "Every script is engineered for peak retention and conversion metrics.",
    },
    {
      title: "Authentic storytelling",
      desc: "Real creators sharing real experiences that build genuine brand trust.",
    },
    {
      title: "Regional creator network",
      desc: "500+ creators across India, from metros to Tier-2 hubs.",
    },
    {
      title: "Transparent reporting",
      desc: "Clear visibility into view rates, engagement, and estimated ROAS.",
    }
  ];

  const handleVideoClick = (url: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative pt-40 pb-24 md:pt-56 md:pb-40 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-purple-600/10 blur-[120px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1">
            <Breadcrumbs path={[{ label: 'Services', page: 'services' }, { label: service.name }]} onNavigate={onNavigate} />
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter uppercase">
              Ads That <span className="gradient-text">Stop the Scroll.</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 mb-12 leading-relaxed font-light">
              We create authentic, high-converting UGC ads with regional Indian creators that build trust and drive massive ROAS.
            </p>
            <div className="flex gap-4">
               <button onClick={() => onNavigate('contact')} className="group px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 text-lg shadow-2xl shadow-white/10 uppercase">
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
            <SectionHeader highlight="THE INDIAN VAULT" title="HIGH-PERFORMANCE CREATIVE" subtitle="Real results from our network of Indian creators. Videos autoplay on scroll to demonstrate performance hooks." />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {ugcAds.filter(u => u.status === 'published' && u.visibility === 'show').map((u, i) => (
                 <div 
                  key={i} 
                  onClick={() => handleVideoClick(u.videoUrl)}
                  className={`aspect-[9/16] glass-card rounded-[40px] overflow-hidden group relative border-white/5 hover:border-blue-500/40 transition-all cursor-pointer ${u.videoUrl ? 'hover:scale-[1.02]' : ''}`}
                 >
                    {u.videoUrl ? (
                      <AutoPlayingVideo src={u.videoUrl} poster={u.thumbnail} className="opacity-50 group-hover:opacity-70 transition-opacity" />
                    ) : (
                      <img src={u.thumbnail} className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-1000" alt={u.title} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 flex flex-col justify-end pointer-events-none">
                       <div className="flex items-center justify-between mb-1">
                          <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{u.platform.toUpperCase()}</div>
                          {u.videoUrl && <ExternalLink size={12} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />}
                       </div>
                       <h4 className="text-xl font-bold leading-tight mb-4 group-hover:text-blue-400 transition-colors uppercase">{u.title}</h4>
                       <div className="flex items-center justify-between border-t border-white/10 pt-4">
                          <div>
                             <div className="text-[10px] font-black uppercase text-zinc-500">Reach</div>
                             <div className="text-sm font-black text-white uppercase">{u.metrics.views}</div>
                          </div>
                          <div className="text-right">
                             <div className="text-[10px] font-black uppercase text-zinc-500">ROAS</div>
                             <div className="text-sm font-black text-green-500 uppercase">{u.metrics.roas}</div>
                          </div>
                       </div>
                    </div>
                    {u.videoUrl && (
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600/90 w-16 h-16 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all shadow-xl shadow-blue-600/40 pointer-events-none">
                          <PlayCircle size={32} className="text-white ml-1" />
                       </div>
                    )}
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Why Web Prime AI UGC Ads Section */}
      <section className="py-32 px-6 border-y border-white/5 bg-zinc-950/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader centered highlight="DIFFERENTIATORS" title="WHY WEB PRIME AI UGC ADS" subtitle="We blend deep strategic analysis with authentic creative production to deliver industry-leading results." />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {differentiators.map((d, i) => (
              <div key={i} className="flex flex-col items-start space-y-4">
                <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                  <Check className="text-blue-500 w-6 h-6" />
                </div>
                <h4 className="text-xl font-black text-white uppercase">{d.title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader centered highlight="PACKAGES" title="PRODUCTION TIERS (INR)" subtitle="Tailored pricing for Indian D2C growth and enterprise scaling." />
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <div key={i} className={`p-10 rounded-[50px] border transition-all flex flex-col ${pkg.highlight ? 'bg-purple-600 border-purple-400 scale-105 shadow-2xl shadow-purple-600/30' : 'glass-card border-white/5'}`}>
                <h4 className={`text-[10px] font-black uppercase tracking-widest mb-4 ${pkg.highlight ? 'text-purple-100' : 'text-zinc-500'}`}>{pkg.name}</h4>
                <div className="text-3xl font-black mb-4 uppercase">{pkg.price}</div>
                <p className={`text-sm mb-10 leading-relaxed ${pkg.highlight ? 'text-purple-100' : 'text-zinc-400'}`}>{pkg.desc}</p>
                <div className="space-y-4 mb-12 flex-grow">
                  {pkg.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-3 text-sm font-medium">
                      <Check size={16} className={pkg.highlight ? 'text-white' : 'text-purple-400'} /> 
                      <span className={pkg.highlight ? 'text-purple-50' : 'text-zinc-300'}>{f.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => onNavigate('contact')} 
                  className={`w-full py-5 rounded-2xl font-black transition-all active:scale-95 uppercase ${pkg.highlight ? 'bg-white text-purple-600 shadow-xl' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  {pkg.cta}
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-zinc-600 text-[10px] mt-12 uppercase tracking-widest font-black">* Standard 18% GST applies to all production packages.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 px-6 text-center">
         <SectionHeader centered title="READY FOR HIGH-ROAS CONTENT?" subtitle="Join the 100+ Indian D2C brands winning with our UGC strategy." highlight="CONVERSION CALL" />
         <button onClick={() => onNavigate('contact')} className="px-16 py-8 bg-blue-600 text-white font-black rounded-3xl text-2xl hover:bg-blue-700 transition-all active:scale-95 shadow-2xl shadow-blue-600/20 uppercase">
            Book Creative Call
         </button>
      </section>
    </div>
  );
};
