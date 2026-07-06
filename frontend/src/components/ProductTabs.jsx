import { useState, useEffect } from 'react';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { GiCarWheel, GiTireTracks } from 'react-icons/gi';
import { HiOutlineSparkles } from 'react-icons/hi';
import { useCart } from '../context/CartContext';
import api from '../api';
import './ProductTabs.css';

const ProductTabs = ({ limitado = false }) => {
  const [activo, setActivo] = useState('aros');
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { agregar } = useCart();

  const tabs = [
    { id: 'aros', label: 'Aros', icon: GiCarWheel },
    { id: 'llantas', label: 'Llantas', icon: GiTireTracks },
    { id: 'accesorios', label: 'Accesorios', icon: HiOutlineSparkles }
  ];

  useEffect(() => {
    const cargar = async () => {
      try {
        const { data } = await api.get('/api/productos');
        setProductos(data);
      } catch (e) {
        console.error('Error al cargar productos:', e);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  const itemsPorCategoria = {};
  tabs.forEach(t => {
    const filtrados = productos.filter(p => p.categoria === t.id);
    itemsPorCategoria[t.id] = limitado ? filtrados.slice(0, 4) : filtrados;
  });

  const items = itemsPorCategoria[activo] || [];

  return (
    <section className="product-tabs">
      <div className="container">
        <h2 className="section-title">Nuestros Productos</h2>
        <p className="section-subtitle">
          Explora nuestra amplia gama de aros, llantas y accesorios para tu vehículo
        </p>

        <div className="tabs-header">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`tab-btn ${activo === id ? 'active' : ''}`}
              onClick={() => setActivo(id)}
            >
              <Icon className="tab-icon" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {cargando ? (
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>Cargando productos...</div>
        ) : (
          <div className="tabs-content">
            {items.map((producto, idx) => (
              <div key={producto._id} className="product-card card" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="product-image">
                  {producto.imagen ? (
                    <img src={producto.imagen} alt={producto.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div className="product-placeholder">
                      <GiCarWheel className="placeholder-icon" />
                    </div>
                  )}
                  {producto.destacado && (
                    <span className="product-badge">
                      <FaStar /> Destacado
                    </span>
                  )}
                </div>
                <div className="product-info">
                  <span className="product-marca">{producto.marca}</span>
                  <h3 className="product-nombre">{producto.nombre}</h3>
                  <p className="product-descripcion">{producto.descripcion}</p>
                  <div className="product-footer">
                    <span className="product-precio">S/{producto.precio}</span>
                    <button className="btn-buy" onClick={() => agregar(producto)} title="Agregar al carrito">
                      <FaShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductTabs;
