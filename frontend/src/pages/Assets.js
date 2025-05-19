import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';

function Assets() {
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
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Gestión de Activos</h2>
      
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-600 text-white px-4 py-2 mb-4 rounded"
      >
        + Agregar Activo
      </button>

      <ul className="space-y-2">
        {assets.map((a, i) => (
          <li
            key={i}
            className="border p-2 rounded bg-white shadow"
          >
            {a.code} - {a.quantity} x ${a.value} ({a.expectedReturn}%)
          </li>
        ))}
      </ul>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="flex flex-col gap-2">
            <input name="value" type="number" placeholder="Valor" onChange={handleChange} className="border p-2 rounded" />
            <input name="quantity" type="number" placeholder="Cantidad" onChange={handleChange} className="border p-2 rounded" />
            <input name="code" placeholder="Código" onChange={handleChange} className="border p-2 rounded" />
            <input name="expectedReturn" type="number" placeholder="% Esperado" onChange={handleChange} className="border p-2 rounded" />
            <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Guardar</button>
          </div>
        </Modal>
      )}
    </div>
  );

}

export default Assets;
