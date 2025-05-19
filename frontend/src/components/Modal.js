import React from 'react';

function Modal({ children, onClose }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, background: '#00000088', width: '100%', height: '100%' }}>
      <div style={{ background: 'white', padding: 20, margin: '10% auto', width: 300 }}>
        {children}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default Modal;
