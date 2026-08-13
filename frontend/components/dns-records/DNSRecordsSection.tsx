"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  SearchInput,
  Select,
  Table,
  Badge,
  Pagination,
  Alert,
  EmptyState,
} from "@/components/ui";
import {
  CreateDNSRecordModal,
  EditDNSRecordModal,
  DeleteDNSRecordModal,
} from "./";
import { listDnsRecordsApi } from "@/lib/dnsRecords";
import {
  DNSRecord,
  RecordType,
  SUPPORTED_RECORD_TYPES,
} from "@/types/dnsRecord";

export interface DNSRecordsSectionProps {
  hostedZoneId: number;
  zoneName: string;
  onRecordCountChange?: () => void;
}

export const DNSRecordsSection: React.FC<DNSRecordsSectionProps> = ({
  hostedZoneId,
  zoneName,
  onRecordCountChange,
}) => {
  const [records, setRecords] = useState<DNSRecord[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const limit = 10;
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [selectedType, setSelectedType] = useState<RecordType | "All">("All");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  // Selected row for actions
  const [selectedRecord, setSelectedRecord] = useState<DNSRecord | null>(null);

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  // Fetch DNS records from API
  const fetchRecords = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await listDnsRecordsApi(
        hostedZoneId,
        debouncedSearch,
        selectedType,
        page,
        limit
      );
      setRecords(res.items);
      setTotal(res.total);
      setTotalPages(res.total_pages);

      // Keep selection valid
      if (selectedRecord) {
        const found = res.items.find((r) => r.id === selectedRecord.id);
        setSelectedRecord(found || null);
      }
    } catch (err: any) {
      setError(err.message || "Unable to load DNS records. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [hostedZoneId, debouncedSearch, selectedType, page, limit, selectedRecord]);

  useEffect(() => {
    fetchRecords();
  }, [hostedZoneId, debouncedSearch, selectedType, page]);

  // Auto-dismiss toast after 5s
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const columns = [
    {
      key: "name",
      header: "Record name",
      render: (item: DNSRecord) => (
        <span className="font-semibold text-[#161e2d]">{item.name}</span>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (item: DNSRecord) => (
        <Badge variant={item.type === "A" || item.type === "AAAA" ? "info" : "neutral"}>
          {item.type}
        </Badge>
      ),
    },
    {
      key: "ttl",
      header: "TTL (Seconds)",
      render: (item: DNSRecord) => <span>{item.ttl}</span>,
    },
    {
      key: "value",
      header: "Value/Route traffic to",
      render: (item: DNSRecord) => (
        <span className="font-mono text-xs text-[#161e2d] break-all">
          {item.value}
        </span>
      ),
    },
    {
      key: "routing_policy",
      header: "Routing policy",
      render: (item: DNSRecord) => (
        <span className="text-[#545b64]">
          {item.routing_policy || "Simple"}
          {item.alias && " (Alias)"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Notifications */}
      {notification && (
        <Alert type={notification.type} onClose={() => setNotification(null)}>
          {notification.message}
        </Alert>
      )}

      {error && (
        <Alert type="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* DNS Records Section Header & Toolbar */}
      <div className="bg-white border border-[#eaeded] rounded-[2px] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#eaeded] flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-[#fafafa]">
          <div>
            <h3 className="text-base font-bold text-[#161e2d]">
              Records ({total})
            </h3>
            <p className="text-xs text-[#545b64] mt-0.5">
              Resource record sets routing traffic for this hosted zone.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="destructive"
              size="md"
              disabled={!selectedRecord}
              onClick={() => setIsDeleteOpen(true)}
            >
              Delete record
            </Button>
            <Button
              variant="secondary"
              size="md"
              disabled={!selectedRecord}
              onClick={() => setIsEditOpen(true)}
            >
              Edit record
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsCreateOpen(true)}
            >
              Create record
            </Button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-3 border-b border-[#eaeded] bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 flex-1">
            <SearchInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch("")}
              placeholder="Search by record name or value"
            />

            <div className="w-44">
              <Select
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value as RecordType | "All");
                  setPage(1);
                }}
                options={[
                  { value: "All", label: "All record types" },
                  ...SUPPORTED_RECORD_TYPES.map((t) => ({
                    value: t,
                    label: `${t} records`,
                  })),
                ]}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="icon"
              title="Refresh"
              onClick={fetchRecords}
              disabled={isLoading}
            >
              <svg
                className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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
          data={records}
          keyExtractor={(item) => item.id}
          selectable={true}
          selectedId={selectedRecord ? selectedRecord.id : null}
          onSelect={(item) =>
            setSelectedRecord(selectedRecord?.id === item.id ? null : item)
          }
          isLoading={isLoading}
          emptyMessage={
            debouncedSearch || selectedType !== "All"
              ? "No records match the current filter criteria."
              : "No records found in this hosted zone. Choose 'Create record' to get started."
          }
        />

        {/* Pagination Bar */}
        <Pagination
          page={page}
          totalPages={totalPages}
          totalItems={total}
          pageSize={limit}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>

      {/* Modals */}
      <CreateDNSRecordModal
        isOpen={isCreateOpen}
        hostedZoneId={hostedZoneId}
        zoneName={zoneName}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={() => {
          setNotification({
            type: "success",
            message: "Record created successfully.",
          });
          fetchRecords();
          if (onRecordCountChange) onRecordCountChange();
        }}
      />

      <EditDNSRecordModal
        isOpen={isEditOpen}
        hostedZoneId={hostedZoneId}
        zoneName={zoneName}
        record={selectedRecord}
        onClose={() => setIsEditOpen(false)}
        onSuccess={() => {
          setNotification({
            type: "success",
            message: "Record updated successfully.",
          });
          fetchRecords();
        }}
      />

      <DeleteDNSRecordModal
        isOpen={isDeleteOpen}
        hostedZoneId={hostedZoneId}
        record={selectedRecord}
        onClose={() => setIsDeleteOpen(false)}
        onSuccess={() => {
          setSelectedRecord(null);
          setNotification({
            type: "success",
            message: "Record deleted successfully.",
          });
          if (records.length === 1 && page > 1) {
            setPage(page - 1);
          } else {
            fetchRecords();
          }
          if (onRecordCountChange) onRecordCountChange();
        }}
      />
    </div>
  );
};
