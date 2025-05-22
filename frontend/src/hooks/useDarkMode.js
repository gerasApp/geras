import { useState, useEffect } from 'react';

/**
 * Hook personalizado para manejar el modo oscuro
 * @returns {[boolean, function]} Estado del modo oscuro y función para cambiarlo
 */
export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Obtener el valor de localStorage o true por defecto
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode === null ? true : storedDarkMode === 'true';
  });

  useEffect(() => {
    // Sincronizar con localStorage
    localStorage.setItem('darkMode', darkMode);
    
    // Aplicar o remover la clase del body
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return [darkMode, setDarkMode];
}; 