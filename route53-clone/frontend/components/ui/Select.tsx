import React, { SelectHTMLAttributes } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  helperText,
  className = "",
  id,
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-bold text-[#161e2d] mb-1 tracking-wide"
        >
          {label}
          {props.required && <span className="text-[#d13212] ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={`w-full appearance-none px-3 py-1.5 pr-8 text-sm bg-white border ${
            error ? "border-[#d13212] focus:border-[#d13212]" : "border-[#68707f] focus:border-[#0972d3]"
          } rounded-[2px] text-[#161e2d] focus:outline-none focus:ring-1 ${
            error ? "focus:ring-[#d13212]" : "focus:ring-[#0972d3]"
          } disabled:bg-[#f2f3f3] disabled:text-[#879596] disabled:cursor-not-allowed transition-colors ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#545b64]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {helperText && !error && <p className="mt-1 text-xs text-[#545b64]">{helperText}</p>}
      {error && <p className="mt-1 text-xs text-[#d13212]">{error}</p>}
    </div>
  );
};
