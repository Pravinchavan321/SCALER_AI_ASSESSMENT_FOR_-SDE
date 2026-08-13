"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui";
import { DNSRecordForm } from "./DNSRecordForm";
import { createDnsRecordApi } from "@/lib/dnsRecords";
import { DNSRecordCreate } from "@/types/dnsRecord";

export interface CreateDNSRecordModalProps {
  isOpen: boolean;
  hostedZoneId: number;
  zoneName: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateDNSRecordModal: React.FC<CreateDNSRecordModalProps> = ({
  isOpen,
  hostedZoneId,
  zoneName,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);

  const handleCreate = async (data: any) => {
    setLoading(true);
    try {
      await createDnsRecordApi(hostedZoneId, data as DNSRecordCreate);
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
      title={`Create record: ${zoneName}`}
      maxWidth="lg"
    >
      <DNSRecordForm
        zoneName={zoneName}
        onSubmit={handleCreate}
        onCancel={onClose}
        isLoading={loading}
      />
    </Modal>
  );
};
