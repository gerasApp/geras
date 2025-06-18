"use client";

import { useState, useEffect } from "react";
import { Asset, CreateAssetDto } from "@/app/lib/api/assets/types";
import {
  getAllAssets,
  createAsset,
  deleteAsset,
} from "@/app/lib/api/assets/asset.service";
import AssetManager from "./components/AssetManager";

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
        setError("Error al cargar los activos");
        console.error("Error al cargar los activos:", err); // TODO: modificar por otro servicio de log
      } finally {
        setLoading(false);
      }
    };

    loadAssets();
  }, []);

  const handleCreate = async (data: CreateAssetDto) => {
    try {
      const createdAsset = await createAsset(data);
      setAssets((prev) => [...prev, createdAsset]);
      setError(null);
    } catch (err) {
      setError("Error al crear el activo");
      console.error("Error al crear el activo:", err); // TODO: modificar por otro servicio de log
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAsset(id);
      setAssets((prev) => prev.filter((asset) => asset._id !== id));
      setError(null);
    } catch (err) {
      setError("Error al eliminar el activo");
      console.error("Error al borrar los activos:", err); // TODO: modificar por otro servicio de log
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
