// ═══════════════════════════════════════════════════════════════
// components/Navbar.jsx — BARRA DE NAVEGACIÓN PRINCIPAL
//
// Fija en la parte superior con efecto blur.
// Muestra enlaces de navegación + botones de autenticación.
// Responsive: se colapsa en un menú hamburguesa en mobile.
//
// Estados:
//   • Usuario logueado   → Muestra nombre + botón "Salir"
//   • Usuario no logueado → Muestra "Ingresar" + "Registrarse"
//   • Ruta activa         → El enlace se resalta con gradiente azul
// ═══════════════════════════════════════════════════════════════

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaUser, FaSignOutAlt, FaRulerCombined } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [abierto, setAbierto] = useState(false);        // Controla menú mobile abierto/cerrado
  const { usuario, cerrarSesion } = useAuth();           // Estado de autenticación
  const location = useLocation();                        // Para saber qué ruta está activa

  // Enlaces de navegación
  const enlaces = [
    { path: '/', label: 'Inicio' },
    { path: '/productos', label: 'Productos' },
    { path: '/servicios', label: 'Servicios' },
    { path: '/promociones', label: 'Promociones' },
    { path: '/nosotros', label: 'Nosotros' }
  ];

  // Verifica si una ruta está activa (para resaltar el enlace)
  const estaActivo = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo de la empresa */}
        <Link to="/" className="navbar-logo">
          <FaRulerCombined className="logo-icon" />
          <span className="logo-text">Aros <span className="logo-highlight">Reto</span></span>
        </Link>

        {/* Menú de navegación (se oculta en mobile) */}
        <div className={`navbar-menu ${abierto ? 'active' : ''}`}>
          <ul className="navbar-links">
            {enlaces.map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`navbar-link ${estaActivo(path) ? 'active' : ''}`}
                  onClick={() => setAbierto(false)}    // Cierra menú al hacer clic
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Botones de autenticación según estado */}
          <div className="navbar-auth">
            {usuario ? (
              <div className="navbar-user">
                <span className="user-name">{usuario.nombre}</span>
                <button className="btn-logout" onClick={cerrarSesion}>
                  <FaSignOutAlt /> Salir
                </button>
              </div>
            ) : (
              <div className="navbar-buttons">
                <Link to="/login" className="btn-login" onClick={() => setAbierto(false)}>
                  <FaUser /> Ingresar
                </Link>
                <Link to="/registro" className="btn-register" onClick={() => setAbierto(false)}>
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Botón hamburguesa para mobile */}
        <button className="navbar-toggle" onClick={() => setAbierto(!abierto)}>
          {abierto ? <HiX /> : <HiMenu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
