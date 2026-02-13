
import React from 'react';
import { 
  Plus, Trash2, ChevronUp, ChevronDown, 
  Image as ImageIcon, Layout, Video, QrCode, PlayCircle, ExternalLink, Eye
} from 'lucide-react';
import { Service, PricingPlan, ServiceFeature, UgcAd, Project } from '../types';

interface FormFieldProps {
  label: string;
  value: any;
  onChange: (val: string) => void;
  type?: string;
  help?: string;
  placeholder?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ label, value, onChange, type = "text", help = "", placeholder = "" }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center px-1">
      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{label}</label>
      {help && <span className="text-[9px] text-zinc-600 font-bold">{help}</span>}
    </div>
    {type === 'textarea' ? (
      <textarea 
        rows={5} 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 transition-colors outline-none resize-none" 
      />
    ) : (
      <input 
        type={type} 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 transition-colors outline-none" 
      />
    )}
  </div>
);

export const MediaPreview: React.FC<{ type: 'image' | 'video' | 'link', url: string, thumbnail?: string }> = ({ type, url, thumbnail }) => {
  if (!url && !thumbnail) return (
    <div className="aspect-video bg-zinc-900/50 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-zinc-600 gap-2">
      <ImageIcon size={24} />
      <span className="text-[9px] font-black uppercase">No Media Detected</span>
    </div>
  );

  return (
    <div className="aspect-video bg-black rounded-2xl border border-white/10 overflow-hidden relative group shadow-2xl">
      {type === 'image' || type === 'link' || (type === 'video' && thumbnail) ? (
        <img src={thumbnail || url} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="Preview" />
      ) : null}
      
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
        {type === 'video' ? (
          <div className="bg-blue-600 p-3 rounded-full"><PlayCircle size={24} className="text-white" /></div>
        ) : type === 'link' ? (
          <div className="bg-zinc-800 p-3 rounded-full"><ExternalLink size={24} className="text-white" /></div>
        ) : (
          <div className="bg-white/10 p-3 rounded-full backdrop-blur-md"><Eye size={24} className="text-white" /></div>
        )}
      </div>
      
      <div className="absolute bottom-4 left-4 right-4">
        <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[8px] font-black uppercase text-white w-fit tracking-widest border border-white/10">
          {type} Preview
        </div>
      </div>
    </div>
  );
};

// --- SERVICE FORM SECTIONS ---

export const ServiceParametersForm: React.FC<{ 
  data: Partial<Service>; 
  onChange: (updates: Partial<Service>) => void 
}> = ({ data, onChange }) => (
  <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-8">
    <h4 className="text-xl font-black text-white uppercase">Service Parameters</h4>
    <FormField 
      label="Service Title" 
      value={data.name || ''} 
      onChange={v => onChange({ name: v })} 
    />
    <FormField 
      label="Short Summary (Registry Card)" 
      value={data.shortDescription || ''} 
      onChange={v => onChange({ shortDescription: v })} 
      type="textarea" 
    />
    <FormField 
      label="Full Description (Landing Page)" 
      value={data.fullDescription || ''} 
      onChange={v => onChange({ fullDescription: v })} 
      type="textarea" 
    />
  </div>
);

export const ServiceFeaturesForm: React.FC<{ 
  features: ServiceFeature[]; 
  onChange: (features: ServiceFeature[]) => void 
}> = ({ features = [], onChange }) => {
  const addFeature = () => onChange([...features, { title: '', desc: '' }]);
  const removeFeature = (idx: number) => onChange(features.filter((_, i) => i !== idx));
  const updateFeature = (idx: number, updates: Partial<ServiceFeature>) => {
    onChange(features.map((f, i) => i === idx ? { ...f, ...updates } : f));
  };
  const moveFeature = (idx: number, dir: 'up' | 'down') => {
    const next = [...features];
    const target = dir === 'up' ? idx - 1 : idx + 1;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
  };

  return (
    <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-8">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-black text-white uppercase">Capability Blocks</h4>
        <button onClick={addFeature} className="px-4 py-2 bg-blue-600/20 text-blue-500 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-blue-600/30 transition-all"><Plus size={14}/> Add Block</button>
      </div>
      <div className="space-y-4">
        {features.map((f, i) => (
          <div key={i} className="flex gap-4 items-start p-6 bg-white/[0.02] rounded-3xl border border-white/5 group">
            <div className="flex flex-col gap-2 pt-2">
              <button onClick={() => moveFeature(i, 'up')} className="p-1 hover:text-white transition-colors disabled:opacity-0" disabled={i === 0}><ChevronUp size={16}/></button>
              <button onClick={() => moveFeature(i, 'down')} className="p-1 hover:text-white transition-colors disabled:opacity-0" disabled={i === features.length - 1}><ChevronDown size={16}/></button>
            </div>
            <div className="flex-1 space-y-4">
              <input value={f.title} onChange={e => updateFeature(i, { title: e.target.value })} placeholder="Block Title" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm font-bold outline-none text-white uppercase" />
              <textarea value={f.desc} onChange={e => updateFeature(i, { desc: e.target.value })} placeholder="Detailed summary..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-zinc-400 outline-none resize-none" />
            </div>
            <button onClick={() => removeFeature(i)} className="p-2 text-zinc-800 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
          </div>
        ))}
        {features.length === 0 && (
          <div className="text-center py-10 border border-dashed border-white/5 rounded-3xl text-zinc-600 text-xs">No capability blocks defined.</div>
        )}
      </div>
    </div>
  );
};

export const PricingPlansForm: React.FC<{ 
  plans: PricingPlan[]; 
  onChange: (plans: PricingPlan[]) => void 
}> = ({ plans = [], onChange }) => {
  const addPlan = () => onChange([...plans, { id: Date.now().toString(), name: 'New Plan', price: '₹0', description: '', features: [], ctaText: 'Get Started', isHighlighted: false }]);
  const removePlan = (id: string) => onChange(plans.filter(p => p.id !== id));
  const updatePlan = (id: string, updates: Partial<PricingPlan>) => {
    onChange(plans.map(p => p.id === id ? { ...p, ...updates } : p));
  };
  const movePlan = (idx: number, dir: 'up' | 'down') => {
    const next = [...plans];
    const target = dir === 'up' ? idx - 1 : idx + 1;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
  };

  const addBullet = (planId: string) => {
    onChange(plans.map(p => p.id === planId ? { ...p, features: [...(p.features || []), 'New Benefit Point'] } : p));
  };
  const removeBullet = (planId: string, idx: number) => {
    onChange(plans.map(p => p.id === planId ? { ...p, features: p.features.filter((_, i) => i !== idx) } : p));
  };
  const updateBullet = (planId: string, idx: number, val: string) => {
    onChange(plans.map(p => p.id === planId ? { ...p, features: p.features.map((f, i) => i === idx ? val : f) } : p));
  };

  return (
    <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-8">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-black text-white uppercase">Pricing Tiers</h4>
        <button onClick={addPlan} className="px-4 py-2 bg-green-600/20 text-green-500 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-green-600/30 transition-all"><Plus size={14}/> Add Tier</button>
      </div>
      <div className="space-y-10">
        {plans.map((p, pi) => (
          <div key={p.id} className="p-10 bg-white/[0.02] rounded-[50px] border border-white/5 space-y-8 relative group/plan">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover/plan:opacity-100 transition-all">
              <button onClick={() => movePlan(pi, 'up')} className="p-1 hover:text-white transition-colors" disabled={pi === 0}><ChevronUp size={20}/></button>
              <button onClick={() => movePlan(pi, 'down')} className="p-1 hover:text-white transition-colors" disabled={pi === plans.length - 1}><ChevronDown size={20}/></button>
            </div>
            <div className="pl-10 space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <FormField label="Tier Name" value={p.name} onChange={v => updatePlan(p.id, { name: v.toUpperCase() })} />
                <FormField label="Base Price" value={p.price} onChange={v => updatePlan(p.id, { price: v })} />
              </div>
              <FormField label="Tier Summary" value={p.description} onChange={v => updatePlan(p.id, { description: v })} />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Plan Benefits</label>
                  <button onClick={() => addBullet(p.id)} className="text-[9px] font-black text-blue-500 hover:underline flex items-center gap-1 uppercase"><Plus size={12}/> Add Benefit</button>
                </div>
                <div className="grid gap-3">
                  {p.features?.map((feat, fi) => (
                    <div key={fi} className="flex gap-2 group/feat">
                      <input value={feat} onChange={e => updateBullet(p.id, fi, e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:border-blue-500 outline-none transition-all text-white" />
                      <button onClick={() => removeBullet(p.id, fi)} className="p-2 text-zinc-800 hover:text-red-500 opacity-0 group-hover/feat:opacity-100 transition-all"><Trash2 size={14}/></button>
                    </div>
                  ))}
                  {(!p.features || p.features.length === 0) && (
                    <div className="text-[10px] text-zinc-700 italic px-1">No benefits listed.</div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-8 pt-6 border-t border-white/5">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={p.isHighlighted} onChange={e => updatePlan(p.id, { isHighlighted: e.target.checked })} className="w-5 h-5 rounded-lg accent-blue-600 bg-zinc-900 border-white/10" />
                  <span className="text-[10px] font-black uppercase text-zinc-500">Featured Tier</span>
                </label>
                <div className="flex-1 max-w-[200px]">
                  <FormField label="CTA Label" value={p.ctaText} onChange={v => updatePlan(p.id, { ctaText: v.toUpperCase() })} />
                </div>
                <button onClick={() => removePlan(p.id)} className="text-red-500/50 hover:text-red-500 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 ml-auto transition-colors"><Trash2 size={14}/> Delete Tier</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- PORTFOLIO / UGC FORMS ---

export const PortfolioManagerForm: React.FC<{ 
  data: Partial<Project>; 
  onChange: (updates: Partial<Project>) => void 
}> = ({ data, onChange }) => (
  <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-8">
    <div className="flex items-center justify-between">
      <h4 className="text-xl font-black text-white uppercase">Project Identity</h4>
      <div className="flex gap-2">
        {['image', 'video', 'link'].map((t) => (
          <button 
            key={t}
            onClick={() => onChange({ mediaType: t as any })}
            className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest border transition-all ${data.mediaType === t ? 'bg-blue-600 border-blue-400 text-white' : 'bg-white/5 border-white/10 text-zinc-500'}`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
    
    <div className="grid md:grid-cols-2 gap-8">
      <FormField label="Project Name" value={data.name || ''} onChange={v => onChange({ name: v.toUpperCase() })} />
      <FormField label="Client Identity" value={data.client || ''} onChange={v => onChange({ client: v })} />
    </div>
    
    <div className="grid md:grid-cols-2 gap-8">
      <FormField label="Category" value={data.category || ''} onChange={v => onChange({ category: v.toUpperCase() })} />
      <FormField label="Core Stat (e.g. +40% ROI)" value={data.stat || ''} onChange={v => onChange({ stat: v })} />
    </div>

    <FormField label="Strategic Brief" value={data.description || ''} onChange={v => onChange({ description: v })} type="textarea" />

    <div className="space-y-2">
      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Asset Metadata (Tags)</label>
      <input 
        value={data.tags?.join(', ') || ''} 
        onChange={e => onChange({ tags: e.target.value.split(',').map(t => t.trim()) })} 
        placeholder="Design, AI, D2C, India (Comma separated)" 
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 transition-colors outline-none"
      />
    </div>

    <div className="space-y-4">
      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Media Terminal</label>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <FormField label="Thumbnail / Image URL" value={data.image || ''} onChange={v => onChange({ image: v })} help="Primary Display" />
          {data.mediaType === 'video' && <FormField label="Video URL" value={data.videoUrl || ''} onChange={v => onChange({ videoUrl: v })} help="Direct Link" />}
          {data.mediaType === 'link' && <FormField label="External Link" value={data.externalLink || ''} onChange={v => onChange({ externalLink: v })} help="Live Site" />}
        </div>
        <div>
          <MediaPreview type={data.mediaType || 'image'} url={data.mediaType === 'video' ? data.videoUrl || '' : data.externalLink || ''} thumbnail={data.image} />
        </div>
      </div>
    </div>
  </div>
);

export const UgcVideoForm: React.FC<{ 
  data: Partial<UgcAd>; 
  onChange: (updates: Partial<UgcAd>) => void 
}> = ({ data, onChange }) => (
  <div className="glass-card p-10 rounded-[40px] border-white/5 space-y-8">
    <h4 className="text-xl font-black text-white uppercase">UGC Ad Intelligence</h4>
    <div className="grid md:grid-cols-2 gap-8">
      <FormField label="Video Title" value={data.title || ''} onChange={v => onChange({ title: v.toUpperCase() })} />
      <FormField label="Creator Identity" value={data.creator || ''} onChange={v => onChange({ creator: v })} />
    </div>
    
    <div className="grid md:grid-cols-2 gap-8">
      <FormField label="Category" value={data.category || ''} onChange={v => onChange({ category: v.toUpperCase() })} placeholder="e.g. SKINCARE, TECH, FASHION" />
      <FormField label="Platform" value={data.platform || 'Meta'} onChange={v => onChange({ platform: v as any })} />
    </div>

    <FormField label="Strategic Brief" value={data.description || ''} onChange={v => onChange({ description: v })} type="textarea" placeholder="Describe the ad hook and strategy..." />

    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <FormField label="Video Source" value={data.videoUrl || ''} onChange={v => onChange({ videoUrl: v })} help="CDN or Cloud Link" />
        <div className="grid md:grid-cols-2 gap-8">
          <FormField label="Views Stat" value={data.metrics?.views || '0'} onChange={v => onChange({ metrics: { ...(data.metrics || {views:'0', roas:'0'}), views: v } })} />
          <FormField label="ROAS Stat" value={data.metrics?.roas || '0'} onChange={v => onChange({ metrics: { ...(data.metrics || {views:'0', roas:'0'}), roas: v } })} />
        </div>
        <FormField label="Thumbnail Link" value={data.thumbnail || ''} onChange={v => onChange({ thumbnail: v })} />
      </div>
      <div>
        <MediaPreview type="video" url={data.videoUrl || ''} thumbnail={data.thumbnail} />
      </div>
    </div>
  </div>
);

// --- SHARED SIDEBAR ENGINE CONFIG ---

export const EngineConfigSidebar: React.FC<{
  visibility: 'show' | 'hide';
  onVisibilityChange: (val: 'show' | 'hide') => void;
  icon?: string;
  onIconChange?: (val: any) => void;
  image: string;
  onImageChange: (val: string) => void;
  isFeatured?: boolean;
  onFeaturedChange?: (val: boolean) => void;
}> = ({ 
  visibility, onVisibilityChange, icon, onIconChange, image, onImageChange, isFeatured, onFeaturedChange 
}) => (
  <div className="glass-card p-8 rounded-[40px] border-white/5 space-y-6">
    <h4 className="text-[10px] font-black uppercase text-zinc-600 tracking-widest px-1">Engine Configuration</h4>
    <div className="space-y-2">
      <label className="text-[9px] font-bold text-zinc-500 uppercase px-1">Visibility State</label>
      <select 
        value={visibility} 
        onChange={e => onVisibilityChange(e.target.value as 'show' | 'hide')} 
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer"
      >
        <option value="show" className="bg-zinc-900">PUBLIC (ACTIVE)</option>
        <option value="hide" className="bg-zinc-900">PRIVATE (HIDDEN)</option>
      </select>
    </div>

    {onIconChange !== undefined && (
      <div className="space-y-2">
        <label className="text-[9px] font-bold text-zinc-500 uppercase px-1">Icon Representation</label>
        <select 
          value={icon} 
          onChange={e => onIconChange(e.target.value)} 
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer"
        >
          <option value="Layout" className="bg-zinc-900">LAYOUT (WEB)</option>
          <option value="Video" className="bg-zinc-900">VIDEO (UGC)</option>
          <option value="QrCode" className="bg-zinc-900">QRCODE (SCREEN)</option>
        </select>
      </div>
    )}

    {onFeaturedChange !== undefined && (
      <label className="flex items-center gap-3 cursor-pointer group px-1">
        <input 
          type="checkbox" 
          checked={isFeatured} 
          onChange={e => onFeaturedChange(e.target.checked)} 
          className="w-5 h-5 rounded-lg accent-blue-600 bg-zinc-900 border-white/10" 
        />
        <span className="text-[10px] font-black uppercase text-zinc-500 group-hover:text-zinc-300 transition-colors">Is Featured Asset</span>
      </label>
    )}

    <div className="pt-4">
      <label className="text-[9px] font-bold text-zinc-500 uppercase px-1">Primary Asset</label>
      <div className="mt-2 aspect-video bg-black rounded-2xl border border-white/5 overflow-hidden relative group">
        <img src={image} className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity" alt="" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <ImageIcon className="text-zinc-600" />
        </div>
      </div>
      <input 
        placeholder="Image URL (CDN)" 
        value={image} 
        onChange={e => onImageChange(e.target.value)} 
        className="mt-4 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px] outline-none focus:border-blue-500 transition-all text-white" 
      />
    </div>
  </div>
);
