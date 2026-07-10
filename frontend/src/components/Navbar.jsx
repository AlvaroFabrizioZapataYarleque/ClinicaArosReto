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
import { useCart } from '../context/CartContext';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaUser, FaSignOutAlt, FaShoppingCart } from 'react-icons/fa';
import logo from '../assets/logo-aros-reto.png';
import './Navbar.css';

const Navbar = () => {
  const [abierto, setAbierto] = useState(false);
  const { usuario, cerrarSesion } = useAuth();
  const { totalItems, abrirPanel } = useCart();
  const location = useLocation();

  const enlaces = [
    { path: '/', label: 'Inicio' },
    { path: '/productos', label: 'Productos' },
    { path: '/servicios', label: 'Servicios' },
    { path: '/promociones', label: 'Promociones' },
    { path: '/nosotros', label: 'Nosotros' }
  ];

  if (usuario && usuario.rol !== 'admin') {
    enlaces.push({ path: '/mis-estados', label: 'Seguimiento' });
  }
  if (usuario?.rol === 'admin') {
    enlaces.push({ path: '/admin', label: 'Panel Admin' });
  }

  // Verifica si una ruta está activa (para resaltar el enlace)
  const estaActivo = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo de la empresa */}
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Aros Reto" className="logo-img" />
        </Link>

        {/* Menú de navegación (se oculta en mobile) */}
        <div className={`navbar-menu ${abierto ? 'active' : ''}`}>
          <ul className="navbar-links">
            {enlaces.map(({ path, label }) => (
              <li key={path}>
                  <Link
                    to={path}
                    className={`navbar-link ${estaActivo(path) ? 'active' : ''}`}
                    onClick={() => setAbierto(false)}
                  >
                    {label}
                  </Link>
              </li>
            ))}
          </ul>

          <div className="navbar-auth">
            <button className="navbar-cart" onClick={() => { setAbierto(false); abrirPanel(); }}>
              <FaShoppingCart />
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </button>

              {usuario ? (
              <div className="navbar-user">
                <Link to="/perfil" className="user-profile-link" onClick={() => setAbierto(false)}>
                  <span className="user-avatar"><FaUser /></span>
                  <span className="user-info">
                    <span className="user-name">{usuario.nombre}</span>
                    <span className="user-label">Mi Perfil</span>
                  </span>
                </Link>
                <button className="btn-logout" onClick={cerrarSesion} title="Cerrar sesión">
                  <FaSignOutAlt />
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
