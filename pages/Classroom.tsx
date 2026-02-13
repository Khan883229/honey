
import React, { useState } from 'react';

const Classroom: React.FC = () => {
  const [isLive, setIsLive] = useState(true);
  const participants = [
    { name: 'Sardorbek (O\'qituvchi)', role: 'Teacher', img: 'https://i.pravatar.cc/150?u=sardor' },
    { name: 'Nilufar M.', role: 'Student', img: 'https://i.pravatar.cc/150?u=nilu' },
    { name: 'Javohir K.', role: 'Student', img: 'https://i.pravatar.cc/150?u=java' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20 animate-fadeIn">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 space-y-8">
          <div className="relative aspect-video glass-dark rounded-[3.5rem] border-white/10 overflow-hidden shadow-2xl">
            {isLive ? (
              <>
                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-60" alt="Live" />
                <div className="absolute inset-0 flex flex-col justify-between p-10">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <span className="bg-red-600 text-white px-5 py-2 rounded-xl text-[10px] font-black animate-pulse flex items-center gap-2 shadow-lg shadow-red-600/30">
                        <span className="w-2 h-2 bg-white rounded-full"></span> LIVE
                      </span>
                      <span className="glass border-white/10 px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest">124 Ishtirokchi</span>
                    </div>
                    <button className="btn-secondary w-12 h-12 flex items-center justify-center"><i className="fas fa-expand"></i></button>
                  </div>
                  
                  <div className="flex justify-center gap-8">
                    <button className="w-16 h-16 btn-secondary rounded-full flex items-center justify-center text-xl"><i className="fas fa-microphone-slash"></i></button>
                    <button className="w-20 h-20 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl shadow-2xl hover:scale-110 transition-all"><i className="fas fa-phone-slash"></i></button>
                    <button className="w-16 h-16 btn-secondary rounded-full flex items-center justify-center text-xl"><i className="fas fa-video"></i></button>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center space-y-8">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-honey text-4xl border border-honey/20">
                    <i className="fas fa-chalkboard"></i>
                </div>
                <p className="text-gray-500 font-bold uppercase tracking-widest">Dars hozirda mavjud emas</p>
                <button onClick={() => setIsLive(true)} className="btn-primary px-10 py-4">Darsni Boshlash</button>
              </div>
            )}
          </div>

          <div className="glass p-12 rounded-[3.5rem] border-white/5 space-y-6">
            <h1 className="text-4xl font-black honey-gradient-text tracking-tighter">Najot Ta'lim: Professional SMM & Design Masterclass</h1>
            <p className="text-gray-400 text-lg leading-relaxed font-medium">Bugungi darsda biz interaktiv dizayn va brending asoslarini o'rganamiz. Loyihalarni qanday qilib ishonchli qilish bo'yicha amaliy maslahatlar beriladi.</p>
          </div>
        </div>

        <div className="w-full lg:w-96 flex flex-col gap-8">
          <div className="glass-dark rounded-[3.5rem] border-white/10 flex flex-col h-[600px] overflow-hidden">
             <div className="p-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
                <h3 className="font-black text-honey uppercase tracking-widest text-[10px]">Ishtirokchilar</h3>
                <span className="text-[10px] font-black text-gray-500 bg-black px-3 py-1 rounded-lg">24 ON</span>
             </div>
             <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {participants.map((p, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl transition-all group">
                    <div className={`w-12 h-12 rounded-xl overflow-hidden border-2 shrink-0 ${p.role === 'Teacher' ? 'border-honey shadow-lg' : 'border-white/10'}`}>
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-sm truncate ${p.role === 'Teacher' ? 'text-honey' : 'text-gray-200'}`}>{p.name}</p>
                      <p className="text-[10px] text-gray-600 font-black uppercase tracking-tighter">{p.role}</p>
                    </div>
                  </div>
                ))}
             </div>
             <div className="p-6 bg-black border-t border-white/5">
                <div className="relative">
                   <input placeholder="Suhbatga qo'shiling..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-honey transition-all text-xs font-bold" />
                   <button className="absolute right-4 top-1/2 -translate-y-1/2 text-honey hover:scale-125 transition-all"><i className="fas fa-paper-plane"></i></button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classroom;
