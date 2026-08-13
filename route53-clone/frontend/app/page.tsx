"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Route53Layout, PageContainer } from "@/components/layout";
import { Button, SearchInput, Table, Badge, Pagination } from "@/components/ui";

export default function HostedZonesPlaceholderPage() {
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

  // Visual skeleton columns matching Route 53 specification & screenshots
  const columns = [
    {
      key: "name",
      header: "Hosted zone name",
      render: (item: any) => (
        <span className="text-[#0972d3] font-semibold hover:underline">
          {item.name}
        </span>
      ),
    },
    {
      key: "zone_type",
      header: "Type",
      render: (item: any) => (
        <Badge variant={item.zone_type === "Public" ? "info" : "neutral"}>
          {item.zone_type}
        </Badge>
      ),
    },
    {
      key: "record_count",
      header: "Record count",
    },
    {
      key: "comment",
      header: "Description",
      render: (item: any) => (
        <span className="text-[#545b64]">{item.comment || "-"}</span>
      ),
    },
    {
      key: "id",
      header: "Hosted zone ID",
      render: (item: any) => (
        <span className="text-[#545b64] font-mono text-[11px]">{item.id}</span>
      ),
    },
  ];

  // Visual demonstration placeholder rows (NO backend CRUD integration)
  const placeholderData = [
    {
      id: "Z0123456789ABCDEF",
      name: "example.com",
      zone_type: "Public",
      record_count: 4,
      comment: "Primary company domain (Visual placeholder)",
    },
    {
      id: "Z0987654321FEDCBA",
      name: "internal.corp",
      zone_type: "Private",
      record_count: 2,
      comment: "Internal VPC infrastructure (Visual placeholder)",
    },
  ];

  return (
    <Route53Layout>
      <PageContainer
        breadcrumbs={[
          { label: "Route 53", href: "/" },
          { label: "Hosted zones" },
        ]}
        title="Hosted zones (2)"
        subtitle="A hosted zone contains records that define how you want to route traffic for a domain."
        actions={
          <>
            <Button variant="secondary" size="md">
              Delete zone
            </Button>
            <Button variant="secondary" size="md">
              View details
            </Button>
            <Button variant="primary" size="md">
              Create hosted zone
            </Button>
          </>
        }
      >
        {/* Table Controls: Search & Refresh Filter Bar */}
        <div className="bg-white p-3 border border-[#eaeded] border-b-0 rounded-t-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <SearchInput placeholder="Filter hosted zones by name or description" />

          <div className="flex items-center space-x-2">
            <Button variant="icon" title="Refresh">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </Button>
            <Button variant="icon" title="Settings">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Visual Skeleton Table */}
        <Table
          columns={columns}
          data={placeholderData}
          keyExtractor={(item) => item.id}
          selectable={true}
          selectedId={placeholderData[0].id}
        />

        {/* Pagination Bar */}
        <Pagination
          page={1}
          totalPages={1}
          totalItems={2}
          pageSize={10}
          onPageChange={() => {}}
        />
      </PageContainer>
    </Route53Layout>
  );
}
