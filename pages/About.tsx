
import React from 'react';
import { 
  ShieldCheck, Zap, Users, 
  Target, Rocket
} from 'lucide-react';
import { Breadcrumbs, SectionHeader } from '../components/Shared';
import { Page, SiteContent } from '../types';

export const About: React.FC<{ onNavigate: (p: Page) => void, siteContent: SiteContent }> = ({ onNavigate, siteContent }) => {
  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative pt-56 pb-32 md:pt-64 md:pb-40 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs path={[{ label: 'About Us' }]} onNavigate={onNavigate} />
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter">
            We Engineer the <span className="gradient-text">Future of Web.</span>
          </h1>
          <p className="text-xl md:text-3xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            Empowering modern businesses with AI-driven web solutions that prioritize speed, intelligence, and human-centric design.
          </p>
        </div>
      </section>

      <section className="py-32 px-6 border-y border-white/5 bg-zinc-950/30">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-center">
          <div className="flex-1">
            <div className="text-blue-500 font-bold tracking-[0.3em] mb-4 text-xs uppercase">The Origins</div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">{siteContent.about.missionHeadline}</h2>
            <div className="space-y-6 text-zinc-400 text-lg font-light leading-relaxed">
              <div className="whitespace-pre-line">
                {siteContent.about.storyBody}
              </div>
              <div className="flex items-center gap-4 text-white font-bold pt-4">
                 <Target className="text-blue-500" /> Our Mission: {siteContent.about.missionBody}
              </div>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-6 w-full">
            <div className="glass-card p-10 rounded-[40px] border-white/5 aspect-square flex flex-col justify-end">
               <div className="text-4xl font-black mb-2">500+</div>
               <div className="text-xs font-black uppercase tracking-widest text-zinc-500">Global Creators</div>
            </div>
            <div className="glass-card p-10 rounded-[40px] border-white/5 aspect-square flex flex-col justify-end bg-blue-600/10">
               <div className="text-4xl font-black mb-2">42%</div>
               <div className="text-xs font-black uppercase tracking-widest text-zinc-500">Avg conversion lift</div>
            </div>
            <div className="glass-card p-10 rounded-[40px] border-white/5 aspect-square flex flex-col justify-end">
               <div className="text-4xl font-black mb-2">24/7</div>
               <div className="text-xs font-black uppercase tracking-widest text-zinc-500">AI Intelligence</div>
            </div>
            <div className="glass-card p-10 rounded-[40px] border-white/5 aspect-square flex flex-col justify-end">
               <div className="text-4xl font-black mb-2">2025</div>
               <div className="text-xs font-black uppercase tracking-widest text-zinc-500">Future Ready</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader centered highlight="The Team" title="Strategic Minds" subtitle="Meet the visionaries behind the algorithms." />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {siteContent.about.team.map((m) => (
              <div key={m.id} className="glass-card rounded-[40px] overflow-hidden group border-white/5">
                <img src={m.image} className="aspect-square object-cover opacity-60 group-hover:scale-105 transition-transform" alt={m.name} />
                <div className="p-8">
                  <h4 className="text-xl font-bold">{m.name}</h4>
                  <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest mt-1">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader centered highlight="Principles" title="Core Foundation" subtitle="What drives every line of code we write." />
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <Zap className="text-blue-500" />, title: "Innovation", desc: "Never settling for standard. We push the limits of what AI can achieve in a browser." },
              { icon: <Rocket className="text-purple-500" />, title: "Efficiency", desc: "Speed is our baseline. Every system is built for peak performance and zero waste." },
              { icon: <ShieldCheck className="text-pink-500" />, title: "Reliability", desc: "Enterprise-grade stability meets boutique-level attention to detail." },
              { icon: <Users className="text-cyan-500" />, title: "User-First", desc: "Data is king, but the human experience is the heart of every project." }
            ].map((v, i) => (
              <div key={i} className="glass-card p-10 rounded-[40px] border-white/5 text-center">
                 <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/5">
                    {v.icon}
                 </div>
                 <h4 className="text-xl font-bold mb-4">{v.title}</h4>
                 <p className="text-zinc-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-48 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <SectionHeader centered highlight="Differentiators" title="Why Web Prime AI?" subtitle="Because we don't just build websites. We build competitive advantages." />
          <button onClick={() => onNavigate('contact')} className="px-16 py-8 bg-white text-black font-black rounded-3xl text-2xl hover:bg-zinc-200 shadow-2xl shadow-white/10 active:scale-95 transition-all">
            Join the Revolution
          </button>
        </div>
      </section>
    </div>
  );
};
