import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, Music, Smile, Download } from 'lucide-react';

// --- CONFIG ---
// Ganti "lagu-kita.mp3" sesuai nama file yang kamu taruh di folder PUBLIC
const MUSIC_URL = "/lagu-kita.mp3"; 

// --- PANDA ASSETS ---
const PANDAS = [
  "image_4.png", "image_8.png", "image_5.png", 
  "image_9.png", "image_7.png", "image_6.png"
];

// --- DATA: MOOD OPTIONS ---
const MOODS = [
  { id: 'chill', label: '', icon: PANDAS[0], color: 'bg-blue-100' },
  { id: 'playful', label: '', icon: PANDAS[1], color: 'bg-orange-100' },
  { id: 'shy', label: '', icon: PANDAS[3], color: 'bg-pink-100' },
  { id: 'busy', label: '', icon: PANDAS[4], color: 'bg-green-100' },
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
    id: 'ch1', title: "BC", subtitle: "Sipaling baru ketemu!", color: "bg-pink-100", border: "border-pink-300",
    cover: "https://ik.imagekit.io/shs2lyltu/Photos/BC/Image_%20(1).jpg",
    photos: [
      { id: 1, src: "https://ik.imagekit.io/shs2lyltu/Photos/BC/Image_%20(1).jpg", caption: "Canggung amat wkwk" },
      { id: 2, src: "https://ik.imagekit.io/shs2lyltu/Photos/BC/Image_%20(2).jpg", caption: "Muka gweh gak keliatan" },
      { id: 6, src: "https://ik.imagekit.io/shs2lyltu/Photos/BC/Image_%20(6).jpg", caption: "Muka gweh gak keliatan" },
      { id: 7, src: "https://ik.imagekit.io/shs2lyltu/Photos/BC/Image_%20(7).jpg", caption: "Muka gweh gak keliatan" },
      { id: 8, src: "https://ik.imagekit.io/shs2lyltu/Photos/BC/Image_%20(8).jpg", caption: "Bawa ember buat apaan kak" },
      { id: 9, src: "https://ik.imagekit.io/shs2lyltu/Photos/BC/Image_%20(9).jpg", caption: "Ngintip dikit" },
      { id: 10, src: "https://ik.imagekit.io/shs2lyltu/Photos/BC/Image_%20(10).jpg", caption: "Bjirr wkwk" },
      { id: 11, src: "https://ik.imagekit.io/shs2lyltu/Photos/BC/Image_%20(11).jpg", caption: "Tauu lah" },
      { id: 12, src: "https://ik.imagekit.io/shs2lyltu/Photos/BC/Image_%20(12).jpg", caption: "Pura-pura liatt hp" },
      { id: 13, src: "https://ik.imagekit.io/shs2lyltu/Photos/BC/Image_%20(13).jpg", caption: "Pura-pura liatt hp" },
    ]
  },
  {
    id: 'ch2', title: "Photoboth And Nonton 🎥", subtitle: "Ngemall ceritanya", color: "bg-blue-100", border: "border-blue-300",
    cover: "https://ik.imagekit.io/shs2lyltu/Photos/PHOTOBOTH/Image_%20(6).jpg",
    photos: [
      { id: 1, src: "https://ik.imagekit.io/shs2lyltu/Photos/PHOTOBOTH/Image_%20(6).jpg", caption: "Perayaan mati Rasa, Ada yang nangis nih nonton film ini" },
      { id: 2, src: "https://ik.imagekit.io/shs2lyltu/Photos/PHOTOBOTH/Image_%20(5).jpg", caption: "Photoboth ceritanya`" },
      { id: 3, src: "https://ik.imagekit.io/shs2lyltu/Photos/PHOTOBOTH/Image_%20(4).jpg", caption: "Photoboth ceritanya" },
      { id: 4, src: "https://ik.imagekit.io/shs2lyltu/Photos/PHOTOBOTH/Image_%20(3).jpg", caption: "Photoboth ceritanya" },
      { id: 5, src: "https://ik.imagekit.io/shs2lyltu/Photos/PHOTOBOTH/Image_%20(2).jpg", caption: "Photoboth ceritanya" },
      { id: 6, src: "https://ik.imagekit.io/shs2lyltu/Photos/PHOTOBOTH/Image_%20(1).jpg", caption: "Photoboth ceritanya" },
    ]
  },
  {
    id: 'ch3', title: "Badminton🏸", subtitle: "Olahraga guys biar sehat", color: "bg-orange-100", border: "border-orange-300",
    cover: "https://ik.imagekit.io/shs2lyltu/Photos/BADMINTON/Image_%20%20(1).jpeg",
    photos: [
      { id: 1, src: "https://ik.imagekit.io/shs2lyltu/Photos/BADMINTON/Image_%20%20(1).jpeg", caption: "Jangan lupa olahraga" },
      { id: 2, src: "https://ik.imagekit.io/shs2lyltu/Photos/BADMINTON/Image_%20%20(1).JPG", caption: "Gelap bgt muka gweh" },
      { id: 3, src: "https://ik.imagekit.io/shs2lyltu/Photos/BADMINTON/Image_%20%20(3).JPG", caption: "Ini ezze game sih" },
      { id: 4, src: "https://ik.imagekit.io/shs2lyltu/Photos/BADMINTON/Image_%20%20(4).JPG", caption: "Lawannya kurang seru" },
    ]
  },
  {
    id: 'ch4', title: "Kondangan ", subtitle: "Lumayan makan gratis hehe", color: "bg-yellow-100", border: "border-yellow-300",
    cover: "https://ik.imagekit.io/shs2lyltu/Photos/CAFFE/Image_%20(14).JPG",
    photos: [
      { id: 1, src: "https://ik.imagekit.io/shs2lyltu/Photos/CAFFE/Image_%20(5).jpg", caption: "Hehe" },
      { id: 2, src: "https://ik.imagekit.io/shs2lyltu/Photos/CAFFE/Image_%20(6).jpg", caption: "pissssss" },
      { id: 3, src: "https://ik.imagekit.io/shs2lyltu/Photos/CAFFE/Image_%20(4).jpg", caption: "Apasih ni orang" },
      { id: 4, src: "https://ik.imagekit.io/shs2lyltu/Photos/CAFFE/Image_%20(7).jpg", caption: "Pisss lagi" },
      { id: 5, src: "https://ik.imagekit.io/shs2lyltu/Photos/CAFFE/Image_%20(10).JPG", caption: "Yaa begitulah" },
      { id: 6, src: "https://ik.imagekit.io/shs2lyltu/Photos/CAFFE/Image_%20(12).JPG", caption: "Apaansi pa ngeliatin bae" },
      { id: 7, src: "https://ik.imagekit.io/shs2lyltu/Photos/CAFFE/Image_%20(13).JPG", caption: "Seorang CEO di tunjuk2 gasopan bgt" },
      { id: 8, src: "https://ik.imagekit.io/shs2lyltu/Photos/CAFFE/Image_%20(15).JPG", caption: "Ciss" },
      { id: 9, src: "https://ik.imagekit.io/shs2lyltu/Photos/CAFFE/Image_%20(14).JPG", caption: "Ciss lagi ah" },
    ]
  },
  {
    id: 'ch5', title: "Caffee Kuningann", subtitle: "Sebelum meninggalkan BC ceritanya", color: "bg-green-100", border: "border-green-300",
    cover: "https://ik.imagekit.io/shs2lyltu/Photos/CAFFE/Image_%20(20).jpg",
    photos: [
      { id: 1, src: "https://ik.imagekit.io/shs2lyltu/Photos/CAFFE/Image_%20(1).jpg", caption: "Cisss" },
      { id: 2, src: "https://ik.imagekit.io/shs2lyltu/Photos/CAFFE/Image_%20(17).JPG", caption: "Ini enakk si beneran" },
      { id: 3, src: "https://ik.imagekit.io/shs2lyltu/Photos/CAFFE/Image_%20(19).jpg", caption: "Melihat mountain" },
      { id: 4, src: "https://ik.imagekit.io/shs2lyltu/Photos/CAFFE/Image_%20(2).JPG", caption: "Pass malem kerensih" },
      { id: 5, src: "https://ik.imagekit.io/shs2lyltu/Photos/CAFFE/Image_%20(18).jpg", caption: "Omaiigattt🫨" },
      { id: 6, src: "https://ik.imagekit.io/shs2lyltu/Photos/CAFFE/Image_%20(3).jpg", caption: "Omaigatttt lagiii" },
    ]
  },
  {
    id: 'ch6', title: "Suttt🤫", subtitle: "Gabolehh dibukaaa", color: "bg-pink-100", border: "border-pink-300",
    cover: "https://ik.imagekit.io/shs2lyltu/Photos/Image_%20(8).jpg",
    photos: [
      { id: 1, src: "https://ik.imagekit.io/shs2lyltu/Photos/Image_%20(1).jpg", caption: "" },
      { id: 2, src: "https://ik.imagekit.io/shs2lyltu/Photos/Image_%20(9).JPG", caption: "" },
      { id: 3, src: "https://ik.imagekit.io/shs2lyltu/Photos/Image_%20(12).JPG", caption: "" },
      { id: 4, src: "https://ik.imagekit.io/shs2lyltu/Photos/Image_%20(2).JPG", caption: "" },
      { id: 5, src: "https://ik.imagekit.io/shs2lyltu/Photos/Image_%20(10).JPG", caption: "" },
      { id: 6, src: "https://ik.imagekit.io/shs2lyltu/Photos/Image_%20(3).JPG", caption: "" },
      { id: 7, src: "https://ik.imagekit.io/shs2lyltu/Photos/Image_%20(3).JPG", caption: "" },
      { id: 8, src: "https://ik.imagekit.io/shs2lyltu/Photos/Image_%20(14).JPG", caption: "" },
      { id: 9, src: "https://ik.imagekit.io/shs2lyltu/Photos/Image_%20(15).jpg", caption: "" },
      { id: 10, src: "https://ik.imagekit.io/shs2lyltu/Photos/Image_%20(5).JPG", caption: "" },
      { id: 11, src: "https://ik.imagekit.io/shs2lyltu/Photos/Image_%20(4).JPG", caption: "" },
      { id: 12, src: "https://ik.imagekit.io/shs2lyltu/Photos/Image_%20(8).jpg", caption: "APAAAA NIHHH" },
    ]
  },
];

// --- COMPONENTS ---

// 1. Global Styles
const GlobalStyles = () => (
  <style>{`
    @keyframes float { 
      0% { transform: translateY(0px) rotate(0deg); } 
      50% { transform: translateY(-15px) rotate(5deg); } 
      100% { transform: translateY(0px) rotate(0deg); } 
    }
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

// 3. Music Player (Load Local File)
const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Inisialisasi Audio dengan URL lokal
    audioRef.current = new Audio(MUSIC_URL);
    audioRef.current.loop = true;
    
    // Cleanup saat unmount
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed (user interaction needed):", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button onClick={togglePlay} className={`fixed bottom-6 right-6 z-50 p-3 rounded-full border-4 border-white shadow-lg transition-transform active:scale-90 ${isPlaying ? 'bg-pink-400 rotate-12' : 'bg-gray-300'}`}>
      <Music size={24} className="text-white" />
    </button>
  );
};

// 4. Panda Motivator
const PandaMotivator = () => {
  const [quote, setQuote] = useState(null);
  const timeoutRef = useRef(null);

  const showMotivation = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const random = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setQuote(random);
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
              <p className="font-['Fredoka'] text-gray-600 text-sm font-bold leading-relaxed">"{quote}"</p>
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
       
       <span className="absolute -bottom-5 left-1 bg-white/50 px-2 py-0.5 rounded-full text-[10px] font-bold text-gray-500 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Klik aku! 🐼
       </span>
    </div>
  );
};

// 5. Mood Section
const MoodSection = ({ currentMood, setMood }) => (
  <div className="mb-8">
    <div className="text-center mb-4">
      <span className="bg-white/50 px-4 py-1 rounded-full text-xs font-bold text-gray-500 border border-gray-100">Mood hari ini? 👇</span>
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

// 6. Album Card
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

// 7. Album View
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

// 8. Lightbox (Dengan Tombol Download)
const Lightbox = ({ photo, onClose }) => {
  if (!photo) return null;
  
  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.8 }} animate={{ scale: 1 }} 
        className="bg-white p-3 rounded-2xl max-w-md w-full border-4 border-pink-200 shadow-2xl relative" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Close */}
        <button onClick={onClose} className="absolute -top-4 -right-4 bg-red-400 text-white p-2 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform z-10">
            <X size={20}/>
        </button>

        {/* Tombol Download (Fitur Baru) */}
        <a 
          href={photo.src} 
          download={`panda-memory-${photo.id}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute -top-4 -left-4 bg-blue-400 text-white p-2 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform z-10"
          title="Download Foto"
        >
            <Download size={20} />
        </a>

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
            
            <div className="max-w-lg md:max-w-3xl lg:max-w-5xl mx-auto pb-24">
                <div className="bg-white/70 backdrop-blur-md rounded-[30px] p-6 md:p-10 shadow-sm border-4 border-white">
                    <div className="text-center mb-8">
                      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2 drop-shadow-sm">Our <span className="text-pink-400">Memories</span></h1>
                      <p className="text-xs md:text-sm text-gray-500 font-medium">Tempat kenangan kita tersimpan 🍯</p>
                    </div>

                    <MoodSection currentMood={currentMood} setMood={setMood} />

                    <div className="flex items-center gap-2 mb-4 px-2 mt-8">
                      <Smile className="text-pink-400 w-5 h-5" />
                      <h2 className="font-bold text-gray-700 text-lg">Our Albums</h2>
                    </div>
                    
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