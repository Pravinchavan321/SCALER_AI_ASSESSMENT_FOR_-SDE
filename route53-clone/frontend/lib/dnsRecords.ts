import {
  DNSRecord,
  DNSRecordCreate,
  DNSRecordUpdate,
  DNSRecordListResponse,
  RecordType,
} from "@/types/dnsRecord";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (res.status === 204) {
    return {} as T;
  }
  if (!res.ok) {
    let errorDetail = "An unexpected error occurred.";
    try {
      const errorJson = await res.json();
      errorDetail = errorJson.detail || errorDetail;
    } catch {
      // Fallback
    }
    throw new ApiError(errorDetail, res.status);
  }
  return res.json();
}

export async function listDnsRecordsApi(
  hostedZoneId: number,
  search?: string,
  type?: RecordType | "All" | null,
  page: number = 1,
  limit: number = 10
): Promise<DNSRecordListResponse> {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (type && type !== "All") params.append("type", type);
  params.append("page", page.toString());
  params.append("limit", limit.toString());

  const res = await fetch(
    `${API_BASE}/api/hosted-zones/${hostedZoneId}/records?${params.toString()}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );
  return handleResponse<DNSRecordListResponse>(res);
}

export async function getDnsRecordApi(
  hostedZoneId: number,
  recordId: number
): Promise<DNSRecord> {
  const res = await fetch(
    `${API_BASE}/api/hosted-zones/${hostedZoneId}/records/${recordId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );
  return handleResponse<DNSRecord>(res);
}

export async function createDnsRecordApi(
  hostedZoneId: number,
  data: DNSRecordCreate
): Promise<DNSRecord> {
  const res = await fetch(
    `${API_BASE}/api/hosted-zones/${hostedZoneId}/records`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    }
  );
  return handleResponse<DNSRecord>(res);
}

export async function updateDnsRecordApi(
  hostedZoneId: number,
  recordId: number,
  data: DNSRecordUpdate
): Promise<DNSRecord> {
  const res = await fetch(
    `${API_BASE}/api/hosted-zones/${hostedZoneId}/records/${recordId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    }
  );
  return handleResponse<DNSRecord>(res);
}

export async function deleteDnsRecordApi(
  hostedZoneId: number,
  recordId: number
): Promise<void> {
  const res = await fetch(
    `${API_BASE}/api/hosted-zones/${hostedZoneId}/records/${recordId}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );
  await handleResponse<void>(res);
}
