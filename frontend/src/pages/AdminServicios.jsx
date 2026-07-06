import { useState, useEffect } from 'react';
import api from '../api';
import { FaPlus, FaImage } from 'react-icons/fa';
import '../styles/Admin.css';

const CLOUD_NAME = 'snvgg8s7';
const UPLOAD_PRESET = 'Aros_Reto';

const AdminServicios = () => {
  const [servicios, setServicios] = useState([]);
  const [modal, setModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ nombre: '', tipo: 'reparacion', descripcion: '', precio: '', duracion: '', imagen: '' });

  const cargar = async () => {
    const { data } = await api.get('/api/servicios');
    setServicios(data);
  };

  useEffect(() => { cargar(); }, []);

  const abrirNuevo = () => {
    setEditando(null);
    setForm({ nombre: '', tipo: 'reparacion', descripcion: '', precio: '', duracion: '', imagen: '' });
    setModal(true);
  };

  const abrirEditar = (s) => {
    setEditando(s);
    setForm({ nombre: s.nombre, tipo: s.tipo, descripcion: s.descripcion, precio: s.precio, duracion: s.duracion, imagen: s.imagen || '' });
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
        await api.put(`/api/servicios/${editando._id}`, form, { headers });
      } else {
        await api.post('/api/servicios', form, { headers });
      }
      setModal(false);
      cargar();
    } catch (err) {
      alert('Error: ' + (err.response?.data?.mensaje || err.message));
    }
  };

  const eliminar = async (id) => {
    if (!window.confirm('¿Eliminar este servicio?')) return;
    const token = localStorage.getItem('token');
    await api.delete(`/api/servicios/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    cargar();
  };

  return (
    <div className="admin-crud">
      <div className="admin-crud-header">
        <h2>Gestionar Servicios</h2>
        <button className="btn-admin" onClick={abrirNuevo}><FaPlus /> Nuevo Servicio</button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Duración</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map(s => (
            <tr key={s._id}>
              <td>{s.imagen ? <img src={s.imagen} alt="" className="admin-img-thumb" /> : '—'}</td>
              <td>{s.nombre}</td>
              <td>{s.tipo}</td>
              <td>S/{s.precio}</td>
              <td>{s.duracion}</td>
              <td className="admin-table-actions">
                <button className="btn-edit" onClick={() => abrirEditar(s)}>Editar</button>
                <button className="btn-delete" onClick={() => eliminar(s._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal && (
        <div className="admin-modal-overlay" onClick={() => setModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <h3>{editando ? 'Editar Servicio' : 'Nuevo Servicio'}</h3>
            <form onSubmit={guardar} className="admin-form">
              <div className="form-group">
                <label>Nombre</label>
                <input value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Tipo</label>
                  <select value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })}>
                    <option value="reparacion">Reparación</option>
                    <option value="mantenimiento">Mantenimiento</option>
                    <option value="delivery">Delivery</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Precio (S/)</label>
                  <input type="number" value={form.precio} onChange={e => setForm({ ...form, precio: e.target.value })} required />
                </div>
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <textarea value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Duración</label>
                  <input value={form.duracion} onChange={e => setForm({ ...form, duracion: e.target.value })} placeholder="ej: 2 horas" />
                </div>
                <div className="form-group">
                  <label>Imagen</label>
                  <button type="button" className="btn-admin btn-admin-secondary" onClick={subirImagen} style={{ width: '100%', justifyContent: 'center' }}>
                    <FaImage /> {form.imagen ? 'Cambiar Imagen' : 'Subir Imagen'}
                  </button>
                  {form.imagen && <img src={form.imagen} alt="" className="admin-img-preview" style={{ marginTop: 8 }} />}
                </div>
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

export default AdminServicios;
