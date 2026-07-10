import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { FaArrowLeft, FaSpinner, FaCheckCircle, FaHourglass, FaBan, FaTruck, FaStore, FaBox, FaHistory, FaCommentAlt, FaClipboardCheck } from 'react-icons/fa';
import '../styles/Admin.css';

const ESTADOS_PEDIDO = [
  { value: 'pendiente', label: 'Pedido creado', color: 'warning', icon: FaHourglass },
  { value: 'confirmado', label: 'Confirmado', color: 'info', icon: FaClipboardCheck },
  { value: 'en_preparacion', label: 'En preparación', color: 'primary', icon: FaBox },
  { value: 'listo_entrega', label: 'Listo para entrega', color: 'info', icon: FaTruck },
  { value: 'entregado', label: 'Entregado', color: 'success', icon: FaCheckCircle },
  { value: 'rechazado', label: 'Rechazado', color: 'danger', icon: FaBan }
];

const ESTADO_MAP = Object.fromEntries(ESTADOS_PEDIDO.map(e => [e.value, e]));

const AdminPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [cargandoId, setCargandoId] = useState(null);
  const [expandido, setExpandido] = useState(null);
  const [comentarios, setComentarios] = useState({});

  const cargar = async () => {
    const token = localStorage.getItem('token');
    try {
      const { data } = await api.get('/api/admin/pedidos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPedidos(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { cargar(); }, []);

  const cambiarEstado = async (id, estado) => {
    setCargandoId(id);
    const token = localStorage.getItem('token');
    try {
      await api.put(`/api/admin/pedidos/${id}`, { estado, comentario: comentarios[id] || '' }, {
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

  const getProximoEstado = (estadoActual) => {
    const idx = ESTADOS_PEDIDO.findIndex(e => e.value === estadoActual);
    if (idx < 0 || idx >= ESTADOS_PEDIDO.length - 2) return null;
    return ESTADOS_PEDIDO[idx + 1];
  };

  const getEstadosDisponibles = (estadoActual) => {
    if (estadoActual === 'cancelado' || estadoActual === 'entregado' || estadoActual === 'rechazado') return [];
    return ESTADOS_PEDIDO.filter(e => e.value !== estadoActual);
  };

  return (
    <div className="admin-crud">
      <div className="admin-crud-header">
        <div className="admin-crud-header-left">
          <Link to="/admin" className="btn-back">
            <FaArrowLeft />
          </Link>
          <h2>Pedidos Recibidos</h2>
        </div>
      </div>

      {pedidos.length === 0 ? (
        <div className="admin-empty">No hay pedidos aún</div>
      ) : (
        <div className="admin-pedidos-lista">
          {pedidos.map(p => {
            const estadoActual = ESTADO_MAP[p.estado] || ESTADO_MAP.pendiente;
            const EstadoIcon = estadoActual.icon;
            const proximo = getProximoEstado(p.estado);
            const disponible = getEstadosDisponibles(p.estado);
            const estaExpandido = expandido === p._id;

            return (
              <div key={p._id} className={`pedido-card ${estaExpandido ? 'expandido' : ''}`}>
                <div className="pedido-card-header" onClick={() => setExpandido(estaExpandido ? null : p._id)}>
                  <div className="pedido-card-info">
                    <span className="pedido-fecha">{new Date(p.fechaPedido).toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    <span className="pedido-cliente"><strong>{p.nombre}</strong> - S/{p.total.toFixed(2)}</span>
                  </div>
                  <div className="pedido-card-estado">
                    <span className={`estado-badge estado-${estadoActual.color}`}>
                      <EstadoIcon /> {estadoActual.label}
                    </span>
                  </div>
                  <div className="pedido-card-tipo">
                    {p.tipoEntrega === 'delivery' ? <><FaTruck /> Delivery</> : <><FaStore /> Recojo</>}
                  </div>
                </div>

                {estaExpandido && (
                  <div className="pedido-card-body">
                    <div className="pedido-detalles-grid">
                      <div className="pedido-detalle-seccion">
                        <h4>Datos del cliente</h4>
                        <p><strong>Nombre:</strong> {p.nombre}</p>
                        <p><strong>DNI:</strong> {p.dni}</p>
                        <p><strong>Email:</strong> {p.email}</p>
                        <p><strong>Teléfono:</strong> {p.telefono}</p>
                        {p.tipoEntrega === 'delivery' ? (
                          <p><strong>Dirección delivery:</strong> {p.direccionDelivery}</p>
                        ) : p.direccion ? (
                          <p><strong>Dirección:</strong> {p.direccion}</p>
                        ) : null}
                      </div>
                      <div className="pedido-detalle-seccion">
                        <h4>Productos</h4>
                        {p.items.map((item, i) => (
                          <div key={i} className="pedido-item-detalle">
                            <span>{item.nombre} x{item.cantidad}</span>
                            <span>S/{(item.precio * item.cantidad).toFixed(2)}</span>
                          </div>
                        ))}
                        <div className="pedido-total-detalle">
                          <strong>Total: S/{p.total.toFixed(2)}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="pedido-historial">
                      <h4><FaHistory /> Historial de estados</h4>
                      <div className="timeline">
                        {p.estadoHistorial?.map((h, i) => {
                          const info = ESTADO_MAP[h.estado] || { label: h.estado, color: 'secondary', icon: FaHourglass };
                          const HIcon = info.icon;
                          return (
                            <div key={i} className={`timeline-item ${i === p.estadoHistorial.length - 1 ? 'actual' : ''}`}>
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

                    {disponible.length > 0 && (
                      <div className="pedido-acciones">
                        <h4>Actualizar estado</h4>
                        <div className="pedido-selector-estados">
                          {disponible.map(est => {
                            const BtnIcon = est.icon;
                            const isProximo = proximo?.value === est.value;
                            return (
                              <button
                                key={est.value}
                                className={`btn-estado btn-estado-${est.color} ${isProximo ? 'btn-estado-principal' : ''}`}
                                onClick={() => cambiarEstado(p._id, est.value)}
                                disabled={cargandoId === p._id}
                              >
                                {cargandoId === p._id ? <><FaSpinner className="fa-spin" /> Procesando</> : <><BtnIcon /> {est.label}</>}
                              </button>
                            );
                          })}
                        </div>
                        <div className="pedido-comentario">
                          <input
                            placeholder="Comentario opcional sobre el cambio..."
                            value={comentarios[p._id] || ''}
                            onChange={e => setComentarios(prev => ({ ...prev, [p._id]: e.target.value }))}
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

export default AdminPedidos;
