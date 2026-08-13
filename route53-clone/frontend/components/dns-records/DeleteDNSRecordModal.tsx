"use client";

import React, { useState } from "react";
import { Modal, Button, Alert } from "@/components/ui";
import { deleteDnsRecordApi } from "@/lib/dnsRecords";
import { DNSRecord } from "@/types/dnsRecord";

export interface DeleteDNSRecordModalProps {
  isOpen: boolean;
  hostedZoneId: number;
  record: DNSRecord | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const DeleteDNSRecordModal: React.FC<DeleteDNSRecordModalProps> = ({
  isOpen,
  hostedZoneId,
  record,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!record) return null;

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await deleteDnsRecordApi(hostedZoneId, record.id);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to delete DNS record.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete record?"
      maxWidth="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            loading={loading}
          >
            Delete
          </Button>
        </>
      }
    >
      <div className="space-y-3">
        {error && (
          <Alert type="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <p className="text-xs text-[#545b64]">
          Are you sure you want to delete this resource record set?
        </p>

        <div className="p-3 bg-[#fafafa] border border-[#eaeded] rounded-[2px] space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-[#545b64] font-medium">Record name:</span>
            <span className="font-bold text-[#161e2d]">{record.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#545b64] font-medium">Type:</span>
            <span className="font-semibold text-[#161e2d]">{record.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#545b64] font-medium">TTL:</span>
            <span className="text-[#161e2d]">{record.ttl}s</span>
          </div>
          <div className="pt-1 border-t border-[#eaeded]">
            <span className="text-[#545b64] font-medium block">Value:</span>
            <span className="font-mono text-[#161e2d] break-all">{record.value}</span>
          </div>
        </div>

        <Alert type="warning">
          <p className="text-xs font-semibold">
            This action cannot be undone. Route 53 will stop routing queries matching this record name.
          </p>
        </Alert>
      </div>
    </Modal>
  );
};
