"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  RetirementPlan,
  SimulationResult,
  PlanType,
} from "@/app/lib/api/plan/types";
import PlanChart from "@/app/components/planChart";
import { simulatePlan } from "@/app/lib/api/plan/simulate";
import { createPlan } from "@/app/lib/api/plan/create";
import Button from "@/app/components/Button";

export default function RetirementForm({ userId }: { userId: string }) {
  const router = useRouter();

  const [plan, setPlan] = useState<RetirementPlan>({
    id: 0,
    name: "",
    code: "",
    objective: 0,
    type: PlanType.FINAL_AMOUNT,
    initialAmount: 0,
    monthlyContribution: 0,
    expectedReturnRate: 0,
    duration: 0,
    userId: userId, // Use the user ID from the session
    createdAt: new Date().toISOString(),
  });

  const [simulationData, setSimulationData] = useState<SimulationResult[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const rendimientos = [
    { name: "Conservador", expectedReturnRate: 2.5, riesgo: `Riesgo bajo` },
    { name: "Moderado", expectedReturnRate: 5, riesgo: `Riesgo medio` },
    { name: "Agresivo", expectedReturnRate: 8, riesgo: `Riesgo alto` },
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
  function validateInputs(name: string, value: string | number) {
    const newErrors = { ...errors };

    switch (name) {
      case "name":
        if (typeof value === "string") {
          if (!value || value.trim() === "") {
            newErrors[name] = "El nombre del plan es requerido";
          } else if (value.length > 100) {
            newErrors[name] =
              "El nombre es demasiado largo (máx. 100 caracteres)";
          } else {
            delete newErrors[name];
          }
        }
        break;
      case "code":
        if (typeof value === "string") {
          if (!value || value.trim() === "") {
            newErrors[name] = "El código del plan es requerido";
          } else if (value.length > 20) {
            newErrors[name] =
              "El código es demasiado largo (máx. 20 caracteres)";
          } else {
            delete newErrors[name];
          }
        }
        break;
      case "objective":
        if (typeof value === "number") {
          if (isNaN(value)) {
            newErrors[name] = "El objetivo debe ser un número válido";
          } else if (value < 0) {
            newErrors[name] = "El objetivo debe ser positivo";
          } else if (value > 10000000000) {
            newErrors[name] = "El objetivo es demasiado alto";
          } else {
            delete newErrors[name];
          }
        }
        break;
      case "initialAmount":
        if (typeof value === "number") {
          if (isNaN(value)) {
            newErrors[name] = "El monto inicial debe ser un número válido";
          } else if (value < 0) {
            newErrors[name] = "El monto inicial debe ser positivo";
          } else if (value > 10000000) {
            newErrors[name] = "El monto inicial es demasiado alto";
          } else {
            delete newErrors[name];
          }
        }
        break;
      case "monthlyContribution":
        if (typeof value === "number") {
          if (isNaN(value)) {
            newErrors[name] = "El aporte mensual debe ser un número válido";
          } else if (value < 0) {
            newErrors[name] = "El aporte mensual debe ser positivo";
          } else if (value > 1000000) {
            newErrors[name] = "El aporte mensual es demasiado alto";
          } else {
            delete newErrors[name];
          }
        }
        break;
      case "expectedReturnRate":
        if (typeof value === "number") {
          if (isNaN(value)) {
            newErrors[name] = "El rendimiento debe ser un número válido";
          } else if (value < 0) {
            newErrors[name] = "El rendimiento debe ser positivo";
          } else if (value > 100) {
            newErrors[name] = "El rendimiento es demasiado alto (máx. 100%)";
          } else {
            delete newErrors[name];
          }
        }
        break;
      case "duration":
        if (typeof value === "number") {
          if (isNaN(value)) {
            newErrors[name] = "La duración debe ser un número válido";
          } else if (value < 1) {
            newErrors[name] = "La duración debe ser al menos 1 año";
          } else if (value > 100) {
            newErrors[name] = "La duración es demasiado larga (máx. 100 años)";
          } else {
            delete newErrors[name];
          }
        }
        break;
    }

    setErrors(newErrors);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;

    if (name === "type") {
      setPlan((prev) => ({
        ...prev,
        [name]: value as PlanType,
      }));
    } else if (name === "name" || name === "code") {
      validateInputs(name, value);
      setPlan((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      const numValue = parseFloat(value);
      validateInputs(name, numValue);
      setPlan((prev) => ({
        ...prev,
        [name]: numValue,
      }));
    }
  }

  const handleSavePlan = async () => {
    // Validate all fields before saving
    const requiredFields = [
      "name",
      "code",
      "objective",
      "initialAmount",
      "monthlyContribution",
      "expectedReturnRate",
      "duration",
    ];
    const newErrors: { [key: string]: string } = {};

    requiredFields.forEach((field) => {
      if (field === "name" || field === "code") {
        if (
          !plan[field as keyof RetirementPlan] ||
          String(plan[field as keyof RetirementPlan]).trim() === ""
        ) {
          newErrors[field] =
            `El campo ${field === "name" ? "nombre" : "código"} es requerido`;
        }
      } else {
        const value = plan[field as keyof RetirementPlan] as number;
        if (isNaN(value) || value <= 0) {
          newErrors[field] =
            `El campo ${field} debe ser un número válido mayor a 0`;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSaving(true);
    try {
      await createPlan(plan);
      setShowSuccessPopup(true);
    } catch (error: unknown) {
      console.error("Error saving plan:", error);
      alert(
        error instanceof Error ? error.message : "Error al guardar el plan",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    router.push("/inicio");
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Tu plan de retiro
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* New fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Plan *
            </label>
            <input
              type="text"
              name="name"
              value={plan.name}
              onChange={handleChange}
              maxLength={100}
              className={`w-full border rounded-lg px-3 py-2 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Ej: Plan de Retiro 2030"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Código del Plan *
            </label>
            <input
              type="text"
              name="code"
              value={plan.code}
              onChange={handleChange}
              maxLength={20}
              className={`w-full border rounded-lg px-3 py-2 ${
                errors.code ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Ej: RET2030"
            />
            {errors.code && (
              <p className="text-red-500 text-xs mt-1">{errors.code}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Objetivo Financiero *
            </label>
            <div className="relative">
              <input
                type="number"
                name="objective"
                value={plan.objective}
                onChange={handleChange}
                min="0"
                step="1000"
                className={`w-full border rounded-lg px-3 py-2 pl-8 ${
                  errors.objective ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="1000000"
              />
              <span className="absolute left-3 top-2 text-gray-500">$</span>
            </div>
            {errors.objective && (
              <p className="text-red-500 text-xs mt-1">{errors.objective}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Plan *
            </label>
            <select
              name="type"
              value={plan.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value={PlanType.FINAL_AMOUNT}>Monto Final</option>
              <option value={PlanType.RENT}>Renta</option>
            </select>
          </div>

          {/* Existing fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monto Inicial *
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
              Aporte Mensual *
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
              Rendimiento Anual *
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
              Duración *
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

        {/* Save Button */}
        <div className="mt-6 flex justify-center">
          <Button
            onClick={handleSavePlan}
            disabled={Object.keys(errors).length > 0}
            variant={Object.keys(errors).length > 0 ? "disabled" : "default"}
            size="md"
            loading={isSaving}
            loadingText="Guardando..."
          >
            Guardar Plan
          </Button>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            * Los campos marcados con un asterisco son obligatorios
          </p>
        </div>

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
                    setPlan((prev) => ({
                      ...prev,
                      expectedReturnRate: rendimiento.expectedReturnRate,
                    }))
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

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    ¡Éxito!
                  </h3>
                  <p className="text-sm text-gray-500">
                    Plan guardado correctamente
                  </p>
                </div>
              </div>
              <button
                onClick={handleClosePopup}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="h-8 w-8 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Plan Guardado
                  </h4>
                  <p className="text-gray-600">
                    Tu plan de retiro ha sido guardado exitosamente en el
                    sistema.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="text-sm text-gray-600 mb-2">
                    Detalles del plan:
                  </div>
                  <div className="text-left space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Nombre:</span>
                      <span className="font-medium text-gray-900">
                        {plan.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Código:</span>
                      <span className="font-medium text-gray-900">
                        {plan.code}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tipo:</span>
                      <span className="font-medium text-gray-900">
                        {plan.type === PlanType.FINAL_AMOUNT
                          ? "Monto Final"
                          : "Renta"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6">
              <Button
                onClick={handleClosePopup}
                variant="default"
                size="md"
                className="w-full"
              >
                Ir al Inicio
              </Button>
            </div>
          </div>
        </div>
      )}

      <PlanChart data={simulationData} />
    </div>
  );
}
