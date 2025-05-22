import React from 'react';
import { useDarkModeContext } from '../context/DarkModeContext';

export function DarkModeToggle() {
  const { darkMode, setDarkMode } = useDarkModeContext();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`px-4 py-2 rounded ${
        darkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-800'
      }`}
    >
      {darkMode ? '🌞 Modo Claro' : '🌙 Modo Oscuro'}
    </button>
  );
} 