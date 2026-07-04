// ═══════════════════════════════════════════════════════════════
// main.jsx — PUNTO DE ENTRADA DE LA APLICACIÓN REACT
//
// Envuelve la app con:
//   • BrowserRouter → Enrutamiento SPA (React Router)
//   • AuthProvider  → Estado global de autenticación (Context API)
//   • StrictMode    → Detección de problemas en desarrollo
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './styles/global.css';    // Estilos globales con variables CSS del design system

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>               {/* Habilita navegación SPA con React Router */}
      <AuthProvider>              {/* Provee estado de usuario a toda la app */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
