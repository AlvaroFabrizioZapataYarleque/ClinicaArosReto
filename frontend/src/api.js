// ═══════════════════════════════════════════════════════════════
// api.js — CLIENTE AXIOS CONFIGURADO
//
// En desarrollo:  usa el proxy de Vite (vite.config.js → localhost:4000)
// En producción: usa la variable VITE_API_URL (Render) definida en Vercel
// ═══════════════════════════════════════════════════════════════

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || ''
});

export default api;
