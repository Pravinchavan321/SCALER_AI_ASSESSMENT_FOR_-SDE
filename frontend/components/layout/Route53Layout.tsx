"use client";

import React, { ReactNode } from "react";
import { AwsTopBar } from "./AwsTopBar";
import { ServiceHeader } from "./ServiceHeader";
import { Sidebar } from "./Sidebar";

export interface Route53LayoutProps {
  children: ReactNode;
}

export const Route53Layout: React.FC<Route53LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f2f3f3] flex flex-col font-sans">
      {/* 1. Global AWS Top Bar */}
      <AwsTopBar />

      {/* 2. Route 53 Service Header */}
      <ServiceHeader />

      {/* 3. Main Workspace with Sidebar and Content Container */}
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 min-w-0 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
