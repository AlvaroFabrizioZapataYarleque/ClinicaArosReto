// ═══════════════════════════════════════════════════════════════
// pages/Registro.jsx — PÁGINA DE REGISTRO DE USUARIO
//
// Formulario de registro con:
//   • Nombre completo, email, teléfono, contraseña, confirmar
//   • Validación: contraseñas coinciden, mínimo 6 caracteres
//   • Manejo de errores (email duplicado, etc.)
//   • Redirección al inicio tras registro exitoso
//   • Enlace a login si ya tiene cuenta
//
// Usa AuthContext.registrar() para crear la cuenta.
// ═══════════════════════════════════════════════════════════════

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash, FaRulerCombined } from 'react-icons/fa';
import './Auth.css';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: ''
  });
  const [verPassword, setVerPassword] = useState(false);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const { registrar } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validación: contraseñas deben coincidir
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Validación: longitud mínima de contraseña
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setCargando(true);
    try {
      await registrar({
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password,
        telefono: formData.telefono
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al registrarse');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <FaRulerCombined className="auth-logo-icon" />
            <h2>Crear una cuenta</h2>
            <p>Regístrate en Aros Reto</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Nombre completo */}
            <div className="form-group">
              <label><FaUser /> Nombre Completo</label>
              <input type="text" name="nombre" placeholder="Tu nombre completo" value={formData.nombre} onChange={handleChange} required />
            </div>

            {/* Email */}
            <div className="form-group">
              <label><FaEnvelope /> Email</label>
              <input type="email" name="email" placeholder="tu@email.com" value={formData.email} onChange={handleChange} required />
            </div>

            {/* Teléfono */}
            <div className="form-group">
              <label><FaPhone /> Teléfono</label>
              <input type="tel" name="telefono" placeholder="+51 999 888 777" value={formData.telefono} onChange={handleChange} />
            </div>

            {/* Contraseña y Confirmar en fila */}
            <div className="form-row">
              <div className="form-group">
                <label><FaLock /> Contraseña</label>
                <div className="password-input">
                  <input type={verPassword ? 'text' : 'password'} name="password" placeholder="Mín. 6 caracteres" value={formData.password} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group">
                <label><FaLock /> Confirmar</label>
                <div className="password-input">
                  <input type={verPassword ? 'text' : 'password'} name="confirmPassword" placeholder="Repite la contraseña" value={formData.confirmPassword} onChange={handleChange} required />
                  <button type="button" className="toggle-password" onClick={() => setVerPassword(!verPassword)}>
                    {verPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary auth-submit" disabled={cargando}>
              {cargando ? 'Registrando...' : 'Crear Cuenta'}
            </button>
          </form>

          <div className="auth-footer">
            <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
