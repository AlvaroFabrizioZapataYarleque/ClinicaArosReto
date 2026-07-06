import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { FaArrowLeft, FaSpinner } from 'react-icons/fa';
import '../styles/Admin.css';

const AdminSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [cargandoId, setCargandoId] = useState(null);

  const cargar = async () => {
    const token = localStorage.getItem('token');
    try {
      const { data } = await api.get('/api/solicitudes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSolicitudes(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { cargar(); }, []);

  const cambiarEstado = async (id, estado) => {
    setCargandoId(id);
    const token = localStorage.getItem('token');
    try {
      await api.put(`/api/solicitudes/${id}`, { estado }, {
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
          <h2>Solicitudes de Servicio</h2>
        </div>
      </div>

      {solicitudes.length === 0 ? (
        <div className="admin-empty">No hay solicitudes de servicio aún</div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Servicio</th>
              <th>Nombre</th>
              <th>Empresa</th>
              <th>Detalles</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map(s => (
              <tr key={s._id}>
                <td style={{ whiteSpace: 'nowrap' }}>{new Date(s.createdAt).toLocaleDateString()}</td>
                <td>{s.servicioId?.nombre || '—'}</td>
                <td>{s.nombre}</td>
                <td>{s.empresa || '—'}</td>
                <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={s.detalles}>
                  {s.detalles}
                </td>
                <td>
                  <span className={`estado-badge estado-${s.estado}`}>{s.estado}</span>
                </td>
                <td className="admin-table-actions">
                  {s.estado === 'pendiente' && (
                    <button className="btn-edit" onClick={() => cambiarEstado(s._id, 'en_proceso')} disabled={cargandoId === s._id}>
                      {cargandoId === s._id ? <><FaSpinner className="fa-spin" /> Procesando</> : 'Iniciar'}
                    </button>
                  )}
                  {s.estado === 'en_proceso' && (
                    <button className="btn-edit" onClick={() => cambiarEstado(s._id, 'completado')} disabled={cargandoId === s._id}>
                      {cargandoId === s._id ? <><FaSpinner className="fa-spin" /> Procesando</> : 'Completar'}
                    </button>
                  )}
                  {(s.estado === 'pendiente' || s.estado === 'en_proceso') && (
                    <button className="btn-delete" onClick={() => cambiarEstado(s._id, 'cancelado')} disabled={cargandoId === s._id}>
                      {cargandoId === s._id ? <><FaSpinner className="fa-spin" /> Cancelando</> : 'Cancelar'}
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

export default AdminSolicitudes;
