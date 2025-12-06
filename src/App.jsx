import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, Music, Smile } from 'lucide-react';

// --- CONFIG ---
const MUSIC_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

// --- PANDA ASSETS ---
const PANDAS = [
  "image_4.png", // [0] Minum Cola
  "image_8.png", // [1] Kostum Sapi
  "image_5.png", // [2] Topi Pink
  "image_9.png", // [3] Malu-malu (Motivator)
  "image_7.png", // [4] Main HP
  "image_6.png", // [5] Minum Cola Lagi
];

// --- DATA: MOOD OPTIONS ---
const MOODS = [
  { id: 'chill', label: 'Santuy', icon: PANDAS[0], color: 'bg-blue-100' },
  { id: 'playful', label: 'Iseng', icon: PANDAS[1], color: 'bg-orange-100' },
  { id: 'shy', label: 'Kangen', icon: PANDAS[3], color: 'bg-pink-100' },
  { id: 'busy', label: 'Sibuk', icon: PANDAS[4], color: 'bg-green-100' },
];

// --- DATA: MOTIVASI ---
const QUOTES = [
  "Kamu sudah melakukan yang terbaik hari ini! 🌟",
  "Jangan lupa istirahat, kamu bukan robot. 🐼",
  "Semangat! Hal indah sedang menunggumu.",
  "Tarik napas... Hembuskan... Semua akan baik-baik saja.",
  "Kamu itu lebih kuat dari yang kamu kira! 💪",
  "Ingat, badai pasti berlalu (tapi jemuran diangkat dulu).",
  "Senyum kamu itu nular loh, jangan cemberut! 😊",
  "Percaya proses, hasil nggak bakal bohong.",
  "Hari esok adalah peluang baru! ✨"
];

// --- DATA: ALBUMS ---
const albumsData = [
  {
    id: 'ch1', title: "Awal Ketemu", subtitle: "Deg-degan ih!", color: "bg-pink-100", border: "border-pink-300",
    cover: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&q=75",
    photos: [
      { id: 1, src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&q=75", caption: "Hai kamu! 👋" },
      { id: 2, src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&q=75", caption: "Senyum manis 🍬" },
    ]
  },
  {
    id: 'ch2', title: "Jalan-Jalan", subtitle: "Nge-date teruus", color: "bg-blue-100", border: "border-blue-300",
    cover: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&q=75",
    photos: [
      { id: 3, src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&q=75", caption: "Otw nih 🚗" },
    ]
  },
  {
    id: 'ch3', title: "Kulineran", subtitle: "Diet mulai besok", color: "bg-orange-100", border: "border-orange-300",
    cover: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&q=75",
    photos: [
      { id: 4, src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&q=75", caption: "Nyam! 🍔" },
    ]
  },
];

// --- COMPONENTS ---

// 1. Global Styles (Animasi Diperlambat agar tidak pusing)
const GlobalStyles = () => (
  <style>{`
    @keyframes float { 
      0% { transform: translateY(0px) rotate(0deg); } 
      50% { transform: translateY(-15px) rotate(5deg); } 
      100% { transform: translateY(0px) rotate(0deg); } 
    }
    /* Durasi animasi diperlambat (10s, 12s, 14s) agar lebih calm */
    .animate-float { animation: float 10s ease-in-out infinite; }
    .animate-float-delayed { animation: float 12s ease-in-out 1s infinite; }
    .animate-float-slow { animation: float 14s ease-in-out 2s infinite; }
    
    body { font-family: 'Fredoka', sans-serif; background-color: #FFFBF0; }
  `}</style>
);

// 2. Background Panda
const PandaCrowd = ({ activeIcon }) => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#FBCFE8 3px, transparent 3px)', backgroundSize: '40px 40px' }}></div>
    
    <img src={activeIcon} className="absolute top-5 left-2 w-24 md:w-32 animate-float opacity-90 drop-shadow-md transition-all duration-500" alt="bg" />
    <img src={activeIcon} className="absolute top-1/4 left-[-15px] w-20 md:w-28 animate-float-delayed opacity-85 rotate-12 transition-all duration-500" alt="bg" />
    <img src={activeIcon} className="absolute bottom-1/3 left-5 w-22 md:w-30 animate-float-slow opacity-90 transition-all duration-500" alt="bg" />
    <img src={activeIcon} className="absolute bottom-20 left-[-5px] w-20 md:w-26 animate-float opacity-80 -rotate-6 transition-all duration-500" alt="bg" />
    
    <img src={activeIcon} className="absolute top-8 right-2 w-24 md:w-34 animate-float-slow opacity-90 drop-shadow-md transition-all duration-500" alt="bg" />
    <img src={activeIcon} className="absolute top-1/3 right-[-10px] w-20 md:w-28 animate-float opacity-85 -rotate-12 transition-all duration-500" alt="bg" />
    <img src={activeIcon} className="absolute bottom-1/4 right-5 w-22 md:w-30 animate-float-delayed opacity-90 rotate-6 transition-all duration-500" alt="bg" />
    <img src={activeIcon} className="absolute bottom-10 right-[-15px] w-24 md:w-32 animate-float-slow opacity-80 transition-all duration-500" alt="bg" />
  </div>
);

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(MUSIC_URL));
  useEffect(() => { audioRef.current.loop = true; return () => audioRef.current.pause(); }, []);
  const togglePlay = () => { isPlaying ? audioRef.current.pause() : audioRef.current.play(); setIsPlaying(!isPlaying); };
  return (
    <button onClick={togglePlay} className={`fixed bottom-6 right-6 z-50 p-3 rounded-full border-4 border-white shadow-lg transition-transform active:scale-90 ${isPlaying ? 'bg-pink-400 rotate-12' : 'bg-gray-300'}`}>
      <Music size={24} className="text-white" />
    </button>
  );
};

// 3. PANDA MOTIVATOR (Durasi Diperpanjang)
const PandaMotivator = () => {
  const [quote, setQuote] = useState(null);
  const timeoutRef = useRef(null);

  const showMotivation = () => {
    // Clear timeout lama jika user klik cepat berkali-kali
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const random = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setQuote(random);
    
    // Durasi diperpanjang jadi 8 DETIK (8000ms)
    timeoutRef.current = setTimeout(() => setQuote(null), 8000);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start group">
       <AnimatePresence>
         {quote && (
           <motion.div
             initial={{ opacity: 0, y: 10, scale: 0.8 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, scale: 0.5 }}
             className="mb-3 bg-white p-4 rounded-2xl rounded-bl-none shadow-xl border-4 border-pink-200 max-w-[220px] relative z-50 origin-bottom-left"
           >
              <p className="font-['Fredoka'] text-gray-600 text-sm font-bold leading-relaxed">
                "{quote}"
              </p>
           </motion.div>
         )}
       </AnimatePresence>

       <motion.button 
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={showMotivation}
          className="w-16 h-16 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden relative z-50 cursor-pointer"
       >
          <img src={PANDAS[3]} className="w-full h-full object-cover" alt="panda motivator" />
       </motion.button>
       
       <span className="absolute -bottom-6 left-1 bg-white/50 px-2 py-0.5 rounded-full text-[10px] font-bold text-gray-500 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Klik aku! 🐼
       </span>
    </div>
  );
};

// 4. Mood Section (Layout Responsive)
const MoodSection = ({ currentMood, setMood }) => (
  <div className="mb-8">
    <div className="text-center mb-4">
      <span className="bg-white/50 px-4 py-1 rounded-full text-xs font-bold text-gray-500 border border-gray-100">
        Mood hari ini? 👇
      </span>
    </div>
    <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
      {MOODS.map((m) => (
        <motion.button
          key={m.id}
          whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}
          onClick={() => setMood(m)}
          className={`relative p-2 rounded-2xl border-4 ${currentMood.id === m.id ? 'border-pink-400 bg-white scale-110 shadow-lg' : 'border-white bg-white/50 grayscale hover:grayscale-0'} transition-all`}
        >
          <img src={m.icon} className="w-12 h-12 md:w-16 md:h-16 object-contain" alt={m.label} />
          {currentMood.id === m.id && (
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-pink-400 text-white text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap">
              {m.label}
            </div>
          )}
        </motion.button>
      ))}
    </div>
  </div>
);

// 5. Album Card
const AlbumCard = ({ album, onClick }) => (
  <motion.div whileTap={{ scale: 0.95 }} onClick={() => onClick(album)} className="relative cursor-pointer group">
    <div className="bg-white p-3 pb-6 md:pb-8 rounded-2xl border-4 border-white shadow-[4px_4px_0px_rgba(0,0,0,0.05)] group-hover:shadow-[8px_8px_0px_rgba(244,114,182,1)] group-hover:-translate-y-1 transition-all duration-200 h-full">
      <div className={`h-32 md:h-48 overflow-hidden rounded-xl border-4 ${album.border} ${album.color} relative`}>
        <img src={album.cover} alt={album.title} loading="lazy" className="w-full h-full object-cover" />
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-sm md:text-lg font-bold text-gray-700">{album.title}</h3>
        <p className="text-xs text-gray-400 mt-1">{album.subtitle}</p>
      </div>
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 md:w-16 h-4 md:h-5 bg-pink-200/80 -rotate-2"></div>
    </div>
  </motion.div>
);

// 6. Album View
const AlbumView = ({ album, onBack, onPhotoClick }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="min-h-screen relative z-40">
      <div className="fixed inset-0 bg-white/40 backdrop-blur-md z-0 pointer-events-none"></div>

      <div className="sticky top-0 z-50 px-4 py-3 bg-[#FFFBF0]/90 backdrop-blur-md flex items-center gap-4 border-b-4 border-pink-100 shadow-sm">
        <button onClick={onBack} className="bg-white border-2 border-pink-300 text-pink-500 p-2 rounded-full shadow-sm active:scale-90 transition-transform"><ArrowLeft size={20} strokeWidth={3} /></button>
        <h2 className="text-lg font-bold text-gray-700 truncate">{album.title}</h2>
      </div>
      
      <div className="px-4 py-8 relative z-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {album.photos.map((photo) => (
            <motion.div key={photo.id} initial={{ scale: 0.9 }} whileInView={{ scale: 1 }} viewport={{ once: true }} className="bg-white p-2 pb-8 rounded-lg shadow-sm border-2 border-gray-100 rotate-1 hover:rotate-0 hover:z-10 transition-all duration-200 cursor-pointer" onClick={() => onPhotoClick(photo)}>
               <img src={photo.src} loading="lazy" className="w-full rounded-md aspect-square object-cover" alt="memory" />
               <p className="text-center mt-3 text-gray-500 font-medium text-sm">✨ {photo.caption} ✨</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// 7. Lightbox
const Lightbox = ({ photo, onClose }) => {
  if (!photo) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-white p-3 rounded-2xl max-w-md w-full border-4 border-pink-200 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-4 -right-4 bg-red-400 text-white p-2 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform"><X size={20}/></button>
        <img src={photo.src} className="w-full rounded-xl" alt="detail" />
        <p className="text-center mt-4 text-xl font-bold text-pink-500">{photo.caption}</p>
      </motion.div>
    </div>
  );
};

// --- MAIN APP ---
function App() {
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentMood, setMood] = useState(MOODS[0]); 

  return (
    <div className="min-h-screen text-gray-800 overflow-x-hidden relative bg-[#FFFBF0]">
      <GlobalStyles />
      <PandaCrowd activeIcon={currentMood.icon} />
      <MusicPlayer />
      <PandaMotivator />

      <AnimatePresence mode="wait">
        {!activeAlbum ? (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-10 px-4">
            
            {/* CONTAINER UTAMA (RESPONSIVE WIDTH) */}
            <div className="max-w-lg md:max-w-3xl lg:max-w-5xl mx-auto pb-24">
                <div className="bg-white/70 backdrop-blur-md rounded-[30px] p-6 md:p-10 shadow-sm border-4 border-white">
                    
                    <div className="text-center mb-8">
                      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2 drop-shadow-sm">Panda <span className="text-pink-400">Journal</span></h1>
                      <p className="text-xs md:text-sm text-gray-500 font-medium">Tempat kenangan kita tersimpan 🍯</p>
                    </div>

                    <MoodSection currentMood={currentMood} setMood={setMood} />

                    <div className="flex items-center gap-2 mb-4 px-2 mt-8">
                      <Smile className="text-pink-400 w-5 h-5" />
                      <h2 className="font-bold text-gray-700 text-lg">Album Foto</h2>
                    </div>
                    
                    {/* GRID ALBUM RESPONSIVE: 2 kolom di HP, 3 kolom di Tablet/PC */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                      {albumsData.map((album) => (<AlbumCard key={album.id} album={album} onClick={setActiveAlbum} />))}
                    </div>

                    
                </div>
            </div>

          </motion.div>
        ) : (
          <AlbumView key="album" album={activeAlbum} onBack={() => setActiveAlbum(null)} onPhotoClick={setSelectedPhoto} />
        )}
      </AnimatePresence>
      <Lightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </div>
  );
}

export default App;