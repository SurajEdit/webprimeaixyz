
import React, { useState } from 'react';
import { 
  LayoutDashboard, LogOut, Plus, Trash2, Edit2, 
  Save, Check, ArrowLeft, Briefcase, BookOpen, Layers, Inbox, PlayCircle,
  Sparkles, Globe, Monitor
} from 'lucide-react';
import { Service, BlogPost, Project, UgcAd, SiteContent } from '../types';
import { SectionHeader } from '../components/Shared';
import { 
  ServiceParametersForm, 
  ServiceFeaturesForm, 
  PricingPlansForm, 
  UgcVideoForm, 
  PortfolioManagerForm,
  EngineConfigSidebar,
  FormField
} from '../components/AdminForms';

const LOGO_URL = "https://lh3.googleusercontent.com/a/ACg8ocJoqFrWgOQ0WElWvr4IsZUCF6IUmNAxphg9XsImWylZijxOgg8=s400-c";

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
      services: { name: '', slug: '', shortDescription: '', fullDescription: '', icon: 'Layout', features: [], process: [], faqs: [], pricingPlans: [], image: 'https://picsum.photos/800/600', visibility: 'show', sortOrder: services.length + 1, status: 'active', isFeatured: false },
      ugc: { title: '', creator: '', description: '', category: 'GENERAL', platform: 'Meta', thumbnail: 'https://picsum.photos/400/700', videoUrl: '', status: 'draft', metrics: { views: '0', roas: '0' }, visibility: 'show', isFeatured: false },
      portfolio: { name: '', client: '', category: 'WEB DESIGN', stat: '', description: '', image: 'https://picsum.photos/800/600', mediaType: 'image', videoUrl: '', externalLink: '', visibility: 'show', tags: [] },
      blog: { title: '', slug: '', excerpt: '', content: '', date: new Date().toLocaleDateString(), category: 'STRATEGY', image: 'https://picsum.photos/800/400', status: 'draft', visibility: 'show' }
    };
    setEditBuffer(defaults[type] || {});
  };

  const saveEdit = (type: AdminTab) => {
    const handlers: any = { services: setServices, ugc: setUgcAds, blog: setBlogs, portfolio: setPortfolio };
    if (handlers[type]) {
      handlers[type]((prev: any[]) => prev.map(i => i.id === editingId ? editBuffer : i));
      showNotify('Changes committed successfully.');
      resetState();
    }
  };

  const handleCreate = (type: AdminTab) => {
    const handlers: any = { services: setServices, ugc: setUgcAds, blog: setBlogs, portfolio: setPortfolio };
    if (handlers[type]) {
      const newItem = { ...editBuffer, id: Date.now().toString() };
      handlers[type]((prev: any[]) => [...prev, newItem]);
      showNotify('New resource registered.');
      resetState();
    }
  };

  const deleteItem = (type: AdminTab, id: string) => {
    if (!confirm('Confirm deletion of this resource?')) return;
    const handlers: any = { services: setServices, ugc: setUgcAds, blog: setBlogs, portfolio: setPortfolio };
    if (handlers[type]) {
      handlers[type]((prev: any[]) => prev.filter(i => i.id !== id));
      showNotify('Resource purged.');
    }
  };

  const SidebarItem = ({ id, label, icon }: { id: AdminTab, label: string, icon: React.ReactNode }) => (
    <button onClick={() => { setActiveTab(id); resetState(); }} className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all ${activeTab === id ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-600/10' : 'text-zinc-500 hover:text-white'}`}>
      {icon} <span className="text-sm">{label.toUpperCase()}</span>
    </button>
  );

  const renderEditor = () => {
    if (activeTab === 'services') {
      return (
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10 pb-32">
            <ServiceParametersForm data={editBuffer} onChange={updates => setEditBuffer({ ...editBuffer, ...updates })} />
            <ServiceFeaturesForm features={editBuffer.features} onChange={features => setEditBuffer({ ...editBuffer, features })} />
            <PricingPlansForm plans={editBuffer.pricingPlans} onChange={pricingPlans => setEditBuffer({ ...editBuffer, pricingPlans })} />
          </div>
          <div className="space-y-8 sticky top-32 h-fit">
            <EngineConfigSidebar visibility={editBuffer.visibility} onVisibilityChange={v => setEditBuffer({ ...editBuffer, visibility: v })} icon={editBuffer.icon} onIconChange={v => setEditBuffer({ ...editBuffer, icon: v })} image={editBuffer.image} onImageChange={v => setEditBuffer({ ...editBuffer, image: v })} isFeatured={editBuffer.isFeatured} onFeaturedChange={v => setEditBuffer({ ...editBuffer, isFeatured: v })} />
          </div>
        </div>
      );
    }

    if (activeTab === 'ugc') {
      return (
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10 pb-32">
            <UgcVideoForm data={editBuffer} onChange={updates => setEditBuffer({ ...editBuffer, ...updates })} />
          </div>
          <div className="space-y-8 sticky top-32 h-fit">
            <EngineConfigSidebar visibility={editBuffer.visibility} onVisibilityChange={v => setEditBuffer({ ...editBuffer, visibility: v })} image={editBuffer.thumbnail} onImageChange={v => setEditBuffer({ ...editBuffer, thumbnail: v })} isFeatured={editBuffer.isFeatured} onFeaturedChange={v => setEditBuffer({ ...editBuffer, isFeatured: v })} />
          </div>
        </div>
      );
    }

    if (activeTab === 'portfolio') {
      return (
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10 pb-32">
            <PortfolioManagerForm data={editBuffer} onChange={updates => setEditBuffer({ ...editBuffer, ...updates })} />
          </div>
          <div className="space-y-8 sticky top-32 h-fit">
            <EngineConfigSidebar visibility={editBuffer.visibility} onVisibilityChange={v => setEditBuffer({ ...editBuffer, visibility: v })} image={editBuffer.image} onImageChange={v => setEditBuffer({ ...editBuffer, image: v })} />
          </div>
        </div>
      );
    }

    return (
      <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-8">
        <h4 className="text-xl font-black text-white uppercase">{activeTab} Details</h4>
        <FormField label="Title / Name" value={editBuffer.title || editBuffer.name || ''} onChange={v => setEditBuffer({ ...editBuffer, [activeTab === 'blog' ? 'title' : 'name']: v.toUpperCase() })} />
        <FormField label="Description / Excerpt" value={editBuffer.excerpt || editBuffer.description || ''} onChange={v => setEditBuffer({ ...editBuffer, [activeTab === 'blog' ? 'excerpt' : 'description']: v })} type="textarea" />
        <FormField label="Main Image URL" value={editBuffer.image || ''} onChange={v => setEditBuffer({ ...editBuffer, image: v })} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] flex text-zinc-300 font-sans selection:bg-blue-500">
      {notification && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-2xl bg-white text-black font-black flex items-center gap-3 animate-in slide-in-from-top-4 shadow-2xl">
          <Check size={18} /> {notification}
        </div>
      )}

      <aside className="w-72 border-r border-white/5 bg-black/50 backdrop-blur-3xl flex flex-col p-8 fixed h-full z-20">
        <div className="flex items-center gap-3 mb-12 px-2">
          <img 
            src={LOGO_URL} 
            alt="Web Prime AI" 
            className="w-10 h-10 rounded-xl object-cover border border-white/5" 
          />
          <span className="font-black text-xl text-white tracking-tighter uppercase">Command</span>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          <SidebarItem id="overview" label="Overview" icon={<LayoutDashboard size={18} />} />
          <div className="h-px bg-white/5 my-6 mx-4" />
          <SidebarItem id="landing" label="Landing Page" icon={<Monitor size={18} />} />
          <SidebarItem id="about" label="About Page" icon={<Sparkles size={18} />} />
          <SidebarItem id="services" label="Services" icon={<Briefcase size={18} />} />
          <SidebarItem id="portfolio" label="Portfolio Mgr" icon={<Layers size={18} />} />
          <SidebarItem id="ugc" label="UGC Vault" icon={<PlayCircle size={18} />} />
          <SidebarItem id="blog" label="Insights" icon={<BookOpen size={18} />} />
          <SidebarItem id="leads" label="Leads" icon={<Inbox size={18} />} />
        </nav>
        <button onClick={onLogout} className="mt-8 pt-8 border-t border-white/5 flex items-center gap-4 text-zinc-600 hover:text-red-400 font-bold transition-colors uppercase"><LogOut size={18} /> Exit Console</button>
      </aside>

      <main className="flex-1 ml-72">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-12 sticky top-0 bg-[#050505]/80 backdrop-blur-xl z-10">
          <h2 className="text-xl font-black text-white uppercase">{activeTab} Interface</h2>
          <div className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">Web Prime AI Engine</div>
        </header>

        <div className="p-12 max-w-6xl mx-auto">
          {['services', 'portfolio', 'blog', 'ugc'].includes(activeTab) && (
            (editingId || isAddingNew) ? (
              <div className="animate-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-8">
                  <button onClick={resetState} className="flex items-center gap-2 text-zinc-500 hover:text-white font-bold transition-colors uppercase"><ArrowLeft size={16} /> Return to Registry</button>
                  <div className="flex items-center gap-4">
                     <button onClick={() => isAddingNew ? handleCreate(activeTab) : saveEdit(activeTab)} className="px-10 py-4 bg-white text-black font-black rounded-2xl flex items-center gap-2 shadow-xl shadow-white/10 hover:bg-zinc-200 transition-all uppercase"><Save size={18} /> Commit Changes</button>
                     <button onClick={resetState} className="px-10 py-4 bg-white/5 text-zinc-500 font-black rounded-2xl hover:text-white transition-all uppercase">Discard</button>
                  </div>
                </div>
                {renderEditor()}
              </div>
            ) : (
              <div className="space-y-8">
                 <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-black text-white uppercase">Registry Hub</h3>
                    <button onClick={() => startAdd(activeTab)} className="px-8 py-4 bg-blue-600 text-white font-black rounded-2xl flex items-center gap-2 shadow-xl shadow-blue-600/20 active:scale-95 transition-all uppercase"><Plus size={18} /> New {activeTab === 'ugc' ? 'Video' : 'Asset'}</button>
                 </div>
                 <div className="glass-card rounded-[40px] border-white/5 overflow-hidden">
                    <table className="w-full text-left">
                       <thead>
                          <tr className="border-b border-white/5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                             <th className="px-10 py-6">Resource Name</th>
                             <th className="px-6 py-6">Category / Info</th>
                             <th className="px-6 py-6">Status</th>
                             <th className="px-6 py-6 text-right">Actions</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-white/5">
                          {(activeTab === 'services' ? services : 
                            activeTab === 'ugc' ? ugcAds : 
                            activeTab === 'blog' ? blogs : 
                            portfolio).map((item: any) => (
                             <tr key={item.id} className="group hover:bg-white/[0.01] transition-colors">
                                <td className="px-10 py-6 text-white font-bold uppercase">{item.name || item.title}</td>
                                <td className="px-6 py-6 text-zinc-500 text-sm">{item.category || item.platform || 'N/A'}</td>
                                <td className="px-6 py-6">
                                  <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg ${item.visibility === 'show' || item.status === 'published' || item.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-zinc-800 text-zinc-600'}`}>
                                    {item.visibility || item.status || 'show'}
                                  </span>
                                </td>
                                <td className="px-6 py-6 text-right space-x-2">
                                   <button onClick={() => startEdit(item)} className="p-2 text-zinc-500 hover:text-white transition-colors"><Edit2 size={16} /></button>
                                   <button onClick={() => deleteItem(activeTab, item.id)} className="p-2 text-zinc-500 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
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
            <div className="animate-in fade-in duration-500 space-y-12">
              <div className="grid md:grid-cols-4 gap-8">
                 {[
                   { label: "Active Engines", value: services.length, icon: <Briefcase className="text-blue-500" /> },
                   { label: "UGC Assets", value: ugcAds.length, icon: <PlayCircle className="text-purple-500" /> },
                   { label: "Insights", value: blogs.length, icon: <BookOpen className="text-pink-500" /> },
                   { label: "Proofs", value: portfolio.length, icon: <Layers className="text-cyan-500" /> }
                 ].map((stat, i) => (
                    <div key={i} className="glass-card p-10 rounded-[40px] border-white/5">
                       <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 border border-white/5">{stat.icon}</div>
                       <div className="text-4xl font-black text-white">{stat.value}</div>
                       <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mt-2">{stat.label}</div>
                    </div>
                 ))}
              </div>
              <div className="glass-card p-12 rounded-[50px] border-white/5 text-center py-20">
                <Globe className="mx-auto text-zinc-800 mb-8 w-16 h-16" />
                <h3 className="text-2xl font-black text-white mb-4 uppercase">Market Presence</h3>
                <p className="text-zinc-500 max-w-lg mx-auto leading-relaxed">System syncing with pan-Indian marketing buffers. All currency models are localized to INR as primary denomination.</p>
              </div>
            </div>
          )}

          {activeTab === 'landing' && (
            <div className="space-y-12 animate-in fade-in duration-500">
               <SectionHeader title="Landing Page Core" subtitle="Manage high-level brand messaging and testimonials." highlight="BRAND STRATEGY" />
               <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-10">
                  <FormField label="Hero Headline" value={siteContent.landing.heroHeadline} onChange={v => setSiteContent({...siteContent, landing: {...siteContent.landing, heroHeadline: v}})} type="textarea" />
                  <FormField label="Hero Subheadline" value={siteContent.landing.heroSubheadline} onChange={v => setSiteContent({...siteContent, landing: {...siteContent.landing, heroSubheadline: v}})} type="textarea" />
                  <div className="grid grid-cols-2 gap-8">
                     <FormField label="CTA Primary" value={siteContent.landing.heroCtaPrimary} onChange={v => setSiteContent({...siteContent, landing: {...siteContent.landing, heroCtaPrimary: v.toUpperCase()}})} />
                     <FormField label="CTA Secondary" value={siteContent.landing.heroCtaSecondary} onChange={v => setSiteContent({...siteContent, landing: {...siteContent.landing, heroCtaSecondary: v.toUpperCase()}})} />
                  </div>
                  <button onClick={() => showNotify('Landing content updated.')} className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-600/20 active:scale-95 transition-all uppercase">Publish Core Updates</button>
               </div>
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="animate-in fade-in duration-500 space-y-8">
               <SectionHeader title="Lead Pipeline" subtitle="Inquiries received from the public terminal." highlight="COMMUNICATION HUB" />
               <div className="glass-card p-32 rounded-[60px] border border-dashed border-white/10 text-center">
                  <Inbox size={60} className="mx-auto text-zinc-800 mb-8" />
                  <h4 className="text-2xl font-black text-white mb-4 uppercase">Buffer Clear</h4>
                  <p className="text-zinc-500 max-w-sm mx-auto">No incoming inquiries detected in the current session. Leads from the contact form will propagate here automatically.</p>
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
