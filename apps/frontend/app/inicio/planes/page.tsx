"use client";

import React, { useEffect, useState } from "react";
import { PlanType, RetirementPlan } from "@/app/lib/api/plan/types";
import { getAllPlans } from "@/app/lib/api/plan/getAll";

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
              <button className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Editar
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
