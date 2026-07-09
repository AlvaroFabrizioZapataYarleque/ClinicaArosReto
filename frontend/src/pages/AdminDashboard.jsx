import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { FaBox, FaWrench, FaTag, FaShoppingBag, FaDollarSign, FaCog, FaClipboardList, FaThLarge } from 'react-icons/fa';
import '../styles/Admin.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

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

  const datosMensuales = metricas?.pedidosPorMes || [];
  const labels = datosMensuales.map(p => `${p._id.mes}/${p._id.anio}`.slice(0, 7));

  const dataPedidos = {
    labels,
    datasets: [{
      label: 'Pedidos',
      data: datosMensuales.map(p => p.cantidad),
      backgroundColor: '#005a87',
      borderRadius: 4
    }]
  };

  const dataIngresos = {
    labels,
    datasets: [{
      label: 'Ingresos (S/)',
      data: datosMensuales.map(p => p.total),
      backgroundColor: '#fcb900',
      borderRadius: 4
    }]
  };

  const datosEstado = metricas?.pedidosPorEstado || [];
  const dataEstado = {
    labels: datosEstado.map(p => p._id),
    datasets: [{
      data: datosEstado.map(p => p.cantidad),
      backgroundColor: COLORS.slice(0, datosEstado.length),
      borderWidth: 0
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  };

  const optionsPie = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } }
  };

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
        <Link to="/admin/solicitudes" className="admin-nav-card">
          <FaClipboardList /> Solicitudes de Servicio
        </Link>
        <Link to="/admin/categorias" className="admin-nav-card">
          <FaThLarge /> Gestionar Categorías
        </Link>
        <Link to="/admin/configuracion" className="admin-nav-card">
          <FaCog /> Configuración del Sitio
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
          <div style={{ height: 300 }}>
            <Bar data={dataPedidos} options={options} />
          </div>
        </div>

        <div className="chart-container">
          <h3>Ingresos por Mes</h3>
          <div style={{ height: 300 }}>
            <Bar data={dataIngresos} options={options} />
          </div>
        </div>

        {datosEstado.length > 0 && (
          <div className="chart-container">
            <h3>Estado de Pedidos</h3>
            <div style={{ height: 300, display: 'flex', justifyContent: 'center' }}>
              <Pie data={dataEstado} options={optionsPie} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
