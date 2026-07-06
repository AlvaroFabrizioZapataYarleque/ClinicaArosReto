import { useState, useEffect } from 'react';
import { FaTag, FaClock, FaPercent, FaSpinner } from 'react-icons/fa';
import api from '../api';
import './Promociones.css';

const Promociones = () => {
  const [promociones, setPromociones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const { data } = await api.get('/api/promociones');
        setPromociones(data);
      } catch (e) {
        console.error('Error al cargar promociones:', e);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  const getColor = (idx) => {
    const colores = ['var(--secondary)', 'var(--primary)', 'var(--secondary-light)', 'var(--primary-dark)', 'var(--accent)', 'var(--secondary-dark)'];
    return colores[idx % colores.length];
  };

  const formatearVigencia = (promo) => {
    if (!promo.fechaFin) return 'Permanente';
    return new Date(promo.fechaFin).toLocaleDateString('es-PE', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  if (cargando) return (
    <div style={{ paddingTop: '70px' }}>
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Promociones</h1>
          <p className="page-subtitle">Cargando promociones...</p>
        </div>
      </div>
      <div className="promos-page" style={{ textAlign: 'center', padding: '60px 0' }}>
        <FaSpinner className="fa-spin" style={{ fontSize: '2rem', color: 'var(--primary)' }} />
      </div>
    </div>
  );

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
              <div key={promo._id} className="promo-card-page">
                <div className="promo-card-badge" style={{ background: getColor(idx) }}>
                  <FaPercent />
                  <span>{promo.descuento}%</span>
                </div>
                <div className="promo-card-body">
                  <h3>{promo.titulo}</h3>
                  <p>{promo.descripcion}</p>
                  {promo.codigo && (
                    <div className="promo-card-code">
                      <FaTag />
                      <span>Código: <strong>{promo.codigo}</strong></span>
                    </div>
                  )}
                  <div className="promo-card-footer">
                    <FaClock />
                    <span>Válido hasta: {formatearVigencia(promo)}</span>
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
