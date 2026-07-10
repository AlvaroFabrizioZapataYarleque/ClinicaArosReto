import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import {
  FaSpinner, FaCheckCircle, FaHourglass, FaBan, FaBox, FaTruck,
  FaClipboardCheck, FaCar, FaWrench, FaStore, FaTimes
} from 'react-icons/fa';
import './MisEstados.css';

const PEDIDO_STEPS = [
  { key: 'pendiente', label: 'Pedido creado', icon: FaHourglass },
  { key: 'confirmado', label: 'Confirmado', icon: FaClipboardCheck },
  { key: 'en_preparacion', label: 'En preparación', icon: FaBox },
  { key: 'listo_entrega', label: 'Listo para entrega', icon: FaTruck },
  { key: 'entregado', label: 'Entregado', icon: FaCheckCircle }
];

const SOLICITUD_STEPS_BY_TYPE = {
  local: [
    { key: 'pendiente', label: 'Solicitud creada', icon: FaHourglass },
    { key: 'vehiculo_en_local', label: 'Vehículo en local', icon: FaCar },
    { key: 'en_reparacion', label: 'En reparación', icon: FaWrench },
    { key: 'listo_entrega', label: 'Listo para entrega', icon: FaTruck },
    { key: 'entregado', label: 'Entregado', icon: FaCheckCircle }
  ],
  delivery: [
    { key: 'pendiente', label: 'Solicitud creada', icon: FaHourglass },
    { key: 'mecanico_asignado', label: 'Mecánico asignado', icon: FaTruck },
    { key: 'en_reparacion', label: 'En reparación', icon: FaWrench },
    { key: 'listo_entrega', label: 'Listo para entrega', icon: FaTruck },
    { key: 'entregado', label: 'Entregado', icon: FaCheckCircle }
  ]
};

const Stepper = ({ steps, estadoActual, tipo }) => {
  if (!estadoActual) return null;

  if (['cancelado', 'rechazado'].includes(estadoActual)) {
    return (
      <div className="stepper-cancelado">
        <FaBan className="stepper-cancelado-icon" />
        <p>{estadoActual === 'rechazado' ? 'Pedido rechazado' : 'Pedido cancelado'}</p>
      </div>
    );
  }

  const currentIdx = steps.findIndex(s => s.key === estadoActual);

  return (
    <div className="stepper">
      {steps.map((step, i) => {
        const StepIcon = step.icon;
        const isCompleted = i < currentIdx;
        const isCurrent = i === currentIdx;
        const isFuture = i > currentIdx;

        return (
          <div key={step.key} className={`stepper-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${isFuture ? 'future' : ''}`}>
            <div className="stepper-step-indicator">
              <div className={`stepper-step-circle ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}>
                {isCompleted ? <FaCheckCircle /> : <StepIcon />}
              </div>
              {i < steps.length - 1 && (
                <div className={`stepper-step-line ${isCompleted ? 'completed' : ''}`} />
              )}
            </div>
            <div className="stepper-step-label">
              <span className="stepper-step-text">{step.label}</span>
              {isCurrent && <span className="stepper-step-current-badge">Actual</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const TABS = [
  { key: 'pedido', label: 'Estado del Pedido' },
  { key: 'servicio', label: 'Estado del Servicio' }
];

const MisEstados = () => {
  const { usuario, cargando: authCargando } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('pedido');
  const [pedido, setPedido] = useState(null);
  const [solicitud, setSolicitud] = useState(null);
  const [cargandoPedido, setCargandoPedido] = useState(false);
  const [cargandoSolicitud, setCargandoSolicitud] = useState(false);

  useEffect(() => {
    if (!authCargando && !usuario) navigate('/login');
  }, [authCargando, usuario, navigate]);

  useEffect(() => {
    if (!usuario) return;
    setCargandoPedido(true);
    api.get('/api/pedidos/estado-actual')
      .then(({ data }) => setPedido(data))
      .catch(() => {})
      .finally(() => setCargandoPedido(false));
  }, [usuario]);

  useEffect(() => {
    if (!usuario) return;
    setCargandoSolicitud(true);
    api.get('/api/solicitudes/estado-actual')
      .then(({ data }) => setSolicitud(data))
      .catch(() => {})
      .finally(() => setCargandoSolicitud(false));
  }, [usuario]);

  if (authCargando || !usuario) return <div className="misestados-loading"><FaSpinner className="fa-spin" /> Cargando...</div>;

  return (
    <div className="misestados-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Seguimiento</h1>
          <p className="page-subtitle">Consulta el estado de tus pedidos y servicios</p>
        </div>
      </div>

      <div className="misestados-container">
        <div className="misestados-tabs">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              className={`misestados-tab ${tab === key ? 'active' : ''}`}
              onClick={() => setTab(key)}
            >
              {label}
              {key === 'pedido' && pedido && <span className="misestados-tab-dot" />}
              {key === 'servicio' && solicitud && <span className="misestados-tab-dot" />}
            </button>
          ))}
        </div>

        <div className="misestados-content">
          {tab === 'pedido' && (
            <div className="misestados-panel">
              {cargandoPedido ? (
                <div className="misestados-loading"><FaSpinner className="fa-spin" /> Cargando...</div>
              ) : !pedido ? (
                <div className="misestados-vacio">
                  <FaBox className="misestados-vacio-icon" />
                  <p>No tienes pedidos en proceso</p>
                  <span>Los pedidos completados o cancelados aparecen en tu historial</span>
                </div>
              ) : (
                <div className="misestados-card">
                  <div className="misestados-card-header">
                    <div className="misestados-card-info">
                      <span className="misestados-card-fecha">
                        {new Date(pedido.fechaPedido).toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                      <span className="misestados-card-total">S/{pedido.total.toFixed(2)}</span>
                    </div>
                    <div className="misestados-card-tipo">
                      {pedido.tipoEntrega === 'delivery' ? 'Delivery' : 'Recojo en tienda'}
                    </div>
                  </div>
                  <div className="misestados-stepper-wrapper">
                    <Stepper steps={PEDIDO_STEPS} estadoActual={pedido.estado} tipo={pedido.tipoEntrega} />
                  </div>
                  <div className="misestados-card-detalle">
                    <p><strong>Productos:</strong></p>
                    {pedido.items.map((item, i) => (
                      <div key={i} className="misestados-item">
                        <span>{item.nombre} x{item.cantidad}</span>
                        <span>S/{(item.precio * item.cantidad).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === 'servicio' && (
            <div className="misestados-panel">
              {cargandoSolicitud ? (
                <div className="misestados-loading"><FaSpinner className="fa-spin" /> Cargando...</div>
              ) : !solicitud ? (
                <div className="misestados-vacio">
                  <FaWrench className="misestados-vacio-icon" />
                  <p>No tienes servicios en proceso</p>
                  <span>Los servicios completados o cancelados aparecen en tu historial</span>
                </div>
              ) : (
                <div className="misestados-card">
                  <div className="misestados-card-header">
                    <div className="misestados-card-info">
                      <span className="misestados-card-fecha">
                        {new Date(solicitud.createdAt).toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                      <span className="misestados-card-servicio">{solicitud.servicioId?.nombre || 'Servicio'}</span>
                    </div>
                    <div className="misestados-card-tipo">
                      {solicitud.tipoEntrega === 'delivery' ? 'A domicilio' : 'En local'}
                    </div>
                  </div>
                  <div className="misestados-stepper-wrapper">
                    <Stepper
                      steps={SOLICITUD_STEPS_BY_TYPE[solicitud.tipoEntrega] || SOLICITUD_STEPS_BY_TYPE.local}
                      estadoActual={solicitud.estado}
                      tipo={solicitud.tipoEntrega}
                    />
                  </div>
                  <div className="misestados-card-detalle">
                    {solicitud.vehiculo && <p><strong>Vehículo:</strong> {solicitud.vehiculo}</p>}
                    {solicitud.direccionDelivery && <p><strong>Dirección:</strong> {solicitud.direccionDelivery}</p>}
                    <p><strong>Detalles:</strong> {solicitud.detalles}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MisEstados;
