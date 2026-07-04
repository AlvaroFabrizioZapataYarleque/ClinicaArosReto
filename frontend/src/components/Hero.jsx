// ═══════════════════════════════════════════════════════════════
// components/Hero.jsx — BANNER PRINCIPAL (HERO SECTION)
//
// Primera sección que ve el usuario al entrar.
// Muestra:
//   • Badge corporativo con animación
//   • Título principal con highlight dorado
//   • Subtítulo descriptivo
//   • Botones CTA (Ver Productos, Nuestros Servicios)
//   • Estadísticas (10+ años, 5000+ clientes, 100% garantía)
//   • Features flotantes (Calidad, Profesionalismo, Delivery)
//
// Animaciones con CSS fadeInUp para cada elemento.
// ═══════════════════════════════════════════════════════════════

import { Link } from 'react-router-dom';
import { FaArrowRight, FaShieldAlt, FaTools, FaTruck } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      {/* Overlay con gradientes radiales decorativos */}
      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-badge animate-in">Clínica de Aros Reto S.A.C.</div>
        <h1 className="hero-title animate-in">
          Reparación y Venta de <span className="hero-highlight">Aros</span> de Calidad
        </h1>
        <p className="hero-subtitle animate-in">
          Más de 10 años brindando el mejor servicio en reparación, mantenimiento y venta de aros
          para todo tipo de automóviles. Calidad y garantía que nos respaldan.
        </p>

        {/* Botones de llamado a la acción */}
        <div className="hero-buttons animate-in">
          <Link to="/productos" className="btn btn-primary">
            Ver Productos <FaArrowRight />
          </Link>
          <Link to="/servicios" className="btn btn-outline">
            Nuestros Servicios
          </Link>
        </div>

        {/* Estadísticas de la empresa */}
        <div className="hero-stats animate-in">
          <div className="stat-item">
            <span className="stat-number">10+</span>
            <span className="stat-label">Años de Experiencia</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">5000+</span>
            <span className="stat-label">Clientes Satisfechos</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Garantía</span>
          </div>
        </div>
      </div>

      {/* Features flotantes decorativas */}
      <div className="hero-features">
        <div className="feature-item">
          <FaShieldAlt className="feature-icon" />
          <span>Calidad Garantizada</span>
        </div>
        <div className="feature-item">
          <FaTools className="feature-icon" />
          <span>Reparación Profesional</span>
        </div>
        <div className="feature-item">
          <FaTruck className="feature-icon" />
          <span>Delivery Disponible</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
