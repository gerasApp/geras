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
        <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
          <h3 className="text-sm font-medium text-blue-800">Total Acumulado</h3>
          <p className="text-2xl font-bold text-blue-900">
            {formatCurrency(finalValues?.total || 0)}
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-green-800">Total Aportado</h3>
          <p className="text-2xl font-bold text-green-900">
            {formatCurrency(finalValues?.aportado || 0)}
          </p>
        </div>
        <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
          <h3 className="text-sm font-medium text-amber-800">
            Intereses Ganados
          </h3>
          <p className="text-2xl font-bold text-amber-900">
            {formatCurrency(finalValues?.interes || 0)}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[450px] w-full">
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
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Bar
              dataKey="aportado"
              stackId="a"
              fill="#10b981"
              name="Ahorro Base"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="interes"
              stackId="a"
              fill="#f59e0b"
              name="Intereses Ganados"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
