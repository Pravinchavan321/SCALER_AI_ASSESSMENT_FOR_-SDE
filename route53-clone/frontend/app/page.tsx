"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [health, setHealth] = useState<{ status: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

  useEffect(() => {
    fetch(`${apiUrl}/health`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setHealth(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto font-sans">
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          AWS Route53 Clone — Phase 1 Setup
        </h1>
        <p className="text-gray-600 mb-6">
          Phase 1 project initialization and verification.
        </p>

        <div className="border-t border-gray-100 pt-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Backend Health Check Connection
          </h2>
          <p className="text-sm text-gray-500 mb-2">
            Target Endpoint: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{apiUrl}/health</code>
          </p>

          {loading && (
            <div className="inline-flex items-center text-sm text-gray-600">
              Checking backend connection...
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-sm rounded border border-red-200">
              Connection status: <strong>Error ({error})</strong>
            </div>
          )}

          {health && (
            <div className="p-3 bg-green-50 text-green-700 text-sm rounded border border-green-200">
              Connection status: <strong>Connected (status: {health.status})</strong>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
