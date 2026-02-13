
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const HoneyLogo = ({ size = "lg" }: { size?: "sm" | "lg" }) => {
  const hexSize = size === "lg" ? "w-16 h-20" : "w-6 h-7";
  const gap = size === "lg" ? "gap-1.5" : "gap-1";
  
  return (
    <div className={`flex flex-col items-center select-none animate-float`}>
      <div className="flex flex-col items-center">
        <div className={`flex ${gap} mb-[-1.1rem] lg:mb-[-2.4rem]`}>
           <div className={`${hexSize} bg-[#FFB800] clip-hexagon shadow-[0_0_60px_rgba(255,184,0,0.4)]`}></div>
        </div>
        <div className={`flex ${gap} mb-[-1.1rem] lg:mb-[-2.4rem]`}>
          <div className={`${hexSize} bg-[#E1A200] clip-hexagon`}></div>
          <div className={`${hexSize} bg-[#D28100] clip-hexagon`}></div>
        </div>
        <div className={`flex ${gap}`}>
          <div className={`${hexSize} bg-[#3E2413] clip-hexagon`}></div>
          <div className={`${hexSize} bg-[#3E2413] clip-hexagon`}></div>
          <div className={`${hexSize} bg-[#3E2413] clip-hexagon`}></div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-12 lg:mt-24 text-center">
        <span className={`${size === "lg" ? "text-7xl lg:text-9xl" : "text-xl"} font-black text-white honey-glow-text tracking-tighter`}>HONEY</span>
        <span className={`${size === "lg" ? "text-[14px]" : "text-[5px]"} font-black text-gray-500 uppercase tracking-[0.9em] mt-6 max-w-sm`}>
          PREMIUM AI ECOSYSTEM
        </span>
      </div>
    </div>
  );
};

const Home: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const features = [
    { path: '/messenger', title: 'Aqlli Muloqot', desc: 'AI Moderator yordamida guruhlar va kanallarni saralash.', icon: 'fa-comments', color: 'text-blue-400', bg: 'from-blue-500/20' },
    { path: '/media', title: 'Premium Media', desc: 'YouTube darsliklari va bilimlar kutubxonasi.', icon: 'fa-play', color: 'text-honey', bg: 'from-honey/20' },
    { path: '/classroom', title: 'Live Ta\'lim', desc: 'O\'qituvchilar bilan real vaqtda video darslar.', icon: 'fa-chalkboard-user', color: 'text-emerald-400', bg: 'from-emerald-500/20' },
    { path: '/analytics', title: 'Data Tahlil', desc: 'Haftalik o\'sish va faollik statistikasi.', icon: 'fa-chart-pie', color: 'text-purple-400', bg: 'from-purple-500/20' },
    { path: '/library', title: 'E-Kutubxona', desc: 'Minglab elektron va audio kitoblar.', icon: 'fa-book-atlas', color: 'text-cyan-400', bg: 'from-cyan-500/30', isSpecial: true },
    { path: '/profile', title: 'Shaxsiy Kabinet', desc: 'Sizning barcha yutuqlaringiz markazi.', icon: 'fa-user-astronaut', color: 'text-orange-400', bg: 'from-orange-500/20' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-10 pb-64 overflow-visible">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32 mb-64 min-h-[60vh] relative">
        <div className="flex-1 space-y-12 text-center lg:text-left z-20">
          <div className="inline-flex items-center space-x-4 glass px-7 py-3 rounded-2xl border-honey/20 bg-honey/10 animate-pulse shadow-[0_0_15px_rgba(255,184,0,0.2)]">
            <span className="w-2.5 h-2.5 rounded-full bg-honey shadow-[0_0_15px_#FFB800]"></span>
            <span className="text-honey text-[11px] font-black uppercase tracking-[0.6em]">Premium AI Hub</span>
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter text-white leading-none">
            Raqamli <br />
            <span className="liquid-honey-text">Ekotizim</span>
          </h1>
          
          <p className="text-lg lg:text-2xl text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0 font-bold opacity-80">
            Honey — bu nafaqat platforma, balki sizning <span className="text-white border-b-2 border-honey/30 italic">shaxsiy rivojlanishingiz</span> uchun mo'ljallangan aqlli makon.
          </p>
          
          <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-6">
            <button 
              onClick={onStart}
              className="btn-honey-neon px-12 py-5 text-lg font-black tracking-wider shadow-[0_0_40px_rgba(255,184,0,0.3)] hover:scale-105 transition-all"
            >
              HOZIROQ BOSHLASH
            </button>
            <Link to="/security" className="glass px-10 py-5 text-base font-black rounded-2xl border-white/10 hover:border-honey/40 transition-all flex items-center">
              XAVFSIZLIK <i className="fas fa-shield-halved ml-4 text-honey icon-3d"></i>
            </Link>
          </div>
        </div>

        <div className="flex-1 relative flex justify-center py-20 lg:py-24">
          <div className="absolute -inset-48 bg-honey/10 blur-[180px] rounded-full animate-pulse"></div>
          <HoneyLogo size="lg" />
        </div>
      </section>

      {/* Bo'limlar */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-64">
         {features.map((box, i) => (
           <Link key={i} to={box.path} className={`glass p-12 rounded-[3.5rem] border-white/5 bg-gradient-to-br ${box.bg} to-transparent hover:border-honey/40 hover:-translate-y-3 transition-all group overflow-hidden relative`}>
              {box.isSpecial && <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full"></div>}
              <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl mb-8 transition-all ${box.isSpecial ? 'bg-cyan-500/20 group-hover:bg-cyan-400 group-hover:text-[#1A1100]' : 'group-hover:bg-honey group-hover:text-[#1A1100]'} group-hover:shadow-[0_0_30px_currentColor]`}>
                 <i className={`fas ${box.icon} ${box.isSpecial ? 'icon-3d-premium text-cyan-400 group-hover:text-[#1A1100]' : 'group-hover:drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]'} ${box.color}`}></i>
              </div>
              <h3 className={`text-2xl font-black mb-4 uppercase tracking-tighter ${box.isSpecial ? 'text-cyan-400 group-hover:text-white transition-colors' : 'text-white'}`}>{box.title}</h3>
              <p className="text-gray-500 font-bold leading-relaxed">{box.desc}</p>
           </Link>
         ))}
      </section>
    </div>
  );
};

export default Home;
