import React from "react";
import Link from "next/link";

export interface ServiceHeaderProps {
  serviceName?: string;
  subtitle?: string;
}

export const ServiceHeader: React.FC<ServiceHeaderProps> = ({
  serviceName = "Route 53",
  subtitle = "Scalable DNS and Domain Name Registration",
}) => {
  return (
    <div className="bg-[#232f3e] text-white px-6 py-3 flex items-center justify-between border-b border-[#3b4758] shadow-sm select-none">
      <div className="flex items-center space-x-3">
        <Link href="/" className="flex items-center space-x-2 text-white hover:text-[#ec7211] transition-colors">
          <div className="p-1.5 bg-[#161e2d] rounded-[2px] border border-[#3b4758]">
            <svg className="w-5 h-5 text-[#ec7211]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white leading-tight">
              {serviceName}
            </h1>
            <p className="text-[11px] text-[#879596] hidden sm:block">
              {subtitle}
            </p>
          </div>
        </Link>
      </div>

      <div className="flex items-center space-x-3 text-xs">
        <a
          href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#879596] hover:text-white flex items-center space-x-1"
        >
          <span>Route 53 Documentation</span>
          <svg className="w-3 h-3 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
};
