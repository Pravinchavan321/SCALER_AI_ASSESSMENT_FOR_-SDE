"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui";
import { HostedZoneForm } from "./HostedZoneForm";
import { updateHostedZoneApi } from "@/lib/hostedZones";
import { HostedZone, HostedZoneUpdate } from "@/types/hostedZone";

export interface EditHostedZoneModalProps {
  isOpen: boolean;
  zone: HostedZone | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const EditHostedZoneModal: React.FC<EditHostedZoneModalProps> = ({
  isOpen,
  zone,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);

  if (!zone) return null;

  const handleUpdate = async (data: HostedZoneUpdate) => {
    setLoading(true);
    try {
      await updateHostedZoneApi(zone.id, data);
      onSuccess();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit hosted zone: ${zone.name}`}
      maxWidth="lg"
    >
      <HostedZoneForm
        initialData={zone}
        onSubmit={handleUpdate}
        onCancel={onClose}
        isLoading={loading}
      />
    </Modal>
  );
};
