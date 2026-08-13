"use client";

import { MockSectionPage } from "@/components/route53/MockSectionPage";

export default function ResolverPage() {
  return (
    <MockSectionPage
      section="Resolver"
      title="Route 53 Resolver"
      description="Manage inbound and outbound endpoints to connect hybrid cloud DNS resolutions across on-premises and AWS VPCs in upcoming releases."
    />
  );
}
