
import React, { useState, useEffect } from 'react';
import { searchEducationalContent } from '../services/geminiService';

const Library: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState<any | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      const profile = JSON.parse(localStorage.getItem('honey_profile') || '{}');
      const interest = profile.interest || "Philosophy and Science";
      
      const query = `Top 10 recommended professional PDF books and audiobooks about ${interest}. Focus on education and deep knowledge.`;
      const results = await searchEducationalContent(query);
      
      const curated = (results.sources || []).map((src: any, i: number) => ({
        id: i,
        title: src.web?.title || `${interest} Mastery Vol ${i+1}`,
        author: "Honey Premium Author",
        type: i % 2 === 0 ? 'PDF' : 'AUDIO',
        img: `https://picsum.photos/600/800?random=${i + 300}`,
        description: "Ushbu premium kitob sizning bilimingizni yangi bosqichga olib chiqish uchun saralangan.",
        url: src.web?.uri || "#"
      }));

      setBooks(curated);
      setIsLoading(false);
    };

    fetchBooks();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 pb-64 animate-fadeIn">
      <div className="flex flex-col md:flex-row items-center justify-between mb-24">
        <div className="group">
           <div className="inline-flex items-center space-x-6 mb-6">
              <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.2)]">
                <i className="fas fa-book-atlas text-5xl text-cyan-400 icon-3d-premium"></i>
              </div>
              <div>
                <span className="text-[12px] font-black uppercase tracking-[0.5em] text-cyan-400 block mb-1">Elite Digital Library</span>
                <h1 className="text-6xl lg:text-8xl font-black text-white tracking-tighter uppercase drop-shadow-[0_0_20px_rgba(0,240,255,0.1)]">KUTUBXONA</h1>
              </div>
           </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-64">
           <div className="w-20 h-20 border-8 border-cyan-500 border-t-transparent rounded-full animate-spin mb-8 shadow-[0_0_30px_rgba(0,240,255,0.3)]"></div>
           <p className="text-cyan-400 font-black uppercase tracking-widest animate-pulse">Kitoblar Saralanmoqda...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {books.map((book) => (
            <div key={book.id} onClick={() => setSelectedBook(book)} className="flex flex-col space-y-6 group cursor-pointer animate-fadeIn">
              <div className="aspect-[3/4] rounded-[3rem] border border-white/5 overflow-hidden relative shadow-2xl group-hover:border-cyan-400/50 transition-all duration-500 bg-white/5">
                 <img src={book.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" alt={book.title} />
                 <div className="absolute top-6 right-6 w-14 h-14 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center text-[#1A1100] shadow-[0_0_20px_rgba(0,240,255,0.4)] group-hover:scale-110 transition-transform">
                    <i className={`fas ${book.type === 'AUDIO' ? 'fa-headphones' : 'fa-file-pdf'} text-xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]`}></i>
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <span className="text-cyan-400 font-black text-[10px] uppercase tracking-widest">OCHISH UCHUN BOSING</span>
                 </div>
              </div>
              <div className="text-center px-4">
                 <h4 className="font-black text-xl leading-tight group-hover:text-cyan-400 transition-colors uppercase tracking-tight line-clamp-2">{book.title}</h4>
                 <p className="text-gray-500 font-bold mt-2 uppercase text-[10px] tracking-widest">{book.author}</p>
                 <div className="mt-6 inline-block px-6 py-2 glass border-cyan-500/20 rounded-full text-[10px] font-black uppercase text-cyan-400 tracking-widest shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                    {book.type} FORMAT
                 </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Book Detail Modal */}
      {selectedBook && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-xl p-6 animate-fadeIn">
           <div className="max-w-4xl w-full glass p-12 rounded-[4rem] border border-cyan-400/30 shadow-[0_0_100px_rgba(0,240,255,0.15)] flex flex-col md:flex-row gap-12 relative overflow-hidden">
              <button onClick={() => setSelectedBook(null)} className="absolute top-8 right-8 text-gray-500 hover:text-cyan-400 text-2xl transition-colors">
                 <i className="fas fa-times-circle"></i>
              </button>
              
              <div className="w-full md:w-1/3 aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10">
                 <img src={selectedBook.img} className="w-full h-full object-cover" alt={selectedBook.title} />
              </div>
              
              <div className="flex-1 flex flex-col justify-center space-y-8">
                 <div className="space-y-4">
                    <span className="text-cyan-400 font-black text-xs tracking-[0.5em] uppercase">{selectedBook.type} PREMIUM</span>
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">{selectedBook.title}</h2>
                    <p className="text-gray-500 font-black uppercase tracking-widest text-[11px]">Muallif: {selectedBook.author}</p>
                 </div>
                 
                 <p className="text-gray-300 text-lg leading-relaxed font-bold opacity-80">{selectedBook.description}</p>
                 
                 <div className="flex gap-6 pt-6">
                    <a href={selectedBook.url} target="_blank" rel="noreferrer" className="flex-1 bg-gradient-to-br from-cyan-400 to-cyan-600 text-[#1A1100] font-black py-6 rounded-2xl flex items-center justify-center gap-4 text-sm tracking-widest shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:scale-105 transition-all">
                       <i className={`fas ${selectedBook.type === 'AUDIO' ? 'fa-play' : 'fa-book-open'} drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]`}></i>
                       {selectedBook.type === 'AUDIO' ? "TINGLASHNI BOSHLASH" : "HOZIROQ O'QISH"}
                    </a>
                    <button className="px-10 py-6 rounded-2xl glass border-cyan-500/20 text-cyan-400 font-black hover:bg-cyan-400 hover:text-[#1A1100] transition-all group">
                       <i className="fas fa-bookmark group-hover:drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]"></i>
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Library;
