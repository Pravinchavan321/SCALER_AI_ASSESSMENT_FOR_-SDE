"use client";

import { MockSectionPage } from "@/components/route53/MockSectionPage";

export default function DashboardPage() {
  return (
    <MockSectionPage
      section="Dashboard"
      title="Route 53 Dashboard"
      description="Monitor DNS query metrics, hosted zone health status, and global network performance in upcoming releases."
    />
  );
}
