import React, { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-bold text-[#161e2d] mb-1 tracking-wide"
          >
            {label}
            {props.required && <span className="text-[#d13212] ml-0.5">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full px-3 py-1.5 text-sm bg-white border ${
            error ? "border-[#d13212] focus:border-[#d13212]" : "border-[#68707f] focus:border-[#0972d3]"
          } rounded-[2px] text-[#161e2d] placeholder-[#879596] focus:outline-none focus:ring-1 ${
            error ? "focus:ring-[#d13212]" : "focus:ring-[#0972d3]"
          } disabled:bg-[#f2f3f3] disabled:text-[#879596] disabled:cursor-not-allowed transition-colors ${className}`}
          {...props}
        />
        {helperText && !error && (
          <p className="mt-1 text-xs text-[#545b64]">{helperText}</p>
        )}
        {error && <p className="mt-1 text-xs text-[#d13212]">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
