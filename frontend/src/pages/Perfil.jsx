import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import {
  FaUser, FaCar, FaClipboardList, FaKey, FaTruck, FaPlus, FaTrash, FaEdit,
  FaSave, FaSpinner, FaTimes, FaCheckCircle, FaHourglass, FaBan
} from 'react-icons/fa';
import './Perfil.css';

const TABS = [
  { key: 'perfil', label: 'Perfil', icon: FaUser },
  { key: 'vehiculos', label: 'Vehículos', icon: FaCar },
  { key: 'pedidos', label: 'Historial Pedidos', icon: FaTruck },
  { key: 'solicitudes', label: 'Historial Solicitudes', icon: FaClipboardList },
  { key: 'password', label: 'Cambiar Contraseña', icon: FaKey }
];

const estadosPedido = { pendiente: ['warning', FaHourglass], confirmado: ['info', FaCheckCircle], completado: ['success', FaCheckCircle], cancelado: ['danger', FaBan] };
const estadosSolicitud = { pendiente: ['warning', FaHourglass], en_proceso: ['info', FaCheckCircle], completado: ['success', FaCheckCircle], cancelado: ['danger', FaBan] };

const Perfil = () => {
  const { usuario, token, cargando: authCargando } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('perfil');
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  // Perfil form
  const [perfil, setPerfil] = useState({ nombre: '', email: '', telefono: '', dni: '', direccion: '' });

  // Vehículos
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculoForm, setVehiculoForm] = useState({ marca: '', modelo: '', placa: '', anio: '' });
  const [editandoVehiculo, setEditandoVehiculo] = useState(null);
  const [guardandoVehiculo, setGuardandoVehiculo] = useState(false);

  // Pedidos
  const [pedidos, setPedidos] = useState([]);
  const [cargandoPedidos, setCargandoPedidos] = useState(false);

  // Solicitudes
  const [solicitudes, setSolicitudes] = useState([]);
  const [cargandoSolicitudes, setCargandoSolicitudes] = useState(false);

  // Cambiar contraseña
  const [passForm, setPassForm] = useState({ passwordActual: '', passwordNuevo: '', confirmPassword: '' });
  const [guardandoPass, setGuardandoPass] = useState(false);

  useEffect(() => {
    if (!authCargando && !usuario) navigate('/login');
  }, [authCargando, usuario, navigate]);

  useEffect(() => {
    if (!usuario) return;
    setPerfil({
      nombre: usuario.nombre || '',
      email: usuario.email || '',
      telefono: usuario.telefono || '',
      dni: usuario.dni || '',
      direccion: usuario.direccion || ''
    });
    setVehiculos(usuario.vehiculos || []);
  }, [usuario]);

  useEffect(() => {
    if (!usuario || tab !== 'pedidos') return;
    setCargandoPedidos(true);
    api.get('/api/pedidos/mis-pedidos').then(({ data }) => setPedidos(data)).catch(() => {}).finally(() => setCargandoPedidos(false));
  }, [usuario, tab]);

  useEffect(() => {
    if (!usuario || tab !== 'solicitudes') return;
    setCargandoSolicitudes(true);
    api.get('/api/solicitudes/mis-solicitudes').then(({ data }) => setSolicitudes(data)).catch(() => {}).finally(() => setCargandoSolicitudes(false));
  }, [usuario, tab]);

  const handleGuardarPerfil = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(perfil.email)) { setError('Email inválido'); return; }
    if (perfil.dni && !/^\d{8}$/.test(perfil.dni)) { setError('DNI debe tener 8 dígitos'); return; }
    if (perfil.telefono && (perfil.telefono.replace(/\D/g, '').length > 12)) { setError('Teléfono máximo 12 dígitos'); return; }

    setGuardando(true);
    try {
      const { data } = await api.put('/api/auth/perfil', perfil);
      setPerfil({ nombre: data.nombre, email: data.email, telefono: data.telefono, dni: data.dni, direccion: data.direccion });
      setMensaje('Perfil actualizado correctamente');
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al actualizar');
    } finally {
      setGuardando(false);
    }
  };

  const handleAgregarVehiculo = async (e) => {
    e.preventDefault();
    setGuardandoVehiculo(true);
    try {
      const nuevos = editandoVehiculo !== null
        ? vehiculos.map((v, i) => i === editandoVehiculo ? vehiculoForm : v)
        : [...vehiculos, vehiculoForm];
      const { data } = await api.put('/api/auth/perfil', { vehiculos: nuevos });
      setVehiculos(data.vehiculos);
      setVehiculoForm({ marca: '', modelo: '', placa: '', anio: '' });
      setEditandoVehiculo(null);
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al guardar vehículo');
    } finally {
      setGuardandoVehiculo(false);
    }
  };

  const handleEliminarVehiculo = async (idx) => {
    const nuevos = vehiculos.filter((_, i) => i !== idx);
    try {
      const { data } = await api.put('/api/auth/perfil', { vehiculos: nuevos });
      setVehiculos(data.vehiculos);
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al eliminar vehículo');
    }
  };

  const editarVehiculo = (idx) => {
    setVehiculoForm(vehiculos[idx]);
    setEditandoVehiculo(idx);
  };

  const handleCambiarPassword = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    if (passForm.passwordNuevo.length < 6) { setError('La nueva contraseña debe tener al menos 6 caracteres'); return; }
    if (passForm.passwordNuevo !== passForm.confirmPassword) { setError('Las contraseñas no coinciden'); return; }

    setGuardandoPass(true);
    try {
      await api.put('/api/auth/password', { passwordActual: passForm.passwordActual, passwordNuevo: passForm.passwordNuevo });
      setMensaje('Contraseña actualizada correctamente');
      setPassForm({ passwordActual: '', passwordNuevo: '', confirmPassword: '' });
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al cambiar contraseña');
    } finally {
      setGuardandoPass(false);
    }
  };

  const EstadoBadge = ({ estado, map }) => {
    const [color, Icon] = map[estado] || ['secondary', FaHourglass];
    return <span className={`estado-badge estado-${color}`}><Icon /> {estado.replace('_', ' ')}</span>;
  };

  if (authCargando || !usuario) return <div className="perfil-loading"><FaSpinner className="fa-spin" /> Cargando...</div>;

  return (
    <div className="perfil-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Mi Perfil</h1>
          <p className="page-subtitle">Gestiona tu información y revisa tu historial</p>
        </div>
      </div>

      <div className="perfil-container">
        <div className="perfil-tabs">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button key={key} className={`perfil-tab ${tab === key ? 'active' : ''}`} onClick={() => { setTab(key); setMensaje(''); setError(''); }}>
              <Icon /> {label}
            </button>
          ))}
        </div>

        <div className="perfil-content">
          {mensaje && <div className="perfil-mensaje perfil-mensaje-exito">{mensaje}</div>}
          {error && <div className="perfil-mensaje perfil-mensaje-error">{error}</div>}

          {tab === 'perfil' && (
            <form onSubmit={handleGuardarPerfil} className="perfil-form">
              <h3>Datos Personales</h3>
              <div className="form-group">
                <label><FaUser /> Nombre</label>
                <input value={perfil.nombre} onChange={e => { setError(''); setMensaje(''); setPerfil({ ...perfil, nombre: e.target.value }); }} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={perfil.email} onChange={e => { setError(''); setMensaje(''); setPerfil({ ...perfil, email: e.target.value }); }} required />
                </div>
                <div className="form-group">
                  <label>DNI</label>
                  <input value={perfil.dni} onChange={e => { setError(''); setMensaje(''); setPerfil({ ...perfil, dni: e.target.value.replace(/\D/g, '').slice(0, 8) }); }} maxLength={8} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Teléfono</label>
                  <input value={perfil.telefono} onChange={e => { setError(''); setMensaje(''); setPerfil({ ...perfil, telefono: e.target.value.replace(/\D/g, '').slice(0, 12) }); }} maxLength={12} />
                </div>
                <div className="form-group">
                  <label>Dirección</label>
                  <input value={perfil.direccion} onChange={e => { setError(''); setMensaje(''); setPerfil({ ...perfil, direccion: e.target.value }); }} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" disabled={guardando}>
                {guardando ? <><FaSpinner className="fa-spin" /> Guardando...</> : <><FaSave /> Guardar Cambios</>}
              </button>
            </form>
          )}

          {tab === 'vehiculos' && (
            <div className="perfil-vehiculos">
              <h3>Mis Vehículos</h3>
              <form onSubmit={handleAgregarVehiculo} className="vehiculo-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Marca</label>
                    <input value={vehiculoForm.marca} onChange={e => setVehiculoForm({ ...vehiculoForm, marca: e.target.value })} placeholder="Toyota" />
                  </div>
                  <div className="form-group">
                    <label>Modelo</label>
                    <input value={vehiculoForm.modelo} onChange={e => setVehiculoForm({ ...vehiculoForm, modelo: e.target.value })} placeholder="Yaris" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Placa</label>
                    <input value={vehiculoForm.placa} onChange={e => setVehiculoForm({ ...vehiculoForm, placa: e.target.value.toUpperCase() })} placeholder="ABC-123" />
                  </div>
                  <div className="form-group">
                    <label>Año</label>
                    <input value={vehiculoForm.anio} onChange={e => setVehiculoForm({ ...vehiculoForm, anio: e.target.value.replace(/\D/g, '').slice(0, 4) })} placeholder="2020" maxLength={4} />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" disabled={guardandoVehiculo}>
                  {guardandoVehiculo ? <><FaSpinner className="fa-spin" /> Guardando...</> : <><FaPlus /> {editandoVehiculo !== null ? 'Actualizar' : 'Agregar'} Vehículo</>}
                </button>
              </form>

              <div className="vehiculos-lista">
                {vehiculos.length === 0 && <p className="perfil-sin-datos">No has registrado vehículos</p>}
                {vehiculos.map((v, i) => (
                  <div key={i} className="vehiculo-card">
                    <div className="vehiculo-info">
                      <strong>{v.marca} {v.modelo}</strong>
                      <span>{v.placa} {v.anio ? `- ${v.anio}` : ''}</span>
                    </div>
                    <div className="vehiculo-acciones">
                      <button className="btn-vehiculo-editar" onClick={() => editarVehiculo(i)}><FaEdit /></button>
                      <button className="btn-vehiculo-eliminar" onClick={() => handleEliminarVehiculo(i)}><FaTrash /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'pedidos' && (
            <div className="perfil-historial">
              <h3>Historial de Pedidos</h3>
              {cargandoPedidos ? (
                <div className="perfil-loading"><FaSpinner className="fa-spin" /> Cargando...</div>
              ) : pedidos.length === 0 ? (
                <p className="perfil-sin-datos">No tienes pedidos registrados</p>
              ) : (
                <div className="historial-lista">
                  {pedidos.map(p => (
                    <div key={p._id} className="historial-card">
                      <div className="historial-header">
                        <span className="historial-fecha">{new Date(p.fechaPedido).toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                        <EstadoBadge estado={p.estado} map={estadosPedido} />
                      </div>
                      <div className="historial-items">
                        {p.items.map((item, i) => (
                          <div key={i} className="historial-item">
                            <span>{item.nombre} x{item.cantidad}</span>
                            <span>S/{(item.precio * item.cantidad).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="historial-total">
                        <strong>Total: S/{p.total.toFixed(2)}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'solicitudes' && (
            <div className="perfil-historial">
              <h3>Historial de Solicitudes de Servicio</h3>
              {cargandoSolicitudes ? (
                <div className="perfil-loading"><FaSpinner className="fa-spin" /> Cargando...</div>
              ) : solicitudes.length === 0 ? (
                <p className="perfil-sin-datos">No tienes solicitudes registradas</p>
              ) : (
                <div className="historial-lista">
                  {solicitudes.map(s => (
                    <div key={s._id} className="historial-card">
                      <div className="historial-header">
                        <span className="historial-fecha">{new Date(s.createdAt).toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                        <EstadoBadge estado={s.estado} map={estadosSolicitud} />
                      </div>
                      <div className="historial-detalle">
                        <p><strong>Servicio:</strong> {s.servicioId?.nombre || 'N/A'}</p>
                        {s.vehiculo && <p><strong>Vehículo:</strong> {s.vehiculo}</p>}
                        <p><strong>Detalles:</strong> {s.detalles}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'password' && (
            <form onSubmit={handleCambiarPassword} className="perfil-form">
              <h3>Cambiar Contraseña</h3>
              <div className="form-group">
                <label>Contraseña Actual</label>
                <input type="password" value={passForm.passwordActual} onChange={e => { setError(''); setMensaje(''); setPassForm({ ...passForm, passwordActual: e.target.value }); }} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Nueva Contraseña</label>
                  <input type="password" value={passForm.passwordNuevo} onChange={e => { setError(''); setMensaje(''); setPassForm({ ...passForm, passwordNuevo: e.target.value }); }} required />
                </div>
                <div className="form-group">
                  <label>Confirmar Nueva Contraseña</label>
                  <input type="password" value={passForm.confirmPassword} onChange={e => { setError(''); setMensaje(''); setPassForm({ ...passForm, confirmPassword: e.target.value }); }} required />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" disabled={guardandoPass}>
                {guardandoPass ? <><FaSpinner className="fa-spin" /> Guardando...</> : <><FaKey /> Cambiar Contraseña</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Perfil;
