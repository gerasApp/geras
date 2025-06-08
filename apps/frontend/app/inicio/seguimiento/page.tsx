'use client';

import { useState, useEffect } from 'react';
import { Asset } from '@/app/lib/api/assets/types';
import { getAllAssets, createAsset, deleteAsset } from '@/app/lib/api/assets/asset.service';
import AssetManager from './components/AssetManager';

export default function SeguimientoPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const data = await getAllAssets();
        setAssets(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los activos');
      } finally {
        setLoading(false);
      }
    };

    loadAssets();
  }, []);

  const handleCreate = async (data: any) => {
    try {
      const createdAsset = await createAsset(data);
      setAssets(prev => [...prev, createdAsset]);
      setError(null);
    } catch (err) {
      setError('Error al crear el activo');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAsset(id);
      setAssets(prev => prev.filter(asset => asset._id !== id));
      setError(null);
    } catch (err) {
      setError('Error al eliminar el activo');
    }
  };

  return (
    <div className="space-y-6">
      <AssetManager 
        assets={assets}
        loading={loading}
        error={error}
        onCreate={handleCreate}
        onDelete={handleDelete}
      />
    </div>
  );
}
