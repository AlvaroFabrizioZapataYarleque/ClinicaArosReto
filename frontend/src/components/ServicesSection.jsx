// ═══════════════════════════════════════════════════════════════
// components/ServicesSection.jsx — SECCIÓN DE SERVICIOS
//
// Muestra 3 tarjetas de servicios: Reparación, Mantenimiento y Delivery.
// Cada tarjeta tiene:
//   • Header con color distintivo e icono
//   • Lista de servicios incluidos
//   • Indicadores de garantía y tiempo
//   • Botón "Ver más" que redirige a /servicios
//
// Fondo con gradiente azul corporativo.
// ═══════════════════════════════════════════════════════════════

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaShieldAlt, FaClock, FaStar, FaWrench, FaSpinner } from 'react-icons/fa';
import api from '../api';
import './ServicesSection.css';

const itemsPorTipo = {
  reparacion: ['Enderezado profesional', 'Soldadura especializada', 'Pintura y cromado', 'Pulido de alta calidad'],
  mantenimiento: ['Balanceo electrónico', 'Alineación precisa', 'Cambio de neumáticos', 'Revisión general'],
  delivery: ['Recojo a domicilio', 'Entrega de productos', 'Devolución de aros', 'Seguimiento en tiempo real']
};

const colores = ['#1a1a2e', '#16213e', '#0f3460'];

const ServicesSection = () => {
  const [servicios, setServicios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    api.get('/api/servicios')
      .then(({ data }) => setServicios(data))
      .catch(() => {})
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return (
    <section className="services-section" style={{ textAlign: 'center', padding: '60px 0' }}>
      <FaSpinner className="fa-spin" style={{ fontSize: '2rem', color: 'var(--primary)' }} />
    </section>
  );

  return (
    <section className="services-section">
      <div className="container">
        <h2 className="section-title">Servicios Profesionales</h2>
        <p className="section-subtitle">
          Ofrecemos soluciones completas para el cuidado y mantenimiento de tus aros y llantas
        </p>

        <div className="services-grid">
          {servicios.map((servicio, idx) => (
            <div key={servicio._id} className="service-card card" style={{ animationDelay: `${idx * 0.15}s` }}>
              <div className="service-header" style={{ background: `linear-gradient(135deg, ${colores[idx % colores.length]}, ${colores[idx % colores.length]}dd)` }}>
                {servicio.imagen ? (
                  <img src={servicio.imagen} alt={servicio.nombre} className="service-header-img" />
                ) : (
                  <FaWrench className="service-icon-main" />
                )}
                <h3>{servicio.nombre}</h3>
              </div>
              <div className="service-body">
                <ul className="service-list">
                  {(itemsPorTipo[servicio.tipo] || []).map((item, i) => (
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
