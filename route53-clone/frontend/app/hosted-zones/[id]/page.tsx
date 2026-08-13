"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Route53Layout, PageContainer } from "@/components/layout";
import { Button, Card, Badge, Alert } from "@/components/ui";
import {
  EditHostedZoneModal,
  DeleteHostedZoneModal,
} from "@/components/hosted-zones";
import { DNSRecordsSection } from "@/components/dns-records";
import { getHostedZoneApi } from "@/lib/hostedZones";
import { HostedZone } from "@/types/hostedZone";

export default function HostedZoneDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  const zoneId = Number(params?.id);

  const [zone, setZone] = useState<HostedZone | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const fetchZoneDetails = useCallback(async () => {
    if (!user || isNaN(zoneId)) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getHostedZoneApi(zoneId);
      setZone(data);
    } catch (err: any) {
      if (err.status === 401) {
        router.push("/login");
      } else if (err.status === 404) {
        setError("Hosted zone not found or you do not have permission to view it.");
      } else {
        setError(err.message || "Failed to load hosted zone details.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [user, zoneId, router]);

  useEffect(() => {
    fetchZoneDetails();
  }, [fetchZoneDetails]);

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

  if (isLoading) {
    return (
      <Route53Layout>
        <PageContainer
          breadcrumbs={[
            { label: "Route 53", href: "/" },
            { label: "Hosted zones", href: "/" },
            { label: "Loading..." },
          ]}
        >
          <div className="py-20 text-center text-sm text-[#545b64]">
            <div className="inline-flex items-center space-x-2">
              <svg className="animate-spin h-5 w-5 text-[#0972d3]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Loading hosted zone details...</span>
            </div>
          </div>
        </PageContainer>
      </Route53Layout>
    );
  }

  if (error || !zone) {
    return (
      <Route53Layout>
        <PageContainer
          breadcrumbs={[
            { label: "Route 53", href: "/" },
            { label: "Hosted zones", href: "/" },
            { label: "Error" },
          ]}
          title="Hosted zone details"
        >
          <Alert type="error" className="mb-4">
            {error || "Hosted zone could not be found."}
          </Alert>
          <Link href="/">
            <Button variant="secondary">Back to Hosted zones</Button>
          </Link>
        </PageContainer>
      </Route53Layout>
    );
  }

  return (
    <Route53Layout>
      <PageContainer
        breadcrumbs={[
          { label: "Route 53", href: "/" },
          { label: "Hosted zones", href: "/" },
          { label: zone.name },
        ]}
        title={zone.name}
        subtitle="Hosted zone details and resource record sets."
        actions={
          <>
            <Button
              variant="destructive"
              size="md"
              onClick={() => setIsDeleteOpen(true)}
            >
              Delete zone
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => setIsEditOpen(true)}
            >
              Edit zone
            </Button>
          </>
        }
      >
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

        {/* Hosted Zone Summary Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card title="Hosted zone overview">
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#eaeded]">
                <span className="text-[#545b64] font-medium">Domain Name:</span>
                <span className="font-bold text-[#161e2d]">{zone.name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#eaeded]">
                <span className="text-[#545b64] font-medium">Hosted Zone ID:</span>
                <span className="font-mono text-[#161e2d]">
                  Z{String(zone.id).padStart(12, "0")}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#eaeded]">
                <span className="text-[#545b64] font-medium">Type:</span>
                <Badge variant={zone.zone_type === "Public" ? "info" : "neutral"}>
                  {zone.zone_type} hosted zone
                </Badge>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#eaeded]">
                <span className="text-[#545b64] font-medium">Record count:</span>
                <span className="font-bold text-[#0972d3]">{zone.record_count}</span>
              </div>
            </div>
          </Card>

          <Card title="Configuration details">
            <div className="space-y-3 text-xs">
              <div className="py-1.5 border-b border-[#eaeded]">
                <span className="text-[#545b64] font-medium block mb-1">Description / Comment:</span>
                <span className="text-[#161e2d]">{zone.comment || "No comment provided."}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#eaeded]">
                <span className="text-[#545b64] font-medium">Created:</span>
                <span className="text-[#161e2d]">
                  {new Date(zone.created_at).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#545b64] font-medium">Last Modified:</span>
                <span className="text-[#161e2d]">
                  {new Date(zone.updated_at).toLocaleString()}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Live DNS Records Management Section */}
        <DNSRecordsSection
          hostedZoneId={zone.id}
          zoneName={zone.name}
          onRecordCountChange={fetchZoneDetails}
        />

        {/* Edit Hosted Zone Modal */}
        <EditHostedZoneModal
          isOpen={isEditOpen}
          zone={zone}
          onClose={() => setIsEditOpen(false)}
          onSuccess={() => {
            setNotification({
              type: "success",
              message: "Hosted zone updated successfully.",
            });
            fetchZoneDetails();
          }}
        />

        {/* Delete Hosted Zone Modal */}
        <DeleteHostedZoneModal
          isOpen={isDeleteOpen}
          zone={zone}
          onClose={() => setIsDeleteOpen(false)}
          onSuccess={() => {
            router.push("/");
          }}
        />
      </PageContainer>
    </Route53Layout>
  );
}
