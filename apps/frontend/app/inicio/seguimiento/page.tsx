'use client';

import { useState, useEffect } from 'react';
import TrackingForm from './components/TrackingForm';
import TrackingList from './components/TrackingList';
import TrackingSummary from './components/TrackingSummary';
import { TrackingEntry, TrackingFormData } from '@/app/lib/api/seguimiento/types';
import { getTrackingEntries, createTrackingEntry, deleteTrackingEntry } from '@/app/lib/api/seguimiento/seguimiento.service';

export default function TrackingPage() {
  const [entries, setEntries] = useState<TrackingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estado inicial del formulario
  const [newEntry, setNewEntry] = useState<TrackingFormData>({
    date: new Date().toISOString().split('T')[0] || new Date().toLocaleDateString('en-CA'),
    amount: 0,
    type: 'expense',
    category: '',
    description: ''
  });

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const data = await getTrackingEntries();
        setEntries(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los registros');
      } finally {
        setLoading(false);
      }
    };

    loadEntries();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdEntry = await createTrackingEntry(newEntry);
      setEntries(prev => [...prev, createdEntry]);
      setNewEntry({
        date: new Date().toISOString().split('T')[0] || new Date().toLocaleDateString('en-CA'),
        amount: 0,
        type: 'expense',
        category: '',
        description: ''
      });
      setError(null);
    } catch (err) {
      setError('Error al crear el registro');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTrackingEntry(id);
      setEntries(prev => prev.filter(entry => entry.id !== id));
      setError(null);
    } catch (err) {
      setError('Error al eliminar el registro');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Seguimiento de Gastos e Ingresos</h1>

      {/* Resumen */}
      <TrackingSummary entries={entries} />

      {/* Formulario */}
      <TrackingForm 
        newEntry={newEntry}
        setNewEntry={setNewEntry}
        onSubmit={handleSubmit}
      />

      {/* Lista de registros */}
      <TrackingList 
        entries={entries}
        loading={loading}
        error={error}
        onDelete={handleDelete}
      />
    </div>
  );
}
