"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Route53Layout, PageContainer } from "@/components/layout";
import { Card, EmptyState } from "@/components/ui";

interface MockPageProps {
  title: string;
  description: string;
  section: string;
}

export const MockSectionPage: React.FC<MockPageProps> = ({
  title,
  description,
  section,
}) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f2f3f3]">
        <div className="flex items-center space-x-2 text-sm text-[#545b64]">
          <svg className="animate-spin h-5 w-5 text-[#0972d3]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Authenticating AWS session...</span>
        </div>
      </div>
    );
  }

  return (
    <Route53Layout>
      <PageContainer
        breadcrumbs={[
          { label: "Route 53", href: "/" },
          { label: section },
        ]}
        title={title}
      >
        <Card>
          <EmptyState
            title={`${title} is Coming Soon`}
            description={description}
            actionText="Go to Hosted Zones"
            onAction={() => router.push("/")}
          />
        </Card>
      </PageContainer>
    </Route53Layout>
  );
};
