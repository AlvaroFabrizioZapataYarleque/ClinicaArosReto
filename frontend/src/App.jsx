// ═══════════════════════════════════════════════════════════════
// App.jsx — COMPONENTE RAÍZ
//
// Define la estructura principal de la aplicación:
//   • Navbar   → Barra de navegación fija
//   • <Routes> → Contenido dinámico según la ruta
//   • Footer   → Pie de página
//
// El Navbar y Footer se renderizan en TODAS las páginas.
// El contenido cambia según la ruta usando React Router.
// ═══════════════════════════════════════════════════════════════

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Productos from './pages/Productos';
import Servicios from './pages/Servicios';
import Promociones from './pages/Promociones';
import Nosotros from './pages/Nosotros';
import Login from './pages/Login';
import Registro from './pages/Registro';

function App() {
  return (
    <>
      <Navbar />                    {/* Siempre visible en todas las rutas */}
      <main>
        <Routes>                    {/* React Router renderiza SOLO la ruta activa */}
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/promociones" element={<Promociones />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </main>
      <Footer />                    {/* Siempre visible en todas las rutas */}
    </>
  );
}

export default App;
