
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const [user, setUser] = useState<{ name: string, email: string, picture: string } | null>(null);
  const [stats, setStats] = useState({ chats: 0, media: 0, likes: 0, hours: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('honey_user');
    const chatHistory = JSON.parse(localStorage.getItem('honey_chat_history') || '[]');
    const mediaCache = JSON.parse(localStorage.getItem('honey_media_cache') || '[]');
    const interactions = JSON.parse(localStorage.getItem('honey_user_interactions') || '{}');
    
    let likeCount = 0;
    Object.values(interactions).forEach((inter: any) => {
      if (inter.liked) likeCount++;
    });

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setStats({
        chats: chatHistory.length,
        media: mediaCache.length,
        likes: likeCount,
        hours: Math.floor(Math.random() * 20) + 5
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('honey_user');
    localStorage.removeItem('honey_profile');
    setUser(null);
    navigate('/');
  };

  if (!user) {
    return (
      <div className="container mx-auto px-6 py-32 text-center animate-fadeIn">
         <div className="glass p-20 rounded-[4rem] border border-honey/20 max-w-2xl mx-auto shadow-[0_0_100px_rgba(255,184,0,0.1)]">
            <i className="fas fa-lock text-6xl text-honey mb-10 drop-shadow-[0_0_15px_#FFB800]"></i>
            <h2 className="text-4xl font-black mb-8 uppercase tracking-tighter">Premium Hisob Kerak</h2>
            <button onClick={() => navigate('/')} className="btn-honey-neon px-12 py-5 uppercase tracking-widest font-black">Bosh sahifaga o'tish</button>
         </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl animate-fadeIn pb-64">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        {/* Left Card */}
        <div className="lg:w-1/3 w-full space-y-12">
           <div className="glass p-12 rounded-[4rem] border border-honey/30 text-center relative overflow-hidden shadow-[0_0_50px_rgba(255,184,0,0.05)]">
              <div className="absolute -inset-10 bg-honey/5 blur-3xl opacity-50"></div>
              <div className="relative mb-12">
                 <div className="w-48 h-48 rounded-[3.5rem] p-1.5 border-4 border-honey/40 mx-auto shadow-[0_0_60px_rgba(255,184,0,0.3)]">
                    <img src={user.picture} alt="Avatar" className="w-full h-full rounded-[3rem] object-cover" />
                 </div>
                 <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-honey rounded-2xl flex items-center justify-center text-black shadow-2xl border-4 border-[#050505]">
                    <i className="fas fa-check-circle text-2xl"></i>
                 </div>
              </div>
              <h3 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">{user.name}</h3>
              <p className="text-honey font-black text-xs tracking-[0.4em] uppercase mb-16">Verified Honey Elite</p>
              
              <div className="space-y-6">
                 <div className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/10 shadow-inner">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">A'zolik</span>
                    <span className="text-xs font-black text-white uppercase tracking-widest">PREMIUM 2025</span>
                 </div>
                 <button onClick={handleLogout} className="w-full py-6 rounded-3xl border-2 border-red-500/20 text-red-500/60 font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-[0_10px_30px_rgba(239,68,68,0.1)]">
                    TIZIMDAN CHIQISH
                 </button>
              </div>
           </div>

           <div className="glass p-10 rounded-[3rem] border border-white/10 space-y-8 shadow-[0_0_30px_rgba(255,255,255,0.02)]">
              <h4 className="text-white font-black uppercase tracking-widest text-xs">Sizning Nishonlaringiz</h4>
              <div className="flex flex-wrap gap-4">
                 {[
                   { label: 'Eksplorer', icon: 'fa-rocket' },
                   { label: 'Mentor', icon: 'fa-crown' },
                   { label: 'Bilimdon', icon: 'fa-brain' }
                 ].map((ach, i) => (
                   <div key={i} className="px-6 py-4 rounded-2xl bg-honey/10 border border-honey/20 text-honey font-black text-[9px] uppercase tracking-widest flex items-center gap-3 shadow-[0_0_15px_rgba(255,184,0,0.1)]">
                      <i className={`fas ${ach.icon}`}></i> {ach.label}
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Right Stats Area */}
        <div className="lg:w-2/3 w-full space-y-12">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Xabarlar', val: stats.chats, icon: 'fa-comments', color: 'text-blue-400', glow: 'shadow-[0_0_20px_rgba(59,130,246,0.2)]' },
                { label: 'Darslar', val: stats.media, icon: 'fa-play', color: 'text-honey', glow: 'shadow-[0_0_20px_rgba(255,184,0,0.2)]' },
                { label: 'Layklar', val: stats.likes, icon: 'fa-heart', color: 'text-red-500', glow: 'shadow-[0_0_20px_rgba(239,68,68,0.2)]' },
                { label: 'O\'qish', val: `${stats.hours}s`, icon: 'fa-clock', color: 'text-emerald-500', glow: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]' }
              ].map((s, i) => (
                <div key={i} className={`glass p-10 rounded-[3.5rem] border border-white/10 flex flex-col items-center hover:border-honey/40 transition-all hover:-translate-y-2 ${s.glow}`}>
                   <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-2xl mb-6 ${s.color} shadow-inner`}>
                      <i className={`fas ${s.icon} drop-shadow-[0_0_8px_currentColor]`}></i>
                   </div>
                   <span className="text-4xl font-black text-white mb-2">{s.val}</span>
                   <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">{s.label}</span>
                </div>
              ))}
           </div>

           <div className="glass p-12 rounded-[4rem] border border-honey/20 relative overflow-hidden shadow-[0_0_50px_rgba(255,184,0,0.05)]">
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-12">Faollik Darajasi</h3>
              <div className="space-y-12">
                 {[
                   { label: 'Muloqot Dinamikasi', val: '88%', color: 'bg-blue-500', shadow: 'shadow-[0_0_15px_rgba(59,130,246,0.4)]' },
                   { label: 'O\'zlashtirish Tezligi', val: '94%', color: 'bg-cyan-400', shadow: 'shadow-[0_0_20px_rgba(34,211,238,0.6)]' }, // Changed to Cyan/Aqua as requested
                   { label: 'Loyiha Sifati', val: '72%', color: 'bg-purple-500', shadow: 'shadow-[0_0_15px_rgba(168,85,247,0.4)]' }
                 ].map((bar, i) => (
                   <div key={i}>
                      <div className="flex justify-between items-center mb-5">
                         <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">{bar.label}</span>
                         <span className="text-sm font-black text-white">{bar.val}</span>
                      </div>
                      <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
                         <div className={`h-full ${bar.color} rounded-full ${bar.shadow} transition-all duration-1000`} style={{ width: bar.val }}></div>
                      </div>
                   </div>
                 ))}
              </div>
              <div className="mt-16 p-10 bg-honey/5 rounded-[2.5rem] border border-honey/20 flex items-start gap-6 shadow-inner">
                 <i className="fas fa-magic text-3xl text-honey mt-1 drop-shadow-[0_0_10px_#FFB800]"></i>
                 <p className="text-gray-400 text-lg font-bold leading-relaxed italic opacity-80">
                   AI Tahlili: Bilim o'zlashtirish ko'rsatkichingiz 15% ga oshdi. Keyingi darslarda amaliy mashg'ulotlarga ko'proq e'tibor qarating!
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
