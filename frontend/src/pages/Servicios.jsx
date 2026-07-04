import { FaWrench, FaTools, FaTruck, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { GiCarWheel } from 'react-icons/gi';
import './Servicios.css';

const Servicios = () => {
  const servicios = [
    {
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
              <div className="servicio-bloque-icono" style={{ background: `var(--${idx === 0 ? 'secondary' : idx === 1 ? 'primary' : 'secondary-light'})` }}>
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
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Servicios;
