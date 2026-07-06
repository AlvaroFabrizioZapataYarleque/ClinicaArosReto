import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { FaPlus, FaImage, FaArrowLeft, FaSpinner } from 'react-icons/fa';
import '../styles/Admin.css';

const CLOUD_NAME = 'snvgg8s7';
const UPLOAD_PRESET = 'Aros_Reto';

const AdminPromociones = () => {
  const [promociones, setPromociones] = useState([]);
  const [modal, setModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [togglendoId, setTogglendoId] = useState(null);
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [form, setForm] = useState({ titulo: '', descripcion: '', descuento: '', codigo: '', imagen: '' });

  const cargar = async () => {
    const { data } = await api.get('/api/promociones?_all=true');
    setPromociones(data);
  };

  useEffect(() => { cargar(); }, []);

  const abrirNuevo = () => {
    setEditando(null);
    setForm({ titulo: '', descripcion: '', descuento: '', codigo: '', imagen: '' });
    setModal(true);
  };

  const abrirEditar = (p) => {
    setEditando(p);
    setForm({ titulo: p.titulo, descripcion: p.descripcion, descuento: p.descuento, codigo: p.codigo, imagen: p.imagen || '' });
    setModal(true);
  };

  const subirImagen = () => {
    setSubiendoImagen(true);
    const widget = window.cloudinary?.createUploadWidget(
      { cloudName: CLOUD_NAME, uploadPreset: UPLOAD_PRESET, cropping: true },
      (err, result) => {
        setSubiendoImagen(false);
        if (!err && result.event === 'success') {
          setForm(prev => ({ ...prev, imagen: result.info.secure_url }));
        }
      }
    );
    widget?.open();
  };

  const guardar = async (e) => {
    e.preventDefault();
    setCargando(true);
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    try {
      if (editando) {
        await api.put(`/api/promociones/${editando._id}`, form, { headers });
      } else {
        await api.post('/api/promociones', form, { headers });
      }
      setModal(false);
      cargar();
    } catch (err) {
      alert('Error: ' + (err.response?.data?.mensaje || err.message));
    } finally {
      setCargando(false);
    }
  };

  const toggleVigente = async (promo) => {
    setTogglendoId(promo._id);
    const token = localStorage.getItem('token');
    try {
      await api.put(`/api/promociones/${promo._id}`, { vigente: !promo.vigente }, {
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
          <h2>Gestionar Promociones</h2>
        </div>
        <button className="btn-admin" onClick={abrirNuevo}><FaPlus /> Nueva Promoción</button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Título</th>
            <th>Código</th>
            <th>Descuento</th>
            <th>Estado</th>
            <th>Editar</th>
            <th>Activar</th>
          </tr>
        </thead>
        <tbody>
          {promociones.map(p => (
            <tr key={p._id}>
              <td>{p.imagen ? <img src={p.imagen} alt="" className="admin-img-thumb" /> : '—'}</td>
              <td>{p.titulo}</td>
              <td><strong>{p.codigo}</strong></td>
              <td>{p.descuento}%</td>
              <td><span className={`estado-badge ${p.vigente ? 'estado-completado' : 'estado-cancelado'}`}>{p.vigente ? 'Activo' : 'Inactivo'}</span></td>
              <td><button className="btn-edit" onClick={() => abrirEditar(p)}>Editar</button></td>
              <td>
                <label className="toggle-switch">
                  <input type="checkbox" checked={p.vigente} onChange={() => toggleVigente(p)} disabled={togglendoId === p._id} />
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
            <h3>{editando ? 'Editar Promoción' : 'Nueva Promoción'}</h3>
            <form onSubmit={guardar} className="admin-form">
              <div className="form-group">
                <label>Título</label>
                <input value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <textarea value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Descuento (%)</label>
                  <input type="number" value={form.descuento} onChange={e => setForm({ ...form, descuento: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Código</label>
                  <input value={form.codigo} onChange={e => setForm({ ...form, codigo: e.target.value })} required />
                </div>
              </div>
              <div className="form-group">
                <label>Imagen</label>
                  <button type="button" className="btn-admin btn-admin-secondary" onClick={subirImagen} disabled={subiendoImagen} style={{ width: '100%', justifyContent: 'center' }}>
                    {subiendoImagen ? <><FaSpinner className="fa-spin" /> Subiendo...</> : <><FaImage /> {form.imagen ? 'Cambiar Imagen' : 'Subir Imagen'}</>}
                  </button>
                  {subiendoImagen ? (
                    <div className="admin-img-preview" style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f0f0' }}>
                      <FaSpinner className="fa-spin" style={{ fontSize: '1.5rem', color: 'var(--primary)' }} />
                    </div>
                  ) : form.imagen ? (
                    <img src={form.imagen} alt="" className="admin-img-preview" style={{ marginTop: 8 }} />
                  ) : null}
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

export default AdminPromociones;
