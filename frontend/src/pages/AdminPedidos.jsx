import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { FaArrowLeft, FaSpinner } from 'react-icons/fa';
import '../styles/Admin.css';

const AdminPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [cargandoId, setCargandoId] = useState(null);

  const cargar = async () => {
    const token = localStorage.getItem('token');
    try {
      const { data } = await api.get('/api/admin/pedidos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPedidos(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { cargar(); }, []);

  const cambiarEstado = async (id, estado) => {
    setCargandoId(id);
    const token = localStorage.getItem('token');
    try {
      await api.put(`/api/admin/pedidos/${id}`, { estado }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      cargar();
    } catch (e) {
      console.error(e);
    } finally {
      setCargandoId(null);
    }
  };

  return (
    <div className="admin-crud">
      <div className="admin-crud-header">
        <div className="admin-crud-header-left">
          <Link to="/admin" className="btn-back">
            <FaArrowLeft />
          </Link>
          <h2>Pedidos Recibidos</h2>
        </div>
      </div>

      {pedidos.length === 0 ? (
        <div className="admin-empty">No hay pedidos aún</div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map(p => (
              <tr key={p._id}>
                <td>{new Date(p.fechaPedido).toLocaleDateString()}</td>
                <td>{p.nombre}</td>
                <td>{p.email}</td>
                <td>{p.telefono}</td>
                <td><strong>S/{p.total.toFixed(2)}</strong></td>
                <td>
                  <span className={`estado-badge estado-${p.estado}`}>{p.estado}</span>
                </td>
                <td className="admin-table-actions">
                  {p.estado === 'pendiente' && (
                    <button className="btn-edit" onClick={() => cambiarEstado(p._id, 'confirmado')} disabled={cargandoId === p._id}>
                      {cargandoId === p._id ? <><FaSpinner className="fa-spin" /> Procesando</> : 'Confirmar'}
                    </button>
                  )}
                  {p.estado === 'confirmado' && (
                    <button className="btn-edit" onClick={() => cambiarEstado(p._id, 'completado')} disabled={cargandoId === p._id}>
                      {cargandoId === p._id ? <><FaSpinner className="fa-spin" /> Procesando</> : 'Completar'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPedidos;
