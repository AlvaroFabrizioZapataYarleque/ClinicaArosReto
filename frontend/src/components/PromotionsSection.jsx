// ═══════════════════════════════════════════════════════════════
// components/PromotionsSection.jsx — SECCIÓN DE PROMOCIONES
//
// Muestra 3 promociones destacadas en la landing page.
// Cada promoción tiene:
//   • Badge con porcentaje de descuento
//   • Código promocional para canjear
//   • Indicador de "Por tiempo limitado"
//
// Incluye enlace "Ver todas" que redirige a /promociones.
// ═══════════════════════════════════════════════════════════════

import { Link } from 'react-router-dom';
import { FaTag, FaArrowRight, FaClock, FaGift } from 'react-icons/fa';
import './PromotionsSection.css';

const PromotionsSection = () => {
  const promos = [
    {
      titulo: '30% Descuento',
      descripcion: 'En reparación de aros de aleación',
      descuento: 30,
      codigo: 'TEMPORADA30',
      color: 'var(--secondary)'
    },
    {
      titulo: '4ta Llanta Gratis',
      descripcion: 'Compra 3 llantas seleccionadas y llévate la 4ta gratis',
      descuento: 25,
      codigo: 'LLANTA4',
      color: 'var(--primary)'
    },
    {
      titulo: 'Delivery Gratis',
      descripcion: 'En compras mayores a S/500',
      descuento: 100,
      codigo: 'DELIVERYFREE',
      color: 'var(--secondary-light)'
    }
  ];

  return (
    <section className="promotions-section">
      <div className="container">
        {/* Header con título y botón "Ver todas" */}
        <div className="promo-header">
          <div>
            <h2 className="section-title">Promociones Especiales</h2>
            <p className="section-subtitle">
              Aprovecha nuestras ofertas y descuentos exclusivos
            </p>
          </div>
          <Link to="/promociones" className="btn btn-primary">
            Ver todas <FaArrowRight />
          </Link>
        </div>

        {/* Grid de promociones */}
        <div className="promo-grid">
          {promos.map((promo, idx) => (
            <div key={idx} className="promo-card" style={{ animationDelay: `${idx * 0.15}s` }}>
              {/* Badge con el porcentaje de descuento */}
              <div className="promo-badge" style={{ background: promo.color }}>
                <FaTag />
                <span>-{promo.descuento}%</span>
              </div>
              <div className="promo-body">
                <h3 className="promo-titulo">{promo.titulo}</h3>
                <p className="promo-descripcion">{promo.descripcion}</p>
                {/* Código promocional (border dashed) */}
                <div className="promo-codigo">
                  <FaGift />
                  <span>Código: <strong>{promo.codigo}</strong></span>
                </div>
                <div className="promo-footer">
                  <FaClock />
                  <span>Por tiempo limitado</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionsSection;
