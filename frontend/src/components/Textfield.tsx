import React, { forwardRef } from "react";

interface TextfieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Textfield = forwardRef<HTMLInputElement, TextfieldProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-slate-300 ml-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full bg-slate-800/50 border ${
            error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-slate-700 focus:border-blue-500 focus:ring-blue-500/20"
          } text-slate-100 placeholder-slate-500 rounded-xl px-4 py-2.5 transition-all outline-none focus:ring-4 ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500 mt-1 ml-1">{error}</span>}
      </div>
    );
  }
);

Textfield.displayName = "Textfield";
