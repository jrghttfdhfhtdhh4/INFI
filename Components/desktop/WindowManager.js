import React from "react";
import { AnimatePresence } from "framer-motion";
import Window from "./Window";
import CalculatorApp from "../apps/CalculatorApp";
import NotesApp from "../apps/NotesApp";
import FinderApp from "../apps/FinderApp";
import BrowserApp from "../apps/BrowserApp";
import MusicApp from "../apps/MusicApp";

const appComponents = {
  calculator: CalculatorApp,
  notes: NotesApp,
  finder: FinderApp,
  browser: BrowserApp,
  music: MusicApp,
};

export default function WindowManager({ 
  windows, 
  onClose, 
  onMinimize, 
  onFocus,
  onCursorChange 
}) {
  return (
    <AnimatePresence>
      {windows.map((window) => {
        const AppComponent = appComponents[window.type];
        
        return (
          <Window
            key={window.id}
            windowData={window}
            onClose={onClose}
            onMinimize={onMinimize}
            onFocus={onFocus}
            onCursorChange={onCursorChange}
          >
            {AppComponent && <AppComponent {...window.props} />}
          </Window>
        );
      })}
    </AnimatePresence>
  );
}
