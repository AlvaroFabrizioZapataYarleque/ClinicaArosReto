// ═══════════════════════════════════════════════════════════════
// pages/Productos.jsx — PÁGINA DE PRODUCTOS
//
// Muestra el catálogo completo con todas las categorías.
// Header con gradiente azul + título.
// Usa el componente ProductTabs sin límite (todos los productos).
// ═══════════════════════════════════════════════════════════════

import ProductTabs from '../components/ProductTabs';

const Productos = () => {
  return (
    <div style={{ paddingTop: '70px' }}>   {/* Compensa el Navbar fixed */}
      {/* Header de la página con gradiente azul */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Productos</h1>
          <p className="page-subtitle">
            Encuentra los mejores aros, llantas y accesorios para tu vehículo
          </p>
        </div>
      </div>
      {/* Todos los productos (sin limitado) */}
      <ProductTabs />
    </div>
  );
};

export default Productos;
