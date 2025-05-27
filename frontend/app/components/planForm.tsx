'use client';

import { useState } from 'react';
import { RetirementPlan } from '@/app/lib/definitions';
import PlanChart from '@/app/components/planChart';

export default function RetirementForm() {
  const [plan, setPlan] = useState<RetirementPlan>({
    initialAmount: 1000,
    monthlyInversion: 100,
    ReturnRate: 10,
    duration: 30,
  });


  const rendimientos = [
    { name: 'Conservador', ReturnRate: 8, riesgo: `Riesgo bajo` },
    { name: 'Moderado', ReturnRate: 10, riesgo: `Riesgo medio` },
    { name: 'Agresivo', ReturnRate: 12, riesgo: `Riesgo alto` },
  ];

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  function validateInputs(name: string, value: number) {
    const newErrors = { ...errors };

    switch (name) {
      case 'initialAmount':
        if (value < 0) {
          newErrors[name] = 'El monto inicial debe ser positivo';
        } else if (value > 10000000) {
          newErrors[name] = 'El monto inicial es demasiado alto';
        } else {
          delete newErrors[name];
        }
        break;
      case 'monthlyInversion':
        if (value < 0) {
          newErrors[name] = 'El aporte mensual debe ser positivo';
        } else if (value > 1000000) {
          newErrors[name] = 'El aporte mensual es demasiado alto';
        } else {
          delete newErrors[name];
        }
        break;
      case 'ReturnRate':
        if (value < 0) {
          newErrors[name] = 'El rendimiento debe ser positivo';
        } else if (value > 100) {
          newErrors[name] = 'El rendimiento es demasiado alto (máx. 100%)';
        } else {
          delete newErrors[name];
        }
        break;
      case 'duration':
        if (value < 1) {
          newErrors[name] = 'La duración debe ser al menos 1 año';
        } else if (value > 100) {
          newErrors[name] = 'La duración es demasiado larga (máx. 100 años)';
        } else {
          delete newErrors[name];
        }
        break;
    }

    setErrors(newErrors);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const numValue = parseFloat(value) || 0;

    validateInputs(name, numValue);

    setPlan((prev) => ({
      ...prev,
      [name]: numValue,
    }));
  }

  function formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }

  const totalInvestment = plan.initialAmount + (plan.monthlyInversion * plan.duration * 12);

  /* Aca esta acoplado el grafico y el formulario despues hay que cambiarlo pero por ahora va*/
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Tu plan de retiro</h2>

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
                className={`w-full border rounded-lg px-3 py-2 pl-8 ${errors.initialAmount ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              <span className="absolute left-3 top-2 text-gray-500">$</span>
            </div>
            {errors.initialAmount && (
              <p className="text-red-500 text-xs mt-1">{errors.initialAmount}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Aporte Mensual
            </label>
            <div className="relative">
              <input
                type="number"
                name="monthlyInversion"
                value={plan.monthlyInversion}
                onChange={handleChange}
                min="0"
                step="50"
                className={`w-full border rounded-lg px-3 py-2 pl-8 ${errors.monthlyInversion ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              <span className="absolute left-3 top-2 text-gray-500">$</span>
            </div>
            {errors.monthlyInversion && (
              <p className="text-red-500 text-xs mt-1">{errors.monthlyInversion}</p>
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
                name="ReturnRate"
                value={plan.ReturnRate}
                onChange={handleChange}
                min="0"
                max="100"
                className={`w-full border rounded-lg px-3 py-2 pr-8 ${errors.ReturnRate ? 'border-red-500' : 'border-gray-300'}`}
              />
              <span className="absolute right-3 top-2 text-gray-500">%</span>
            </div>
            {errors.ReturnRate && (
              <p className="text-red-500 text-xs mt-1">{errors.ReturnRate}</p>
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
                className={`w-full border rounded-lg px-3 py-2 pr-12 focus:border-transparent ${errors.duration ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              <span className="absolute right-3 top-2 text-gray-500 text-sm">años</span>
            </div>
            {errors.duration && (
              <p className="text-red-500 text-xs mt-1">{errors.duration}</p>
            )}
          </div>
        </form>


        <div className="mt-6 rounded-lg">
          <h3 className="text-sm font-medium text-gray-800 mb-3">Rendimientos sugeridos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {rendimientos.map((rendimiento) => {
              return (
                <button
                  key={`${rendimiento.name}-button`}
                  onClick={() => setPlan({
                    initialAmount: plan.initialAmount,
                    monthlyInversion: plan.monthlyInversion,
                    ReturnRate: rendimiento.ReturnRate,
                    duration: plan.duration,
                  })}
                  className="p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors text-left"
                >
                  <div className="text-sm font-medium text-gray-800">{rendimiento.name}</div>
                  <div className="text-xs text-gray-600">{rendimiento.riesgo} - {rendimiento.ReturnRate}% anual</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <PlanChart plan={plan} />
    </div>
  );
}
