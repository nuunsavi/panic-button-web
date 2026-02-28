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
        await new Promise((r) => setTimeout(r, 500));
        setAlerts(SAMPLE_ALERTS);
      } else {
        const res = await fetch(`${API_URL}/alerts?status=ACTIVE`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setAlerts(data || []);
      }
    } catch (err) {
      setError(err.message || "Error fetching alerts");
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();
    let timer;
    if (autoPoll) {
      timer = setInterval(fetchAlerts, pollIntervalMs);
    }
    return () => clearInterval(timer);
  }, [fetchAlerts, autoPoll, pollIntervalMs]);

  return { alerts, loading, error, refresh: fetchAlerts };
}
