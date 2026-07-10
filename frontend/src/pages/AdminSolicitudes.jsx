import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { FaArrowLeft, FaSpinner, FaCheckCircle, FaHourglass, FaBan, FaTruck, FaStore, FaCar, FaWrench, FaHistory, FaCommentAlt } from 'react-icons/fa';
import '../styles/Admin.css';

const ESTADOS_SOLICITUD = [
  { value: 'pendiente', label: 'Solicitud creada', color: 'warning', icon: FaHourglass },
  { value: 'vehiculo_en_local', label: 'Vehículo en local', color: 'info', icon: FaCar },
  { value: 'mecanico_asignado', label: 'Mecánico asignado', color: 'primary', icon: FaTruck },
  { value: 'en_reparacion', label: 'En reparación', color: 'primary', icon: FaWrench },
  { value: 'listo_entrega', label: 'Listo para entrega', color: 'info', icon: FaCheckCircle },
  { value: 'entregado', label: 'Entregado', color: 'success', icon: FaCheckCircle },
  { value: 'rechazado', label: 'Rechazado', color: 'danger', icon: FaBan }
];

const ESTADO_MAP = Object.fromEntries(ESTADOS_SOLICITUD.map(e => [e.value, e]));

const AdminSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [cargandoId, setCargandoId] = useState(null);
  const [expandido, setExpandido] = useState(null);
  const [comentarios, setComentarios] = useState({});

  const cargar = async () => {
    const token = localStorage.getItem('token');
    try {
      const { data } = await api.get('/api/solicitudes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSolicitudes(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { cargar(); }, []);

  const cambiarEstado = async (id, estado) => {
    setCargandoId(id);
    const token = localStorage.getItem('token');
    try {
      await api.put(`/api/solicitudes/${id}`, { estado, comentario: comentarios[id] || '' }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComentarios(prev => ({ ...prev, [id]: '' }));
      cargar();
    } catch (e) {
      console.error(e);
    } finally {
      setCargandoId(null);
    }
  };

  const getEstadosDisponibles = (estadoActual, tipoEntrega) => {
    if (estadoActual === 'cancelado' || estadoActual === 'entregado' || estadoActual === 'rechazado') return [];

    let disponibles = ESTADOS_SOLICITUD.filter(e => e.value !== estadoActual);

    if (tipoEntrega === 'delivery') {
      disponibles = disponibles.filter(e => e.value !== 'vehiculo_en_local');
    } else {
      disponibles = disponibles.filter(e => e.value !== 'mecanico_asignado');
    }

    if (estadoActual === 'pendiente') {
      return disponibles.filter(e => e.value === 'vehiculo_en_local' || e.value === 'mecanico_asignado' || e.value === 'rechazado');
    }

    return disponibles;
  };

  return (
    <div className="admin-crud">
      <div className="admin-crud-header">
        <div className="admin-crud-header-left">
          <Link to="/admin" className="btn-back">
            <FaArrowLeft />
          </Link>
          <h2>Solicitudes de Servicio</h2>
        </div>
      </div>

      {solicitudes.length === 0 ? (
        <div className="admin-empty">No hay solicitudes de servicio aún</div>
      ) : (
        <div className="admin-pedidos-lista">
          {solicitudes.map(s => {
            const estadoActual = ESTADO_MAP[s.estado] || ESTADO_MAP.pendiente;
            const EstadoIcon = estadoActual.icon;
            const disponibles = getEstadosDisponibles(s.estado, s.tipoEntrega);
            const estaExpandido = expandido === s._id;

            return (
              <div key={s._id} className={`pedido-card ${estaExpandido ? 'expandido' : ''}`}>
                <div className="pedido-card-header" onClick={() => setExpandido(estaExpandido ? null : s._id)}>
                  <div className="pedido-card-info">
                    <span className="pedido-fecha">{new Date(s.createdAt).toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    <span className="pedido-cliente"><strong>{s.nombre}</strong> - {s.servicioId?.nombre || 'Servicio'}</span>
                  </div>
                  <div className="pedido-card-estado">
                    <span className={`estado-badge estado-${estadoActual.color}`}>
                      <EstadoIcon /> {estadoActual.label}
                    </span>
                  </div>
                  <div className="pedido-card-tipo">
                    {s.tipoEntrega === 'delivery' ? <><FaTruck /> Delivery</> : <><FaStore /> En local</>}
                  </div>
                </div>

                {estaExpandido && (
                  <div className="pedido-card-body">
                    <div className="pedido-detalles-grid">
                      <div className="pedido-detalle-seccion">
                        <h4>Datos del cliente</h4>
                        <p><strong>Nombre:</strong> {s.nombre}</p>
                        {s.empresa && <p><strong>Empresa:</strong> {s.empresa}</p>}
                        {s.vehiculo && <p><strong>Vehículo:</strong> {s.vehiculo}</p>}
                        {s.tipoEntrega === 'delivery' && (
                          <p><strong>Dirección:</strong> {s.direccionDelivery}</p>
                        )}
                      </div>
                      <div className="pedido-detalle-seccion">
                        <h4>Detalles del servicio</h4>
                        <p><strong>Servicio:</strong> {s.servicioId?.nombre || 'N/A'}</p>
                        <p><strong>Detalles:</strong> {s.detalles}</p>
                      </div>
                    </div>

                    <div className="pedido-historial">
                      <h4><FaHistory /> Historial de estados</h4>
                      <div className="timeline">
                        {s.estadoHistorial?.map((h, i) => {
                          const info = ESTADO_MAP[h.estado] || { label: h.estado, color: 'secondary', icon: FaHourglass };
                          const HIcon = info.icon;
                          return (
                            <div key={i} className={`timeline-item ${i === s.estadoHistorial.length - 1 ? 'actual' : ''}`}>
                              <div className={`timeline-icon timeline-${info.color}`}>
                                <HIcon />
                              </div>
                              <div className="timeline-content">
                                <span className="timeline-estado">{info.label}</span>
                                <span className="timeline-fecha">{new Date(h.fecha).toLocaleString('es-PE')}</span>
                                {h.comentario && <span className="timeline-comentario"><FaCommentAlt /> {h.comentario}</span>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {disponibles.length > 0 && (
                      <div className="pedido-acciones">
                        <h4>Actualizar estado</h4>
                        <div className="pedido-selector-estados">
                          {disponibles.map(est => {
                            const BtnIcon = est.icon;
                            return (
                              <button
                                key={est.value}
                                className={`btn-estado btn-estado-${est.color}`}
                                onClick={() => cambiarEstado(s._id, est.value)}
                                disabled={cargandoId === s._id}
                              >
                                {cargandoId === s._id ? <><FaSpinner className="fa-spin" /> Procesando</> : <><BtnIcon /> {est.label}</>}
                              </button>
                            );
                          })}
                        </div>
                        <div className="pedido-comentario">
                          <input
                            placeholder="Comentario opcional sobre el cambio..."
                            value={comentarios[s._id] || ''}
                            onChange={e => setComentarios(prev => ({ ...prev, [s._id]: e.target.value }))}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminSolicitudes;
