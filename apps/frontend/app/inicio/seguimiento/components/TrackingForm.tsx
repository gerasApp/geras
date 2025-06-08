'use client';

import { Dispatch, SetStateAction } from 'react';
import { TrackingFormData } from '@/app/lib/api/seguimiento/types';

interface TrackingFormProps {
  newEntry: TrackingFormData;
  setNewEntry: Dispatch<SetStateAction<TrackingFormData>>;
  onSubmit: (e: React.FormEvent) => void;
}

export default function TrackingForm({ newEntry, setNewEntry, onSubmit }: TrackingFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value
    }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Tu plan de seguimiento
      </h2>

      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha
          </label>
          <input
            type="date"
            name="date"
            value={newEntry.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monto
          </label>
          <div className="relative">
            <input
              type="number"
              name="amount"
              value={newEntry.amount}
              onChange={handleChange}
              min="0"
              step="1000"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <span className="absolute left-3 top-2 text-gray-500">$</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo
          </label>
          <select
            name="type"
            value={newEntry.type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Seleccionar tipo</option>
            <option value="income">Ingreso</option>
            <option value="expense">Gasto</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoría
          </label>
          <select
            name="category"
            value={newEntry.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Seleccionar categoría</option>
            <option value="salary">Salario</option>
            <option value="investment">Inversión</option>
            <option value="other_income">Otros ingresos</option>
            <option value="food">Alimentación</option>
            <option value="transport">Transporte</option>
            <option value="housing">Vivienda</option>
            <option value="utilities">Servicios</option>
            <option value="entertainment">Entretenimiento</option>
            <option value="other_expense">Otros gastos</option>
          </select>
        </div>

        <div className="md:col-span-2 lg:col-span-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción
          </label>
          <input
            type="text"
            name="description"
            value={newEntry.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="md:col-span-2 lg:col-span-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Agregar Registro
          </button>
        </div>
      </form>
    </div>
  );
} 