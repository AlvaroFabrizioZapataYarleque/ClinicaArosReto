import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { FaBox, FaWrench, FaTag, FaShoppingBag, FaUsers, FaDollarSign, FaCog } from 'react-icons/fa';
import '../styles/Admin.css';

const COLORS = ['#fcb900', '#005a87', '#00a86b', '#dc3545', '#6c757d'];

const AdminDashboard = () => {
  const [metricas, setMetricas] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await api.get('/api/admin/metricas', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMetricas(data);
      } catch (e) {
        console.error('Error al cargar métricas:', e);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  if (cargando) return <div className="admin-loading">Cargando dashboard...</div>;

  const datosMensuales = metricas?.pedidosPorMes?.map(p => ({
    mes: `${p._id.mes}/${p._id.anio}`.slice(0, 7),
    ingresos: p.total,
    pedidos: p.cantidad
  })) || [];

  const datosEstado = metricas?.pedidosPorEstado?.map(p => ({
    name: p._id,
    value: p.cantidad
  })) || [];

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1><FaCog /> Panel de Administración</h1>
        <p>Bienvenido al panel de control de Aros Reto</p>
      </div>

      <div className="admin-nav-links">
        <Link to="/admin/productos" className="admin-nav-card">
          <FaBox /> Gestionar Productos
        </Link>
        <Link to="/admin/servicios" className="admin-nav-card">
          <FaWrench /> Gestionar Servicios
        </Link>
        <Link to="/admin/promociones" className="admin-nav-card">
          <FaTag /> Gestionar Promociones
        </Link>
        <Link to="/admin/pedidos" className="admin-nav-card">
          <FaShoppingBag /> Ver Pedidos
        </Link>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <FaShoppingBag className="stat-icon" />
          <div>
            <span className="stat-value">{metricas?.pedidosMes || 0}</span>
            <span className="stat-label">Pedidos este mes</span>
          </div>
        </div>
        <div className="stat-card">
          <FaDollarSign className="stat-icon" />
          <div>
            <span className="stat-value">S/{metricas?.ingresosMes?.toFixed(2) || '0.00'}</span>
            <span className="stat-label">Ingresos del mes</span>
          </div>
        </div>
        <div className="stat-card">
          <FaShoppingBag className="stat-icon" />
          <div>
            <span className="stat-value">{metricas?.pedidosAnio || 0}</span>
            <span className="stat-label">Pedidos este año</span>
          </div>
        </div>
        <div className="stat-card">
          <FaDollarSign className="stat-icon" />
          <div>
            <span className="stat-value">S/{metricas?.ingresosAnio?.toFixed(2) || '0.00'}</span>
            <span className="stat-label">Ingresos del año</span>
          </div>
        </div>
      </div>

      <div className="admin-charts">
        <div className="chart-container">
          <h3>Pedidos por Mes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={datosMensuales}>
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="pedidos" fill="#005a87" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Ingresos por Mes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={datosMensuales}>
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ingresos" fill="#fcb900" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {datosEstado.length > 0 && (
          <div className="chart-container">
            <h3>Estado de Pedidos</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={datosEstado} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {datosEstado.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
