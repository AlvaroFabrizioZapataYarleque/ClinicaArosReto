import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaUser, FaSignOutAlt, FaRulerCombined } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [abierto, setAbierto] = useState(false);
  const { usuario, cerrarSesion } = useAuth();
  const location = useLocation();

  const enlaces = [
    { path: '/', label: 'Inicio' },
    { path: '/productos', label: 'Productos' },
    { path: '/servicios', label: 'Servicios' },
    { path: '/promociones', label: 'Promociones' },
    { path: '/nosotros', label: 'Nosotros' }
  ];

  const estaActivo = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <FaRulerCombined className="logo-icon" />
          <span className="logo-text">Aros <span className="logo-highlight">Reto</span></span>
        </Link>

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

        <button className="navbar-toggle" onClick={() => setAbierto(!abierto)}>
          {abierto ? <HiX /> : <HiMenu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
