import { FaTag, FaGift, FaClock, FaPercent } from 'react-icons/fa';
import './Promociones.css';

const Promociones = () => {
  const promociones = [
    { titulo: 'Descuento por Temporada', descripcion: '30% de descuento en reparación de aros de aleación', descuento: 30, codigo: 'TEMPORADA30', vigencia: '31 Dic 2026' },
    { titulo: 'Compra 3 Llantas y la 4ta Gratis', descripcion: 'En la compra de 3 llantas seleccionadas, llévate la cuarta completamente gratis', descuento: 25, codigo: 'LLANTA4', vigencia: '31 Dic 2026' },
    { titulo: 'Mantenimiento Premium', descripcion: 'Paquete completo de mantenimiento con 20% de descuento', descuento: 20, codigo: 'PREMIUM20', vigencia: '31 Dic 2026' },
    { titulo: 'Delivery Gratis', descripcion: 'Delivery gratuito en compras mayores a S/500', descuento: 100, codigo: 'DELIVERYFREE', vigencia: 'Permanente' },
    { titulo: '2x1 en Accesorios', descripcion: 'Lleva 2 accesorios al precio de 1', descuento: 50, codigo: '2X1ACCE', vigencia: '31 Dic 2026' },
    { titulo: 'Descuento por Referidos', descripcion: 'Recomienda a un amigo y ambos obtienen 15% de descuento', descuento: 15, codigo: 'REFERIDO', vigencia: 'Permanente' }
  ];

  const getColor = (idx) => {
    const colores = ['var(--secondary)', 'var(--primary)', 'var(--secondary-light)', 'var(--primary-dark)', 'var(--accent)', 'var(--secondary-dark)'];
    return colores[idx % colores.length];
  };

  return (
    <div style={{ paddingTop: '70px' }}>
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Promociones</h1>
          <p className="page-subtitle">
            Aprovecha nuestras ofertas exclusivas y descuentos especiales
          </p>
        </div>
      </div>

      <section className="promos-page">
        <div className="container">
          <div className="promos-grid">
            {promociones.map((promo, idx) => (
              <div key={idx} className="promo-card-page">
                <div className="promo-card-badge" style={{ background: getColor(idx) }}>
                  <FaPercent />
                  <span>{promo.descuento}%</span>
                </div>
                <div className="promo-card-body">
                  <h3>{promo.titulo}</h3>
                  <p>{promo.descripcion}</p>
                  <div className="promo-card-code">
                    <FaTag />
                    <span>Código: <strong>{promo.codigo}</strong></span>
                  </div>
                  <div className="promo-card-footer">
                    <FaClock />
                    <span>Válido hasta: {promo.vigencia}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Promociones;
