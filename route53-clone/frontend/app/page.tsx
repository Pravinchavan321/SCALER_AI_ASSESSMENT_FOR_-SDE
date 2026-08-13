"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-600 font-sans">
        Checking authentication session...
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto font-sans">
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Route53 Clone — Authenticated Placeholder
          </h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm rounded border border-gray-300 transition"
          >
            Sign Out
          </button>
        </div>

        <div className="p-4 bg-green-50 border border-green-200 rounded mb-6 text-green-800 text-sm">
          <strong>Authenticated successfully.</strong> Session persistence active.
        </div>

        <div className="border-t border-gray-100 pt-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Current Authenticated User Info
          </h2>
          <div className="text-sm space-y-1 text-gray-600">
            <p><strong>User ID:</strong> {user.id}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
