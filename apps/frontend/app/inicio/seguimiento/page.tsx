"use client";

import { useState, useEffect } from "react";
import { Asset, CreateAssetDto } from "@/app/lib/api/assets/types";
import { RetirementPlan } from "@/app/lib/api/plan/types";
import {
  getAllAssets,
  createAsset,
  deleteAsset,
} from "@/app/lib/api/assets/asset.service";
import { getAllPlans } from "@/app/lib/api/plan/getAll";
import AssetManager from "./components/AssetManager";

export default function SeguimientoPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [plans, setPlans] = useState<RetirementPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [assetsData, plansData] = await Promise.all([
          getAllAssets(),
          getAllPlans(),
        ]);
        setAssets(assetsData);
        setPlans(plansData);
        setError(null);
      } catch (err) {
        setError("Error al cargar los datos");
        console.error("Error al cargar los datos:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCreate = async (data: CreateAssetDto) => {
    try {
      const createdAsset = await createAsset(data);
      setAssets((prev) => [...prev, createdAsset]);
      setError(null);
    } catch (err) {
      setError("Error al crear el activo");
      console.error("Error al crear el activo:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAsset(id);
      setAssets((prev) => prev.filter((asset) => asset.id.toString() !== id));
      setError(null);
    } catch (err) {
      setError("Error al eliminar el activo");
      console.error("Error al borrar los activos:", err);
    }
  };

  return (
    <div className="space-y-6">
      <AssetManager
        assets={assets}
        plans={plans}
        loading={loading}
        error={error}
        onCreate={handleCreate}
        onDelete={handleDelete}
      />
    </div>
  );
}
