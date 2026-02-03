
import React, { useState } from 'react';
import { 
  LayoutDashboard, LogOut, Plus, Monitor, Film, QrCode, Trash2, Edit2, 
  Save, Check, ArrowLeft, Briefcase, BookOpen, Layers, Inbox, PlayCircle,
  Settings, Image as ImageIcon, Sparkles, X, ChevronUp, ChevronDown, ListPlus
} from 'lucide-react';
import { Service, BlogPost, Project, UgcAd, SiteContent, PricingPlan, ServiceFeature, ServiceFAQ, ServiceProcessStep } from '../types';

type AdminTab = 'overview' | 'landing' | 'about' | 'footer' | 'services' | 'portfolio' | 'blog' | 'ugc' | 'leads';

interface AdminDashboardProps {
  onLogout: () => void;
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  blogs: BlogPost[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  portfolio: Project[];
  setPortfolio: React.Dispatch<React.SetStateAction<Project[]>>;
  ugcAds: UgcAd[];
  setUgcAds: React.Dispatch<React.SetStateAction<UgcAd[]>>;
  siteContent: SiteContent;
  setSiteContent: React.Dispatch<React.SetStateAction<SiteContent>>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  onLogout, services, setServices, blogs, setBlogs, portfolio, setPortfolio, ugcAds, setUgcAds, siteContent, setSiteContent
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBuffer, setEditBuffer] = useState<any>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const generateSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  
  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const resetState = () => {
    setIsAddingNew(false);
    setEditingId(null);
    setEditBuffer(null);
  };

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setEditBuffer(JSON.parse(JSON.stringify(item)));
  };

  const startAdd = (type: AdminTab) => {
    setIsAddingNew(true);
    const defaults: any = {
      services: { name: '', slug: '', shortDescription: '', fullDescription: '', icon: 'Layout', features: [], process: [], faqs: [], pricingPlans: [], image: 'https://picsum.photos/800/600', status: 'active', visibility: 'show', isFeatured: false, sortOrder: services.length + 1 },
      blog: { title: '', slug: '', excerpt: '', content: '', date: new Date().toISOString().split('T')[0], category: 'Advertising', image: 'https://picsum.photos/800/400', status: 'draft', visibility: 'show' },
      portfolio: { name: '', client: '', category: 'Web Design', stat: '', description: '', image: 'https://picsum.photos/800/600', visibility: 'show', status: 'live' },
      ugc: { title: '', creator: '', description: '', platform: 'TikTok', thumbnail: 'https://picsum.photos/400/700', videoUrl: '', status: 'draft', isFeatured: false, metrics: { views: '0', roas: '0' }, visibility: 'show', autoplay: true, mute: true, loop: true }
    };
    setEditBuffer(defaults[type] || {});
  };

  const saveEdit = (type: AdminTab) => {
    const handlers: any = {
      services: setServices, blog: setBlogs, portfolio: setPortfolio, ugc: setUgcAds
    };
    if (handlers[type]) {
      handlers[type]((prev: any[]) => prev.map(i => i.id === editingId ? editBuffer : i));
      showNotify('Changes saved successfully');
      resetState();
    }
  };

  const handleCreate = (type: AdminTab) => {
    const handlers: any = {
      services: setServices, blog: setBlogs, portfolio: setPortfolio, ugc: setUgcAds
    };
    if (handlers[type]) {
      const newItem = { ...editBuffer, id: Date.now().toString() };
      handlers[type]((prev: any[]) => [newItem, ...prev]);
      showNotify('New entry created');
      resetState();
    }
  };

  const deleteItem = (type: AdminTab, id: string) => {
    if (!confirm('Permanently delete this item?')) return;
    const handlers: any = {
      services: setServices, blog: setBlogs, portfolio: setPortfolio, ugc: setUgcAds
    };
    if (handlers[type]) {
      handlers[type]((prev: any[]) => prev.filter(i => i.id !== id));
      showNotify('Item deleted');
    }
  };

  const moveService = (id: string, direction: 'up' | 'down') => {
    setServices(prev => {
      const index = prev.findIndex(s => s.id === id);
      if ((direction === 'up' && index === 0) || (direction === 'down' && index === prev.length - 1)) return prev;
      const newServices = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      [newServices[index], newServices[targetIndex]] = [newServices[targetIndex], newServices[index]];
      return newServices.map((s, i) => ({ ...s, sortOrder: i + 1 }));
    });
  };

  // --- Nested List Handlers for Services ---
  const addFeature = () => {
    setEditBuffer({ ...editBuffer, features: [...(editBuffer.features || []), { title: '', desc: '' }] });
  };
  const removeFeature = (idx: number) => {
    setEditBuffer({ ...editBuffer, features: editBuffer.features.filter((_: any, i: number) => i !== idx) });
  };
  const updateFeature = (idx: number, field: string, value: string) => {
    const updated = editBuffer.features.map((f: any, i: number) => i === idx ? { ...f, [field]: value } : f);
    setEditBuffer({ ...editBuffer, features: updated });
  };

  const addPricingPlan = () => {
    setEditBuffer({ ...editBuffer, pricingPlans: [...(editBuffer.pricingPlans || []), { id: Date.now().toString(), name: 'New Plan', price: '₹0', description: '', features: [], ctaText: 'Get Started', isHighlighted: false }] });
  };
  const removePricingPlan = (id: string) => {
    setEditBuffer({ ...editBuffer, pricingPlans: editBuffer.pricingPlans.filter((p: any) => p.id !== id) });
  };
  const updatePricingPlan = (id: string, updates: Partial<PricingPlan>) => {
    const updated = editBuffer.pricingPlans.map((p: any) => p.id === id ? { ...p, ...updates } : p);
    setEditBuffer({ ...editBuffer, pricingPlans: updated });
  };

  // --- Pricing Plan Nested Features ---
  const addPlanFeature = (planId: string) => {
    const updated = editBuffer.pricingPlans.map((p: any) => 
      p.id === planId ? { ...p, features: [...(p.features || []), 'New Benefit Point'] } : p
    );
    setEditBuffer({ ...editBuffer, pricingPlans: updated });
  };
  const removePlanFeature = (planId: string, featIdx: number) => {
    const updated = editBuffer.pricingPlans.map((p: any) => 
      p.id === planId ? { ...p, features: p.features.filter((_: any, fi: number) => fi !== featIdx) } : p
    );
    setEditBuffer({ ...editBuffer, pricingPlans: updated });
  };
  const updatePlanFeature = (planId: string, featIdx: number, value: string) => {
    const updated = editBuffer.pricingPlans.map((p: any) => 
      p.id === planId ? { ...p, features: p.features.map((f: string, fi: number) => fi === featIdx ? value : f) } : p
    );
    setEditBuffer({ ...editBuffer, pricingPlans: updated });
  };

  const SidebarItem = ({ id, label, icon }: { id: AdminTab, label: string, icon: React.ReactNode }) => (
    <button onClick={() => { setActiveTab(id); resetState(); }} className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all ${activeTab === id ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-zinc-500 hover:text-white'}`}>
      {icon} <span className="text-sm">{label}</span>
    </button>
  );

  const FormField = ({ label, value, onChange, type = "text", help = "" }: { label: string, value: any, onChange: (val: string) => void, type?: string, help?: string }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center px-1">
        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{label}</label>
        {help && <span className="text-[9px] text-zinc-600 font-bold">{help}</span>}
      </div>
      {type === 'textarea' ? (
        <textarea rows={5} value={value} onChange={e => onChange(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 transition-colors" />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 transition-colors" />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] flex text-zinc-300 font-sans selection:bg-blue-500">
      {notification && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-2xl bg-white text-black font-black flex items-center gap-3 animate-in slide-in-from-top-4 shadow-3xl">
          <Check size={18} /> {notification}
        </div>
      )}

      <aside className="w-72 border-r border-white/5 bg-black/50 backdrop-blur-3xl flex flex-col p-8 fixed h-full z-20">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center font-black text-white">W</div>
          <span className="font-black text-xl text-white tracking-tighter">Command</span>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          <div className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-700 px-4 mb-4 mt-2">Intelligence</div>
          <SidebarItem id="overview" label="Overview" icon={<LayoutDashboard size={18} />} />
          <SidebarItem id="leads" label="Leads" icon={<Inbox size={18} />} />
          
          <div className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-700 px-4 mb-4 mt-8">Site Construction</div>
          <SidebarItem id="landing" label="Landing Editor" icon={<Monitor size={18} />} />
          <SidebarItem id="about" label="About Editor" icon={<Sparkles size={18} />} />
          <SidebarItem id="footer" label="Footer Config" icon={<Settings size={18} />} />
          
          <div className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-700 px-4 mb-4 mt-8">Content Registries</div>
          <SidebarItem id="services" label="Services" icon={<Briefcase size={18} />} />
          <SidebarItem id="portfolio" label="Portfolio" icon={<Layers size={18} />} />
          <SidebarItem id="blog" label="Articles" icon={<BookOpen size={18} />} />
          <SidebarItem id="ugc" label="UGC Vault" icon={<PlayCircle size={18} />} />
        </nav>
        <button onClick={onLogout} className="mt-8 pt-8 border-t border-white/5 flex items-center gap-4 text-zinc-600 hover:text-red-400 font-bold transition-colors"><LogOut size={18} /> Exit Console</button>
      </aside>

      <main className="flex-1 ml-72">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-12 sticky top-0 bg-[#050505]/80 backdrop-blur-xl z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-black text-white capitalize">{activeTab} Interface</h2>
            {isAddingNew && <span className="bg-blue-600 text-white text-[9px] font-black px-2 py-1 rounded">NEW ENTRY</span>}
          </div>
          <div className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">Web Prime AI v1.2</div>
        </header>

        <div className="p-12 max-w-6xl mx-auto">
          {['services', 'portfolio', 'blog', 'ugc'].includes(activeTab) && (
            (isAddingNew || editingId) ? (
              <div className="animate-in slide-in-from-bottom-4 duration-500">
                <button onClick={resetState} className="flex items-center gap-2 text-zinc-500 hover:text-white font-bold mb-8 transition-colors"><ArrowLeft size={16} /> Return to Registry</button>
                <div className="flex items-center justify-between mb-12">
                  <h3 className="text-4xl font-black text-white">{isAddingNew ? `New ${activeTab}` : `Update ${editBuffer.name || activeTab}`}</h3>
                  <div className="flex items-center gap-3">
                     <button onClick={() => isAddingNew ? handleCreate(activeTab) : saveEdit(activeTab)} className="px-10 py-4 bg-white text-black font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center gap-2"><Save size={16} /> Commit Changes</button>
                     <button onClick={resetState} className="px-10 py-4 bg-white/5 border border-white/10 text-zinc-500 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:text-white transition-all">Abort</button>
                  </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-2 space-y-10 pb-32">
                     {activeTab === 'services' && (
                        <>
                          <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-8">
                            <h4 className="text-xl font-black text-white">Core Information</h4>
                            <FormField label="Service Title" value={editBuffer.name} onChange={v => setEditBuffer({...editBuffer, name: v, slug: generateSlug(v)})} />
                            <FormField label="Short Summary (Registry Card)" value={editBuffer.shortDescription} onChange={v => setEditBuffer({...editBuffer, shortDescription: v})} type="textarea" />
                            <FormField label="Full Description (Landing Page)" value={editBuffer.fullDescription} onChange={v => setEditBuffer({...editBuffer, fullDescription: v})} type="textarea" />
                          </div>

                          <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-8">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xl font-black text-white">Capability Blocks</h4>
                              <button onClick={addFeature} className="px-4 py-2 bg-blue-600/20 text-blue-500 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><Plus size={14}/> Add Block</button>
                            </div>
                            <div className="space-y-4">
                              {editBuffer.features?.map((f: any, i: number) => (
                                <div key={i} className="flex gap-4 items-start p-6 bg-white/[0.02] rounded-3xl border border-white/5 group">
                                  <div className="flex-1 space-y-4">
                                    <input value={f.title} onChange={e => updateFeature(i, 'title', e.target.value)} placeholder="Block Title" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm font-bold" />
                                    <textarea value={f.desc} onChange={e => updateFeature(i, 'desc', e.target.value)} placeholder="Detailed summary..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-zinc-400" />
                                  </div>
                                  <button onClick={() => removeFeature(i)} className="p-2 text-zinc-800 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-8">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xl font-black text-white">Pricing Tiers & Maintenance</h4>
                              <button onClick={addPricingPlan} className="px-4 py-2 bg-green-600/20 text-green-500 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><Plus size={14}/> Add New Tier</button>
                            </div>
                            <div className="space-y-8">
                              {editBuffer.pricingPlans?.map((p: PricingPlan) => (
                                <div key={p.id} className="p-10 bg-white/[0.02] rounded-[50px] border border-white/5 space-y-8">
                                  <div className="grid md:grid-cols-2 gap-8">
                                    <FormField label="Tier Name (e.g. Starter)" value={p.name} onChange={v => updatePricingPlan(p.id, { name: v })} />
                                    <FormField label="Base Price (e.g. ₹24,999)" value={p.price} onChange={v => updatePricingPlan(p.id, { price: v })} />
                                  </div>
                                  <FormField label="Tier Description" value={p.description} onChange={v => updatePricingPlan(p.id, { description: v })} />
                                  
                                  <div className="space-y-4">
                                    <div className="flex items-center justify-between px-1">
                                      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Included Benefits</label>
                                      <button onClick={() => addPlanFeature(p.id)} className="text-[9px] font-black text-blue-500 hover:underline flex items-center gap-1 uppercase"><ListPlus size={12}/> Add Point</button>
                                    </div>
                                    <div className="grid gap-3">
                                      {p.features?.map((feat, fi) => (
                                        <div key={fi} className="flex gap-2 group/feat">
                                          <input value={feat} onChange={e => updatePlanFeature(p.id, fi, e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs" />
                                          <button onClick={() => removePlanFeature(p.id, fi)} className="p-2 text-zinc-800 hover:text-red-500 opacity-0 group-hover/feat:opacity-100 transition-all"><X size={14}/></button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-8 pt-4 border-t border-white/5">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                      <input type="checkbox" checked={p.isHighlighted} onChange={e => updatePricingPlan(p.id, { isHighlighted: e.target.checked })} className="w-5 h-5 rounded-lg accent-blue-600" />
                                      <span className="text-[10px] font-black uppercase text-zinc-500">Highlight this Plan</span>
                                    </label>
                                    <FormField label="CTA Label" value={p.ctaText} onChange={v => updatePricingPlan(p.id, { ctaText: v })} />
                                    <button onClick={() => removePricingPlan(p.id)} className="text-red-500/50 hover:text-red-500 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 ml-auto"><Trash2 size={14}/> Delete Tier</button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                     )}
                     
                     {activeTab === 'ugc' && (
                       <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-8">
                          <FormField label="Video Title" value={editBuffer.title} onChange={v => setEditBuffer({...editBuffer, title: v})} />
                          <FormField label="Creator Name" value={editBuffer.creator} onChange={v => setEditBuffer({...editBuffer, creator: v})} />
                          <div className="grid md:grid-cols-2 gap-8">
                            <FormField label="Views Stat" value={editBuffer.metrics.views} onChange={v => setEditBuffer({...editBuffer, metrics: { ...editBuffer.metrics, views: v }})} />
                            <FormField label="ROAS Stat" value={editBuffer.metrics.roas} onChange={v => setEditBuffer({...editBuffer, metrics: { ...editBuffer.metrics, roas: v }})} />
                          </div>
                          <FormField label="Video Link / Source" value={editBuffer.videoUrl} onChange={v => setEditBuffer({...editBuffer, videoUrl: v})} help="Direct MP4 or CDN Link" />
                       </div>
                     )}

                     {activeTab === 'portfolio' && (
                       <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-8">
                          <FormField label="Project Name" value={editBuffer.name} onChange={v => setEditBuffer({...editBuffer, name: v})} />
                          <FormField label="Client" value={editBuffer.client} onChange={v => setEditBuffer({...editBuffer, client: v})} />
                          <FormField label="Performance Stat" value={editBuffer.stat} onChange={v => setEditBuffer({...editBuffer, stat: v})} />
                          <FormField label="Project Description" value={editBuffer.description} onChange={v => setEditBuffer({...editBuffer, description: v})} type="textarea" />
                       </div>
                     )}

                     {activeTab === 'blog' && (
                       <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-8">
                         <FormField label="Article Title" value={editBuffer.title} onChange={v => setEditBuffer({...editBuffer, title: v, slug: generateSlug(v)})} />
                         <FormField label="Excerpt" value={editBuffer.excerpt} onChange={v => setEditBuffer({...editBuffer, excerpt: v})} type="textarea" />
                         <FormField label="Full Content (Markdown)" value={editBuffer.content} onChange={v => setEditBuffer({...editBuffer, content: v})} type="textarea" />
                       </div>
                     )}
                  </div>

                  <div className="space-y-8 sticky top-32 h-fit">
                     <div className="glass-card p-8 rounded-[40px] border-white/5 space-y-6">
                        <h4 className="text-[10px] font-black uppercase text-zinc-600 tracking-widest px-1">Global State</h4>
                        <div className="space-y-2">
                           <label className="text-[9px] font-bold text-zinc-500 uppercase px-1">Visibility Status</label>
                           <select value={editBuffer.visibility} onChange={e => setEditBuffer({...editBuffer, visibility: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white">
                              <option value="show">Public (Active)</option>
                              <option value="hide">Private (Hidden)</option>
                           </select>
                        </div>
                        {activeTab === 'services' && (
                           <div className="space-y-2">
                             <label className="text-[9px] font-bold text-zinc-500 uppercase px-1">Brand Icon</label>
                             <select value={editBuffer.icon} onChange={e => setEditBuffer({...editBuffer, icon: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white">
                                <option value="Layout">Layout (Website)</option>
                                <option value="Video">Video (UGC Ads)</option>
                                <option value="QrCode">QrCode (Smart Screen)</option>
                             </select>
                           </div>
                        )}
                        <div className="pt-4">
                           <label className="text-[9px] font-bold text-zinc-500 uppercase px-1">Main Asset</label>
                           <div className="mt-2 aspect-video bg-black rounded-2xl border border-white/5 overflow-hidden relative group">
                              <img src={editBuffer.image || editBuffer.thumbnail} className="w-full h-full object-cover opacity-30" alt="" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                 <ImageIcon className="text-zinc-600" />
                              </div>
                           </div>
                           <input placeholder="https://..." value={editBuffer.image || editBuffer.thumbnail || ''} onChange={e => setEditBuffer({...editBuffer, [activeTab === 'ugc' ? 'thumbnail' : 'image']: e.target.value})} className="mt-4 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px]" />
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-12">
                <div className="flex items-center justify-between">
                  <div>
                     <h3 className="text-4xl font-black text-white">Resource Registry</h3>
                     <p className="text-zinc-600 font-bold text-sm mt-2">Centralized management for all performance engines and creative assets.</p>
                  </div>
                  <button onClick={() => startAdd(activeTab)} className="px-10 py-5 bg-blue-600 text-white font-black rounded-3xl text-[10px] uppercase tracking-widest hover:bg-blue-700 shadow-3xl shadow-blue-600/20 flex items-center gap-3 transition-all active:scale-95">
                     <Plus size={18} /> Add New Entry
                  </button>
                </div>
                <div className="glass-card rounded-[40px] border-white/5 overflow-hidden">
                   <table className="w-full text-left">
                      <thead>
                         <tr className="border-b border-white/5 text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                            <th className="px-10 py-6">Identity</th>
                            <th className="px-6 py-6">Metrics / Cat</th>
                            <th className="px-6 py-6 text-center">Visibility</th>
                            <th className="px-6 py-6 text-right">Registry Actions</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                         {activeTab === 'services' && [...services].sort((a,b) => a.sortOrder - b.sortOrder).map((item, idx) => (
                            <tr key={item.id} className="group hover:bg-white/[0.01] transition-colors">
                               <td className="px-10 py-6">
                                 <div className="flex items-center gap-3">
                                   <div className="flex flex-col gap-0.5 mr-2">
                                     <button onClick={() => moveService(item.id, 'up')} className="p-0.5 hover:text-white transition-colors"><ChevronUp size={14}/></button>
                                     <button onClick={() => moveService(item.id, 'down')} className="p-0.5 hover:text-white transition-colors"><ChevronDown size={14}/></button>
                                   </div>
                                   <span className="text-white font-bold">{item.name}</span>
                                 </div>
                               </td>
                               <td className="px-6 py-6 text-zinc-500 font-medium">{item.pricingPlans?.length || 0} Pricing Tiers • {item.features?.length || 0} Capability Blocks</td>
                               <td className="px-6 py-6 text-center">
                                  <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg ${item.visibility === 'show' ? 'bg-green-500/10 text-green-500' : 'bg-zinc-800 text-zinc-600'}`}>
                                    {item.visibility === 'show' ? 'Public' : 'Hidden'}
                                  </span>
                               </td>
                               <td className="px-6 py-6 text-right">
                                  <div className="flex justify-end gap-3">
                                    <button onClick={() => startEdit(item)} className="p-2 text-zinc-500 hover:text-white transition-colors"><Edit2 size={16} /></button>
                                    <button onClick={() => deleteItem('services', item.id)} className="p-2 text-zinc-500 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                  </div>
                               </td>
                            </tr>
                         ))}
                         {activeTab === 'ugc' && ugcAds.map(item => (
                            <tr key={item.id} className="group hover:bg-white/[0.01] transition-colors">
                               <td className="px-10 py-6 text-white font-bold">{item.title}</td>
                               <td className="px-6 py-6 text-zinc-500 font-medium">{item.metrics.views} Views • {item.metrics.roas} ROAS</td>
                               <td className="px-6 py-6 text-center">
                                  <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg ${item.status === 'published' ? 'bg-blue-500/10 text-blue-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                    {item.status}
                                  </span>
                               </td>
                               <td className="px-6 py-6 text-right">
                                  <div className="flex justify-end gap-3">
                                    <button onClick={() => startEdit(item)} className="p-2 text-zinc-500 hover:text-white transition-colors"><Edit2 size={16} /></button>
                                    <button onClick={() => deleteItem('ugc', item.id)} className="p-2 text-zinc-500 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                  </div>
                               </td>
                            </tr>
                         ))}
                         {activeTab === 'portfolio' && portfolio.map(item => (
                            <tr key={item.id} className="group hover:bg-white/[0.01] transition-colors">
                               <td className="px-10 py-6 text-white font-bold">{item.name}</td>
                               <td className="px-6 py-6 text-zinc-500 font-medium">{item.stat}</td>
                               <td className="px-6 py-6 text-center text-xs uppercase font-black"><span className={item.visibility === 'show' ? 'text-green-500' : 'text-zinc-600'}>{item.visibility}</span></td>
                               <td className="px-6 py-6 text-right flex justify-end gap-3">
                                  <button onClick={() => startEdit(item)} className="p-2 text-zinc-500 hover:text-white transition-colors"><Edit2 size={16} /></button>
                                  <button onClick={() => deleteItem('portfolio', item.id)} className="p-2 text-zinc-500 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                               </td>
                            </tr>
                         ))}
                         {activeTab === 'blog' && blogs.map(item => (
                            <tr key={item.id} className="group hover:bg-white/[0.01] transition-colors">
                               <td className="px-10 py-6 text-white font-bold">{item.title}</td>
                               <td className="px-6 py-6 text-zinc-500 font-medium">{item.category}</td>
                               <td className="px-6 py-6 text-center text-xs uppercase font-black"><span className={item.status === 'published' ? 'text-blue-500' : 'text-amber-500'}>{item.status}</span></td>
                               <td className="px-6 py-6 text-right flex justify-end gap-3">
                                  <button onClick={() => startEdit(item)} className="p-2 text-zinc-500 hover:text-white transition-colors"><Edit2 size={16} /></button>
                                  <button onClick={() => deleteItem('blog', item.id)} className="p-2 text-zinc-500 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
              </div>
            )
          )}

          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in duration-500">
               {[
                 { label: "Active Engines", value: services.filter(s => s.visibility === 'show').length, icon: <Briefcase className="text-blue-500" /> },
                 { label: "Creative Vault", value: ugcAds.length, icon: <PlayCircle className="text-purple-500" /> },
                 { label: "Insight Articles", value: blogs.length, icon: <BookOpen className="text-pink-500" /> },
                 { label: "Success Proofs", value: portfolio.length, icon: <Layers className="text-cyan-500" /> }
               ].map((stat, i) => (
                  <div key={i} className="glass-card p-10 rounded-[40px] border-white/5">
                     <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 border border-white/5">{stat.icon}</div>
                     <div className="text-4xl font-black text-white">{stat.value}</div>
                     <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mt-2">{stat.label}</div>
                  </div>
               ))}
            </div>
          )}

          {activeTab === 'landing' && (
            <div className="space-y-12 animate-in fade-in duration-500">
               <div>
                  <h3 className="text-4xl font-black text-white">Brand Engine</h3>
                  <p className="text-zinc-600 font-bold mt-2">Modify your core high-level value propositions and main calls to action.</p>
               </div>
               <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-10">
                  <FormField label="Main Hero Headline" value={siteContent.landing.heroHeadline} onChange={v => setSiteContent({...siteContent, landing: {...siteContent.landing, heroHeadline: v}})} type="textarea" help="Supports multiple lines" />
                  <FormField label="Supportive Sub-Headline" value={siteContent.landing.heroSubheadline} onChange={v => setSiteContent({...siteContent, landing: {...siteContent.landing, heroSubheadline: v}})} type="textarea" />
                  <div className="grid grid-cols-2 gap-8">
                     <FormField label="Primary CTA Label" value={siteContent.landing.heroCtaPrimary} onChange={v => setSiteContent({...siteContent, landing: {...siteContent.landing, heroCtaPrimary: v}})} />
                     <FormField label="Secondary CTA Label" value={siteContent.landing.heroCtaSecondary} onChange={v => setSiteContent({...siteContent, landing: {...siteContent.landing, heroCtaSecondary: v}})} />
                  </div>
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
