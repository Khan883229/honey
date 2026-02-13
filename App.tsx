
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Messenger from './pages/Messenger';
import Media from './pages/Media';
import AIAssistant from './pages/AIAssistant';
import Analytics from './pages/Analytics';
import KnowledgeBase from './pages/KnowledgeBase';
import Security from './pages/Security';
import Profile from './pages/Profile';
import Classroom from './pages/Classroom';
import Library from './pages/Library';

const HoneyLogo = ({ size = "sm" }: { size?: "sm" | "lg" }) => {
  const hexSize = size === "lg" ? "w-10 h-12" : "w-5 h-6";
  const gap = size === "lg" ? "gap-1" : "gap-0.5";
  
  return (
    <div className="flex flex-col items-center select-none group">
      <div className="flex flex-col items-center">
        <div className={`flex ${gap} mb-[-0.7rem] lg:mb-[-1.8rem]`}>
           <div className={`${hexSize} bg-[#FFB800] clip-hexagon shadow-[0_0_20px_#FFB800] group-hover:scale-110 transition-transform duration-500`}></div>
        </div>
        <div className={`flex ${gap} mb-[-0.7rem] lg:mb-[-1.8rem]`}>
          <div className={`${hexSize} bg-[#E1A200] clip-hexagon shadow-[0_0_15px_#E1A200]`}></div>
          <div className={`${hexSize} bg-[#D28100] clip-hexagon shadow-[0_0_15px_#D28100]`}></div>
        </div>
        <div className={`flex ${gap}`}>
          <div className={`${hexSize} bg-[#3E2413] clip-hexagon`}></div>
          <div className={`${hexSize} bg-[#3E2413] clip-hexagon`}></div>
          <div className={`${hexSize} bg-[#3E2413] clip-hexagon`}></div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-3 lg:mt-6 text-center">
        <span className={`${size === "lg" ? "text-6xl" : "text-xl"} font-black text-white honey-glow-text tracking-tighter uppercase`}>HONEY</span>
      </div>
    </div>
  );
};

const BottomNav = () => {
  const location = useLocation();
  const navItems = [
    { path: '/', label: 'ASOSIY', icon: 'fa-house' },
    { path: '/messenger', label: 'CHATLAR', icon: 'fa-comments' },
    { path: '/media', label: 'MEDIA', icon: 'fa-play' },
    { path: '/classroom', label: 'LIVE', icon: 'fa-chalkboard-user' },
    { path: '/library', label: 'KITOBLAR', icon: 'fa-book-atlas', special: 'cyan' },
    { path: '/profile', label: 'PROFIL', icon: 'fa-user' },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] w-[95%] max-w-4xl glass rounded-[2.5rem] border border-honey/20 p-2 flex items-center justify-around shadow-[0_0_50px_rgba(255,184,0,0.2)] scale-90 md:scale-100 backdrop-blur-3xl">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const isLibrary = item.special === 'cyan';
        
        return (
          <Link key={item.path} to={item.path} className={`flex flex-col items-center gap-2 px-6 py-4 rounded-3xl transition-all duration-500 relative group ${isActive ? (isLibrary ? 'text-cyan-400' : 'text-honey') : 'text-gray-500 hover:text-white'}`}>
             {isActive && (
               <>
                 <div className={`absolute inset-0 ${isLibrary ? 'bg-cyan-500/10 border-cyan-400/40 shadow-[0_0_20px_rgba(0,240,255,0.3)]' : 'bg-honey/10 border-honey/40 shadow-[0_0_20px_rgba(255,184,0,0.3)]'} rounded-3xl border animate-pulse`}></div>
                 <div className={`absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 ${isLibrary ? 'bg-cyan-400 shadow-[0_0_15px_#00F0FF]' : 'bg-honey shadow-[0_0_15px_#FFB800]'} rounded-full`}></div>
               </>
             )}
             <i className={`fas ${item.icon} text-xl ${isActive ? `scale-125 ${isLibrary ? 'drop-shadow-[0_0_12px_#00F0FF] text-cyan-400' : 'drop-shadow-[0_0_12px_#FFB800] text-honey'}` : 'group-hover:scale-110 transition-all'}`}></i>
             <span className={`text-[9px] font-black tracking-widest ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export const AIOnboardingModal = ({ isOpen, onClose, onComplete }: { isOpen: boolean, onClose: () => void, onComplete: (profile: any) => void }) => {
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [tempProfile, setTempProfile] = useState({ name: '', interest: '', goal: '' });

  const handleNext = () => {
    if (!inputValue.trim()) return;
    
    if (step === 0) {
      setTempProfile(prev => ({ ...prev, name: inputValue }));
      setStep(1);
    } else if (step === 1) {
      setTempProfile(prev => ({ ...prev, interest: inputValue }));
      setStep(2);
    } else if (step === 2) {
      const finalProfile = { ...tempProfile, goal: inputValue };
      localStorage.setItem('honey_profile', JSON.stringify(finalProfile));
      const newUser = {
        name: finalProfile.name,
        email: `${finalProfile.name.toLowerCase().replace(/\s/g, '')}@honey.uz`,
        picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(finalProfile.name)}&background=FFB800&color=000&bold=true`
      };
      localStorage.setItem('honey_user', JSON.stringify(newUser));
      onComplete(newUser);
      onClose();
    }
    setInputValue('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-6">
      <div className="max-w-lg w-full glass p-12 rounded-[4rem] border-honey/30 shadow-[0_0_150px_rgba(255,184,0,0.2)] text-center animate-fadeIn relative">
        <div className="w-24 h-24 bg-honey rounded-[2rem] flex items-center justify-center text-[#1A1100] shadow-[0_0_40px_rgba(255,184,0,0.5)] mx-auto mb-10 animate-bounce">
          <i className="fas fa-robot text-4xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"></i>
        </div>
        
        <h2 className="text-3xl font-black mb-8 leading-tight text-white min-h-[100px] uppercase tracking-tighter">
          {step === 0 && "Assalomu alaykum! Ismingiz nima?"}
          {step === 1 && `Ajoyib, ${tempProfile.name}! Nimalarga qiziqasiz?`}
          {step === 2 && "Maqsadingiz nima?"}
        </h2>
        
        <input 
          autoFocus
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full bg-white/5 border border-honey/20 rounded-3xl px-8 py-6 outline-none focus:border-honey text-honey font-black text-center text-2xl mb-8 shadow-inner"
          placeholder="Javobni kiriting..."
          onKeyDown={(e) => e.key === 'Enter' && handleNext()}
        />
        
        <button 
          onClick={handleNext}
          className="w-full btn-honey-neon py-6 text-lg font-black tracking-widest uppercase mb-6 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,184,0,0.4)]"
        >
          {step === 2 ? "TAYYOR" : "DAVOM ETISH"}
        </button>
      </div>
    </div>
  );
};

const Navbar = ({ user, onOpenAuth }: { user: any, onOpenAuth: () => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 px-8 lg:px-16 py-4 flex items-center justify-between ${
      scrolled ? 'bg-black/95 backdrop-blur-3xl border-b border-honey/10 py-4 shadow-2xl' : 'bg-transparent py-8'
    }`}>
      <Link to="/" className="flex items-center hover:opacity-80 transition-all">
        <HoneyLogo size="sm" />
      </Link>
      
      <div className="flex items-center space-x-6">
        {user ? (
          <Link to="/profile" className="flex items-center gap-4 glass p-1.5 pr-6 rounded-2xl border-honey/30 hover:bg-honey/10 transition-all shadow-[0_0_15px_rgba(255,184,0,0.1)]">
             <img src={user.picture} alt="P" className="w-10 h-10 rounded-xl border border-honey/20" />
             <span className="text-xs font-black text-white uppercase tracking-widest">{user.name.split(' ')[0]}</span>
          </Link>
        ) : (
          <button onClick={onOpenAuth} className="btn-honey-neon px-12 py-5 text-[12px] uppercase tracking-widest font-black">
            KIRISH
          </button>
        )}
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('honey_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      const timer = setTimeout(() => setIsAuthOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleComplete = (newUser: any) => {
    setUser(newUser);
    setIsAuthOpen(false);
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-transparent">
        <AIOnboardingModal 
          isOpen={isAuthOpen} 
          onClose={() => setIsAuthOpen(false)} 
          onComplete={handleComplete}
        />
        <Navbar user={user} onOpenAuth={() => setIsAuthOpen(true)} />
        <main className="flex-1 pt-32 lg:pt-40">
          <Routes>
            <Route path="/" element={<Home onStart={() => setIsAuthOpen(true)} />} />
            <Route path="/messenger" element={<Messenger />} />
            <Route path="/media" element={<Media />} />
            <Route path="/ai" element={<AIAssistant />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/knowledge" element={<KnowledgeBase />} />
            <Route path="/classroom" element={<Classroom />} />
            <Route path="/library" element={<Library />} />
            <Route path="/security" element={<Security />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        
        <BottomNav />
        
        <footer className="bg-black/40 backdrop-blur-md py-40 px-10 border-t border-honey/5 mt-auto">
          <div className="max-w-7xl mx-auto text-center space-y-8">
            <HoneyLogo size="sm" />
            <p className="text-gray-600 text-[10px] font-black opacity-30 tracking-[1em] pt-12">
              HONEY ECOSYSTEM • PREMIUM DIGITAL STANDARD
            </p>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
