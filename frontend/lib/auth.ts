import { User, MessageResponse } from "@/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function loginApi(username: string, password: string): Promise<User> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Ensure HTTP-only cookie is stored
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ detail: "Login failed" }));
    throw new Error(err.detail || "Invalid username or password");
  }

  return response.json();
}

export async function logoutApi(): Promise<MessageResponse> {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }

  return response.json();
}

export async function getCurrentUserApi(): Promise<User> {
  const response = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    credentials: "include", // Send HTTP-only session cookie
  });

  if (!response.ok) {
    throw new Error("Not authenticated");
  }

  return response.json();
}
