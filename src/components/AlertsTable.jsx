import React from "react";

function toLocalTime(ts) {
  try {
    const d = new Date(ts);
    return d.toLocaleString();
  } catch {
    return ts;
  }
}

export default function AlertsTable({ alerts = [] }) {
  if (!alerts || alerts.length === 0) return <div>No hay alertas activas</div>;

  return (
    <table className="alerts-table">
      <thead>
        <tr>
          <th>Hora</th>
          <th>Lat</th>
          <th>Lng</th>
          <th>Estado</th>
          <th>Mapa</th>
        </tr>
      </thead>
      <tbody>
        {alerts.map((a) => (
          <tr key={a.id}>
            <td>{toLocalTime(a.createdAt)}</td>
            <td>{a.latitude ?? "—"}</td>
            <td>{a.longitude ?? "—"}</td>
            <td>{a.status}</td>
            <td>
              <a
                href={`https://www.google.com/maps?q=${a.latitude},${a.longitude}`}
                target="_blank"
                rel="noreferrer"
              >
                Ver en Google Maps
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
