// ═══════════════════════════════════════════════════════════════
// context/AuthContext.jsx — ESTADO GLOBAL DE AUTENTICACIÓN
//
// Usando Context API de React, provee el estado de autenticación
// a toda la aplicación sin necesidad de prop drilling.
//
// Provee:
//   usuario      → { _id, nombre, email } o null
//   token        → string JWT o null
//   cargando     → boolean (mientras verifica token guardado)
//   login()      → (email, password) → Promise
//   registrar()  → (datos) → Promise
//   cerrarSesion() → Limpia estado y localStorage
//
// Flujo al cargar:
//   1. Busca token en localStorage
//   2. Si existe, llama a /api/auth/perfil para validarlo
//   3. Si es válido, guarda usuario en estado
//   4. Si no, limpia token y redirige a login
// ═══════════════════════════════════════════════════════════════

import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Hook personalizado para consumir el contexto
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);     // Datos del usuario logueado
  const [token, setToken] = useState(null);          // Token JWT actual
  const [cargando, setCargando] = useState(true);    // Controla pantalla de carga

  // ─── Al montar el componente, verificar si hay token guardado ──
  useEffect(() => {
    const tokenGuardado = localStorage.getItem('token');
    if (tokenGuardado) {
      setToken(tokenGuardado);
      cargarUsuario(tokenGuardado);   // Valida el token contra el backend
    } else {
      setCargando(false);              // No hay sesión, listo
    }
  }, []);

  // ─── Obtener perfil del usuario desde el backend ───────────────
  const cargarUsuario = async (token) => {
    try {
      const { data } = await axios.get('/api/auth/perfil', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsuario(data);
    } catch {
      // Token inválido o expirado → limpiar
      localStorage.removeItem('token');
      setToken(null);
      setUsuario(null);
    } finally {
      setCargando(false);
    }
  };

  // ─── Iniciar sesión ────────────────────────────────────────────
  const login = async (email, password) => {
    const { data } = await axios.post('/api/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUsuario({ _id: data._id, nombre: data.nombre, email: data.email });
    return data;
  };

  // ─── Registrar nuevo usuario ───────────────────────────────────
  const registrar = async (datos) => {
    const { data } = await axios.post('/api/auth/registrar', datos);
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUsuario({ _id: data._id, nombre: data.nombre, email: data.email });
    return data;
  };

  // ─── Cerrar sesión ─────────────────────────────────────────────
  const cerrarSesion = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, token, cargando, login, registrar, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};
