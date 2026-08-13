export interface User {
  id: number;
  username: string;
  email: string;
  created_at?: string;
}

export interface ApiError {
  detail: string;
}

export interface MessageResponse {
  message: string;
}
