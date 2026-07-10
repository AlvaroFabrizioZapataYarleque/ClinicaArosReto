import { useState, useEffect } from 'react';
import { FaStar, FaShoppingCart, FaWrench, FaTools, FaTruck, FaBox, FaCog, FaGift } from 'react-icons/fa';
import { GiCarWheel, GiTireTracks } from 'react-icons/gi';
import { HiOutlineSparkles } from 'react-icons/hi';
import { useCart } from '../context/CartContext';
import api from '../api';
import './ProductTabs.css';

const iconMap = {
  GiCarWheel, GiTireTracks, HiOutlineSparkles,
  FaWrench, FaTools, FaTruck, FaBox, FaCog, FaGift
};

const resolveIcon = (nombre) => iconMap[nombre] || GiCarWheel;

const ProductTabs = ({ limitado = false }) => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [activo, setActivo] = useState('');
  const [cargando, setCargando] = useState(true);
  const { agregar, items: cartItems } = useCart();

  useEffect(() => {
    const cargar = async () => {
      try {
        const [resCat, resProd] = await Promise.all([
          api.get('/api/categorias'),
          api.get('/api/productos')
        ]);
        const cats = resCat.data;
        setCategorias(cats);
        if (cats.length > 0) setActivo(cats[0].slug);
        setProductos(resProd.data);
      } catch (e) {
        console.error('Error al cargar datos:', e);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  const itemsPorCategoria = {};
  categorias.forEach(c => {
    const filtrados = productos.filter(p => p.categoria === c.slug);
    itemsPorCategoria[c.slug] = limitado ? filtrados.slice(0, 4) : filtrados;
  });

  const items = itemsPorCategoria[activo] || [];

  return (
    <section className="product-tabs">
      <div className="container">
        <h2 className="section-title">Nuestros Productos</h2>
        <p className="section-subtitle">
          Explora nuestra amplia gama de productos para tu vehículo
        </p>

        <div className="tabs-header">
          {categorias.map(({ slug, nombre, icono }) => {
            const Icon = resolveIcon(icono);
            return (
              <button
                key={slug}
                className={`tab-btn ${activo === slug ? 'active' : ''}`}
                onClick={() => setActivo(slug)}
              >
                <Icon className="tab-icon" />
                <span>{nombre}</span>
              </button>
            );
          })}
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
                      {(() => { const enCarrito = cartItems.find(i => i._id === producto._id); return enCarrito ? <span className="btn-buy-badge">{enCarrito.cantidad}</span> : null; })()}
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
