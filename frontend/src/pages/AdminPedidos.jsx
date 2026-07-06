import { useState, useEffect } from 'react';
import api from '../api';
import '../styles/Admin.css';

const AdminPedidos = () => {
  const [pedidos, setPedidos] = useState([]);

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
    const token = localStorage.getItem('token');
    await api.put(`/api/admin/pedidos/${id}`, { estado }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    cargar();
  };

  return (
    <div className="admin-crud">
      <div className="admin-crud-header">
        <h2>Pedidos Recibidos</h2>
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
                    <button className="btn-edit" onClick={() => cambiarEstado(p._id, 'confirmado')}>
                      Confirmar
                    </button>
                  )}
                  {p.estado === 'confirmado' && (
                    <button className="btn-edit" onClick={() => cambiarEstado(p._id, 'completado')}>
                      Completar
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
