import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { FaPlus, FaArrowLeft, FaSpinner } from 'react-icons/fa';
import '../styles/Admin.css';

const AdminCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [modal, setModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [togglendoId, setTogglendoId] = useState(null);
  const [form, setForm] = useState({ nombre: '', slug: '', icono: 'GiCarWheel', orden: 0 });

  const cargar = async () => {
    const token = localStorage.getItem('token');
    const { data } = await api.get('/api/categorias?_all=true', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setCategorias(data);
  };

  useEffect(() => { cargar(); }, []);

  const abrirNuevo = () => {
    setEditando(null);
    setForm({ nombre: '', slug: '', icono: 'GiCarWheel', orden: 0 });
    setModal(true);
  };

  const abrirEditar = (c) => {
    setEditando(c);
    setForm({ nombre: c.nombre, slug: c.slug, icono: c.icono, orden: c.orden });
    setModal(true);
  };

  const guardar = async (e) => {
    e.preventDefault();
    setCargando(true);
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    try {
      if (editando) {
        await api.put(`/api/categorias/${editando._id}`, form, { headers });
      } else {
        await api.post('/api/categorias', form, { headers });
      }
      setModal(false);
      cargar();
    } catch (err) {
      alert('Error: ' + (err.response?.data?.mensaje || err.message));
    } finally {
      setCargando(false);
    }
  };

  const toggleActivo = async (categoria) => {
    setTogglendoId(categoria._id);
    const token = localStorage.getItem('token');
    try {
      await api.put(`/api/categorias/${categoria._id}`, { activo: !categoria.activo }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      cargar();
    } catch (err) {
      alert('Error: ' + (err.response?.data?.mensaje || err.message));
    } finally {
      setTogglendoId(null);
    }
  };

  return (
    <div className="admin-crud">
      <div className="admin-crud-header">
        <div className="admin-crud-header-left">
          <Link to="/admin" className="btn-back">
            <FaArrowLeft />
          </Link>
          <h2>Gestionar Categorías</h2>
        </div>
        <button className="btn-admin" onClick={abrirNuevo}><FaPlus /> Nueva Categoría</button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Orden</th>
            <th>Nombre</th>
            <th>Slug</th>
            <th>Icono</th>
            <th>Estado</th>
            <th>Activar</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map(c => (
            <tr key={c._id}>
              <td>{c.orden}</td>
              <td><strong>{c.nombre}</strong></td>
              <td><code>{c.slug}</code></td>
              <td>{c.icono}</td>
              <td><span className={`estado-badge ${c.activo ? 'estado-completado' : 'estado-cancelado'}`}>{c.activo ? 'Activo' : 'Inactivo'}</span></td>
              <td>
                <label className="toggle-switch">
                  <input type="checkbox" checked={c.activo} onChange={() => toggleActivo(c)} disabled={togglendoId === c._id} />
                  <span className="toggle-slider" />
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal && (
        <div className="admin-modal-overlay" onClick={() => setModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <h3>{editando ? 'Editar Categoría' : 'Nueva Categoría'}</h3>
            <form onSubmit={guardar} className="admin-form">
              <div className="form-group">
                <label>Nombre</label>
                <input value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required placeholder="Ej: Aros" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Slug</label>
                  <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required placeholder="Ej: aros" />
                </div>
                <div className="form-group">
                  <label>Orden</label>
                  <input type="number" value={form.orden} onChange={e => setForm({ ...form, orden: Number(e.target.value) })} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Icono</label>
                  <select value={form.icono} onChange={e => setForm({ ...form, icono: e.target.value })}>
                    <option value="GiCarWheel">Aro (GiCarWheel)</option>
                    <option value="GiTireTracks">Llanta (GiTireTracks)</option>
                    <option value="HiOutlineSparkles">Accesorio (HiOutlineSparkles)</option>
                    <option value="FaWrench">Llave (FaWrench)</option>
                    <option value="FaTools">Herramientas (FaTools)</option>
                    <option value="FaTruck">Camión (FaTruck)</option>
                    <option value="FaBox">Caja (FaBox)</option>
                    <option value="FaCog">Engranaje (FaCog)</option>
                    <option value="FaStar">Estrella (FaStar)</option>
                    <option value="FaGift">Regalo (FaGift)</option>
                  </select>
                </div>
                <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: 10 }}>
                  <label style={{ display: 'block', marginBottom: 6 }}>Vista previa</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', border: '2px solid rgba(0,90,135,0.15)', borderRadius: 8 }}>
                    <span style={{ fontSize: '1.3rem', color: 'var(--primary)' }}>{form.icono}</span>
                    <span style={{ fontWeight: 600, color: 'var(--secondary)' }}>{form.nombre || '—'}</span>
                  </div>
                </div>
              </div>
              <div className="admin-modal-buttons">
                <button type="button" className="btn-admin btn-admin-secondary" onClick={() => setModal(false)}>Cancelar</button>
                <button type="submit" className="btn-admin" disabled={cargando}>
                  {cargando ? <><FaSpinner className="fa-spin" /> {editando ? 'Actualizando...' : 'Creando...'}</> : (editando ? 'Actualizar' : 'Crear')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategorias;
