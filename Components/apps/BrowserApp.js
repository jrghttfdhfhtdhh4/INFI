import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Home, 
  Search,
  Star,
  Shield,
  Globe
} from "lucide-react";

export default function BrowserApp() {
  const [url, setUrl] = useState('https://infi-os.com');
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigate = (newUrl) => {
    setUrl(newUrl);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const bookmarks = [
    { name: 'INFI OS', url: 'https://infi-os.com' },
    { name: 'GitHub', url: 'https://github.com' },
    { name: 'Stack Overflow', url: 'https://stackoverflow.com' },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Browser Header */}
      <div className="flex items-center gap-3 p-3 bg-gray-50 border-b border-gray-200">
        {/* Navigation Buttons */}
        <div className="flex gap-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors duration-200"
          >
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsLoading(true)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors duration-200"
          >
            <RotateCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </motion.button>
        </div>

        {/* Address Bar */}
        <div className="flex-1 flex items-center bg-white rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-purple-500">
          <div className="px-3">
            <Shield className="w-4 h-4 text-green-500" />
          </div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleNavigate(url)}
            className="flex-1 py-2 bg-transparent border-0 focus:ring-0 focus:outline-none text-sm"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"
          >
            <Search className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors duration-200"
          >
            <Star className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors duration-200"
          >
            <Home className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Bookmarks Bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 border-b border-gray-200">
        {bookmarks.map((bookmark) => (
          <motion.button
            key={bookmark.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigate(bookmark.url)}
            className="px-3 py-1 text-sm text-gray-700 hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200"
          >
            {bookmark.name}
          </motion.button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 relative overflow-hidden">
        {isLoading && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-purple-500 animate-pulse" />
        )}
        
        <div className="h-full p-8 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
          <div className="text-center max-w-md">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center"
            >
              <Globe className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome to INFI Browser
            </h1>
            <p className="text-gray-600 mb-6">
              Experience the web with our beautiful, fast, and secure browser built into INFI OS.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-lg"
            >
              Start Browsing
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
