import { useState, useEffect } from 'react';
import api from '../api';
import { FaPlus, FaImage } from 'react-icons/fa';
import '../styles/Admin.css';

const CLOUD_NAME = 'snvgg8s7';
const UPLOAD_PRESET = 'Aros_Reto';

const AdminPromociones = () => {
  const [promociones, setPromociones] = useState([]);
  const [modal, setModal] = useState(false);
  const [editando, setEditando] = useState(null);
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
    const widget = window.cloudinary?.createUploadWidget(
      { cloudName: CLOUD_NAME, uploadPreset: UPLOAD_PRESET, cropping: true },
      (err, result) => {
        if (!err && result.event === 'success') {
          setForm(prev => ({ ...prev, imagen: result.info.secure_url }));
        }
      }
    );
    widget?.open();
  };

  const guardar = async (e) => {
    e.preventDefault();
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
    }
  };

  const eliminar = async (id) => {
    if (!window.confirm('¿Eliminar esta promoción?')) return;
    const token = localStorage.getItem('token');
    await api.delete(`/api/promociones/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    cargar();
  };

  return (
    <div className="admin-crud">
      <div className="admin-crud-header">
        <h2>Gestionar Promociones</h2>
        <button className="btn-admin" onClick={abrirNuevo}><FaPlus /> Nueva Promoción</button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Título</th>
            <th>Código</th>
            <th>Descuento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {promociones.map(p => (
            <tr key={p._id}>
              <td>{p.imagen ? <img src={p.imagen} alt="" className="admin-img-thumb" /> : '—'}</td>
              <td>{p.titulo}</td>
              <td><strong>{p.codigo}</strong></td>
              <td>{p.descuento}%</td>
              <td className="admin-table-actions">
                <button className="btn-edit" onClick={() => abrirEditar(p)}>Editar</button>
                <button className="btn-delete" onClick={() => eliminar(p._id)}>Eliminar</button>
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
                <button type="button" className="btn-admin btn-admin-secondary" onClick={subirImagen} style={{ width: '100%', justifyContent: 'center' }}>
                  <FaImage /> {form.imagen ? 'Cambiar Imagen' : 'Subir Imagen'}
                </button>
                {form.imagen && <img src={form.imagen} alt="" className="admin-img-preview" style={{ marginTop: 8 }} />}
              </div>
              <div className="admin-modal-buttons">
                <button type="button" className="btn-admin btn-admin-secondary" onClick={() => setModal(false)}>Cancelar</button>
                <button type="submit" className="btn-admin">{editando ? 'Actualizar' : 'Crear'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPromociones;
