import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Folder, 
  File, 
  Image, 
  FileText, 
  Music, 
  Video, 
  Home, 
  Search,
  Grid,
  List
} from "lucide-react";

export default function FinderApp() {
  const [currentPath, setCurrentPath] = useState('Home');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const folders = [
    { name: 'Documents', type: 'folder', icon: Folder, size: '15 items' },
    { name: 'Downloads', type: 'folder', icon: Folder, size: '8 items' },
    { name: 'Pictures', type: 'folder', icon: Folder, size: '42 items' },
    { name: 'Music', type: 'folder', icon: Folder, size: '127 items' },
    { name: 'Videos', type: 'folder', icon: Folder, size: '23 items' },
  ];

  const files = [
    { name: 'Project Proposal.pdf', type: 'file', icon: FileText, size: '2.3 MB' },
    { name: 'Vacation Photo.jpg', type: 'file', icon: Image, size: '4.1 MB' },
    { name: 'Presentation.pptx', type: 'file', icon: FileText, size: '8.7 MB' },
    { name: 'Song.mp3', type: 'file', icon: Music, size: '3.4 MB' },
    { name: 'Video.mp4', type: 'file', icon: Video, size: '245 MB' },
  ];

  const allItems = [...folders, ...files];
  const filteredItems = allItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getItemIcon = (item) => {
    const IconComponent = item.icon;
    const colorClass = item.type === 'folder' ? 'text-blue-500' : 'text-gray-600';
    return <IconComponent className={`w-8 h-8 ${colorClass}`} />;
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Home className="w-4 h-4" />
            <span>{currentPath}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-white rounded-lg border border-gray-300">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-l-lg transition-colors duration-200 ${
                viewMode === 'grid' ? 'bg-purple-500 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Grid className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-r-lg transition-colors duration-200 ${
                viewMode === 'list' ? 'bg-purple-500 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <List className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* File Browser */}
      <div className="flex-1 p-4 overflow-y-auto">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-4 gap-4">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="p-4 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3 group-hover:scale-110 transition-transform duration-200">
                    {getItemIcon(item)}
                  </div>
                  <h3 className="font-medium text-gray-800 text-sm truncate w-full">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1">
                    {item.size}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ backgroundColor: '#f9fafb' }}
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer"
              >
                <div className="mr-4">
                  {getItemIcon(item)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-800 truncate">
                    {item.name}
                  </h3>
                </div>
                <div className="text-gray-500 text-sm">
                  {item.size}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
