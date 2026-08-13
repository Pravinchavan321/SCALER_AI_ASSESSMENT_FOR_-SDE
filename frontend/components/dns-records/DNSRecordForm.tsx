"use client";

import React, { useState, useEffect } from "react";
import { Input, Select, Button, Alert } from "@/components/ui";
import {
  DNSRecord,
  RecordType,
  SUPPORTED_RECORD_TYPES,
} from "@/types/dnsRecord";

export interface DNSRecordFormProps {
  zoneName: string;
  initialData?: DNSRecord | null;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const DNSRecordForm: React.FC<DNSRecordFormProps> = ({
  zoneName,
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [subdomain, setSubdomain] = useState("");
  const [recordType, setRecordType] = useState<RecordType>("A");
  const [ttl, setTtl] = useState<number>(300);
  const [value, setValue] = useState("");
  const [routingPolicy, setRoutingPolicy] = useState("Simple");
  const [alias, setAlias] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      if (initialData.name === zoneName) {
        setSubdomain("");
      } else if (initialData.name.endsWith(`.${zoneName}`)) {
        setSubdomain(initialData.name.slice(0, -(zoneName.length + 1)));
      } else {
        setSubdomain(initialData.name);
      }
      setRecordType(initialData.type);
      setTtl(initialData.ttl || 300);
      setValue(initialData.value || "");
      setRoutingPolicy(initialData.routing_policy || "Simple");
      setAlias(initialData.alias || false);
    }
  }, [initialData, zoneName]);

  const getHelperAndPlaceholder = (type: RecordType) => {
    switch (type) {
      case "A":
        return {
          placeholder: "192.0.2.1",
          helper: "Enter an IPv4 address formatted as 4 octets (e.g., 192.0.2.1).",
        };
      case "AAAA":
        return {
          placeholder: "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
          helper: "Enter an IPv6 address.",
        };
      case "CNAME":
        return {
          placeholder: "example.com",
          helper: "Enter the canonical domain name (e.g., app.example.com).",
        };
      case "TXT":
        return {
          placeholder: "v=spf1 include:_spf.google.com ~all",
          helper: "Enter text content or verification records.",
        };
      case "MX":
        return {
          placeholder: "10 mail.example.com",
          helper: "Enter priority followed by mail server hostname (e.g., 10 mail.example.com).",
        };
      case "NS":
        return {
          placeholder: "ns1.awsdns.com",
          helper: "Enter the authoritative name server domain.",
        };
      case "PTR":
        return {
          placeholder: "target.example.com",
          helper: "Enter the domain name for reverse DNS mapping.",
        };
      case "SRV":
        return {
          placeholder: "10 60 5060 bigbox.example.com",
          helper: "Enter priority, weight, port, and target.",
        };
      case "CAA":
        return {
          placeholder: '0 issue "amazon.com"',
          helper: "Enter flag, tag, and certificate authority value.",
        };
      default:
        return { placeholder: "", helper: "" };
    }
  };

  const { placeholder, helper } = getHelperAndPlaceholder(recordType);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedSubdomain = subdomain.trim();
    const fullName = trimmedSubdomain
      ? `${trimmedSubdomain}.${zoneName}`
      : zoneName;

    const trimmedValue = value.trim();
    if (!trimmedValue) {
      setError("Record value is required.");
      return;
    }

    if (ttl <= 0) {
      setError("TTL must be a positive integer greater than 0.");
      return;
    }

    try {
      await onSubmit({
        name: fullName,
        type: recordType,
        ttl: Number(ttl),
        value: trimmedValue,
        routing_policy: routingPolicy,
        alias,
      });
    } catch (err: any) {
      setError(err.message || "Failed to submit record form.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert type="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Record Name */}
      <div>
        <label className="block text-xs font-bold text-[#161e2d] mb-1 tracking-wide">
          Record name
        </label>
        <div className="flex items-center">
          <input
            type="text"
            value={subdomain}
            onChange={(e) => setSubdomain(e.target.value)}
            placeholder="e.g. www, api (optional)"
            className="flex-1 px-3 py-1.5 text-sm bg-white border border-[#68707f] rounded-l-[2px] text-[#161e2d] focus:outline-none focus:border-[#0972d3] focus:ring-1 focus:ring-[#0972d3] transition-colors"
            disabled={isLoading}
          />
          <span className="inline-flex items-center px-3 py-1.5 border border-l-0 border-[#68707f] bg-[#f2f3f3] text-[#545b64] text-xs font-semibold rounded-r-[2px] select-none truncate max-w-[200px]">
            .{zoneName}
          </span>
        </div>
        <p className="mt-1 text-xs text-[#545b64]">
          Leave blank to create a record for the root zone ({zoneName}).
        </p>
      </div>

      {/* Record Type & TTL Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Select
            label="Record type"
            required
            value={recordType}
            onChange={(e) => setRecordType(e.target.value as RecordType)}
            options={SUPPORTED_RECORD_TYPES.map((t) => ({
              value: t,
              label: `${t} records`,
            }))}
            disabled={isLoading}
          />
        </div>

        <div>
          <Input
            label="TTL (Seconds)"
            type="number"
            min={1}
            required
            value={ttl}
            onChange={(e) => setTtl(Number(e.target.value))}
            helperText="Time to live cache duration."
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Value / Target */}
      <div>
        <label className="block text-xs font-bold text-[#161e2d] mb-1 tracking-wide">
          Value / Route traffic to <span className="text-[#d13212]">*</span>
        </label>
        <textarea
          rows={3}
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-1.5 text-sm font-mono bg-white border border-[#68707f] rounded-[2px] text-[#161e2d] placeholder-[#879596] focus:outline-none focus:border-[#0972d3] focus:ring-1 focus:ring-[#0972d3] disabled:bg-[#f2f3f3] transition-colors"
          disabled={isLoading}
        />
        <p className="mt-1 text-xs text-[#545b64]">{helper}</p>
      </div>

      {/* Routing Policy & Alias Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#eaeded]">
        <div>
          <Select
            label="Routing policy"
            value={routingPolicy}
            onChange={(e) => setRoutingPolicy(e.target.value)}
            options={[
              { value: "Simple", label: "Simple routing" },
              { value: "Weighted", label: "Weighted routing (Mock)" },
              { value: "Geolocation", label: "Geolocation routing (Mock)" },
              { value: "Failover", label: "Failover routing (Mock)" },
            ]}
            disabled={isLoading}
          />
        </div>

        <div className="flex flex-col justify-center pt-5">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={alias}
              onChange={(e) => setAlias(e.target.checked)}
              className="text-[#0972d3] focus:ring-[#0972d3] h-4 w-4 rounded-[2px] border-[#68707f]"
              disabled={isLoading}
            />
            <span className="text-xs font-bold text-[#161e2d]">
              Alias target
            </span>
          </label>
          <p className="text-xs text-[#545b64] mt-0.5">
            Route traffic to AWS resources (CloudFront, S3, ALB).
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-2 pt-3 border-t border-[#eaeded]">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" loading={isLoading}>
          {initialData ? "Save changes" : "Create records"}
        </Button>
      </div>
    </form>
  );
};
