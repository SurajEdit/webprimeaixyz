
import React from 'react';
import { 
  ArrowRight, 
  PlayCircle, 
  CheckCircle2, 
  BarChart3, 
  Users,
  Video,
  ChevronRight,
  Target,
  Clock,
  Zap,
  Star,
  X
} from 'lucide-react';

export const UgcLanding: React.FC<{ onNavigate: (id: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 md:pt-56 md:pb-40 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-purple-600/10 blur-[120px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/20 text-purple-400 text-xs font-bold mb-10 tracking-wider uppercase">
              <Video className="w-4 h-4" /> Performance Creatives
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter">
              UGC Ads That Don’t Look Like Ads — <span className="gradient-text">But Sell Like Crazy.</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 mb-12 leading-relaxed font-light">
              We create authentic, creator-style UGC video ads that improve engagement, reduce ad fatigue, and increase ROAS.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <button 
                onClick={() => onNavigate('contact')}
                className="group w-full sm:w-auto px-10 py-5 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 text-lg shadow-2xl"
              >
                Book a Free UGC Strategy Call <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          <div className="flex-1 w-full max-w-sm lg:max-w-md relative">
            <div className="aspect-[9/16] bg-zinc-900 rounded-[50px] border-8 border-zinc-800 shadow-3xl overflow-hidden relative group">
              <img src="https://picsum.photos/id/64/800/1422" alt="UGC Example" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayCircle className="w-20 h-20 text-white/80 group-hover:scale-110 transition-all" />
              </div>
              <div className="absolute bottom-10 left-6 right-6 p-4 glass-card rounded-2xl border-white/10">
                 <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-zinc-700 animate-pulse" />
                    <div className="h-4 w-24 bg-zinc-700 rounded animate-pulse" />
                 </div>
                 <div className="h-2 w-full bg-zinc-800 rounded animate-pulse mb-2" />
                 <div className="h-2 w-2/3 bg-zinc-800 rounded animate-pulse" />
              </div>
            </div>
            <div className="absolute -top-6 -right-6 glass-card p-6 rounded-3xl border border-purple-500/30 shadow-2xl animate-bounce duration-[3000ms]">
               <div className="text-purple-400 font-black text-3xl">2.8x</div>
               <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Higher ROAS</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Credibility */}
      <section className="py-24 px-6 bg-zinc-950/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-zinc-500 font-bold text-sm tracking-[0.2em] mb-4 uppercase">Trusted by growing brands</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center mb-20">
            {[
              { label: "Engagement", value: "+145%", icon: <Users size={20} className="text-purple-500" /> },
              { label: "Lower CPMs", value: "-35%", icon: <Target size={20} className="text-blue-500" /> },
              { label: "Better ROAS", value: "3.2x", icon: <BarChart3 size={20} className="text-green-500" /> },
              { label: "Watch Time", value: "24s", icon: <Clock size={20} className="text-yellow-500" /> }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="mb-4">{stat.icon}</div>
                <div className="text-4xl font-black mb-2">{stat.value}</div>
                <div className="text-sm font-bold text-zinc-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Social Proof Logos */}
          <div className="pt-20 border-t border-white/5">
            <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10 opacity-20 grayscale hover:opacity-40 transition-opacity duration-500">
               <div className="text-2xl font-black tracking-tighter italic">Lumina</div>
               <div className="text-2xl font-black tracking-tighter uppercase">Nordic.</div>
               <div className="text-2xl font-black tracking-tighter">VITALITY</div>
               <div className="text-2xl font-black tracking-tighter lowercase">ecomly_</div>
               <div className="text-2xl font-black tracking-tighter uppercase underline decoration-purple-500">Peak</div>
               <div className="text-2xl font-black tracking-tighter italic font-serif">Vogue.</div>
            </div>
          </div>
        </div>
      </section>

      {/* UGC Ad Portfolio */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-purple-500 font-bold tracking-[0.2em] mb-4 text-sm uppercase">Portfolio</div>
          <h2 className="text-4xl md:text-6xl font-bold mb-20">Real Ads. <span className="text-zinc-600">Real Performance.</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Product Demo", brand: "Home Decor D2C", platform: "Meta Reels", img: "https://picsum.photos/seed/ugc1/600/1066" },
              { title: "Testimonial", brand: "SaaS Platform", platform: "TikTok Ads", img: "https://picsum.photos/seed/ugc2/600/1066" },
              { title: "Problem-Solution", brand: "Activewear Brand", platform: "YT Shorts", img: "https://picsum.photos/seed/ugc3/600/1066" }
            ].map((item, i) => (
              <div key={i} className="group flex flex-col items-center">
                <div className="aspect-[9/16] w-full bg-zinc-900 rounded-[40px] overflow-hidden relative shadow-2xl border border-white/5 group-hover:border-purple-500/30 transition-all duration-500">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500">
                      <PlayCircle className="text-white w-10 h-10" />
                    </button>
                  </div>
                  <div className="absolute bottom-8 left-8 text-left translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="px-4 py-1.5 bg-purple-600 rounded-full text-[10px] font-black uppercase mb-3 inline-block tracking-widest">{item.platform}</div>
                    <h4 className="text-2xl font-bold mb-1">{item.title}</h4>
                    <p className="text-zinc-400 text-sm font-medium">{item.brand}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-24">
            <button 
              onClick={() => onNavigate('contact')}
              className="text-purple-400 font-bold flex items-center gap-3 mx-auto hover:text-white transition-all text-lg group"
            >
              Request Full Case Studies <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Our UGC Ads Work */}
      <section className="py-32 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
          <div className="flex-1">
            <div className="text-purple-500 font-bold tracking-[0.2em] mb-4 text-sm uppercase">The Difference</div>
            <h2 className="text-4xl md:text-6xl font-bold mb-12">Built for Conversion</h2>
            <div className="space-y-10">
              {[
                { title: "Creator-style, Not Influencers", desc: "Authentic people your audience trusts, not high-maintenance celebrities.", icon: <Users className="text-purple-500" /> },
                { title: "Tested Hooks", desc: "Every video starts with a scroll-stopping hook proven across thousands in spend.", icon: <Zap className="text-yellow-500" /> },
                { icon: <Target className="text-blue-500" />, title: "Paid Ad Specific", desc: "Content built specifically for Meta/TikTok algorithms, not just random posts." },
                { icon: <Star className="text-pink-500" />, title: "Platform Optimized", desc: "Native formats that blend seamlessly into the user's feed for higher trust." }
              ].map((point, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="shrink-0 w-14 h-14 bg-zinc-900 border border-white/5 rounded-2xl flex items-center justify-center group-hover:border-purple-500/30 transition-colors">
                    {point.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{point.title}</h4>
                    <p className="text-zinc-400 leading-relaxed font-light">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
             <div className="w-full aspect-square glass-card rounded-[60px] p-12 border-purple-500/20 relative overflow-hidden flex flex-col justify-center text-center">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/5 to-transparent" />
                <h3 className="text-3xl md:text-5xl font-bold mb-6">Stop wasting ad spend on content that looks like an ad.</h3>
                <p className="text-zinc-500 text-lg">"Authenticity is the highest converting ad strategy in 2025."</p>
             </div>
          </div>
        </div>
      </section>

      {/* Our UGC Process */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Our 5-Step Process</h2>
            <p className="text-zinc-400 text-lg">From brief to high-performance assets in record time.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
             {[
               { step: "01", title: "Research", desc: "Audience & ad angle strategy." },
               { step: "02", title: "Script", desc: "Proven high-conversion hooks." },
               { step: "03", title: "Shoot", desc: "Authentic creator direction." },
               { step: "04", title: "Edit", desc: "Performance-focused editing." },
               { step: "05", title: "Deliver", desc: "Ad-ready assets optimized." }
             ].map((item, i) => (
               <div key={i} className="text-center group">
                  <div className="w-16 h-16 bg-zinc-900 border border-white/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:border-purple-500 transition-all font-black text-xl text-purple-400">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed px-4">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Audience Check */}
      <section className="py-32 px-6 bg-zinc-950/50">
        <div className="max-w-5xl mx-auto glass-card p-12 md:p-20 rounded-[60px] border-white/5 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12">Is This Right For You?</h2>
          <div className="grid md:grid-cols-2 gap-12 text-left">
            <div>
              <h4 className="text-green-500 font-black tracking-widest text-[10px] uppercase mb-6">Ideal For:</h4>
              <ul className="space-y-5">
                 <li className="flex items-center gap-3 text-zinc-300 font-medium"><CheckCircle2 size={20} className="text-green-500 shrink-0" /> Spending $5k+ on Meta / Google ads</li>
                 <li className="flex items-center gap-3 text-zinc-300 font-medium"><CheckCircle2 size={20} className="text-green-500 shrink-0" /> Facing high ad fatigue & rising CPA</li>
                 <li className="flex items-center gap-3 text-zinc-300 font-medium"><CheckCircle2 size={20} className="text-green-500 shrink-0" /> Brands that need rapid trust & proof</li>
              </ul>
            </div>
            <div className="opacity-50 grayscale">
              <h4 className="text-red-500 font-black tracking-widest text-[10px] uppercase mb-6">Not For:</h4>
              <ul className="space-y-5">
                 <li className="flex items-center gap-3 text-zinc-500 font-medium"><X size={20} className="text-red-500 shrink-0" /> Highly polished 'corporate' videos</li>
                 <li className="flex items-center gap-3 text-zinc-500 font-medium"><X size={20} className="text-red-500 shrink-0" /> Influencer vanity posts without ROI</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 via-transparent to-blue-600/10 -z-10" />
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-8xl font-black mb-12 leading-tight">Let’s Build Ads <br /><span className="gradient-text">That Convert.</span></h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <button 
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-12 py-6 bg-white text-black font-black rounded-3xl hover:bg-zinc-200 transition-all text-xl shadow-2xl active:scale-95"
            >
              Book a Free Call
            </button>
            <button 
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-12 py-6 bg-zinc-900 text-white border border-zinc-800 font-black rounded-3xl hover:bg-zinc-800 transition-all text-xl active:scale-95"
            >
              Get UGC Ads
            </button>
          </div>
          <p className="mt-12 text-zinc-500 font-medium">No obligation strategy session. 24h response time.</p>
        </div>
      </section>
    </div>
  );
};
