import { Link } from 'react-router-dom';
import { FaTools, FaWrench, FaTruck, FaArrowRight, FaShieldAlt, FaClock, FaStar } from 'react-icons/fa';
import { GiCarWheel } from 'react-icons/gi';
import './ServicesSection.css';

const ServicesSection = () => {
  const servicios = [
    {
      icon: GiCarWheel,
      titulo: 'Reparación de Aros',
      tipo: 'reparacion',
      items: ['Enderezado profesional', 'Soldadura especializada', 'Pintura y cromado', 'Pulido de alta calidad'],
      color: 'var(--secondary)'
    },
    {
      icon: FaWrench,
      titulo: 'Mantenimiento',
      tipo: 'mantenimiento',
      items: ['Balanceo electrónico', 'Alineación precisa', 'Cambio de neumáticos', 'Revisión general'],
      color: 'var(--primary)'
    },
    {
      icon: FaTruck,
      titulo: 'Delivery',
      tipo: 'delivery',
      items: ['Recojo a domicilio', 'Entrega de productos', 'Devolución de aros', 'Seguimiento en tiempo real'],
      color: 'var(--secondary-light)'
    }
  ];

  return (
    <section className="services-section">
      <div className="container">
        <h2 className="section-title">Servicios Profesionales</h2>
        <p className="section-subtitle">
          Ofrecemos soluciones completas para el cuidado y mantenimiento de tus aros y llantas
        </p>

        <div className="services-grid">
          {servicios.map((servicio, idx) => (
            <div key={idx} className="service-card card" style={{ animationDelay: `${idx * 0.15}s` }}>
              <div className="service-header" style={{ background: `linear-gradient(135deg, ${servicio.color}, ${servicio.color}dd)` }}>
                <servicio.icon className="service-icon-main" />
                <h3>{servicio.titulo}</h3>
              </div>
              <div className="service-body">
                <ul className="service-list">
                  {servicio.items.map((item, i) => (
                    <li key={i} className="service-item">
                      <FaStar className="check-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="service-features">
                  <div className="sf-item">
                    <FaShieldAlt />
                    <span>Garantizado</span>
                  </div>
                  <div className="sf-item">
                    <FaClock />
                    <span>Rápido</span>
                  </div>
                </div>
                <Link to="/servicios" className="btn btn-secondary service-btn">
                  Ver más <FaArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
