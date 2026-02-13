
import React, { useState } from 'react';
import { Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { Page } from '../types';

const LOGO_URL = "https://lh3.googleusercontent.com/a/ACg8ocJoqFrWgOQ0WElWvr4IsZUCF6IUmNAxphg9XsImWylZijxOgg8=s400-c";

export const AdminLogin: React.FC<{ onLogin: () => void; onBack: () => void }> = ({ onLogin, onBack }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth with updated credentials
    if (userId === 'Admin123' && password === 'Jhajha123') {
      onLogin();
    } else {
      setError('Invalid credentials. Please use Admin123 / Jhajha123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />
      
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-zinc-900 rounded-[32px] overflow-hidden shadow-2xl mb-8 border border-white/10">
            <img src={LOGO_URL} alt="Web Prime AI" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter mb-2 uppercase">Agency Command Center</h1>
          <p className="text-zinc-500 font-medium">Authorized personnel only</p>
        </div>

        <div className="glass-card p-10 rounded-[40px] border-white/5 shadow-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-bold text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Admin User Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                <input 
                  type="text" 
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter User Name" 
                  className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Secure Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="group w-full py-5 bg-white text-black font-black rounded-2xl shadow-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 text-lg uppercase"
            >
              Access Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        <div className="mt-12 text-center">
          <button 
            onClick={onBack}
            className="text-zinc-600 text-xs font-bold uppercase tracking-widest hover:text-zinc-400 transition-colors"
          >
            ← Return to Public Site
          </button>
        </div>
      </div>
    </div>
  );
};
