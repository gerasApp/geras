import React, { useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Simulate() {
  const [form, setForm] = useState({
    initialAmount: 1000,
    monthlyContribution: 100,
    rate: 2,
    months: 12,
  });

  const [data, setData] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
  };

  const simulate = () => {
    axios.post('http://localhost:3001/simulate', form)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">Simulador de Inversión</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
                className="border border-gray-300 p-2 rounded w-full"
                type="number"
                name="initialAmount"
                placeholder="Monto Inicial"
                value={form.initialAmount}
                onChange={handleChange}
            />
            <input
                className="border border-gray-300 p-2 rounded w-full"
                type="number"
                name="monthlyContribution"
                placeholder="Aporte Mensual"
                value={form.monthlyContribution}
                onChange={handleChange}
            />
            <input
                className="border border-gray-300 p-2 rounded w-full"
                type="number"
                name="rate"
                placeholder="% Ganancia"
                value={form.rate}
                onChange={handleChange}
            />
            <input
                className="border border-gray-300 p-2 rounded w-full"
                type="number"
                name="months"
                placeholder="Duración (meses)"
                value={form.months}
                onChange={handleChange}
            />
            </div>

            <button
            onClick={simulate}
            className="bg-blue-600 text-white px-4 py-2 rounded"
            >
            Simular
            </button>

            {data.length > 0 && (
            <div className="mt-6">
                <LineChart width={600} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" />
                </LineChart>
            </div>
            )}
        </div>
    );
}

export default Simulate;
