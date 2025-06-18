"use client";

import { useState } from "react";
import {
  Asset,
  CreateAssetDto,
  AssetType,
  RiskLevel,
} from "@/app/lib/api/assets/types";

interface AssetManagerProps {
  assets: Asset[];
  loading: boolean;
  error: string | null;
  onCreate: (data: CreateAssetDto) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function AssetManager({
  assets,
  loading,
  error,
  onCreate,
  onDelete,
}: AssetManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAsset, setNewAsset] = useState<CreateAssetDto>({
    name: "",
    type: AssetType.STOCK,
    historicalReturn: 0,
    risk: RiskLevel.MEDIUM,
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onCreate(newAsset);
    setIsModalOpen(false);
    setNewAsset({
      name: "",
      type: AssetType.STOCK,
      historicalReturn: 0,
      risk: RiskLevel.MEDIUM,
      description: "",
    });
  };

  if (loading) {
    return <div className="text-center py-4">Cargando activos...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Gestión de Activos</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Agregar Activo
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Retorno Histórico
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Riesgo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assets.map((asset) => (
              <tr key={asset._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{asset.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{asset.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {asset.historicalReturn}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{asset.risk}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onDelete(asset._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Agregar Nuevo Activo</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  value={newAsset.name}
                  onChange={(e) =>
                    setNewAsset({ ...newAsset, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tipo
                </label>
                <select
                  value={newAsset.type}
                  onChange={(e) =>
                    setNewAsset({
                      ...newAsset,
                      type: e.target.value as AssetType,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value={AssetType.STOCK}>Acción</option>
                  <option value={AssetType.BOND}>Bono</option>
                  <option value={AssetType.ETF}>ETF</option>
                  <option value={AssetType.CRYPTO}>Criptomoneda</option>
                  <option value={AssetType.MUTUAL_FUND}>Fondo Mutuo</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Retorno Histórico (%)
                </label>
                <input
                  type="number"
                  value={newAsset.historicalReturn}
                  onChange={(e) =>
                    setNewAsset({
                      ...newAsset,
                      historicalReturn: parseFloat(e.target.value),
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Riesgo
                </label>
                <select
                  value={newAsset.risk}
                  onChange={(e) =>
                    setNewAsset({
                      ...newAsset,
                      risk: e.target.value as RiskLevel,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value={RiskLevel.LOW}>Bajo</option>
                  <option value={RiskLevel.MEDIUM}>Medio</option>
                  <option value={RiskLevel.HIGH}>Alto</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  value={newAsset.description}
                  onChange={(e) =>
                    setNewAsset({ ...newAsset, description: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
