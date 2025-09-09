import React from "react";
import { motion } from "framer-motion";
import { Bell, X, Wifi, Battery, Volume2 } from "lucide-react";

export default function NotificationCenter({ onClose }) {
  const notifications = [
    {
      id: 1,
      title: "INFI System Update",
      message: "Your system has been updated to the latest version",
      time: "2m ago",
      type: "system"
    },
    {
      id: 2,
      title: "New Message",
      message: "You have received a new message in Notes",
      time: "5m ago",
      type: "app"
    },
    {
      id: 3,
      title: "Battery Status",
      message: "Battery is charging - 85% complete",
      time: "10m ago",
      type: "system"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.95 }}
      className="absolute bottom-20 right-4 w-80 h-[500px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200/50">
        <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <X className="w-4 h-4 text-gray-600" />
        </motion.button>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Bell className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 text-sm">
                  {notification.title}
                </p>
                <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                  {notification.message}
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  {notification.time}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Settings */}
      <div className="p-4 border-t border-gray-200/50 bg-gray-50/50">
        <div className="grid grid-cols-3 gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center p-3 bg-white rounded-xl hover:bg-gray-100 transition-all duration-200"
          >
            <Wifi className="w-5 h-5 text-blue-600 mb-1" />
            <span className="text-xs font-medium text-gray-700">WiFi</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center p-3 bg-white rounded-xl hover:bg-gray-100 transition-all duration-200"
          >
            <Battery className="w-5 h-5 text-green-600 mb-1" />
            <span className="text-xs font-medium text-gray-700">Battery</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center p-3 bg-white rounded-xl hover:bg-gray-100 transition-all duration-200"
          >
            <Volume2 className="w-5 h-5 text-purple-600 mb-1" />
            <span className="text-xs font-medium text-gray-700">Sound</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
