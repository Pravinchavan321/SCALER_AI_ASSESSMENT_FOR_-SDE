import {
  HostedZone,
  HostedZoneCreate,
  HostedZoneUpdate,
  HostedZoneListResponse,
} from "@/types/hostedZone";

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

export async function listHostedZonesApi(
  search?: string,
  page: number = 1,
  limit: number = 10
): Promise<HostedZoneListResponse> {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  params.append("page", page.toString());
  params.append("limit", limit.toString());

  const res = await fetch(`${API_BASE}/api/hosted-zones?${params.toString()}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  return handleResponse<HostedZoneListResponse>(res);
}

export async function getHostedZoneApi(id: number): Promise<HostedZone> {
  const res = await fetch(`${API_BASE}/api/hosted-zones/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  return handleResponse<HostedZone>(res);
}

export async function createHostedZoneApi(data: HostedZoneCreate): Promise<HostedZone> {
  const res = await fetch(`${API_BASE}/api/hosted-zones`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return handleResponse<HostedZone>(res);
}

export async function updateHostedZoneApi(
  id: number,
  data: HostedZoneUpdate
): Promise<HostedZone> {
  const res = await fetch(`${API_BASE}/api/hosted-zones/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return handleResponse<HostedZone>(res);
}

export async function deleteHostedZoneApi(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/hosted-zones/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  await handleResponse<void>(res);
}
