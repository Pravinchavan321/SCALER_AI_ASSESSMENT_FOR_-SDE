"use client";

import { MockSectionPage } from "@/components/route53/MockSectionPage";

export default function ProfilesPage() {
  return (
    <MockSectionPage
      section="Profiles"
      title="Route 53 Profiles"
      description="Define DNS configurations and apply them across multiple VPCs in your AWS Organization in upcoming releases."
    />
  );
}
