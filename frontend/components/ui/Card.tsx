import React, { ReactNode } from "react";

export interface CardProps {
  title?: string;
  headerAction?: ReactNode;
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  headerAction,
  children,
  className = "",
  footer,
}) => {
  return (
    <div
      className={`bg-white border border-[#eaeded] rounded-[2px] shadow-sm overflow-hidden ${className}`}
    >
      {(title || headerAction) && (
        <div className="px-5 py-3 border-b border-[#eaeded] flex items-center justify-between bg-white">
          {title && <h3 className="text-base font-bold text-[#161e2d]">{title}</h3>}
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
      {footer && (
        <div className="px-5 py-3 border-t border-[#eaeded] bg-[#fafafa] flex items-center justify-end space-x-2">
          {footer}
        </div>
      )}
    </div>
  );
};
