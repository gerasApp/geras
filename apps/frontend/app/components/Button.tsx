"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "disabled";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  loadingText?: string;
}

export default function Button({
  children,
  variant = "default",
  size = "md",
  loading = false,
  loadingText,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const styles = {
    default: {
      sm: "bg-[var(--color-brand-primary)] text-white px-3 py-1 text-sm rounded-md hover:bg-[var(--color-brand-secondary)] disabled:opacity-50",
      md: "bg-[var(--color-brand-primary)] text-white px-4 py-2 rounded-md hover:bg-[var(--color-brand-secondary)] disabled:opacity-50",
      lg: "bg-[var(--color-brand-primary)] text-white px-6 py-3 text-lg rounded-md hover:bg-[var(--color-brand-secondary)] disabled:opacity-50",
    },
    secondary: {
      sm: "bg-gray-100 text-gray-700 px-3 py-1 text-sm rounded-md hover:bg-gray-200 ",
      md: "bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200",
      lg: "bg-gray-100 text-gray-700 px-6 py-3 text-lg rounded-md hover:bg-gray-200",
    },
    disabled: {
      sm: "bg-[var(--color-brand-disabled)] text-white px-3 py-1 text-sm rounded-md  disabled:opacity-50 disabled:cursor-not-allowed",
      md: "bg-[var(--color-brand-disabled)] text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed",
      lg: "bg-[var(--color-brand-disabled)] text-white px-6 py-3 text-lg rounded-md  disabled:opacity-50 disabled:cursor-not-allowed",
    },
  };

  const isDisabled = disabled || loading;

  return (
    <button
      className={`${styles[variant][size]} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>{loadingText || "Cargando..."}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
