import React, { ReactNode } from "react";
import { Breadcrumbs, BreadcrumbItem } from "./Breadcrumbs";

export interface PageContainerProps {
  breadcrumbs?: BreadcrumbItem[];
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  breadcrumbs,
  title,
  subtitle,
  actions,
  children,
  className = "",
}) => {
  return (
    <div className={`p-6 max-w-7xl w-full mx-auto ${className}`}>
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="mb-2" />}

      {(title || actions) && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 mb-4 border-b border-[#eaeded] gap-3">
          <div>
            {title && (
              <h1 className="text-xl font-bold text-[#161e2d] tracking-tight">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-xs text-[#545b64] mt-0.5">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex items-center space-x-2.5">{actions}</div>}
        </div>
      )}

      <div>{children}</div>
    </div>
  );
};
