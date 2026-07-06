import { useState } from 'react';
import { FaWrench, FaTools, FaTruck, FaCheckCircle, FaWhatsapp, FaTimes, FaUser, FaBuilding, FaClipboardList, FaSpinner } from 'react-icons/fa';
import { GiCarWheel } from 'react-icons/gi';
import './Servicios.css';

const TELEFONO = '51934096012';

const Servicios = () => {
  const [formAbierto, setFormAbierto] = useState(null);
  const [form, setForm] = useState({ nombre: '', empresa: '', detalles: '' });
  const [enviando, setEnviando] = useState(false);

  const servicios = [
    {
      id: 'reparacion',
      icon: GiCarWheel,
      titulo: 'Reparación de Aros',
      descripcion: 'Servicio profesional de reparación para todo tipo de aros de aleación y acero.',
      detalles: [
        'Enderezado de aros con máquinas especializadas',
        'Soldadura de grietas y fisuras',
        'Pintura y acabado profesional',
        'Pulido y cromado de alta calidad',
        'Eliminación de rayones profundos'
      ],
      precio: 'Desde S/80',
      duracion: '2-3 días'
    },
    {
      id: 'mantenimiento',
      icon: FaTools,
      titulo: 'Mantenimiento',
      descripcion: 'Mantenimiento preventivo y correctivo para alargar la vida útil de tus aros y llantas.',
      detalles: [
        'Balanceo electrónico de precisión',
        'Alineación de dirección',
        'Cambio y montaje de neumáticos',
        'Rotación de llantas',
        'Inspección técnica completa'
      ],
      precio: 'Desde S/35',
      duracion: '1-2 horas'
    },
    {
      id: 'delivery',
      icon: FaTruck,
      titulo: 'Delivery',
      descripcion: 'Llevamos nuestros servicios hasta la puerta de tu casa u oficina.',
      detalles: [
        'Recojo de aros a domicilio',
        'Entrega de productos comprados',
        'Devolución de aros reparados',
        'Seguimiento en tiempo real',
        'Cobertura en toda Lima'
      ],
      precio: 'Gratis*',
      duracion: '24 horas'
    }
  ];

  const abrirForm = (servicio) => {
    setFormAbierto(servicio);
    setForm({ nombre: '', empresa: '', detalles: '' });
  };

  const generarMensaje = () => {
    let msg = `🛞 *Solicitud de Servicio - Aros Reto*%0A%0A`;
    msg += `*Servicio:* ${formAbierto.titulo}%0A`;
    if (form.empresa) msg += `*Empresa:* ${form.empresa}%0A`;
    msg += `*Nombre:* ${form.nombre}%0A`;
    msg += `*Detalles:*%0A${form.detalles}%0A%0A`;
    msg += `Enviado desde la web de Aros Reto`;
    return msg;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviando(true);
    const msg = generarMensaje();
    window.open(`https://wa.me/${TELEFONO}?text=${msg}`, '_blank');
    setEnviando(false);
    setFormAbierto(null);
  };

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
          {servicios.map((servicio, idx) => (
            <div key={idx} className="servicio-bloque">
              <div className="servicio-bloque-icono" style={{
                background: `var(--${idx === 0 ? 'secondary' : idx === 1 ? 'primary' : 'secondary-light'})`
              }}>
                <servicio.icon />
              </div>
              <div className="servicio-bloque-content">
                <h2>{servicio.titulo}</h2>
                <p className="servicio-descripcion">{servicio.descripcion}</p>
                <ul className="servicio-detalles">
                  {servicio.detalles.map((det, i) => (
                    <li key={i}>
                      <FaCheckCircle className="detalle-icon" />
                      <span>{det}</span>
                    </li>
                  ))}
                </ul>
                <div className="servicio-meta">
                  <span className="servicio-precio">{servicio.precio}</span>
                  <span className="servicio-duracion"><FaTools /> {servicio.duracion}</span>
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
        <div className="servicio-modal-overlay" onClick={() => setFormAbierto(null)}>
          <div className="servicio-modal" onClick={e => e.stopPropagation()}>
            <div className="servicio-modal-header">
              <div className="servicio-modal-icon">
                <formAbierto.icon />
              </div>
              <div>
                <h3>Solicitar Servicio</h3>
                <p>{formAbierto.titulo}</p>
              </div>
              <button className="servicio-modal-close" onClick={() => setFormAbierto(null)}>
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
                  <label><FaBuilding /> Empresa (opcional)</label>
                  <input
                    value={form.empresa}
                    onChange={e => setForm({ ...form, empresa: e.target.value })}
                    placeholder="Nombre de tu empresa"
                  />
                </div>
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
                <button type="button" className="btn-servicio-cancelar" onClick={() => setFormAbierto(null)}>
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
