
import React, { useState, useEffect, useRef } from 'react';
import { chatWithHoneyAI } from '../services/geminiService';
import { Message } from '../types';

const Messenger: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('honey_chat_history');
    return saved ? JSON.parse(saved).map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })) : [
      { id: '1', sender: 'ai', text: "Honey AI Moderator faol. Xizmatga tayyorman! 🐝", timestamp: new Date() },
    ];
  });
  
  const [inputText, setInputText] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'groups' | 'channels'>('all');
  const [activeChat, setActiveChat] = useState(() => {
    const saved = localStorage.getItem('honey_active_chat');
    return saved ? JSON.parse(saved) : { name: 'Honey AI Moderator', icon: 'fa-robot' };
  });
  
  const [isCreating, setIsCreating] = useState(false);
  const [userInterest, setUserInterest] = useState('Dasturlash');
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('honey_profile') || '{}');
    if (profile.interest) setUserInterest(profile.interest);
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    
    localStorage.setItem('honey_chat_history', JSON.stringify(messages));
    localStorage.setItem('honey_active_chat', JSON.stringify(activeChat));
  }, [messages, activeChat]);

  const getDynamicContent = () => {
    const interest = userInterest.toLowerCase();
    if (interest.includes('biznes') || interest.includes('business')) {
      return {
        groups: [
          { name: 'Uzbekistan Business Strategy', last: 'Investorlar uchun imkoniyatlar', icon: 'fa-briefcase' },
          { name: 'Startup Ecosystem Hub', last: 'Bugungi masterklass havolasi', icon: 'fa-chart-line' }
        ],
        channels: [
          { name: 'Honey Business Daily', last: 'E-commerce yangiliklari', icon: 'fa-shop' },
          { name: 'Digital Marketing Expert', last: 'Sotuv kanallari tahlili', icon: 'fa-bullhorn' }
        ]
      };
    } else if (interest.includes('it') || interest.includes('dastur') || interest.includes('kod')) {
      return {
        groups: [
          { name: 'Developers Uzbekistan', last: 'React 19 release candidate', icon: 'fa-code' },
          { name: 'AI & Machine Learning Group', last: 'Gemini 3.0 imkoniyatlari', icon: 'fa-microchip' }
        ],
        channels: [
          { name: 'Clean Code Uzbekistan', last: 'Refactoring sirlari', icon: 'fa-terminal' },
          { name: 'Honey Tech Academy', last: 'Yangi darsliklar chiqdi!', icon: 'fa-laptop-code' }
        ]
      };
    }
    return {
      groups: [{ name: `${userInterest} Jamoasi`, last: 'Muloqotni boshlang', icon: 'fa-users' }],
      channels: [{ name: `${userInterest} News`, last: 'Oxirgi ma\'lumotlar', icon: 'fa-bullhorn' }]
    };
  };

  const content = getDynamicContent();

  const handleSend = async () => {
    if (!inputText.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: inputText, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    
    const res = await chatWithHoneyAI(inputText, `Siz ${userInterest} mavzusida ekspertsiz. Javoblaringizni shunga moslang.`);
    setMessages(prev => [...prev, { id: (Date.now()+1).toString(), sender: 'ai', text: res, timestamp: new Date() }]);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 h-[calc(100vh-220px)] flex gap-8 animate-fadeIn pb-10 relative">
      {isCreating && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-xl p-6">
           <div className="glass p-12 rounded-[4rem] border-honey/20 max-w-md w-full text-center">
              <h3 className="text-3xl font-black mb-6 honey-glow-text">Yangi Jamoa</h3>
              <input className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 outline-none focus:border-honey text-white font-bold mb-8" placeholder="Nomi..." />
              <div className="flex gap-4">
                 <button onClick={() => setIsCreating(false)} className="flex-1 py-5 rounded-2xl bg-white/5 font-black uppercase tracking-widest text-[10px]">Bekor qilish</button>
                 <button onClick={() => setIsCreating(false)} className="flex-1 btn-honey-neon py-5 rounded-2xl font-black uppercase tracking-widest text-[10px]">Yaratish</button>
              </div>
           </div>
        </div>
      )}

      {/* Sidebar */}
      <div className="w-80 glass rounded-[3rem] border-white/10 flex flex-col overflow-hidden hidden md:flex shadow-2xl">
        <div className="p-8 border-b border-white/5 bg-white/[0.02] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-honey uppercase tracking-[0.2em] text-[10px]">Filtrlangan: {userInterest}</h3>
            <button onClick={() => setIsCreating(true)} className="w-10 h-10 rounded-2xl bg-honey/10 text-honey flex items-center justify-center hover:bg-honey hover:text-black transition-all">
              <i className="fas fa-plus"></i>
            </button>
          </div>
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
            {['all', 'groups', 'channels'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all ${activeTab === tab ? 'bg-honey text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
              >
                {tab === 'all' ? 'Barchasi' : tab === 'groups' ? 'Guruh' : 'Kanal'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {activeTab === 'all' && (
            <div onClick={() => setActiveChat({ name: 'Honey AI Moderator', icon: 'fa-robot' })}
              className={`flex items-center gap-4 p-5 rounded-[2rem] cursor-pointer transition-all border ${activeChat.name === 'Honey AI Moderator' ? 'bg-honey/15 border-honey/40 shadow-xl' : 'hover:bg-white/5 border-transparent'}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-honey text-black flex items-center justify-center text-xl shrink-0 shadow-lg shadow-honey/20"><i className="fas fa-robot icon-3d"></i></div>
              <div className="flex-1 min-w-0">
                <h4 className="font-black text-[13px] truncate uppercase tracking-tight text-white">AI Moderator</h4>
                <p className="text-[11px] text-honey font-black animate-pulse uppercase">Online</p>
              </div>
            </div>
          )}

          {(activeTab === 'all' || activeTab === 'groups') && content.groups.map((chat, i) => (
            <div key={i} onClick={() => setActiveChat({ name: chat.name, icon: chat.icon })}
              className={`flex items-center gap-4 p-5 rounded-[2rem] cursor-pointer transition-all border ${activeChat.name === chat.name ? 'bg-honey/15 border-honey/40 shadow-xl' : 'hover:bg-white/5 border-transparent'}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 text-honey flex items-center justify-center text-xl shrink-0"><i className={`fas ${chat.icon} icon-3d`}></i></div>
              <div className="flex-1 min-w-0">
                <h4 className="font-black text-[13px] truncate uppercase tracking-tight text-white">{chat.name}</h4>
                <p className="text-[11px] text-gray-400 truncate font-bold opacity-60">{chat.last}</p>
              </div>
            </div>
          ))}

          {(activeTab === 'all' || activeTab === 'channels') && content.channels.map((chat, i) => (
            <div key={i} onClick={() => setActiveChat({ name: chat.name, icon: chat.icon })}
              className={`flex items-center gap-4 p-5 rounded-[2rem] cursor-pointer transition-all border ${activeChat.name === chat.name ? 'bg-honey/15 border-honey/40 shadow-xl' : 'hover:bg-white/5 border-transparent'}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-xl shrink-0"><i className={`fas ${chat.icon} icon-3d`}></i></div>
              <div className="flex-1 min-w-0">
                <h4 className="font-black text-[13px] truncate uppercase tracking-tight text-white">{chat.name}</h4>
                <p className="text-[11px] text-gray-400 truncate font-bold opacity-60">{chat.last}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 glass rounded-[4rem] border-white/10 flex flex-col overflow-hidden shadow-2xl">
        <div className="p-10 border-b border-white/5 flex items-center justify-between bg-white/[0.04] backdrop-blur-3xl">
          <div className="flex items-center space-x-6">
            <div className={`w-16 h-16 rounded-[1.8rem] flex items-center justify-center shadow-2xl ${activeChat.name.includes('AI') ? 'bg-honey text-black' : 'bg-white/10 text-white'}`}>
              <i className={`fas ${activeChat.icon} text-2xl`}></i>
            </div>
            <div>
              <h3 className="text-2xl font-black text-white tracking-tighter uppercase">{activeChat.name}</h3>
              <p className="text-[11px] text-emerald-500 font-black uppercase tracking-[0.4em] mt-1">Sizga bog'langan xavfsiz muhit</p>
            </div>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-12 bg-black/20 custom-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] p-8 rounded-[3.5rem] shadow-2xl relative ${msg.sender === 'user' ? 'bg-[#FFB800] text-black font-black' : 'glass border-white/10 text-white font-bold'}`}>
                <p className="text-xl leading-relaxed tracking-tight">{msg.text}</p>
                <div className={`absolute bottom-[-35px] ${msg.sender === 'user' ? 'right-8' : 'left-8'} text-[10px] text-gray-500 font-black uppercase`}>
                  {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-10 border-t border-white/5 bg-black/30 backdrop-blur-xl">
          <div className="flex items-center space-x-6 bg-white/5 p-4 rounded-[3.5rem] border border-white/10 focus-within:border-honey shadow-inner">
            <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Xabar yozing..." 
              className="flex-1 bg-transparent border-none outline-none text-white font-black text-xl py-4 resize-none h-16"
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            />
            <button onClick={handleSend} className="w-16 h-16 bg-honey text-black rounded-[1.8rem] flex items-center justify-center shadow-[0_0_30px_rgba(255,184,0,0.4)] hover:scale-110 transition-all shrink-0">
              <i className="fas fa-paper-plane text-2xl"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
