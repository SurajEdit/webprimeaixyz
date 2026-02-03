
import React, { useState } from 'react';
import { 
  LayoutDashboard, LogOut, Plus, Monitor, Film, QrCode, Trash2, Edit2, 
  Save, Check, ArrowLeft, Briefcase, Eye, EyeOff, BookOpen, Layers, Inbox, PlayCircle, Globe, Search,
  Settings, UserPlus, Image as ImageIcon, Sparkles
} from 'lucide-react';
import { Service, BlogPost, Project, UgcAd, SiteContent, TeamMember } from '../types';

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

  // --- Utility ---
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

  // --- Static Site Content Update Handlers ---
  const handleSiteContentChange = (section: keyof SiteContent, field: string, value: any) => {
    setSiteContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    showNotify(`${section} updated`);
  };

  const handleSocialChange = (field: string, value: string) => {
    setSiteContent(prev => ({
      ...prev,
      footer: {
        ...prev.footer,
        socials: {
          ...prev.footer.socials,
          [field]: value
        }
      }
    }));
  };

  // --- Team Member CRUD ---
  const handleAddTeamMember = () => {
    const newMember: TeamMember = { id: Date.now().toString(), name: "New Member", role: "Specialist", image: "https://picsum.photos/400/400" };
    setSiteContent(prev => ({
      ...prev,
      about: { ...prev.about, team: [...prev.about.team, newMember] }
    }));
    showNotify("Team member added");
  };

  const handleUpdateTeamMember = (id: string, updates: Partial<TeamMember>) => {
    setSiteContent(prev => ({
      ...prev,
      about: {
        ...prev.about,
        team: prev.about.team.map(m => m.id === id ? { ...m, ...updates } : m)
      }
    }));
  };

  const handleDeleteTeamMember = (id: string) => {
    if (!confirm("Delete team member?")) return;
    setSiteContent(prev => ({
      ...prev,
      about: {
        ...prev.about,
        team: prev.about.team.filter(m => m.id !== id)
      }
    }));
    showNotify("Member removed");
  };

  // --- CRUD Handlers (Registries) ---
  const startEdit = (item: any) => {
    setEditingId(item.id);
    setEditBuffer(JSON.parse(JSON.stringify(item)));
  };

  const startAdd = (type: AdminTab) => {
    setIsAddingNew(true);
    const defaults: any = {
      services: { name: '', slug: '', shortDescription: '', fullDescription: '', icon: 'Layout', features: [], process: [], faqs: [], image: 'https://picsum.photos/800/600', status: 'active', visibility: 'show', isFeatured: false, sortOrder: services.length + 1 },
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

  // --- Sub-Components ---
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

      {/* Sidebar */}
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
          {/* Fixed: Sparkles icon is now imported correctly */}
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

      {/* Main Area */}
      <main className="flex-1 ml-72">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-12 sticky top-0 bg-[#050505]/80 backdrop-blur-xl z-10">
          <h2 className="text-xl font-black text-white capitalize">{activeTab} Interface</h2>
          <div className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">Web Prime AI v1.2</div>
        </header>

        <div className="p-12 max-w-6xl mx-auto">
          {/* Static Page Editors */}
          {activeTab === 'landing' && (
            <div className="space-y-12 animate-in fade-in duration-500">
               <div>
                  <h3 className="text-4xl font-black text-white">Landing Page Engine</h3>
                  <p className="text-zinc-600 font-bold mt-2">Modify core brand messaging and CTAs.</p>
               </div>
               <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-10">
                  <FormField label="Hero Headline" value={siteContent.landing.heroHeadline} onChange={v => handleSiteContentChange('landing', 'heroHeadline', v)} type="textarea" help="Supports line breaks" />
                  <FormField label="Hero Sub-Headline" value={siteContent.landing.heroSubheadline} onChange={v => handleSiteContentChange('landing', 'heroSubheadline', v)} type="textarea" />
                  <div className="grid grid-cols-2 gap-8">
                     <FormField label="Primary CTA Label" value={siteContent.landing.heroCtaPrimary} onChange={v => handleSiteContentChange('landing', 'heroCtaPrimary', v)} />
                     <FormField label="Secondary CTA Label" value={siteContent.landing.heroCtaSecondary} onChange={v => handleSiteContentChange('landing', 'heroCtaSecondary', v)} />
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-12 animate-in fade-in duration-500">
               <div>
                  <h3 className="text-4xl font-black text-white">About Page Engine</h3>
                  <p className="text-zinc-600 font-bold mt-2">Manage mission, history, and the team.</p>
               </div>
               <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-10">
                  <FormField label="Mission Headline" value={siteContent.about.missionHeadline} onChange={v => handleSiteContentChange('about', 'missionHeadline', v)} />
                  <FormField label="Mission Brief" value={siteContent.about.missionBody} onChange={v => handleSiteContentChange('about', 'missionBody', v)} type="textarea" />
                  <FormField label="Our Story Narrative" value={siteContent.about.storyBody} onChange={v => handleSiteContentChange('about', 'storyBody', v)} type="textarea" />
               </div>
               
               <div className="space-y-8">
                  <div className="flex items-center justify-between">
                     <h4 className="text-2xl font-black text-white">Team Registry</h4>
                     <button onClick={handleAddTeamMember} className="px-6 py-3 bg-blue-600 text-white font-black rounded-xl text-[10px] uppercase tracking-widest flex items-center gap-2">
                        <UserPlus size={14} /> Add Member
                     </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                     {siteContent.about.team.map(member => (
                        <div key={member.id} className="glass-card p-8 rounded-3xl border-white/5 flex gap-6">
                           <div className="w-24 h-24 rounded-2xl overflow-hidden border border-white/10 shrink-0">
                              <img src={member.image} className="w-full h-full object-cover" alt="" />
                           </div>
                           <div className="flex-1 space-y-4">
                              <input value={member.name} onChange={e => handleUpdateTeamMember(member.id, { name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm font-bold" />
                              <input value={member.role} onChange={e => handleUpdateTeamMember(member.id, { role: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-zinc-500" />
                              <button onClick={() => handleDeleteTeamMember(member.id)} className="text-red-500/50 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'footer' && (
            <div className="space-y-12 animate-in fade-in duration-500">
               <div>
                  <h3 className="text-4xl font-black text-white">Global Footer Config</h3>
                  <p className="text-zinc-600 font-bold mt-2">Update contact details and social connections.</p>
               </div>
               <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-10">
                  <FormField label="Footer Tagline" value={siteContent.footer.tagline} onChange={v => handleSiteContentChange('footer', 'tagline', v)} type="textarea" />
                  <div className="grid grid-cols-2 gap-8">
                     <FormField label="Support Email" value={siteContent.footer.email} onChange={v => handleSiteContentChange('footer', 'email', v)} />
                     <FormField label="HQ Location" value={siteContent.footer.location} onChange={v => handleSiteContentChange('footer', 'location', v)} />
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                     <FormField label="LinkedIn URL" value={siteContent.footer.socials.linkedin} onChange={v => handleSocialChange('linkedin', v)} />
                     <FormField label="Twitter URL" value={siteContent.footer.socials.twitter} onChange={v => handleSocialChange('twitter', v)} />
                     <FormField label="Instagram URL" value={siteContent.footer.socials.instagram} onChange={v => handleSocialChange('instagram', v)} />
                     <FormField label="YouTube URL" value={siteContent.footer.socials.youtube} onChange={v => handleSocialChange('youtube', v)} />
                  </div>
               </div>
            </div>
          )}

          {/* Registries CRUD */}
          {['services', 'portfolio', 'blog', 'ugc'].includes(activeTab) && (
            (isAddingNew || editingId) ? (
              <div className="animate-in slide-in-from-bottom-4 duration-500">
                <button onClick={resetState} className="flex items-center gap-2 text-zinc-500 hover:text-white font-bold mb-8 transition-colors"><ArrowLeft size={16} /> Return to Registry</button>
                <div className="flex items-center justify-between mb-12">
                  <h3 className="text-4xl font-black text-white">{isAddingNew ? `New ${activeTab}` : `Update ${activeTab}`}</h3>
                  <div className="flex items-center gap-3">
                     <button onClick={() => isAddingNew ? handleCreate(activeTab) : saveEdit(activeTab)} className="px-10 py-4 bg-white text-black font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center gap-2"><Save size={16} /> Commit Changes</button>
                     <button onClick={resetState} className="px-10 py-4 bg-white/5 border border-white/10 text-zinc-500 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:text-white transition-all">Abort</button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                  <div className="md:col-span-2 space-y-10">
                     {activeTab === 'blog' && (
                       <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-8">
                         <FormField label="Article Title" value={editBuffer.title} onChange={v => setEditBuffer({...editBuffer, title: v, slug: generateSlug(v)})} help="Auto-slugs URL" />
                         <FormField label="URL Slug" value={editBuffer.slug} onChange={v => setEditBuffer({...editBuffer, slug: v})} />
                         <FormField label="Short Excerpt" value={editBuffer.excerpt} onChange={v => setEditBuffer({...editBuffer, excerpt: v})} type="textarea" />
                         <FormField label="Full Markdown Content" value={editBuffer.content} onChange={v => setEditBuffer({...editBuffer, content: v})} type="textarea" />
                       </div>
                     )}
                     {activeTab === 'portfolio' && (
                       <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-8">
                          <FormField label="Project Name" value={editBuffer.name} onChange={v => setEditBuffer({...editBuffer, name: v})} />
                          <FormField label="Client" value={editBuffer.client} onChange={v => setEditBuffer({...editBuffer, client: v})} />
                          <FormField label="Performance Stat" value={editBuffer.stat} onChange={v => setEditBuffer({...editBuffer, stat: v})} help="e.g. +42% ROAS" />
                          <FormField label="Project Description" value={editBuffer.description} onChange={v => setEditBuffer({...editBuffer, description: v})} type="textarea" />
                       </div>
                     )}
                     {activeTab === 'ugc' && (
                       <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-8">
                          <FormField label="Video Title" value={editBuffer.title} onChange={v => setEditBuffer({...editBuffer, title: v})} />
                          <FormField label="Creator Name" value={editBuffer.creator} onChange={v => setEditBuffer({...editBuffer, creator: v})} />
                          <FormField label="Video Link / Source" value={editBuffer.videoUrl} onChange={v => setEditBuffer({...editBuffer, videoUrl: v})} help="MP4 or CDN Link" />
                          <FormField label="Brief Narrative" value={editBuffer.description} onChange={v => setEditBuffer({...editBuffer, description: v})} type="textarea" />
                       </div>
                     )}
                     {activeTab === 'services' && (
                        <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-8">
                           <FormField label="Service Name" value={editBuffer.name} onChange={v => setEditBuffer({...editBuffer, name: v, slug: generateSlug(v)})} />
                           <FormField label="Slug" value={editBuffer.slug} onChange={v => setEditBuffer({...editBuffer, slug: v})} />
                           <FormField label="Short Description" value={editBuffer.shortDescription} onChange={v => setEditBuffer({...editBuffer, shortDescription: v})} type="textarea" />
                           <FormField label="Full Description" value={editBuffer.fullDescription} onChange={v => setEditBuffer({...editBuffer, fullDescription: v})} type="textarea" />
                        </div>
                     )}
                  </div>
                  <div className="space-y-8">
                     <div className="glass-card p-8 rounded-[40px] border-white/5 space-y-6">
                        <h4 className="text-[10px] font-black uppercase text-zinc-600 tracking-widest px-1">Identity & Meta</h4>
                        <div className="space-y-2">
                           <label className="text-[9px] font-bold text-zinc-500 uppercase px-1">Visibility</label>
                           <select value={editBuffer.visibility} onChange={e => setEditBuffer({...editBuffer, visibility: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white">
                              <option value="show">Public</option>
                              <option value="hide">Private</option>
                           </select>
                        </div>
                        <div className="pt-4">
                           <label className="text-[9px] font-bold text-zinc-500 uppercase px-1">Media Proxy</label>
                           <div className="mt-2 aspect-video bg-black rounded-2xl border border-white/5 overflow-hidden relative group">
                              <img src={editBuffer.image || editBuffer.thumbnail} className="w-full h-full object-cover opacity-30" alt="" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                 <ImageIcon className="text-zinc-600" />
                              </div>
                           </div>
                           <input placeholder="Image URL" value={editBuffer.image || editBuffer.thumbnail || ''} onChange={e => setEditBuffer({...editBuffer, [activeTab === 'ugc' ? 'thumbnail' : 'image']: e.target.value})} className="mt-4 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px]" />
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
                     <p className="text-zinc-600 font-bold text-sm mt-2">Manage all public-facing assets from a single point of authority.</p>
                  </div>
                  <button onClick={() => startAdd(activeTab)} className="px-10 py-5 bg-blue-600 text-white font-black rounded-3xl text-[10px] uppercase tracking-widest hover:bg-blue-700 shadow-3xl shadow-blue-600/20 flex items-center gap-3 transition-all active:scale-95">
                     <Plus size={18} /> Add Entry
                  </button>
                </div>
                <div className="glass-card rounded-[40px] border-white/5 overflow-hidden">
                   <table className="w-full text-left">
                      <thead>
                         <tr className="border-b border-white/5 text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                            <th className="px-10 py-6">Asset Name</th>
                            <th className="px-6 py-6">Identity / Cat</th>
                            <th className="px-6 py-6">Status</th>
                            <th className="px-6 py-6 text-right">Actions</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                         {activeTab === 'services' && services.map(item => (
                            <tr key={item.id} className="group hover:bg-white/[0.01] transition-colors">
                               <td className="px-10 py-6 text-white font-bold">{item.name}</td>
                               <td className="px-6 py-6 text-zinc-500 font-medium">{item.slug}</td>
                               <td className="px-6 py-6 text-xs uppercase font-black"><span className={item.visibility === 'show' ? 'text-green-500' : 'text-zinc-600'}>{item.visibility}</span></td>
                               <td className="px-6 py-6 text-right flex justify-end gap-3">
                                  <button onClick={() => startEdit(item)} className="p-2 text-zinc-500 hover:text-white transition-colors"><Edit2 size={16} /></button>
                                  <button onClick={() => deleteItem('services', item.id)} className="p-2 text-zinc-500 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                               </td>
                            </tr>
                         ))}
                         {activeTab === 'blog' && blogs.map(item => (
                            <tr key={item.id} className="group hover:bg-white/[0.01] transition-colors">
                               <td className="px-10 py-6 text-white font-bold">{item.title}</td>
                               <td className="px-6 py-6 text-zinc-500 font-medium">{item.category}</td>
                               <td className="px-6 py-6 text-xs uppercase font-black"><span className={item.status === 'published' ? 'text-blue-500' : 'text-amber-500'}>{item.status}</span></td>
                               <td className="px-6 py-6 text-right flex justify-end gap-3">
                                  <button onClick={() => startEdit(item)} className="p-2 text-zinc-500 hover:text-white transition-colors"><Edit2 size={16} /></button>
                                  <button onClick={() => deleteItem('blog', item.id)} className="p-2 text-zinc-500 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                               </td>
                            </tr>
                         ))}
                         {activeTab === 'portfolio' && portfolio.map(item => (
                            <tr key={item.id} className="group hover:bg-white/[0.01] transition-colors">
                               <td className="px-10 py-6 text-white font-bold">{item.name}</td>
                               <td className="px-6 py-6 text-zinc-500 font-medium">{item.client}</td>
                               <td className="px-6 py-6 text-xs uppercase font-black"><span className={item.visibility === 'show' ? 'text-green-500' : 'text-zinc-600'}>{item.visibility}</span></td>
                               <td className="px-6 py-6 text-right flex justify-end gap-3">
                                  <button onClick={() => startEdit(item)} className="p-2 text-zinc-500 hover:text-white transition-colors"><Edit2 size={16} /></button>
                                  <button onClick={() => deleteItem('portfolio', item.id)} className="p-2 text-zinc-500 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                               </td>
                            </tr>
                         ))}
                         {activeTab === 'ugc' && ugcAds.map(item => (
                            <tr key={item.id} className="group hover:bg-white/[0.01] transition-colors">
                               <td className="px-10 py-6 text-white font-bold">{item.title}</td>
                               <td className="px-6 py-6 text-zinc-500 font-medium">by {item.creator}</td>
                               <td className="px-6 py-6 text-xs uppercase font-black"><span className={item.status === 'published' ? 'text-blue-500' : 'text-amber-500'}>{item.status}</span></td>
                               <td className="px-6 py-6 text-right flex justify-end gap-3">
                                  <button onClick={() => startEdit(item)} className="p-2 text-zinc-500 hover:text-white transition-colors"><Edit2 size={16} /></button>
                                  <button onClick={() => deleteItem('ugc', item.id)} className="p-2 text-zinc-500 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
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
                 { label: "Active Services", value: services.length, icon: <Briefcase className="text-blue-500" /> },
                 { label: "UGC Assets", value: ugcAds.length, icon: <PlayCircle className="text-purple-500" /> },
                 { label: "Blog Articles", value: blogs.length, icon: <BookOpen className="text-pink-500" /> },
                 { label: "Portfolio Items", value: portfolio.length, icon: <Layers className="text-cyan-500" /> }
               ].map((stat, i) => (
                  <div key={i} className="glass-card p-10 rounded-[40px] border-white/5">
                     <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 border border-white/5">{stat.icon}</div>
                     <div className="text-4xl font-black text-white">{stat.value}</div>
                     <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mt-2">{stat.label}</div>
                  </div>
               ))}
               <div className="md:col-span-2 lg:col-span-4 glass-card p-20 rounded-[60px] border-white/5 flex flex-col items-center justify-center text-center">
                  <h3 className="text-4xl font-black text-zinc-800 mb-4 uppercase tracking-[0.2em]">System Ready</h3>
                  <p className="text-zinc-600 font-bold max-w-lg">All engines are operational. Use the navigation to manage dynamic site resources.</p>
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
