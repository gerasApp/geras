"use client";

interface StatCardProps {
  title: string;
  value: string | number;
  type?: "success" | "warning" | "info" | "error";
  className?: string;
}

export default function StatCard({
  title,
  value,
  type = "info",
  className = "",
}: StatCardProps) {
  const colors = {
    success: {
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-500",
      title: "text-green-800 dark:text-green-200",
      value: "text-green-900 dark:text-green-100",
    },
    warning: {
      bg: "bg-amber-50 dark:bg-amber-900/20",
      border: "border-amber-500",
      title: "text-amber-800 dark:text-amber-200",
      value: "text-amber-900 dark:text-amber-100",
    },
    info: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-500",
      title: "text-blue-800 dark:text-blue-200",
      value: "text-blue-900 dark:text-blue-100",
    },
    error: {
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-500",
      title: "text-red-800 dark:text-red-200",
      value: "text-red-900 dark:text-red-100",
    },
  };

  const colorScheme = colors[type];

  return (
    <div
      className={`${colorScheme.bg} rounded-lg p-4 border-l-4 ${colorScheme.border} ${className}`}
    >
      <h3 className={`text-sm font-medium ${colorScheme.title}`}>{title}</h3>
      <p className={`text-2xl font-bold ${colorScheme.value}`}>{value}</p>
    </div>
  );
}
