# emergency-web (frontend skeleton)

Proyecto frontend demo para "Alertas activas" (React + Vite).

## Quick start

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Copia `.env.example` a `.env` y ajusta:
   ```bash
   cp .env.example .env
   ```
   - `VITE_USE_MOCK=true` usa datos mock (recomendado para empezar).
   - `VITE_API_URL` apunta al backend cuando se integre.
3. Ejecuta en modo desarrollo:
   ```bash
   npm run dev
   ```
4. Abre `http://localhost:5173`

## Conectar backend
Cuando integren el backend, pongan `VITE_USE_MOCK=false` y actualicen `VITE_API_URL`.
Endpoint esperado:
`GET /alerts?status=ACTIVE` -> JSON array de objetos:
`{ id, latitude, longitude, createdAt, status }`
