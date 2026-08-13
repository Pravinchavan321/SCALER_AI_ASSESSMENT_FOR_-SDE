"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavItem {
  name: string;
  href: string;
  isMocked?: boolean;
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", isMocked: true },
  { name: "Hosted zones", href: "/", isMocked: false },
  { name: "Traffic policies", href: "/traffic-policies", isMocked: true },
  { name: "Health checks", href: "/health-checks", isMocked: true },
  { name: "Resolver", href: "/resolver", isMocked: true },
  { name: "Profiles", href: "/profiles", isMocked: true },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-white border-r border-[#eaeded] min-h-[calc(100vh-88px)] flex flex-col select-none flex-shrink-0">
      <div className="py-4">
        <div className="px-5 mb-2">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#545b64]">
            DNS Management
          </h2>
        </div>
        <nav className="space-y-0.5">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/" || pathname?.startsWith("/hosted-zones")
                : pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-5 py-2 text-xs transition-colors ${
                  isActive
                    ? "bg-[#f2f8fd] text-[#0972d3] font-bold border-l-[3px] border-l-[#0972d3] pl-[17px]"
                    : "text-[#161e2d] hover:bg-[#f8f9fa] hover:text-[#0972d3] border-l-[3px] border-l-transparent"
                }`}
              >
                <span>{item.name}</span>
                {item.isMocked && (
                  <span className="text-[10px] bg-[#f2f3f3] text-[#879596] px-1.5 py-0.5 rounded font-normal">
                    Soon
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-[#eaeded] bg-[#fafafa]">
        <div className="text-[11px] text-[#545b64]">
          <p className="font-semibold text-[#161e2d]">Amazon Route 53</p>
          <p className="text-[#879596] mt-0.5">DNS, Routing & Health Checks</p>
        </div>
      </div>
    </aside>
  );
};
