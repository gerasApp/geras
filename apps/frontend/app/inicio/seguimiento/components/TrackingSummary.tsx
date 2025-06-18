"use client";

import { TrackingEntry } from "@/app/lib/api/seguimiento/types";

interface TrackingSummaryProps {
  entries: TrackingEntry[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function TrackingSummary({ entries }: TrackingSummaryProps) {
  const totalIncome = entries
    .filter((entry) => entry.type === "income")
    .reduce((sum, entry) => sum + entry.amount, 0);

  const totalExpenses = entries
    .filter((entry) => entry.type === "expense")
    .reduce((sum, entry) => sum + entry.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
          <h3 className="text-sm font-medium text-blue-800">Total Acumulado</h3>
          <p className="text-2xl font-bold text-blue-900">
            {formatCurrency(totalIncome)}
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-green-800">Total Aportado</h3>
          <p className="text-2xl font-bold text-green-900">
            {formatCurrency(totalExpenses)}
          </p>
        </div>
        <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
          <h3 className="text-sm font-medium text-amber-800">
            Intereses Ganados
          </h3>
          <p className="text-2xl font-bold text-amber-900">
            {formatCurrency(balance)}
          </p>
        </div>
      </div>
    </div>
  );
}
