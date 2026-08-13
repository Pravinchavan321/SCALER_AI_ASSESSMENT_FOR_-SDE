"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Route53Layout, PageContainer } from "@/components/layout";
import {
  Button,
  SearchInput,
  Table,
  Badge,
  Pagination,
  Alert,
} from "@/components/ui";
import {
  CreateHostedZoneModal,
  EditHostedZoneModal,
  DeleteHostedZoneModal,
} from "@/components/hosted-zones";
import { listHostedZonesApi } from "@/lib/hostedZones";
import { HostedZone } from "@/types/hostedZone";

export default function HostedZonesPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  // Hosted Zones state
  const [zones, setZones] = useState<HostedZone[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const limit = 10;
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  // Selected Row for Contextual Actions
  const [selectedZone, setSelectedZone] = useState<HostedZone | null>(null);

  // Modal visibility states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Redirect unauthenticated users
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  // Debounce search query input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  // Fetch hosted zones from backend API
  const fetchHostedZones = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await listHostedZonesApi(debouncedSearch, page, limit);
      setZones(res.items);
      setTotal(res.total);
      setTotalPages(res.total_pages);

      // Keep selectedZone valid if it's still in the returned items
      if (selectedZone) {
        const found = res.items.find((z) => z.id === selectedZone.id);
        setSelectedZone(found || null);
      }
    } catch (err: any) {
      if (err.status === 401) {
        router.push("/login");
      } else {
        setError(err.message || "Unable to load hosted zones. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [user, debouncedSearch, page, limit, selectedZone, router]);

  useEffect(() => {
    fetchHostedZones();
  }, [user, debouncedSearch, page]);

  // Auto-dismiss notification toast after 5s
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (authLoading || !user) {
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

  // Table Column Definitions
  const columns = [
    {
      key: "name",
      header: "Hosted zone name",
      render: (item: HostedZone) => (
        <Link
          href={`/hosted-zones/${item.id}`}
          className="text-[#0972d3] font-semibold hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {item.name}
        </Link>
      ),
    },
    {
      key: "zone_type",
      header: "Type",
      render: (item: HostedZone) => (
        <Badge variant={item.zone_type === "Public" ? "info" : "neutral"}>
          {item.zone_type}
        </Badge>
      ),
    },
    {
      key: "record_count",
      header: "Record count",
      render: (item: HostedZone) => <span>{item.record_count}</span>,
    },
    {
      key: "comment",
      header: "Description",
      render: (item: HostedZone) => (
        <span className="text-[#545b64]">{item.comment || "-"}</span>
      ),
    },
    {
      key: "id",
      header: "Hosted zone ID",
      render: (item: HostedZone) => (
        <span className="text-[#545b64] font-mono text-[11px]">
          Z{String(item.id).padStart(12, "0")}
        </span>
      ),
    },
  ];

  return (
    <Route53Layout>
      <PageContainer
        breadcrumbs={[
          { label: "Route 53", href: "/" },
          { label: "Hosted zones" },
        ]}
        title={`Hosted zones (${total})`}
        subtitle="A hosted zone contains records that define how you want to route traffic for a domain."
        actions={
          <>
            <Button
              variant="destructive"
              size="md"
              disabled={!selectedZone}
              onClick={() => setIsDeleteOpen(true)}
            >
              Delete zone
            </Button>
            <Button
              variant="secondary"
              size="md"
              disabled={!selectedZone}
              onClick={() => setIsEditOpen(true)}
            >
              Edit zone
            </Button>
            <Button
              variant="secondary"
              size="md"
              disabled={!selectedZone}
              onClick={() => {
                if (selectedZone) {
                  router.push(`/hosted-zones/${selectedZone.id}`);
                }
              }}
            >
              View details
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsCreateOpen(true)}
            >
              Create hosted zone
            </Button>
          </>
        }
      >
        {/* Notification Toast Alert */}
        {notification && (
          <div className="mb-4">
            <Alert
              type={notification.type}
              onClose={() => setNotification(null)}
            >
              {notification.message}
            </Alert>
          </div>
        )}

        {/* Global Error Banner */}
        {error && (
          <div className="mb-4">
            <Alert type="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          </div>
        )}

        {/* Search & Refresh Filter Bar */}
        <div className="bg-white p-3 border border-[#eaeded] border-b-0 rounded-t-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch("")}
            placeholder="Filter hosted zones by name or description"
          />

          <div className="flex items-center space-x-2">
            <Button
              variant="icon"
              title="Refresh"
              onClick={fetchHostedZones}
              disabled={isLoading}
            >
              <svg className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Data Table */}
        <Table
          columns={columns}
          data={zones}
          keyExtractor={(item) => item.id}
          selectable={true}
          selectedId={selectedZone ? selectedZone.id : null}
          onSelect={(item) =>
            setSelectedZone(selectedZone?.id === item.id ? null : item)
          }
          isLoading={isLoading}
          emptyMessage={
            debouncedSearch
              ? `No hosted zones match "${debouncedSearch}".`
              : "No hosted zones found. Choose 'Create hosted zone' to get started."
          }
        />

        {/* Pagination Controls */}
        <Pagination
          page={page}
          totalPages={totalPages}
          totalItems={total}
          pageSize={limit}
          onPageChange={(newPage) => setPage(newPage)}
        />

        {/* Modals */}
        <CreateHostedZoneModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onSuccess={() => {
            setNotification({
              type: "success",
              message: "Hosted zone created successfully.",
            });
            fetchHostedZones();
          }}
        />

        <EditHostedZoneModal
          isOpen={isEditOpen}
          zone={selectedZone}
          onClose={() => setIsEditOpen(false)}
          onSuccess={() => {
            setNotification({
              type: "success",
              message: "Hosted zone updated successfully.",
            });
            fetchHostedZones();
          }}
        />

        <DeleteHostedZoneModal
          isOpen={isDeleteOpen}
          zone={selectedZone}
          onClose={() => setIsDeleteOpen(false)}
          onSuccess={() => {
            setSelectedZone(null);
            setNotification({
              type: "success",
              message: "Hosted zone deleted successfully.",
            });
            // If deleting the last item on page > 1, go back one page
            if (zones.length === 1 && page > 1) {
              setPage(page - 1);
            } else {
              fetchHostedZones();
            }
          }}
        />
      </PageContainer>
    </Route53Layout>
  );
}
