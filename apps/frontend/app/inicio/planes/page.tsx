"use client";

import React, { useEffect, useState } from "react";
import { PlanType, RetirementPlan } from "@/app/lib/api/plan/types";
import { getAllPlans } from "@/app/lib/api/plan/getAll";
import { updatePlan } from "@/app/lib/api/plan/update";

function getPlanTypeLabel(type: PlanType) {
  switch (type) {
    case PlanType.FINAL_AMOUNT:
      return "Monto Final";
    case PlanType.RENT:
      return "Renta";
    default:
      return type;
  }
}

export default function PlanesPage() {
  const [plans, setPlans] = useState<RetirementPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editPlan, setEditPlan] = useState<RetirementPlan | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    async function fetchPlans() {
      try {
        setLoading(true);
        const data = await getAllPlans();
        setPlans(data);
      } catch (err: any) {
        setError("Error al cargar los planes");
      } finally {
        setLoading(false);
      }
    }
    fetchPlans();
  }, []);

  function handleEditClick(plan: RetirementPlan) {
    setEditPlan({ ...plan });
    setEditError(null);
    setShowEdit(true);
  }

  function handleEditChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    if (!editPlan) return;
    const { name, value } = e.target;
    setEditPlan((prev) =>
      prev
        ? {
            ...prev,
            [name]:
              name === "expectedReturnRate" ||
              name === "objective" ||
              name === "initialAmount" ||
              name === "monthlyContribution" ||
              name === "duration"
                ? Number(value)
                : value,
          }
        : prev,
    );
  }

  async function handleEditSave() {
    if (!editPlan) return;
    setEditLoading(true);
    setEditError(null);
    try {
      const updated = await updatePlan(editPlan.id, {
        name: editPlan.name,
        code: editPlan.code,
        objective: editPlan.objective,
        type: editPlan.type,
        initialAmount: editPlan.initialAmount,
        monthlyContribution: editPlan.monthlyContribution,
        expectedReturnRate: editPlan.expectedReturnRate,
        duration: editPlan.duration,
      });
      setPlans((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      setShowEdit(false);
    } catch (err: any) {
      setEditError(err.message || "Error al actualizar el plan");
    } finally {
      setEditLoading(false);
    }
  }

  function handleEditClose() {
    setShowEdit(false);
    setEditPlan(null);
    setEditError(null);
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Planes</h1>
      {loading ? (
        <div className="text-gray-500">Cargando planes...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : plans.length === 0 ? (
        <div className="text-gray-500">No hay planes disponibles.</div>
      ) : (
        <div className="grid gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="border rounded-lg p-6 shadow flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-1">{plan.name}</h2>
                <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-2">
                  <span>
                    <b>Código:</b> {plan.code}
                  </span>
                  <span>
                    <b>Tipo:</b> {getPlanTypeLabel(plan.type)}
                  </span>
                  <span>
                    <b>Objetivo:</b> ${plan.objective.toLocaleString()}
                  </span>
                  <span>
                    <b>Duración:</b> {plan.duration} años
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-2">
                  <span>
                    <b>Monto inicial:</b> ${plan.initialAmount.toLocaleString()}
                  </span>
                  <span>
                    <b>Aporte mensual:</b> $
                    {plan.monthlyContribution.toLocaleString()}
                  </span>
                  <span>
                    <b>Rendimiento anual:</b> {plan.expectedReturnRate}%
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Creado: {new Date(plan.createdAt).toLocaleDateString()}
                </div>
              </div>
              <button
                className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                onClick={() => handleEditClick(plan)}
              >
                Editar
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Edit Popup */}
      {showEdit && editPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-8 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={handleEditClose}
            >
              <span aria-hidden>×</span>
            </button>
            <h2 className="text-2xl font-bold mb-4">Editar Plan</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  value={editPlan.name}
                  onChange={handleEditChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Código
                </label>
                <input
                  type="text"
                  name="code"
                  value={editPlan.code}
                  onChange={handleEditChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Objetivo
                </label>
                <input
                  type="number"
                  name="objective"
                  value={editPlan.objective}
                  onChange={handleEditChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo
                </label>
                <select
                  name="type"
                  value={editPlan.type}
                  onChange={handleEditChange}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value={PlanType.FINAL_AMOUNT}>Monto Final</option>
                  <option value={PlanType.RENT}>Renta</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monto inicial
                </label>
                <input
                  type="number"
                  name="initialAmount"
                  value={editPlan.initialAmount}
                  onChange={handleEditChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Aporte mensual
                </label>
                <input
                  type="number"
                  name="monthlyContribution"
                  value={editPlan.monthlyContribution}
                  onChange={handleEditChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rendimiento anual (%)
                </label>
                <input
                  type="number"
                  name="expectedReturnRate"
                  value={editPlan.expectedReturnRate}
                  onChange={handleEditChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duración (años)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={editPlan.duration}
                  onChange={handleEditChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            </form>
            {editError && <div className="text-red-500 mt-2">{editError}</div>}
            <div className="flex justify-end mt-6">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                onClick={handleEditClose}
                disabled={editLoading}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                onClick={handleEditSave}
                disabled={editLoading}
              >
                {editLoading ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
