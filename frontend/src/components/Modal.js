import React from 'react';

function Modal({ children, onClose }) {
  return (
    <div
      style={{
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
      }}
    >
      <div
        style={{
          background: '#23232a',
          color: '#fff',
          padding: 24,
          borderRadius: '0.75rem',
          boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
          minWidth: 320,
          maxWidth: '90vw'
        }}
      >
        {children}
        <button
          onClick={onClose}
          style={{
            marginTop: 16,
            background: '#18181b',
            color: '#fff',
            border: '1px solid #333',
            borderRadius: '0.375rem',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            float: 'right'
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default Modal;
