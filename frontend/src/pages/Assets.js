import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';

function Assets() {
  // To make the white columns (the page background outside the container) dark, set the body background color.
  // This can be done with a side effect:
  useEffect(() => {
    document.body.style.backgroundColor = '#18181b';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);
  // Dark mode styles (similar to Simulate.js)
  const containerStyle = {
    backgroundColor: '#18181b',
    minHeight: '100vh',
    color: '#fff',
    borderRadius: '0.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  };

  const cardStyle = {
    backgroundColor: '#23232a',
    color: '#fff',
    border: '1px solid #333',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
  };

  const buttonStyle = {
    backgroundColor: '#22c55e',
    color: '#fff',
    border: 'none',
    borderRadius: '0.375rem',
    padding: '0.5rem 1rem',
    marginBottom: '1rem',
    cursor: 'pointer'
  };

  const inputStyle = {
    backgroundColor: '#18181b',
    color: '#fff',
    border: '1px solid #333',
    borderRadius: '0.375rem',
    padding: '0.5rem'
  };
  const [assets, setAssets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    value: 0,
    quantity: 0,
    code: '',
    expectedReturn: 0
  });

  useEffect(() => {
    axios.get('http://localhost:3001/assets')
      .then(res => setAssets(res.data));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios.post('http://localhost:3001/assets', form)
      .then(res => setAssets([...assets, res.data]));
    setShowModal(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-[#18181b] min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-white">Gestión de Activos</h2>
      
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-600 text-white px-4 py-2 mb-4 rounded hover:bg-green-700 transition"
        style={buttonStyle}
      >
        + Agregar Activo
      </button>

      <ul className="space-y-2">
        {assets.map((a, i) => (
          <li
            key={i}
            className="border p-2 rounded shadow"
            style={{
              backgroundColor: '#23232a',
              color: '#fff',
              border: '1px solid #333'
            }}
          >
            {a.code} - {a.quantity} x ${a.value} ({a.expectedReturn}%)
          </li>
        ))}
      </ul>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="flex flex-col gap-2 bg-[#23232a] p-4 rounded">
            <input
              name="value"
              type="number"
              placeholder="Valor"
              onChange={handleChange}
              className="border p-2 rounded"
              style={inputStyle}
            />
            <input
              name="quantity"
              type="number"
              placeholder="Cantidad"
              onChange={handleChange}
              className="border p-2 rounded"
              style={inputStyle}
            />
            <input
              name="code"
              placeholder="Código"
              onChange={handleChange}
              className="border p-2 rounded"
              style={inputStyle}
            />
            <input
              name="expectedReturn"
              type="number"
              placeholder="% Esperado"
              onChange={handleChange}
              className="border p-2 rounded"
              style={inputStyle}
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Guardar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );

}

export default Assets;
