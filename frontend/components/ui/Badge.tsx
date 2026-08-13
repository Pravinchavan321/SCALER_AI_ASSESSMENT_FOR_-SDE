import React, { ReactNode } from "react";

export interface BadgeProps {
  children: ReactNode;
  variant?: "neutral" | "info" | "success" | "warning" | "error";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "neutral",
  className = "",
}) => {
  const variantStyles = {
    neutral: "bg-[#f2f3f3] text-[#545b64] border-[#d5dbdb]",
    info: "bg-[#f2f8fd] text-[#0972d3] border-[#0972d3]",
    success: "bg-[#f2fcf3] text-[#037f0c] border-[#037f0c]",
    warning: "bg-[#fffaf2] text-[#8c4303] border-[#ec7211]",
    error: "bg-[#fdf3f1] text-[#d13212] border-[#d13212]",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
