
import React, { useState } from 'react';
import { 
  LayoutDashboard, LogOut, Plus, Monitor, Film, QrCode, Trash2, Edit2, 
  Save, Check, ArrowLeft, Briefcase, BookOpen, Layers, Inbox, PlayCircle,
  Settings, Image as ImageIcon, Sparkles, X, ChevronUp, ChevronDown, ListPlus, Globe
} from 'lucide-react';
import { Service, BlogPost, Project, UgcAd, SiteContent, PricingPlan, ServiceFeature, TeamMember, Testimonial } from '../types';
import { SectionHeader } from '../App';

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
      services: { name: '', slug: '', shortDescription: '', fullDescription: '', icon: 'Layout', features: [], process: [], faqs: [], pricingPlans: [], image: 'https://picsum.photos/800/600', visibility: 'show', sortOrder: services.length + 1 },
      ugc: { title: '', creator: '', description: '', platform: 'TikTok', thumbnail: 'https://picsum.photos/400/700', videoUrl: '', status: 'draft', metrics: { views: '0', roas: '0' }, visibility: 'show', isFeatured: false }
    };
    setEditBuffer(defaults[type] || {});
  };

  const saveEdit = (type: AdminTab) => {
    const handlers: any = { services: setServices, ugc: setUgcAds, blog: setBlogs, portfolio: setPortfolio };
    if (handlers[type]) {
      handlers[type]((prev: any[]) => prev.map(i => i.id === editingId ? editBuffer : i));
      showNotify('Changes saved.');
      resetState();
    }
  };

  const handleCreate = (type: AdminTab) => {
    const handlers: any = { services: setServices, ugc: setUgcAds };
    if (handlers[type]) {
      const newItem = { ...editBuffer, id: Date.now().toString() };
      handlers[type]((prev: any[]) => [...prev, newItem]);
      showNotify('New entry created.');
      resetState();
    }
  };

  const deleteItem = (type: AdminTab, id: string) => {
    if (!confirm('Are you sure?')) return;
    const handlers: any = { services: setServices, ugc: setUgcAds };
    if (handlers[type]) {
      handlers[type]((prev: any[]) => prev.filter(i => i.id !== id));
      showNotify('Item deleted.');
    }
  };

  const FormField = ({ label, value, onChange, type = "text" }: { label: string, value: any, onChange: (val: string) => void, type?: string }) => (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{label}</label>
      {type === 'textarea' ? (
        <textarea rows={5} value={value} onChange={e => onChange(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 transition-colors" />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 transition-colors" />
      )}
    </div>
  );

  const SidebarItem = ({ id, label, icon }: { id: AdminTab, label: string, icon: React.ReactNode }) => (
    <button onClick={() => { setActiveTab(id); resetState(); }} className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all ${activeTab === id ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-600/10' : 'text-zinc-500 hover:text-white'}`}>
      {icon} <span className="text-sm">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#050505] flex text-zinc-300 font-sans selection:bg-blue-500">
      {notification && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-2xl bg-white text-black font-black flex items-center gap-3 animate-in slide-in-from-top-4 shadow-2xl">
          <Check size={18} /> {notification}
        </div>
      )}

      <aside className="w-72 border-r border-white/5 bg-black/50 backdrop-blur-3xl flex flex-col p-8 fixed h-full z-20">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center font-black text-white">W</div>
          <span className="font-black text-xl text-white tracking-tighter uppercase">Command</span>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          <SidebarItem id="overview" label="Overview" icon={<LayoutDashboard size={18} />} />
          <div className="h-px bg-white/5 my-6 mx-4" />
          <SidebarItem id="landing" label="Landing Page" icon={<Monitor size={18} />} />
          <SidebarItem id="about" label="About Page" icon={<Sparkles size={18} />} />
          <SidebarItem id="services" label="Services" icon={<Briefcase size={18} />} />
          <SidebarItem id="ugc" label="UGC Vault" icon={<PlayCircle size={18} />} />
          <SidebarItem id="blog" label="Insights" icon={<BookOpen size={18} />} />
          <SidebarItem id="leads" label="Leads" icon={<Inbox size={18} />} />
        </nav>
        <button onClick={onLogout} className="mt-8 pt-8 border-t border-white/5 flex items-center gap-4 text-zinc-600 hover:text-red-400 font-bold transition-colors"><LogOut size={18} /> Exit Console</button>
      </aside>

      <main className="flex-1 ml-72">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-12 sticky top-0 bg-[#050505]/80 backdrop-blur-xl z-10">
          <h2 className="text-xl font-black text-white capitalize">{activeTab} Interface</h2>
          <div className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">Web Prime AI Engine</div>
        </header>

        <div className="p-12 max-w-6xl mx-auto">
          {activeTab === 'landing' && (
            <div className="space-y-12 animate-in fade-in duration-500">
               <SectionHeader title="Landing Page Core" subtitle="Manage high-level brand messaging and testimonials." />
               <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-10">
                  <FormField label="Hero Headline" value={siteContent.landing.heroHeadline} onChange={v => setSiteContent({...siteContent, landing: {...siteContent.landing, heroHeadline: v}})} type="textarea" />
                  <FormField label="Hero Subheadline" value={siteContent.landing.heroSubheadline} onChange={v => setSiteContent({...siteContent, landing: {...siteContent.landing, heroSubheadline: v}})} type="textarea" />
                  <div className="grid grid-cols-2 gap-8">
                     <FormField label="CTA Primary" value={siteContent.landing.heroCtaPrimary} onChange={v => setSiteContent({...siteContent, landing: {...siteContent.landing, heroCtaPrimary: v}})} />
                     <FormField label="CTA Secondary" value={siteContent.landing.heroCtaSecondary} onChange={v => setSiteContent({...siteContent, landing: {...siteContent.landing, heroCtaSecondary: v}})} />
                  </div>
                  <button onClick={() => showNotify('Landing content updated.')} className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all">Publish Core Updates</button>
               </div>
            </div>
          )}

          {activeTab === 'ugc' && (
            (editingId || isAddingNew) ? (
              <div className="animate-in slide-in-from-bottom-4 duration-500">
                <button onClick={resetState} className="flex items-center gap-2 text-zinc-500 hover:text-white font-bold mb-8"><ArrowLeft size={16} /> Back to Vault</button>
                <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-8">
                  <FormField label="Video Title" value={editBuffer.title} onChange={v => setEditBuffer({...editBuffer, title: v})} />
                  <FormField label="Creator Name" value={editBuffer.creator} onChange={v => setEditBuffer({...editBuffer, creator: v})} />
                  <div className="grid grid-cols-2 gap-8">
                     <FormField label="Platform" value={editBuffer.platform} onChange={v => setEditBuffer({...editBuffer, platform: v})} />
                     <FormField label="Thumbnail URL" value={editBuffer.thumbnail} onChange={v => setEditBuffer({...editBuffer, thumbnail: v})} />
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                     <FormField label="Views Stat" value={editBuffer.metrics.views} onChange={v => setEditBuffer({...editBuffer, metrics: {...editBuffer.metrics, views: v}})} />
                     <FormField label="ROAS Stat" value={editBuffer.metrics.roas} onChange={v => setEditBuffer({...editBuffer, metrics: {...editBuffer.metrics, roas: v}})} />
                  </div>
                  <div className="flex items-center gap-4">
                     <button onClick={() => isAddingNew ? handleCreate('ugc') : saveEdit('ugc')} className="px-10 py-4 bg-white text-black font-black rounded-2xl flex items-center gap-2"><Save size={18} /> Commit Asset</button>
                     <button onClick={resetState} className="px-10 py-4 bg-white/5 text-zinc-500 font-black rounded-2xl">Abort</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl font-black">Creator Asset Vault</h3>
                  <button onClick={() => startAdd('ugc')} className="px-8 py-4 bg-blue-600 text-white font-black rounded-2xl flex items-center gap-2 shadow-xl shadow-blue-600/20"><Plus size={18} /> Add UGC Video</button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {ugcAds.map(item => (
                    <div key={item.id} className="glass-card p-8 rounded-[40px] border-white/5 group relative overflow-hidden">
                       <img src={item.thumbnail} className="absolute inset-0 w-full h-full object-cover opacity-20 -z-10 group-hover:scale-110 transition-transform duration-700" />
                       <div className="flex justify-between items-start mb-12">
                          <div className="px-3 py-1 bg-blue-600/20 text-blue-500 rounded-lg text-[10px] font-black uppercase tracking-widest">{item.platform}</div>
                          <div className="flex gap-2">
                            <button onClick={() => startEdit(item)} className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all"><Edit2 size={14} /></button>
                            <button onClick={() => deleteItem('ugc', item.id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-all"><Trash2 size={14} /></button>
                          </div>
                       </div>
                       <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                       <p className="text-zinc-500 text-sm mb-8">By {item.creator}</p>
                       <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                          <div className="text-center">
                             <div className="text-[10px] text-zinc-600 uppercase font-black">Views</div>
                             <div className="font-bold text-white">{item.metrics.views}</div>
                          </div>
                          <div className="text-center">
                             <div className="text-[10px] text-zinc-600 uppercase font-black">ROAS</div>
                             <div className="font-bold text-green-500">{item.metrics.roas}</div>
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}

          {activeTab === 'services' && (
             (editingId || isAddingNew) ? (
              <div className="animate-in slide-in-from-bottom-4 duration-500 pb-32">
                <button onClick={resetState} className="flex items-center gap-2 text-zinc-500 hover:text-white font-bold mb-8"><ArrowLeft size={16} /> Back to Services</button>
                <div className="space-y-8">
                  <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-8">
                    <h4 className="text-xl font-black text-white">Service Parameters</h4>
                    <FormField label="Service Name" value={editBuffer.name} onChange={v => setEditBuffer({...editBuffer, name: v})} />
                    <FormField label="Short Card Description" value={editBuffer.shortDescription} onChange={v => setEditBuffer({...editBuffer, shortDescription: v})} type="textarea" />
                    <FormField label="Full Landing Copy" value={editBuffer.fullDescription} onChange={v => setEditBuffer({...editBuffer, fullDescription: v})} type="textarea" />
                  </div>

                  <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-8">
                    <h4 className="text-xl font-black text-white">Pricing Architecture</h4>
                    <div className="space-y-6">
                      {editBuffer.pricingPlans?.map((p: any, pi: number) => (
                        <div key={p.id} className="p-8 bg-white/5 rounded-3xl space-y-6 border border-white/5">
                          <div className="grid grid-cols-2 gap-6">
                             <FormField label="Plan Name" value={p.name} onChange={v => {
                               const updated = [...editBuffer.pricingPlans];
                               updated[pi] = {...updated[pi], name: v};
                               setEditBuffer({...editBuffer, pricingPlans: updated});
                             }} />
                             <FormField label="Price" value={p.price} onChange={v => {
                               const updated = [...editBuffer.pricingPlans];
                               updated[pi] = {...updated[pi], price: v};
                               setEditBuffer({...editBuffer, pricingPlans: updated});
                             }} />
                          </div>
                          <div className="flex items-center gap-4">
                             <button onClick={() => {
                               const updated = [...editBuffer.pricingPlans];
                               updated[pi] = {...updated[pi], isHighlighted: !updated[pi].isHighlighted};
                               setEditBuffer({...editBuffer, pricingPlans: updated});
                             }} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${p.isHighlighted ? 'bg-blue-600 text-white' : 'bg-white/5 text-zinc-500'}`}>
                               Featured Plan
                             </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                     <button onClick={() => isAddingNew ? handleCreate('services') : saveEdit('services')} className="px-10 py-4 bg-white text-black font-black rounded-2xl flex items-center gap-2"><Save size={18} /> Update Service Engine</button>
                     <button onClick={resetState} className="px-10 py-4 bg-white/5 text-zinc-500 font-black rounded-2xl">Discard</button>
                  </div>
                </div>
              </div>
             ) : (
              <div className="space-y-8">
                 <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-black">Service Registry</h3>
                    <button onClick={() => startAdd('services')} className="px-8 py-4 bg-blue-600 text-white font-black rounded-2xl flex items-center gap-2"><Plus size={18} /> New Engine</button>
                 </div>
                 <div className="glass-card rounded-[40px] border-white/5 overflow-hidden">
                    <table className="w-full text-left">
                       <thead>
                          <tr className="border-b border-white/5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                             <th className="px-10 py-6">Service Engine</th>
                             <th className="px-6 py-6">Identity</th>
                             <th className="px-6 py-6">Status</th>
                             <th className="px-6 py-6 text-right">Actions</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-white/5">
                          {services.map(item => (
                             <tr key={item.id} className="group hover:bg-white/[0.01] transition-colors">
                                <td className="px-10 py-6 text-white font-bold">{item.name}</td>
                                <td className="px-6 py-6 text-zinc-500 text-sm">/{item.slug}</td>
                                <td className="px-6 py-6"><span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${item.visibility === 'show' ? 'bg-green-500/10 text-green-500' : 'bg-zinc-800 text-zinc-600'}`}>{item.visibility}</span></td>
                                <td className="px-6 py-6 text-right space-x-2">
                                   <button onClick={() => startEdit(item)} className="p-2 text-zinc-500 hover:text-white"><Edit2 size={16} /></button>
                                   <button onClick={() => deleteItem('services', item.id)} className="p-2 text-zinc-500 hover:text-red-500"><Trash2 size={16} /></button>
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
            <div className="grid md:grid-cols-4 gap-8 animate-in fade-in duration-500">
               {[
                 { label: "Active Engines", value: services.length, icon: <Briefcase className="text-blue-500" /> },
                 { label: "UGC Assets", value: ugcAds.length, icon: <PlayCircle className="text-purple-500" /> },
                 { label: "Articles", value: blogs.length, icon: <BookOpen className="text-pink-500" /> },
                 { label: "Proofs", value: portfolio.length, icon: <Layers className="text-cyan-500" /> }
               ].map((stat, i) => (
                  <div key={i} className="glass-card p-10 rounded-[40px] border-white/5">
                     <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 border border-white/5">{stat.icon}</div>
                     <div className="text-4xl font-black text-white">{stat.value}</div>
                     <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mt-2">{stat.label}</div>
                  </div>
               ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
