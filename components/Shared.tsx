
import React, { useState } from 'react';
import { ChevronRight, Plus, Minus } from 'lucide-react';
import { Page } from '../types';

export const Breadcrumbs: React.FC<{ path: { label: string; page?: Page }[]; onNavigate: (page: Page) => void }> = ({ path, onNavigate }) => (
  <nav className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase mb-12">
    <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">HOME</button>
    {path.map((item, i) => (
      <React.Fragment key={i}>
        <ChevronRight size={10} className="text-zinc-700" />
        {item.page ? (
          <button onClick={() => onNavigate(item.page!)} className="hover:text-white transition-colors">{item.label.toUpperCase()}</button>
        ) : (
          <span className="text-zinc-300">{item.label.toUpperCase()}</span>
        )}
      </React.Fragment>
    ))}
  </nav>
);

export const SectionHeader: React.FC<{ title: string; subtitle?: string; highlight?: string; centered?: boolean }> = ({ title, subtitle, highlight, centered = false }) => (
  <div className={`mb-20 ${centered ? 'text-center mx-auto max-w-4xl' : ''}`}>
    <div className="text-blue-500 font-bold tracking-[0.3em] mb-4 text-xs uppercase">{highlight}</div>
    <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight uppercase">{title}</h2>
    {subtitle && <p className="text-zinc-400 text-xl mt-6 font-light leading-relaxed">{subtitle}</p>}
  </div>
);

export const FAQItem: React.FC<{ question: string; answer: React.ReactNode }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`glass-card rounded-3xl border-white/5 overflow-hidden transition-all duration-300 ${isOpen ? 'border-blue-500/30 ring-1 ring-blue-500/20' : ''}`}>
      <button onClick={() => setIsOpen(!isOpen)} className="w-full p-8 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors">
        <h4 className="text-xl font-bold pr-8 uppercase">{question}</h4>
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
