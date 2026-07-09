import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { FaPlus, FaImage, FaArrowLeft, FaSpinner } from 'react-icons/fa';
import '../styles/Admin.css';

const CLOUD_NAME = 'snvgg8s7';
const UPLOAD_PRESET = 'Aros_Reto';

const AdminServicios = () => {
  const [servicios, setServicios] = useState([]);
  const [modal, setModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [togglendoId, setTogglendoId] = useState(null);
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [form, setForm] = useState({ nombre: '', tipo: 'reparacion', descripcion: '', precio: '', duracion: '', imagen: '' });

  const cargar = async () => {
    const { data } = await api.get('/api/servicios?_all=true');
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
        await api.put(`/api/servicios/${editando._id}`, form, { headers });
      } else {
        await api.post('/api/servicios', form, { headers });
      }
      setModal(false);
      cargar();
    } catch (err) {
      alert('Error: ' + (err.response?.data?.mensaje || err.message));
    } finally {
      setCargando(false);
    }
  };

  const toggleDisponible = async (servicio) => {
    setTogglendoId(servicio._id);
    const token = localStorage.getItem('token');
    try {
      await api.put(`/api/servicios/${servicio._id}`, { disponible: !servicio.disponible }, {
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
          <h2>Gestionar Servicios</h2>
        </div>
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
            <th>Estado</th>
            <th>Editar</th>
            <th>Activar</th>
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
              <td><span className={`estado-badge ${s.disponible !== false ? 'estado-completado' : 'estado-cancelado'}`}>{s.disponible !== false ? 'Activo' : 'Inactivo'}</span></td>
              <td><button className="btn-edit" onClick={() => abrirEditar(s)}>Editar</button></td>
              <td>
                <label className="toggle-switch">
                  <input type="checkbox" checked={s.disponible !== false} onChange={() => toggleDisponible(s)} disabled={togglendoId === s._id} />
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

export default AdminServicios;
