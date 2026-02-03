
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  TrendingUp, 
  Inbox, 
  CheckCircle, 
  Clock, 
  MoreVertical,
  Plus,
  ArrowUpRight,
  Filter,
  Monitor,
  Film,
  QrCode,
  Shield,
  FileText,
  ExternalLink,
  ChevronRight,
  Download,
  Eye,
  EyeOff
} from 'lucide-react';
import { Lead, Project, UgcAd, QrScreen, AdminUser } from '../types';

const MOCK_LEADS: Lead[] = [
  { id: '1', name: 'Arjun Mehra', email: 'arjun@techstart.in', service: 'UGC Ads', status: 'new', date: '2024-11-20', message: 'Interested in scaling our Meta ads.' },
  { id: '2', name: 'Sarah Khan', email: 'sarah@boutique.com', service: 'Website Design', status: 'contacted', date: '2024-11-19', message: 'Need a premium Shopify store redesign.' },
  { id: '3', name: 'Vikram Singh', email: 'vikram@fitnesshub.in', service: 'AI QR Screen', status: 'new', date: '2024-11-18', message: 'Want smart screens for our 12 gym locations.' },
  { id: '4', name: 'Neha Gupta', email: 'neha@fashionsocial.in', service: 'UGC Ads', status: 'closed', date: '2024-11-15', message: 'Campaign successfully launched.' },
];

const MOCK_PROJECTS: Project[] = [
  { id: 'p1', client: 'Lumina Tech', name: 'Corporate Rebrand', status: 'development', progress: 65, url: 'lumina.io' },
  { id: 'p2', client: 'Nordic Ware', name: 'E-com Storefront', status: 'live', progress: 100, url: 'nordic.store' },
  { id: 'p3', client: 'Peak Performance', name: 'Landing Page v2', status: 'design', progress: 20 },
];

const MOCK_UGC: UgcAd[] = [
  { id: 'u1', brand: 'Vitality Drinks', platform: 'TikTok', thumbnail: 'https://picsum.photos/seed/ad1/400/600', status: 'active', metrics: { views: '124k', roas: '3.4x' } },
  { id: 'u2', brand: 'Ecomly', platform: 'Meta', thumbnail: 'https://picsum.photos/seed/ad2/400/600', status: 'active', metrics: { views: '89k', roas: '2.8x' } },
  { id: 'u3', brand: 'Urban Fit', platform: 'YouTube', thumbnail: 'https://picsum.photos/seed/ad3/400/600', status: 'archived', metrics: { views: '45k', roas: '1.9x' } },
];

const MOCK_QR: QrScreen[] = [
  { id: 'q1', location: 'Downtown Mall - Ent A', campaign: 'Winter Sale 2024', scans: 1420, status: 'online' },
  { id: 'q2', location: 'Metro Station - Hub', campaign: 'App Launch Promo', scans: 890, status: 'online' },
  { id: 'q3', location: 'City Square Expo', campaign: 'Tech Summit Lead Gen', scans: 340, status: 'offline' },
];

const MOCK_USERS: AdminUser[] = [
  { id: 'adm1', name: 'Super Admin', role: 'Super Admin', email: 'admin@webprimai.in' },
  { id: 'adm2', name: 'Content Editor', role: 'Editor', email: 'editor@webprimai.in' },
  { id: 'adm3', name: 'Strategy Analyst', role: 'Viewer', email: 'view@webprimai.in' },
];

type AdminTab = 'overview' | 'leads' | 'projects' | 'ugc' | 'qr' | 'users' | 'settings';

export const AdminDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [leadFilter, setLeadFilter] = useState('all');
  
  const stats = [
    { label: 'Total Leads', value: '142', change: '+12%', icon: <Inbox className="text-blue-500" /> },
    { label: 'Conversion Rate', value: '8.4%', change: '+2.1%', icon: <TrendingUp className="text-purple-500" /> },
    { label: 'UGC Content', value: '48', change: '+8', icon: <Film className="text-pink-500" /> },
    { label: 'Active Screens', value: '12', change: '+2', icon: <QrCode className="text-green-500" /> },
  ];

  const SidebarItem = ({ id, label, icon }: { id: AdminTab; label: string; icon: React.ReactNode }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all ${
        activeTab === id 
          ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' 
          : 'text-zinc-500 hover:text-white hover:bg-white/5 border border-transparent'
      }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#050505] flex text-zinc-300">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-black/50 backdrop-blur-3xl flex flex-col p-8 fixed h-full z-20">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center font-black text-white">W</div>
          <span className="font-black text-xl text-white tracking-tighter">Command</span>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto pr-2">
          <SidebarItem id="overview" label="Overview" icon={<LayoutDashboard size={18} />} />
          <SidebarItem id="leads" label="Lead Pipeline" icon={<Inbox size={18} />} />
          <SidebarItem id="projects" label="Web Projects" icon={<Monitor size={18} />} />
          <SidebarItem id="ugc" label="UGC Ads Manager" icon={<Film size={18} />} />
          <SidebarItem id="qr" label="QR Screen Fleet" icon={<QrCode size={18} />} />
          <SidebarItem id="users" label="User Access" icon={<Shield size={18} />} />
          <SidebarItem id="settings" label="Site Config" icon={<Settings size={18} />} />
        </nav>

        <div className="mt-8 pt-8 border-t border-white/5">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-4 py-4 text-zinc-500 hover:text-red-400 font-bold transition-colors rounded-2xl hover:bg-red-500/5"
          >
            <LogOut size={18} />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-72">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-12 sticky top-0 bg-[#050505]/80 backdrop-blur-xl z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-black text-white capitalize">{activeTab.replace('-', ' ')}</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Global search..." 
                className="bg-white/5 border border-white/5 rounded-xl pl-12 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500/50 w-64 transition-all"
              />
            </div>
            <div className="flex items-center gap-3 pl-6 border-l border-white/5">
               <div className="text-right">
                  <div className="text-xs font-bold text-white">Admin123</div>
                  <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Master Admin</div>
               </div>
               <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 font-black border border-blue-500/30">A</div>
            </div>
          </div>
        </header>

        <div className="p-12 animate-in fade-in duration-500">
          {activeTab === 'overview' && (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                  <div key={i} className="glass-card p-8 rounded-[32px] border-white/5 hover:border-blue-500/20 transition-all cursor-default">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">{stat.icon}</div>
                      <span className="text-[10px] font-black text-green-500 px-2 py-1 bg-green-500/10 rounded-lg">{stat.change}</span>
                    </div>
                    <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1">{stat.label}</div>
                    <div className="text-3xl font-black text-white">{stat.value}</div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 glass-card rounded-[40px] border-white/5 p-10">
                  <div className="flex items-center justify-between mb-12">
                     <h3 className="text-xl font-bold text-white">Agency Conversion Velocity</h3>
                     <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold">Week</button>
                        <button className="px-3 py-1.5 bg-white/5 text-zinc-500 rounded-lg text-xs font-bold hover:text-white transition-colors">Month</button>
                     </div>
                  </div>
                  <div className="h-64 flex items-end gap-3 px-4">
                    {[35, 60, 40, 85, 70, 50, 75, 90, 65, 80, 55, 95, 85, 70].map((val, i) => (
                      <div key={i} className="flex-1 bg-blue-600/10 rounded-t-lg relative group transition-all" style={{ height: `${val}%` }}>
                        <div className="absolute inset-x-0 top-0 h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)] opacity-50 group-hover:opacity-100" />
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-[10px] font-black px-2 py-1 rounded">
                          {val}%
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-6 px-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                    <span>Mon</span>
                    <span>Sun</span>
                  </div>
                </div>

                <div className="glass-card rounded-[40px] border-white/5 p-10 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-10">Inquiry Distribution</h3>
                  <div className="space-y-8 flex-1">
                    {[
                      { label: 'UGC Ads', value: 45, color: 'bg-purple-500' },
                      { label: 'Web Design', value: 35, color: 'bg-blue-500' },
                      { label: 'AI QR Screens', value: 20, color: 'bg-pink-500' },
                    ].map((s, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-[10px] font-black mb-3">
                          <span className="text-zinc-500 uppercase tracking-widest">{s.label}</span>
                          <span className="text-white">{s.value}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full ${s.color} transition-all duration-1000 ease-out`} style={{ width: `${s.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-12 p-6 bg-blue-600/5 border border-blue-500/10 rounded-2xl">
                     <p className="text-xs text-blue-400 font-medium leading-relaxed">
                       Insight: UGC inquiries are up 24% this week. Consider prioritizing content creators for faster turnaround.
                     </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                   <h3 className="text-2xl font-black text-white">Lead Database</h3>
                   <div className="flex gap-2">
                      <button onClick={() => setLeadFilter('all')} className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${leadFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-white/5 text-zinc-500'}`}>All</button>
                      <button onClick={() => setLeadFilter('new')} className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${leadFilter === 'new' ? 'bg-blue-600 text-white' : 'bg-white/5 text-zinc-500'}`}>New</button>
                   </div>
                </div>
                <div className="flex gap-4">
                   <button className="flex items-center gap-2 px-6 py-3 bg-white/5 text-zinc-400 hover:text-white border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                      <Download size={16} /> Export CSV
                   </button>
                   <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
                      <Plus size={16} /> Manual Lead
                   </button>
                </div>
              </div>

              <div className="glass-card rounded-[40px] border-white/5 overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">
                      <th className="px-10 py-6">Prospect</th>
                      <th className="px-6 py-6">Service Interest</th>
                      <th className="px-6 py-6">Status</th>
                      <th className="px-6 py-6">Date</th>
                      <th className="px-6 py-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {MOCK_LEADS.map((lead) => (
                      <tr key={lead.id} className="group hover:bg-white/[0.02] transition-colors cursor-pointer">
                        <td className="px-10 py-6">
                          <div className="font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{lead.name}</div>
                          <div className="text-xs text-zinc-500">{lead.email}</div>
                        </td>
                        <td className="px-6 py-6">
                          <span className="px-3 py-1 bg-zinc-900 border border-white/5 rounded-lg text-[10px] font-black text-zinc-400 uppercase tracking-widest">{lead.service}</span>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-2 text-xs font-bold">
                            <div className={`w-2 h-2 rounded-full ${
                              lead.status === 'new' ? 'bg-blue-500 animate-pulse' : 
                              lead.status === 'contacted' ? 'bg-yellow-500' : 'bg-green-500'
                            }`} />
                            <span className="capitalize">{lead.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-6 text-xs text-zinc-500">{lead.date}</td>
                        <td className="px-6 py-6 text-right">
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-zinc-500 hover:text-white">
                            <MoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-12">
               <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-white">Project Lifecycles</h3>
                  <button className="px-8 py-4 bg-blue-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest flex items-center gap-2">
                     <Plus size={18} /> New Brief
                  </button>
               </div>
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {MOCK_PROJECTS.map((p) => (
                    <div key={p.id} className="glass-card rounded-[40px] border-white/5 p-10 hover:border-blue-500/20 transition-all group">
                       <div className="flex items-start justify-between mb-8">
                          <div>
                             <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{p.name}</h4>
                             <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest font-bold">{p.client}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                            p.status === 'live' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                            p.status === 'development' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : 
                            'bg-purple-500/10 text-purple-500 border border-purple-500/20'
                          }`}>
                            {p.status}
                          </span>
                       </div>
                       <div className="space-y-4">
                          <div className="flex justify-between text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                             <span>Build Completion</span>
                             <span className="text-white">{p.progress}%</span>
                          </div>
                          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                             <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${p.progress}%` }} />
                          </div>
                       </div>
                       {p.url && (
                         <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                            <a href={`https://${p.url}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors">
                              <ExternalLink size={14} /> {p.url}
                            </a>
                            <button className="p-2 bg-white/5 rounded-lg text-zinc-500 hover:text-white transition-colors">
                               <Settings size={14} />
                            </button>
                         </div>
                       )}
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeTab === 'ugc' && (
            <div className="space-y-12">
               <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-white">UGC Ad Vault</h3>
                    <p className="text-sm text-zinc-500 mt-1">Manage performance creative assets</p>
                  </div>
                  <button className="px-8 py-4 bg-purple-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-purple-600/20">
                     <Film size={18} /> Add Performance Ad
                  </button>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                  {MOCK_UGC.map((u) => (
                    <div key={u.id} className="group relative glass-card rounded-[32px] overflow-hidden border-white/5 aspect-[9/16] transition-all hover:scale-[1.02]">
                       <img src={u.thumbnail} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                       <div className="absolute top-4 right-4 flex gap-2">
                          <button className="p-2 bg-black/60 backdrop-blur-md rounded-xl text-white hover:text-blue-400 transition-colors">
                             {u.status === 'active' ? <Eye size={16} /> : <EyeOff size={16} />}
                          </button>
                       </div>
                       <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-6 flex flex-col justify-end">
                          <div className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-1">{u.platform}</div>
                          <h5 className="font-bold text-white text-lg leading-tight">{u.brand}</h5>
                          <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                             <div className="text-center">
                                <div className="text-xs font-black text-white">{u.metrics.views}</div>
                                <div className="text-[8px] text-zinc-500 uppercase font-black">Views</div>
                             </div>
                             <div className="text-center">
                                <div className="text-xs font-black text-green-500">{u.metrics.roas}</div>
                                <div className="text-[8px] text-zinc-500 uppercase font-black">ROAS</div>
                             </div>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeTab === 'qr' && (
            <div className="space-y-12">
               <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-white">AI QR Fleet Management</h3>
                  <button className="px-8 py-4 bg-pink-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-pink-600/20">Provision New Screen</button>
               </div>
               <div className="grid md:grid-cols-2 gap-8">
                  {MOCK_QR.map((q) => (
                    <div key={q.id} className="p-10 bg-black/40 border border-white/5 rounded-[40px] flex items-center justify-between hover:border-pink-500/20 transition-all group">
                       <div className="flex items-center gap-8">
                          <div className="w-20 h-20 bg-zinc-900 rounded-3xl flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform">
                             <QrCode size={40} className="text-pink-500" />
                          </div>
                          <div>
                             <h4 className="text-xl font-bold text-white">{q.location}</h4>
                             <p className="text-sm text-zinc-500 mt-1">Campaign: <span className="text-zinc-300 font-bold">{q.campaign}</span></p>
                          </div>
                       </div>
                       <div className="text-right">
                          <div className="text-3xl font-black text-white">{q.scans.toLocaleString()}</div>
                          <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-3">Unique Scans</div>
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            q.status === 'online' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                          }`}>
                             <div className={`w-1.5 h-1.5 rounded-full ${q.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                             {q.status}
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="max-w-4xl space-y-8">
               <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-white">Agency Access Control</h3>
                  <button className="px-6 py-3 bg-white/5 text-zinc-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/5 transition-all">Invite Team Member</button>
               </div>
               <div className="glass-card rounded-[40px] border-white/5 overflow-hidden">
                  <div className="divide-y divide-white/5">
                     {MOCK_USERS.map((u) => (
                       <div key={u.id} className="p-10 flex items-center justify-between group hover:bg-white/[0.01] transition-colors">
                          <div className="flex items-center gap-6">
                             <div className="w-14 h-14 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-full flex items-center justify-center font-black text-blue-500 border border-white/5">
                                {u.name[0]}
                             </div>
                             <div>
                                <h4 className="text-lg font-bold text-white">{u.name}</h4>
                                <p className="text-sm text-zinc-500">{u.email}</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-10">
                             <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                               u.role === 'Super Admin' ? 'bg-blue-600/10 text-blue-400 border-blue-500/20' : 
                               u.role === 'Editor' ? 'bg-purple-600/10 text-purple-400 border-purple-500/20' : 
                               'bg-zinc-900 text-zinc-500 border-white/5'
                             }`}>{u.role}</span>
                             <button className="p-2 text-zinc-700 hover:text-white transition-colors"><MoreVertical size={20} /></button>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-2xl space-y-12">
               <div className="glass-card p-10 rounded-[40px] border-white/5">
                  <h3 className="text-xl font-bold text-white mb-10 flex items-center gap-4"><Monitor size={20} className="text-blue-500" /> Agency Public Identity</h3>
                  <div className="space-y-8">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">Agency Name</label>
                        <input type="text" defaultValue="Web Prime AI" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-medium transition-all" />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">Contact Email</label>
                        <input type="text" defaultValue="hello@webprimai.in" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-medium transition-all" />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">Global Target Markets</label>
                        <div className="flex flex-wrap gap-3">
                           {['India', 'USA', 'UK', 'D2C Brands'].map(m => (
                             <span key={m} className="px-4 py-2 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 text-zinc-400">{m}</span>
                           ))}
                           <button className="p-2 border border-dashed border-white/20 rounded-xl hover:border-blue-500/50 transition-colors"><Plus size={16} /></button>
                        </div>
                     </div>
                     <button className="w-full py-4 bg-white text-black font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl hover:bg-zinc-200 transition-all">Save Changes</button>
                  </div>
               </div>

               <div className="glass-card p-10 rounded-[40px] border-white/5">
                  <h3 className="text-xl font-bold text-white mb-10 flex items-center gap-4"><Shield size={20} className="text-red-500" /> Security Lockdown</h3>
                  <div className="p-8 bg-red-500/5 border border-red-500/10 rounded-[32px]">
                     <div className="font-bold text-red-400 mb-2">Emergency Site Deactivation</div>
                     <p className="text-xs text-zinc-500 leading-relaxed mb-8">This will immediately put the public site into maintenance mode, disabling all contact forms and AI interactions. Use only during major updates or security incidents.</p>
                     <button className="px-6 py-3 bg-red-600/10 text-red-500 font-black text-[10px] uppercase rounded-xl border border-red-500/20 hover:bg-red-600 hover:text-white transition-all">Deactivate Public Access</button>
                  </div>
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
