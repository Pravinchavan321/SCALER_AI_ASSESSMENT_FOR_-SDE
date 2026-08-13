export type RecordType =
  | "A"
  | "AAAA"
  | "CNAME"
  | "TXT"
  | "MX"
  | "NS"
  | "PTR"
  | "SRV"
  | "CAA";

export const SUPPORTED_RECORD_TYPES: RecordType[] = [
  "A",
  "AAAA",
  "CNAME",
  "TXT",
  "MX",
  "NS",
  "PTR",
  "SRV",
  "CAA",
];

export interface DNSRecord {
  id: number;
  hosted_zone_id: number;
  name: string;
  type: RecordType;
  ttl: number;
  value: string;
  routing_policy?: string | null;
  alias: boolean;
  created_at: string;
  updated_at: string;
}

export interface DNSRecordCreate {
  name: string;
  type: RecordType;
  ttl?: number;
  value: string;
  routing_policy?: string | null;
  alias?: boolean;
}

export interface DNSRecordUpdate {
  name?: string;
  type?: RecordType;
  ttl?: number;
  value?: string;
  routing_policy?: string | null;
  alias?: boolean;
}

export interface DNSRecordListResponse {
  items: DNSRecord[];
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}
