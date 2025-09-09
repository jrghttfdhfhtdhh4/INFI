
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Shuffle, 
  Repeat,
  Heart,
  Music,
  Disc
} from "lucide-react";

export default function MusicApp() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  // volume state removed as per new UI; it's no longer used.

  const playlist = [
    { title: "Crimson Waves", artist: "INFI Sounds", album: "Redline Edition", duration: "3:45", cover: "abstract" },
    { title: "Asphalt Pulse", artist: "Synthwave Studios", album: "Midnight Drive", duration: "4:12", cover: "abstract" },
    { title: "Kernel Panic", artist: "Code Symphony", album: "System Sounds", duration: "2:58", cover: "abstract" },
    { title: "Red Shift", artist: "INFI Sounds", album: "Redline Edition", duration: "3:22", cover: "abstract" },
  ];

  const currentSong = playlist[currentTrack];

  return (
    <div className="h-full flex flex-col bg-neutral-900 text-white">
      {/* Sidebar and Main Content Wrapper */}
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-black/30 p-4 flex flex-col">
            <div className="flex items-center gap-2 mb-8">
                <Disc className="w-8 h-8 text-red-500 animate-spin" style={{ animationDuration: '3s' }}/>
                <h1 className="text-xl font-bold">INFI Music</h1>
            </div>
            <nav className="space-y-2 mb-8">
                <a href="#" className="flex items-center gap-3 p-2 rounded-lg bg-white/10 text-white font-semibold">Home</a>
                <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-white/70">Browse</a>
                <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-white/70">Library</a>
            </nav>
            <div className="flex-grow overflow-y-auto">
                <h2 className="text-sm font-semibold text-white/50 mb-3">Playlists</h2>
                <div className="space-y-2">
                    <a href="#" className="block text-white/70 hover:text-white text-sm">Synthwave Hits</a>
                    <a href="#" className="block text-white/70 hover:text-white text-sm">Coding Focus</a>
                    <a href="#" className="block text-white/70 hover:text-white text-sm">Redline Beats</a>
                </div>
            </div>
             <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-neutral-800 text-white/70 rounded-lg hover:bg-neutral-700 border border-white/10 transition-colors duration-200"
                >
                <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.36 13.1c-.2.32-.6.4-.92.2-.28-.2-.36-.56-.16-.84.6-1.04 1-2.2 1-3.46 0-3.1-2.5-5.6-5.6-5.6S6.4 8.6 6.4 11.7c0 1.26.4 2.4 1 3.46.2.28.12.64-.16.84-.32.2-.72.12-.92-.2C5.52 14.52 5 13.16 5 11.7 5 7.9 7.9 5 11.7 5s6.7 2.9 6.7 6.7c0 1.46-.52 2.82-1.36 3.9z"></path>
                    <path d="M8.2 12.38c-.28.16-.6.08-.76-.2s-.08-.6.2-.76c1.64-1 3.52-1.52 5.52-1.52s3.88.52 5.52 1.52c.28.16.36.48.2.76s-.48.36-.76.2c-1.48-.88-3.16-1.36-4.96-1.36s-3.48.48-4.96 1.36z"></path>
                </svg>
                <span>Connect Device</span>
            </motion.button>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center p-8">
            <motion.div
              key={currentTrack} // Added key to trigger animation on track change
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              // Removed rotation transition as it's not in the new outline
              className="w-64 h-64 mb-8 bg-neutral-800 border border-white/10 rounded-2xl shadow-2xl flex items-center justify-center"
            >
              <Music className="w-32 h-32 text-red-500" />
            </motion.div>

            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2">{currentSong.title}</h2>
              <p className="text-white/70">{currentSong.artist}</p>
            </div>

             {/* Progress Bar */}
            <div className="w-full max-w-md">
              <div className="w-full h-1.5 bg-white/10 rounded-full cursor-pointer group">
                <div className="h-1.5 bg-red-500 rounded-full relative" style={{ width: '35%' }}>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-white/50 mt-2">
                <span>1:23</span>
                <span>{currentSong.duration}</span>
              </div>
            </div>
        </main>
      </div>

      {/* Player Controls (Footer) */}
      <footer className="bg-black/50 backdrop-blur-sm border-t border-white/10 p-4">
        <div className="flex items-center justify-center gap-6">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-white/60 hover:text-white">
            <Shuffle className="w-5 h-5 text-red-500" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentTrack(Math.max(0, currentTrack - 1))}
            className="text-white"
          >
            <SkipBack className="w-6 h-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-700"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentTrack(Math.min(playlist.length - 1, currentTrack + 1))}
            className="text-white"
          >
            <SkipForward className="w-6 h-6" />
          </motion.button>

          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-white/60 hover:text-white">
            <Repeat className="w-5 h-5" />
          </motion.button>
        </div>
      </footer>
    </div>
  );
}
