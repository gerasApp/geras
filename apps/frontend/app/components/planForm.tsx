"use client";

import { useState, useEffect } from "react";
import { RetirementPlan, SimulationResult } from "@geras/types";
import PlanChart from "@/app/components/planChart";
import { simulatePlan } from "@/app/lib/api/plan/simulate";

export default function RetirementForm() {
  const [plan, setPlan] = useState<RetirementPlan>({
    initialAmount: 0,
    monthlyContribution: 0,
    expectedReturnRate: 0,
    duration: 0,
  });

  const [simulationData, setSimulationData] = useState<SimulationResult[]>([]);

  const rendimientos = [
    { name: "Conservador", expectedReturnRate: 8, riesgo: `Riesgo bajo` },
    { name: "Moderado", expectedReturnRate: 10, riesgo: `Riesgo medio` },
    { name: "Agresivo", expectedReturnRate: 12, riesgo: `Riesgo alto` },
  ];

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const handleSimulation = async (planData: RetirementPlan) => {
      if (Object.keys(errors).length > 0) {
        return;
      }
      try {
        const results = await simulatePlan(planData);
        setSimulationData(results);
      } catch (error) {
        console.error("Simulation error:", error);
      }
    };

    // Evitar llamadas a la API mientras se escribe
    const timeoutId = setTimeout(() => {
      handleSimulation(plan);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [plan, errors]);

  // TODO:
  // mover esta validacion a zod y hacer que se ejecute antes de llamar a la API
  function validateInputs(name: string, value: number) {
    const newErrors = { ...errors };

    switch (name) {
      case "initialAmount":
        if (isNaN(value)) {
          newErrors[name] = "El monto inicial debe ser un número válido";
        } else if (value < 0) {
          newErrors[name] = "El monto inicial debe ser positivo";
        } else if (value > 10000000) {
          newErrors[name] = "El monto inicial es demasiado alto";
        } else {
          delete newErrors[name];
        }
        break;
      case "monthlyContribution":
        if (isNaN(value)) {
          newErrors[name] = "El aporte mensual debe ser un número válido";
        } else if (value < 0) {
          newErrors[name] = "El aporte mensual debe ser positivo";
        } else if (value > 1000000) {
          newErrors[name] = "El aporte mensual es demasiado alto";
        } else {
          delete newErrors[name];
        }
        break;
      case "expectedReturnRate":
        if (isNaN(value)) {
          newErrors[name] = "El rendimiento debe ser un número válido";
        } else if (value < 0) {
          newErrors[name] = "El rendimiento debe ser positivo";
        } else if (value > 100) {
          newErrors[name] = "El rendimiento es demasiado alto (máx. 100%)";
        } else {
          delete newErrors[name];
        }
        break;
      case "duration":
        if (isNaN(value)) {
          newErrors[name] = "La duración debe ser un número válido";
        } else if (value < 1) {
          newErrors[name] = "La duración debe ser al menos 1 año";
        } else if (value > 100) {
          newErrors[name] = "La duración es demasiado larga (máx. 100 años)";
        } else {
          delete newErrors[name];
        }
        break;
    }

    setErrors(newErrors);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const numValue = parseFloat(value);

    validateInputs(name, numValue);

    setPlan((prev) => ({
      ...prev,
      [name]: numValue,
    }));
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Tu plan de retiro
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monto Inicial
            </label>
            <div className="relative">
              <input
                type="number"
                name="initialAmount"
                value={plan.initialAmount}
                onChange={handleChange}
                min="0"
                step="1000"
                className={`w-full border rounded-lg px-3 py-2 pl-8 ${
                  errors.initialAmount ? "border-red-500" : "border-gray-300"
                }`}
              />
              <span className="absolute left-3 top-2 text-gray-500">$</span>
            </div>
            {errors.initialAmount && (
              <p className="text-red-500 text-xs mt-1">
                {errors.initialAmount}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Aporte Mensual
            </label>
            <div className="relative">
              <input
                type="number"
                name="monthlyContribution"
                value={plan.monthlyContribution}
                onChange={handleChange}
                min="0"
                step="50"
                className={`w-full border rounded-lg px-3 py-2 pl-8 ${
                  errors.monthlyContribution
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              <span className="absolute left-3 top-2 text-gray-500">$</span>
            </div>
            {errors.monthlyContribution && (
              <p className="text-red-500 text-xs mt-1">
                {errors.monthlyContribution}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rendimiento Anual
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                name="expectedReturnRate"
                value={plan.expectedReturnRate}
                onChange={handleChange}
                min="0"
                max="100"
                className={`w-full border rounded-lg px-3 py-2 pr-8 ${errors.expectedReturnRate ? "border-red-500" : "border-gray-300"}`}
              />
              <span className="absolute right-3 top-2 text-gray-500">%</span>
            </div>
            {errors.expectedReturnRate && (
              <p className="text-red-500 text-xs mt-1">
                {errors.expectedReturnRate}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duración
            </label>
            <div className="relative">
              <input
                type="number"
                name="duration"
                value={plan.duration}
                onChange={handleChange}
                min="1"
                max="100"
                className={`w-full border rounded-lg px-3 py-2 pr-12 focus:border-transparent ${
                  errors.duration ? "border-red-500" : "border-gray-300"
                }`}
              />
              <span className="absolute right-3 top-2 text-gray-500 text-sm">
                años
              </span>
            </div>
            {errors.duration && (
              <p className="text-red-500 text-xs mt-1">{errors.duration}</p>
            )}
          </div>
        </form>

        <div className="mt-6 rounded-lg">
          <h3 className="text-sm font-medium text-gray-800 mb-3">
            Rendimientos sugeridos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {rendimientos.map((rendimiento) => {
              return (
                <button
                  key={`${rendimiento.name}-button`}
                  onClick={() =>
                    setPlan({
                      initialAmount: plan.initialAmount,
                      monthlyContribution: plan.monthlyContribution,
                      expectedReturnRate: rendimiento.expectedReturnRate,
                      duration: plan.duration,
                    })
                  }
                  className="p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors text-left"
                >
                  <div className="text-sm font-medium text-gray-800">
                    {rendimiento.name}
                  </div>
                  <div className="text-xs text-gray-600">
                    {rendimiento.riesgo} - {rendimiento.expectedReturnRate}%
                    anual
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <PlanChart data={simulationData} />
    </div>
  );
}
