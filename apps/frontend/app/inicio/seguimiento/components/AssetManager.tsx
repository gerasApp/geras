"use client";

import { useState } from "react";
import {
  Asset,
  CreateAssetDto,
  AssetType,
  RiskLevel,
} from "@/app/lib/api/assets/types";
import { RetirementPlan } from "@/app/lib/api/plan/types";
import Button from "@/app/components/Button";

interface AssetManagerProps {
  assets: Asset[];
  plans: RetirementPlan[];
  loading: boolean;
  error: string | null;
  onCreate: (data: CreateAssetDto) => Promise<void>;
  onUpdate: (id: string, data: CreateAssetDto) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function AssetManager({
  assets,
  plans,
  loading,
  error,
  onCreate,
  onUpdate,
  onDelete,
}: AssetManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [newAsset, setNewAsset] = useState<CreateAssetDto>({
    name: "",
    type: AssetType.STOCK,
    historicalReturn: 0,
    risk: RiskLevel.MEDIUM,
    description: "",
    planId: undefined,
    userId: "",
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
      planId: undefined,
      userId: "",
    });
  };

  const handleEdit = (asset: Asset) => {
    setEditingAsset(asset);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAsset) {
      await onUpdate(editingAsset.id.toString(), {
        name: editingAsset.name,
        type: editingAsset.type,
        historicalReturn: editingAsset.historicalReturn,
        risk: editingAsset.risk,
        description: editingAsset.description,
        planId: editingAsset.planId,
        userId: editingAsset.userId,
      });
      setIsEditModalOpen(false);
      setEditingAsset(null);
    }
  };

  const getPlanName = (planId?: number) => {
    if (!planId) return "Sin asignar";
    const plan = plans.find((p) => p.id === planId);
    return plan ? plan.name : "Plan no encontrado";
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
        <Button onClick={() => setIsModalOpen(true)}>Agregar Activo</Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[var(--color-brand-primary)]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Retorno Histórico
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Riesgo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Plan Asignado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assets.map((asset) => (
              <tr
                key={asset.id}
                className="text-[var(--color-brand-secondary)] hover:bg-[#C3F0FF]"
              >
                <td className="px-6 py-4 whitespace-nowrap">{asset.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{asset.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {asset.historicalReturn}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{asset.risk}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getPlanName(asset.planId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(asset)}
                    className="text-[var(--color-brand-primary)] hover:text-blue-600 mr-2 p-1 rounded-md transition-colors"
                    title="Editar"
                  >
                    {/* EDIT LOGO  */}
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(asset.id.toString())}
                    className="text-red-500 hover:text-red-900 p-1 rounded-md transition-colors"
                    title="Eliminar"
                  >
                    {/* DELETE LOGO  */}
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg border border-gray-200 max-h-[90vh] overflow-y-auto">
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
                  Plan Asignado
                </label>
                <select
                  value={newAsset.planId || ""}
                  onChange={(e) =>
                    setNewAsset({
                      ...newAsset,
                      planId: e.target.value
                        ? parseInt(e.target.value)
                        : undefined,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Sin asignar</option>
                  {plans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} ({plan.code})
                    </option>
                  ))}
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
                <Button
                  variant="secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">Guardar</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Editar Activo</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  value={editingAsset?.name || ""}
                  onChange={(e) =>
                    setEditingAsset(
                      editingAsset
                        ? { ...editingAsset, name: e.target.value }
                        : null,
                    )
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
                  value={editingAsset?.type || AssetType.STOCK}
                  onChange={(e) =>
                    setEditingAsset(
                      editingAsset
                        ? { ...editingAsset, type: e.target.value as AssetType }
                        : null,
                    )
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
                  value={editingAsset?.historicalReturn || 0}
                  onChange={(e) =>
                    setEditingAsset(
                      editingAsset
                        ? {
                            ...editingAsset,
                            historicalReturn: parseFloat(e.target.value),
                          }
                        : null,
                    )
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
                  value={editingAsset?.risk || RiskLevel.MEDIUM}
                  onChange={(e) =>
                    setEditingAsset(
                      editingAsset
                        ? { ...editingAsset, risk: e.target.value as RiskLevel }
                        : null,
                    )
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
                  Plan Asignado
                </label>
                <select
                  value={editingAsset?.planId || ""}
                  onChange={(e) =>
                    setEditingAsset(
                      editingAsset
                        ? {
                            ...editingAsset,
                            planId: e.target.value
                              ? parseInt(e.target.value)
                              : undefined,
                          }
                        : null,
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Sin asignar</option>
                  {plans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} ({plan.code})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  value={editingAsset?.description || ""}
                  onChange={(e) =>
                    setEditingAsset(
                      editingAsset
                        ? { ...editingAsset, description: e.target.value }
                        : null,
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
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
