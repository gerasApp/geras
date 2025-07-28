"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { SimulationResult } from "@geras/types";
import {
  BanknotesIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatTooltipValue = (value: number, name: string) => {
  return [formatCurrency(value), name];
};

const formatYAxisTick = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
};

export default function PlanChart({ data }: { data: SimulationResult[] }) {
  const [showInfoBox, setShowInfoBox] = useState(false);

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 w-full">
        <div className="flex items-center justify-center h-[450px]">
          <div className="text-gray-500">No hay datos para mostrar</div>
        </div>
      </div>
    );
  }

  // Formatear los datos para el gráfico
  const chartData = data.map((item) => ({
    año: item.year,
    total: parseFloat(item.totalAmount.toFixed(2)),
    aportado: parseFloat(item.contributions.toFixed(2)),
    interes: parseFloat(item.interest.toFixed(2)),
  }));

  const finalValues = chartData[chartData.length - 1];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[var(--color-brand-light)] rounded-lg p-4 shadow-md border-black-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-[var(--color-brand-secondary)]">
                Patrimonio Acumulado
              </h3>
              <p className="text-2xl font-bold text-[var(--color-brand-secondary)]">
                {formatCurrency(finalValues?.total || 0)}
              </p>
            </div>
            <CurrencyDollarIcon className="h-10 w-10 text-[var(--color-brand-secondary)]" />
          </div>
        </div>
        <div className="bg-[var(--color-brand-light)] rounded-lg p-4 shadow-md border-black-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-[var(--color-brand-secondary)]">
                Total Aportado
              </h3>
              <p className="text-2xl font-bold text-[var(--color-brand-secondary)]">
                {formatCurrency(finalValues?.aportado || 0)}
              </p>
            </div>
            <BanknotesIcon className="h-10 w-10 text-[var(--color-brand-secondary)]" />
          </div>
        </div>
        <div className="bg-[var(--color-brand-primary)] rounded-lg p-4 shadow-md border-black-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-[var(--color-brand-light)]">
                Intereses Ganados
              </h3>
              <p className="text-2xl font-bold text-[var(--color-brand-light)]">
                {formatCurrency(finalValues?.interes || 0)}
              </p>
            </div>
            <ArrowTrendingUpIcon className="h-10 w-10 text-[var(--color-brand-light)]" />
          </div>
        </div>
      </div>

      {/* Chart and Info Box */}
      <div className="flex gap-6">
        {/* Chart */}
        <div className={`h-[450px] ${showInfoBox ? "flex-1" : "w-full"}`}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="año" stroke="#666" fontSize={12} />
              <YAxis
                tickFormatter={formatYAxisTick}
                stroke="#666"
                fontSize={12}
              />
              <Tooltip
                formatter={formatTooltipValue}
                labelFormatter={(label) => `Año ${label}`}
                contentStyle={{
                  backgroundColor: "var(--color-brand-light)",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar
                dataKey="aportado"
                stackId="a"
                fill="var(--color-brand-secondary)"
                // no estoy seguro si mantener la paleta de colores
                // o mantener otro color vistoso para darle mayor claridad a los interes
                name="Ahorro Base"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="interes"
                stackId="a"
                fill="var(--color-brand-primary)"
                name="Intereses Ganados"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setShowInfoBox(!showInfoBox)}
          className="flex items-center justify-center w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          title={
            showInfoBox ? "Ocultar configuración" : "Mostrar configuración"
          }
        >
          {showInfoBox ? (
            <EyeSlashIcon className="h-4 w-4 text-[var(--color-brand-secondary)]" />
          ) : (
            <EyeIcon className="h-4 w-4 text-[var(--color-brand-secondary)]" />
          )}
        </button>

        {/* Empty Info Box - Ver despues de mostrar configuración de plan */}
        {showInfoBox && (
          <div className="w-40 rounded-lg border-2 border-[var(--color-brand-primary)] flex justify-center">
            <div className="text-[var(--color-brand-primary)] text-center">
              <h3 className="text-xs">Configuración plan</h3>
              <p className="text-xs mt-1">Contenido disponible próximamente</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
