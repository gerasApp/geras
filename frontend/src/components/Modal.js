import React from 'react';
import { colors } from '../styles/theme';

/**
 * Componente Modal que muestra contenido en una ventana emergente
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Contenido del modal
 * @param {Function} props.onClose - Función para cerrar el modal
 * @param {boolean} props.darkMode - Estado del modo oscuro
 */
function Modal({ children, onClose, darkMode = true }) {
  // Estilos para el overlay (fondo oscuro)
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    background: 'rgba(24,24,27,0.85)',
    width: '100%',
    height: '100%',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  // Estilos para el contenedor del modal
  const modalStyle = {
    background: darkMode ? colors.background.paper.dark : colors.background.paper.light,
    color: darkMode ? colors.text.dark : colors.text.light,
    padding: 24,
    borderRadius: '0.75rem',
    boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
    minWidth: 320,
    maxWidth: '90vw'
  };

  // Estilos para el botón de cerrar
  const closeButtonStyle = {
    marginTop: 16,
    background: darkMode ? colors.background.dark : colors.background.light,
    color: darkMode ? colors.text.dark : colors.text.light,
    border: `1px solid ${darkMode ? colors.border.dark : colors.border.light}`,
    borderRadius: '0.375rem',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    float: 'right',
    '&:hover': {
      backgroundColor: darkMode ? colors.background.paper.dark : colors.background.paper.light
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {children}
        <button
          onClick={onClose}
          style={closeButtonStyle}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default Modal;
