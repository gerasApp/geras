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
import { RetirementPlan } from "@/app/lib/definitions";

type Props = {
  plan: RetirementPlan;
};

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

function generateChartData(plan: RetirementPlan) {
  const { initialAmount, monthlyInversion, ReturnRate, duration } = plan;
  const annualReturn = ReturnRate / 100;

  const data = [];
  let total = initialAmount;
  let aportado = initialAmount;

  data.push({
    año: 0,
    total: parseFloat(total.toFixed(2)),
    aportado: parseFloat(aportado.toFixed(2)),
    interes: 0,
  });

  for (let año = 1; año <= duration; año++) {
    const annualContribution = monthlyInversion * 12;

    total = (total + annualContribution) * (1 + annualReturn);
    aportado += annualContribution;
    const interes = total - aportado;

    data.push({
      año,
      total: parseFloat(total.toFixed(2)),
      aportado: parseFloat(aportado.toFixed(2)),
      interes: parseFloat(interes.toFixed(2)),
    });
  }

  return data;
}

export default function PlanChart({ plan }: Props) {
  const data = generateChartData(plan);
  const finalValues = data[data.length - 1];

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
            data={data}
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
