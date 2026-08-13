"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui";
import { HostedZoneForm } from "./HostedZoneForm";
import { createHostedZoneApi } from "@/lib/hostedZones";
import { HostedZoneCreate } from "@/types/hostedZone";

export interface CreateHostedZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateHostedZoneModal: React.FC<CreateHostedZoneModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);

  const handleCreate = async (data: HostedZoneCreate) => {
    setLoading(true);
    try {
      await createHostedZoneApi(data);
      onSuccess();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create hosted zone" maxWidth="lg">
      <HostedZoneForm
        onSubmit={handleCreate}
        onCancel={onClose}
        isLoading={loading}
      />
    </Modal>
  );
};
