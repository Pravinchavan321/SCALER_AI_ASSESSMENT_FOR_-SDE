"use client";

import { MockSectionPage } from "@/components/route53/MockSectionPage";

export default function HealthChecksPage() {
  return (
    <MockSectionPage
      section="Health checks"
      title="Health Checks"
      description="Configure automated endpoint health checks and CloudWatch alarms for automated failover routing in upcoming releases."
    />
  );
}
