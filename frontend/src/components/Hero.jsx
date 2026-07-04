import { Link } from 'react-router-dom';
import { FaArrowRight, FaShieldAlt, FaTools, FaTruck } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
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
        <div className="hero-buttons animate-in">
          <Link to="/productos" className="btn btn-primary">
            Ver Productos <FaArrowRight />
          </Link>
          <Link to="/servicios" className="btn btn-outline">
            Nuestros Servicios
          </Link>
        </div>
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
