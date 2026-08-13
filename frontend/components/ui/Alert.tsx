import React, { ReactNode } from "react";

export interface AlertProps {
  type?: "success" | "error" | "warning" | "info";
  title?: string;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type = "info",
  title,
  children,
  onClose,
  className = "",
}) => {
  const typeStyles = {
    info: {
      border: "border-l-4 border-l-[#0972d3] border-t border-r border-b border-[#d5dbdb]",
      bg: "bg-[#f2f8fd]",
      iconColor: "text-[#0972d3]",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
    },
    success: {
      border: "border-l-4 border-l-[#037f0c] border-t border-r border-b border-[#d5dbdb]",
      bg: "bg-[#f2fcf3]",
      iconColor: "text-[#037f0c]",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
    },
    warning: {
      border: "border-l-4 border-l-[#ec7211] border-t border-r border-b border-[#d5dbdb]",
      bg: "bg-[#fffaf2]",
      iconColor: "text-[#ec7211]",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      ),
    },
    error: {
      border: "border-l-4 border-l-[#d13212] border-t border-r border-b border-[#d5dbdb]",
      bg: "bg-[#fdf3f1]",
      iconColor: "text-[#d13212]",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
    },
  };

  const current = typeStyles[type];

  return (
    <div
      className={`p-3.5 rounded-[2px] ${current.border} ${current.bg} text-xs text-[#161e2d] flex items-start space-x-3 ${className}`}
    >
      <div className={`flex-shrink-0 mt-0.5 ${current.iconColor}`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {current.icon}
        </svg>
      </div>
      <div className="flex-1">
        {title && <h4 className="font-bold text-[#161e2d] mb-0.5 text-xs">{title}</h4>}
        <div>{children}</div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-[#545b64] hover:text-[#161e2d] focus:outline-none"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};
