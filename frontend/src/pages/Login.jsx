// ═══════════════════════════════════════════════════════════════
// pages/Login.jsx — PÁGINA DE INICIO DE SESIÓN
//
// Formulario de login con:
//   • Campo de email
//   • Campo de contraseña (con toggle mostrar/ocultar)
//   • Validación de campos requeridos
//   • Manejo de errores (credenciales inválidas)
//   • Redirección al inicio tras login exitoso
//   • Enlace a registro para nuevos usuarios
//
// Usa AuthContext.login() para autenticar.
// ═══════════════════════════════════════════════════════════════

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../assets/logo-aros-reto.png';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verPassword, setVerPassword] = useState(false);  // Toggle ver/ocultar contraseña
  const [error, setError] = useState('');                  // Mensaje de error
  const [cargando, setCargando] = useState(false);         // Estado de carga
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);
    try {
      await login(email, password);
      navigate('/');                    // Redirige al inicio tras login exitoso
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al iniciar sesión');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          {/* Header con icono corporativo */}
          <div className="auth-header">
            <img src={logo} alt="Aros Reto" className="auth-logo-img" />
            <h2>Bienvenido de vuelta</h2>
            <p>Ingresa a tu cuenta de Aros Reto</p>
          </div>

          {/* Mensaje de error (si existe) */}
          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Campo email */}
            <div className="form-group">
              <label><FaUser /> Email</label>
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Campo contraseña con toggle */}
            <div className="form-group">
              <label><FaLock /> Contraseña</label>
              <div className="password-input">
                <input
                  type={verPassword ? 'text' : 'password'}
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setVerPassword(!verPassword)}
                >
                  {verPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary auth-submit" disabled={cargando}>
              {cargando ? 'Ingresando...' : 'Iniciar Sesión'}
            </button>
          </form>

          {/* Enlace a registro */}
          <div className="auth-footer">
            <p>¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
