import React, { useState } from "react";
import { useAlerts } from "../hooks/useAlerts";
import AlertsTable from "../components/AlertsTable";

export default function AlertsPage() {
  const [autoPoll, setAutoPoll] = useState(false);
  const { alerts, loading, error, refresh } = useAlerts({
    autoPoll,
    pollIntervalMs: 5000,
  });
  return (
    <div className="page">
      <header className="topbar">
        <div>
          <h1 className="title">Alertas activas</h1>
          <p className="subtitle">
            {alerts?.length ?? 0} alerta(s) • Actualiza manual o automático
          </p>
        </div>

        <div className="actions">
          <label className="toggle">
            <input
              aria-label="Activar actualización automática"
              type="checkbox"
              checked={autoPoll}
              onChange={(e) => setAutoPoll(e.target.checked)}
            />
            <span>Auto (5s)</span>
          </label>

          <button className="btn" onClick={refresh} disabled={loading}>
            {loading ? "Actualizando…" : "Refrescar"}
          </button>
        </div>
      </header>

      {error && (
        <div className="card">
          <strong>No se pudo cargar</strong>
          <div className="muted">{error}</div>
        </div>
      )}

      <div className="card">
        <AlertsTable alerts={alerts} />
      </div>
    </div>
  );
}