import React from "react";
import { useAlerts } from "../hooks/useAlerts";
import AlertsTable from "../components/AlertsTable";

export default function AlertsPage() {
  const { alerts, loading, error, refresh } = useAlerts({ autoPoll: false });

  return (
    <div className="container">
      <h1>Alertas activas</h1>
      <div style={{ marginBottom: 12 }}>
        <button onClick={refresh} disabled={loading}>
          {loading ? "Cargando..." : "Refrescar"}
        </button>
      </div>
      {error && <div className="error">Error: {error}</div>}
      <AlertsTable alerts={alerts} />
    </div>
  );
}
