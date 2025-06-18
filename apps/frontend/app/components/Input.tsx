"use client";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  prefix?: string;
  suffix?: string;
}

export default function Input({
  label,
  error,
  prefix,
  suffix,
  className = "",
  ...props
}: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          className={`w-full border rounded-lg px-3 py-2 ${
            prefix ? "pl-8" : ""
          } ${suffix ? "pr-8" : ""} ${
            error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
          } dark:bg-gray-700 dark:text-gray-300 ${className}`}
        />
        {prefix && (
          <span className="absolute left-3 top-2 text-gray-500 dark:text-gray-400">
            {prefix}
          </span>
        )}
        {suffix && (
          <span className="absolute right-3 top-2 text-gray-500 dark:text-gray-400">
            {suffix}
          </span>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
