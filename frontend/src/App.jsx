import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartPanel from './components/CartPanel';
import AdminRoute from './components/AdminRoute';
import Inicio from './pages/Inicio';
import Productos from './pages/Productos';
import Servicios from './pages/Servicios';
import Promociones from './pages/Promociones';
import Nosotros from './pages/Nosotros';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Perfil from './pages/Perfil';
import Carrito from './pages/Carrito';
import AdminDashboard from './pages/AdminDashboard';
import AdminProductos from './pages/AdminProductos';
import AdminServicios from './pages/AdminServicios';
import AdminPromociones from './pages/AdminPromociones';
import AdminPedidos from './pages/AdminPedidos';
import AdminSolicitudes from './pages/AdminSolicitudes';
import AdminCategorias from './pages/AdminCategorias';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <CartPanel />
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/promociones" element={<Promociones />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/productos" element={<AdminRoute><AdminProductos /></AdminRoute>} />
          <Route path="/admin/servicios" element={<AdminRoute><AdminServicios /></AdminRoute>} />
          <Route path="/admin/promociones" element={<AdminRoute><AdminPromociones /></AdminRoute>} />
          <Route path="/admin/pedidos" element={<AdminRoute><AdminPedidos /></AdminRoute>} />
          <Route path="/admin/solicitudes" element={<AdminRoute><AdminSolicitudes /></AdminRoute>} />
          <Route path="/admin/categorias" element={<AdminRoute><AdminCategorias /></AdminRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
