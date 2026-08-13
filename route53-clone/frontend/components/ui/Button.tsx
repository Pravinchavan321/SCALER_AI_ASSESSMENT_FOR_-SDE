import React, { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive" | "link" | "icon";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "secondary",
  size = "md",
  loading = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#0972d3] disabled:opacity-50 disabled:cursor-not-allowed select-none whitespace-nowrap flex-shrink-0";

  const sizeStyles = {
    sm: "text-xs px-2.5 py-1 rounded-[16px] h-7",
    md: "text-sm px-4 py-1.5 rounded-[20px] h-8",
    lg: "text-base px-5 py-2 rounded-[24px] h-10",
  };

  const variantStyles = {
    primary:
      "bg-[#ec7211] hover:bg-[#eb5f07] active:bg-[#dd6b10] text-white border border-transparent shadow-sm",
    secondary:
      "bg-white hover:bg-[#f2f3f3] active:bg-[#eaeded] text-[#161e2d] border border-[#545b64] shadow-sm",
    destructive:
      "bg-white hover:bg-[#ffeded] active:bg-[#fbd0cb] text-[#d13212] border border-[#d13212] shadow-sm",
    link:
      "bg-transparent text-[#0972d3] hover:text-[#033160] hover:underline p-0 h-auto rounded-none focus:ring-0",
    icon:
      "bg-transparent hover:bg-[#eaeded] text-[#545b64] hover:text-[#161e2d] p-1.5 rounded-full focus:ring-0",
  };

  const finalClass = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  return (
    <button className={finalClass} disabled={disabled || loading} {...props}>
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
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
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};
