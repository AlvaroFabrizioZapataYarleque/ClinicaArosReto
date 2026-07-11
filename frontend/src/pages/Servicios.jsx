import { useState, useEffect } from 'react';
import { FaWrench, FaWhatsapp, FaTimes, FaUser, FaBuilding, FaClipboardList, FaSpinner, FaCar, FaTools, FaTruck, FaStore } from 'react-icons/fa';
import api from '../api';
import './Servicios.css';

const TELEFONO = '51935430323';

const Servicios = () => {
  const [servicios, setServicios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [formAbierto, setFormAbierto] = useState(null);
  const [form, setForm] = useState({ nombre: '', empresa: '', detalles: '', vehiculo: '', tipoEntrega: 'local', direccionDelivery: '' });
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      try {
        const { data } = await api.get('/api/servicios');
        setServicios(data);
      } catch (e) {
        console.error('Error al cargar servicios:', e);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  const abrirForm = (servicio) => {
    setFormAbierto(servicio);
    setForm({ nombre: '', empresa: '', detalles: '', vehiculo: '', tipoEntrega: 'local', direccionDelivery: '' });
  };

  const generarMensaje = (servicio) => {
    let msg = `🛞 *Solicitud de Servicio - Aros Reto*%0A%0A`;
    msg += `*Servicio:* ${servicio.nombre}%0A`;
    if (form.empresa) msg += `*Empresa:* ${form.empresa}%0A`;
    if (form.vehiculo) msg += `*Vehículo:* ${form.vehiculo}%0A`;
    msg += `*Nombre:* ${form.nombre}%0A`;
    msg += `*Tipo:* ${form.tipoEntrega === 'delivery' ? 'A domicilio' : 'En local'}%0A`;
    if (form.tipoEntrega === 'delivery') msg += `*Dirección:* ${form.direccionDelivery}%0A`;
    msg += `*Detalles:*%0A${form.detalles}%0A%0A`;
    msg += `Enviado desde la web de Aros Reto`;
    return msg;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    try {
      await api.post('/api/solicitudes', {
        servicioId: formAbierto._id,
        nombre: form.nombre,
        empresa: form.empresa,
        detalles: form.detalles,
        vehiculo: form.vehiculo,
        tipoEntrega: form.tipoEntrega,
        direccionDelivery: form.direccionDelivery
      });
      const msg = generarMensaje(formAbierto);
      window.open(`https://wa.me/${TELEFONO}?text=${msg}`, '_blank');
    } catch (e) {
      console.error('Error al enviar solicitud:', e);
    } finally {
      setEnviando(false);
      setFormAbierto(null);
    }
  };

  if (cargando) return (
    <div style={{ paddingTop: '70px' }}>
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Servicios</h1>
          <p className="page-subtitle">Cargando servicios...</p>
        </div>
      </div>
      <div className="servicios-detalle" style={{ textAlign: 'center', padding: '60px 0' }}>
        <FaSpinner className="fa-spin" style={{ fontSize: '2rem', color: 'var(--primary)' }} />
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop: '70px' }}>
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Servicios</h1>
          <p className="page-subtitle">
            Ofrecemos servicios profesionales con calidad y garantía
          </p>
        </div>
      </div>

      <section className="servicios-detalle">
        <div className="container">
          {servicios.map((servicio) => (
            <div key={servicio._id} className="servicio-bloque">
              <div className="servicio-bloque-img">
                {servicio.imagen ? (
                  <img src={servicio.imagen} alt={servicio.nombre} />
                ) : (
                  <FaWrench style={{ fontSize: '2.5rem', color: 'var(--secondary)' }} />
                )}
              </div>
              <div className="servicio-bloque-content">
                <h2>{servicio.nombre}</h2>
                <p className="servicio-descripcion">{servicio.descripcion}</p>
                <div className="servicio-meta">
                  <span className="servicio-precio">S/{servicio.precio > 0 ? `${servicio.precio}.00` : 'Gratuito'}</span>
                  {servicio.duracion && (
                    <span className="servicio-duracion"><FaTools /> {servicio.duracion}</span>
                  )}
                </div>
                <button className="btn-solicitar-wsp" onClick={() => abrirForm(servicio)}>
                  <FaWhatsapp /> Solicitar Servicio
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {formAbierto && (
        <div className="servicio-modal-overlay" onClick={() => !enviando && setFormAbierto(null)}>
          <div className="servicio-modal" onClick={e => e.stopPropagation()}>
            <div className="servicio-modal-header">
              <div className="servicio-modal-icon">
                <FaWrench />
              </div>
              <div>
                <h3>Solicitar Servicio</h3>
                <p>{formAbierto.nombre}</p>
              </div>
              <button className="servicio-modal-close" onClick={() => setFormAbierto(null)} disabled={enviando}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="servicio-modal-body">
                <div className="form-group">
                  <label><FaUser /> Nombre completo</label>
                  <input
                    value={form.nombre}
                    onChange={e => setForm({ ...form, nombre: e.target.value })}
                    required
                    placeholder="Ingresa tu nombre"
                  />
                </div>
                <div className="form-group">
                  <label><FaCar /> Vehículo (opcional)</label>
                  <input
                    value={form.vehiculo}
                    onChange={e => setForm({ ...form, vehiculo: e.target.value })}
                    placeholder="Ej: Toyota Yaris 2019 - ABC-123"
                  />
                </div>
                <div className="form-group">
                  <label><FaBuilding /> Empresa (opcional)</label>
                  <input
                    value={form.empresa}
                    onChange={e => setForm({ ...form, empresa: e.target.value })}
                    placeholder="Nombre de tu empresa"
                  />
                </div>

                <div className="form-group">
                  <label>Tipo de servicio</label>
                  <div className="tipo-entrega-options">
                    <label className={`tipo-entrega-option ${form.tipoEntrega === 'local' ? 'active' : ''}`}>
                      <input type="radio" name="tipoEntrega" value="local" checked={form.tipoEntrega === 'local'} onChange={() => setForm({ ...form, tipoEntrega: 'local' })} />
                      <FaStore /> En local (traigo mi vehículo)
                    </label>
                    <label className={`tipo-entrega-option ${form.tipoEntrega === 'delivery' ? 'active' : ''}`}>
                      <input type="radio" name="tipoEntrega" value="delivery" checked={form.tipoEntrega === 'delivery'} onChange={() => setForm({ ...form, tipoEntrega: 'delivery' })} />
                      <FaTruck /> A domicilio (mecánico va al lugar)
                    </label>
                  </div>
                </div>

                {form.tipoEntrega === 'delivery' && (
                  <div className="form-group">
                    <label>Dirección del servicio *</label>
                    <input
                      value={form.direccionDelivery}
                      onChange={e => setForm({ ...form, direccionDelivery: e.target.value })}
                      placeholder="Av. Ejemplo 123, Lima"
                      required
                    />
                  </div>
                )}

                <div className="form-group">
                  <label><FaClipboardList /> Detalles del servicio</label>
                  <textarea
                    value={form.detalles}
                    onChange={e => setForm({ ...form, detalles: e.target.value })}
                    required
                    placeholder="Describe lo que necesitas: tipo de aro, problema, vehículo, etc."
                    rows={4}
                  />
                </div>
              </div>
              <div className="servicio-modal-footer">
                <button type="button" className="btn-servicio-cancelar" onClick={() => setFormAbierto(null)} disabled={enviando}>
                  Cancelar
                </button>
                <button type="submit" className="btn-servicio-enviar" disabled={enviando}>
                  {enviando ? <><FaSpinner className="fa-spin" /> Enviando...</> : <><FaWhatsapp /> Enviar a WhatsApp</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Servicios;
