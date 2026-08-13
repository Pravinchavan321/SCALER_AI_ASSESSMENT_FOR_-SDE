"use client";

import React, { useState, useEffect } from "react";
import { Input, Button, Alert } from "@/components/ui";
import { HostedZone, HostedZoneCreate, HostedZoneUpdate } from "@/types/hostedZone";

export interface HostedZoneFormProps {
  initialData?: HostedZone | null;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const HostedZoneForm: React.FC<HostedZoneFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [comment, setComment] = useState(initialData?.comment || "");
  const [zoneType, setZoneType] = useState(initialData?.zone_type || "Public");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setComment(initialData.comment || "");
      setZoneType(initialData.zone_type || "Public");
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Domain name is required.");
      return;
    }

    try {
      await onSubmit({
        name: trimmedName,
        comment: comment.trim() || null,
        zone_type: zoneType,
        private_zone: zoneType === "Private",
      });
    } catch (err: any) {
      setError(err.message || "Failed to submit hosted zone form.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert type="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <div>
        <Input
          label="Domain name"
          required
          placeholder="e.g. example.com"
          value={name}
          onChange={(e) => setName(e.target.value)}
          helperText="Specify the domain name for which you want to route traffic."
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-[#161e2d] mb-1 tracking-wide">
          Description / Comment
        </label>
        <textarea
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Optional notes or environment context"
          className="w-full px-3 py-1.5 text-sm bg-white border border-[#68707f] rounded-[2px] text-[#161e2d] placeholder-[#879596] focus:outline-none focus:border-[#0972d3] focus:ring-1 focus:ring-[#0972d3] disabled:bg-[#f2f3f3] transition-colors"
          disabled={isLoading}
        />
        <p className="mt-1 text-xs text-[#545b64]">
          Maximum 500 characters.
        </p>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#161e2d] mb-2 tracking-wide">
          Type
        </label>
        <div className="space-y-2">
          <label className="flex items-start space-x-2.5 p-3 border border-[#eaeded] rounded-[2px] bg-[#fafafa] hover:bg-[#f8f9fa] cursor-pointer">
            <input
              type="radio"
              name="zone_type"
              value="Public"
              checked={zoneType === "Public"}
              onChange={() => setZoneType("Public")}
              className="mt-0.5 text-[#0972d3] focus:ring-[#0972d3]"
              disabled={isLoading}
            />
            <div>
              <span className="text-xs font-bold text-[#161e2d]">Public hosted zone</span>
              <p className="text-xs text-[#545b64] mt-0.5">
                Routes traffic on the internet. Recommended for public websites and APIs.
              </p>
            </div>
          </label>

          <label className="flex items-start space-x-2.5 p-3 border border-[#eaeded] rounded-[2px] bg-[#fafafa] hover:bg-[#f8f9fa] cursor-pointer">
            <input
              type="radio"
              name="zone_type"
              value="Private"
              checked={zoneType === "Private"}
              onChange={() => setZoneType("Private")}
              className="mt-0.5 text-[#0972d3] focus:ring-[#0972d3]"
              disabled={isLoading}
            />
            <div>
              <span className="text-xs font-bold text-[#161e2d]">Private hosted zone</span>
              <p className="text-xs text-[#545b64] mt-0.5">
                Routes traffic within one or more Amazon VPCs that you specify.
              </p>
            </div>
          </label>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-2 pt-3 border-t border-[#eaeded]">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" loading={isLoading}>
          {initialData ? "Save changes" : "Create hosted zone"}
        </Button>
      </div>
    </form>
  );
};
