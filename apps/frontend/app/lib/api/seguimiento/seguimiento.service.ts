import { TrackingEntry, TrackingFormData } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTrackingEntries(): Promise<TrackingEntry[]> {
  const response = await fetch(`${API_URL}/seguimiento`);
  if (!response.ok) {
    throw new Error('Error al obtener los registros');
  }
  return response.json();
}

export async function createTrackingEntry(entry: TrackingFormData): Promise<TrackingEntry> {
  const response = await fetch(`${API_URL}/seguimiento`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entry),
  });
  if (!response.ok) {
    throw new Error('Error al crear el registro');
  }
  return response.json();
}

export async function deleteTrackingEntry(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/seguimiento/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error al eliminar el registro');
  }
} 