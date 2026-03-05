import React from "react";

function toLocalTime(ts) {
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return "—";
  }
}

function timeAgo(ts) {
  const t = new Date(ts).getTime();
  if (!Number.isFinite(t)) return "—";
  const diffMs = Date.now() - t;
  const sec = Math.floor(diffMs / 1000);
  if (sec < 60) return `Hace ${sec}s`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `Hace ${min} min`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `Hace ${hr} h`;
  const day = Math.floor(hr / 24);
  return `Hace ${day} d`;
}

function StatusBadge({ value }) {
  const v = (value || "").toUpperCase();
  const cls =
    v === "ACTIVE"
      ? "badge badge--active"
      : v === "CLOSED"
      ? "badge badge--closed"
      : "badge badge--other";
  return <span className={cls}>{v || "—"}</span>;
}

export default function AlertsTable({ alerts = [] }) {
  if (!alerts?.length) {
    return (
      <div className="empty">
        <div className="empty-title">Sin alertas activas</div>
        <div className="empty-sub">Cuando llegue una alerta, aparecerá aquí.</div>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>Hora</th>
            <th>Matrícula</th>
            <th>Tiempo</th>
            <th>Estado</th>
            <th className="col-ubicacion right">Ubicación</th>
          </tr>
        </thead>

        <tbody>
          {alerts.map((a) => {
            const lat = a.latitude;
            const lng = a.longitude;
            const createdAt = a.createdAt;
            const status = a.statusAlert ?? a.status;
            const userId = a.userId ?? "—";

            const mapsUrl =
              Number.isFinite(lat) && Number.isFinite(lng)
                ? `https://www.google.com/maps?q=${lat},${lng}`
                : null;

            return (
              <tr key={a.id}>
                <td data-label="Hora">
                  <div className="cell-main">{toLocalTime(createdAt)}</div>
                  {/* ID removido intencionalmente */}
                </td>

                <td data-label="Matrícula" className="mono">{userId}</td>

                <td data-label="Tiempo">{timeAgo(createdAt)}</td>

                <td data-label="Estado">
                  <StatusBadge value={status} />
                </td>

                <td data-label="Ubicación" className="col-ubicacion right">
                  <div className="cell-actions">
                    {mapsUrl ? (
                      <a
                        className="link-btn link-btn--primary"
                        href={mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/>
                        </svg>

                        <span>Ver ubicación</span>
                      </a>
                    ) : (
                      <span className="muted">—</span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}