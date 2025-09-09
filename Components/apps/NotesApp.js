
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit, Trash2 } from "lucide-react";

export default function NotesApp() {
  const [notes, setNotes] = useState([
    { id: 1, title: "Welcome to INFI", content: "This is your first note in the INFI OS!", date: new Date() },
    { id: 2, title: "Meeting Notes", content: "Remember to discuss the project timeline...", date: new Date() }
  ]);
  const [selectedNote, setSelectedNote] = useState(notes[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const createNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: "Untitled Note",
      content: "",
      date: new Date()
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setIsEditing(true);
  };

  const updateNote = (field, value) => {
    const updatedNote = { ...selectedNote, [field]: value, date: new Date() };
    setSelectedNote(updatedNote);
    setNotes(notes.map(note => note.id === selectedNote.id ? updatedNote : note));
  };

  const deleteNote = (noteId) => {
    setNotes(notes.filter(note => note.id !== noteId));
    if (selectedNote && selectedNote.id === noteId) { // Added null check for selectedNote
      setSelectedNote(notes.find(note => note.id !== noteId) || null);
    } else if (!selectedNote && notes.length > 0) { // If no note selected but notes exist after delete
      setSelectedNote(notes[0]);
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex bg-neutral-900 text-white">
      {/* Sidebar */}
      <div className="w-1/3 bg-neutral-950/50 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white">Notes</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={createNewNote}
              className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-black/30 text-white rounded-lg border border-white/10 focus:ring-2 focus:ring-red-500 focus:bg-black/50 transition-all duration-200"
            />
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotes.map((note) => (
            <motion.div
              key={note.id}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
              onClick={() => setSelectedNote(note)}
              className={`p-4 border-b border-white/10 cursor-pointer transition-all duration-200 ${
                selectedNote?.id === note.id ? 'bg-red-600/20' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white truncate">
                    {note.title}
                  </h3>
                  <p className="text-white/60 text-sm mt-1 line-clamp-2">
                    {note.content || "No additional text"}
                  </p>
                  <p className="text-white/40 text-xs mt-2">
                    {note.date.toLocaleDateString()}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, color: '#ef4444' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                  className="text-white/40 transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col">
        {selectedNote ? (
          <>
            {/* Editor Header */}
            <div className="p-4 bg-neutral-900 border-b border-white/10 flex items-center justify-between">
              <input
                type="text"
                value={selectedNote.title}
                onChange={(e) => updateNote('title', e.target.value)}
                className="text-xl font-semibold text-white bg-transparent border-0 focus:ring-0 focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(!isEditing)}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isEditing ? 'bg-red-600/30 text-red-400' : 'bg-white/10 text-white/60'
                }`}
              >
                <Edit className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Editor Content */}
            <div className="flex-1 p-4">
              <textarea
                value={selectedNote.content}
                onChange={(e) => updateNote('content', e.target.value)}
                placeholder="Start typing your note..."
                className="w-full h-full bg-transparent border-0 focus:ring-0 focus:outline-none text-white/70 text-lg leading-relaxed resize-none"
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-white/50">
            <div className="text-center">
              <Edit className="w-12 h-12 mx-auto mb-4 text-white/40" />
              <p>Select a note to begin.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
