"use client";

import React, { useState } from "react";
import { Modal, Button, Alert } from "@/components/ui";
import { deleteHostedZoneApi } from "@/lib/hostedZones";
import { HostedZone } from "@/types/hostedZone";

export interface DeleteHostedZoneModalProps {
  isOpen: boolean;
  zone: HostedZone | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const DeleteHostedZoneModal: React.FC<DeleteHostedZoneModalProps> = ({
  isOpen,
  zone,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!zone) return null;

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await deleteHostedZoneApi(zone.id);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to delete hosted zone.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete hosted zone?"
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
          Are you sure you want to permanently delete the following hosted zone?
        </p>

        <div className="p-3 bg-[#fafafa] border border-[#eaeded] rounded-[2px]">
          <p className="text-sm font-bold text-[#161e2d]">{zone.name}</p>
          <p className="text-xs text-[#545b64] font-mono mt-0.5">
            Hosted zone ID: Z{String(zone.id).padStart(12, "0")}
          </p>
          <p className="text-xs text-[#545b64] mt-0.5">
            Type: {zone.zone_type} | Records: {zone.record_count}
          </p>
        </div>

        <Alert type="warning">
          <p className="text-xs font-semibold">
            This action cannot be undone. All DNS records associated with this zone will also be deleted.
          </p>
        </Alert>
      </div>
    </Modal>
  );
};
