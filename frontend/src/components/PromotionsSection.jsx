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

        <div className="promo-grid">
          {promos.map((promo, idx) => (
            <div key={idx} className="promo-card" style={{ animationDelay: `${idx * 0.15}s` }}>
              <div className="promo-badge" style={{ background: promo.color }}>
                <FaTag />
                <span>-{promo.descuento}%</span>
              </div>
              <div className="promo-body">
                <h3 className="promo-titulo">{promo.titulo}</h3>
                <p className="promo-descripcion">{promo.descripcion}</p>
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
