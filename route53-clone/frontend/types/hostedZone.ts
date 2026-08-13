export interface HostedZone {
  id: number;
  name: string;
  zone_type: string;
  comment?: string | null;
  private_zone: boolean;
  record_count: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface HostedZoneCreate {
  name: string;
  zone_type?: string;
  comment?: string | null;
  private_zone?: boolean;
}

export interface HostedZoneUpdate {
  name?: string;
  zone_type?: string;
  comment?: string | null;
  private_zone?: boolean;
}

export interface HostedZoneListResponse {
  items: HostedZone[];
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}
