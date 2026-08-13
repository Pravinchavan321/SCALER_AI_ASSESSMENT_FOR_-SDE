"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui";
import { DNSRecordForm } from "./DNSRecordForm";
import { updateDnsRecordApi } from "@/lib/dnsRecords";
import { DNSRecord, DNSRecordUpdate } from "@/types/dnsRecord";

export interface EditDNSRecordModalProps {
  isOpen: boolean;
  hostedZoneId: number;
  zoneName: string;
  record: DNSRecord | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const EditDNSRecordModal: React.FC<EditDNSRecordModalProps> = ({
  isOpen,
  hostedZoneId,
  zoneName,
  record,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);

  if (!record) return null;

  const handleUpdate = async (data: any) => {
    setLoading(true);
    try {
      await updateDnsRecordApi(
        hostedZoneId,
        record.id,
        data as DNSRecordUpdate
      );
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
      title={`Edit record: ${record.name}`}
      maxWidth="lg"
    >
      <DNSRecordForm
        zoneName={zoneName}
        initialData={record}
        onSubmit={handleUpdate}
        onCancel={onClose}
        isLoading={loading}
      />
    </Modal>
  );
};
