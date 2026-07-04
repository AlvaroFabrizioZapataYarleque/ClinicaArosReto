// ═══════════════════════════════════════════════════════════════
// pages/Inicio.jsx — LANDING PAGE (PÁGINA PRINCIPAL)
//
// Página de inicio de la aplicación. Compone las secciones:
//   1. Hero       → Banner principal con estadísticas
//   2. ProductTabs → Productos destacados (limitado a 4 por tab)
//   3. Services   → Tarjetas de servicios
//   4. Promotions → Promociones destacadas
//
// Es la ruta "/" y la primera impresión del usuario.
// ═══════════════════════════════════════════════════════════════

import Hero from '../components/Hero';
import ProductTabs from '../components/ProductTabs';
import ServicesSection from '../components/ServicesSection';
import PromotionsSection from '../components/PromotionsSection';

const Inicio = () => {
  return (
    <>
      <Hero />                        {/* Banner principal full-screen */}
      <ProductTabs limitado={true} />  {/* Solo 4 productos por categoría */}
      <ServicesSection />             {/* 3 tarjetas de servicios */}
      <PromotionsSection />           {/* 3 promociones destacadas */}
    </>
  );
};

export default Inicio;
