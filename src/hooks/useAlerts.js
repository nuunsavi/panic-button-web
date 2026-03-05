import { useState, useEffect, useCallback } from "react";
import { SAMPLE_ALERTS } from "../mocks/sampleAlerts";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export function useAlerts({ autoPoll = false, pollIntervalMs = 5000 } = {}) {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAlerts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 300));
        setAlerts(SAMPLE_ALERTS);
        return;
      }

      const res = await fetch(`${API_URL}/alerts?status=ACTIVE`, { method: "GET" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const payload = await res.json();
      const data = Array.isArray(payload) ? payload : (payload?.data || []);
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setAlerts(data);
    } catch (err) {
      setError(err?.message || "Error fetching alerts");
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();
    let timer;
    if (autoPoll) timer = setInterval(fetchAlerts, pollIntervalMs);
    return () => clearInterval(timer);
  }, [fetchAlerts, autoPoll, pollIntervalMs]);

  return { alerts, loading, error, refresh: fetchAlerts };
}
