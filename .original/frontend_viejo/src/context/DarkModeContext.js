import React, { createContext, useContext } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkModeContext() {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkModeContext debe ser usado dentro de un DarkModeProvider');
  }
  return context;
} 