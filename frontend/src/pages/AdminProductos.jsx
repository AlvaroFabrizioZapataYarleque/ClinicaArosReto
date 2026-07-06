import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { FaPlus, FaImage, FaArrowLeft, FaSpinner } from 'react-icons/fa';
import '../styles/Admin.css';

const CLOUD_NAME = 'snvgg8s7';
const UPLOAD_PRESET = 'Aros_Reto';

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [modal, setModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [eliminando, setEliminando] = useState(null);
  const [form, setForm] = useState({ nombre: '', categoria: 'aros', descripcion: '', precio: '', marca: '', medidas: '', stock: '', imagen: '' });

  const cargar = async () => {
    const { data } = await api.get('/api/productos');
    setProductos(data);
  };

  useEffect(() => { cargar(); }, []);

  const abrirNuevo = () => {
    setEditando(null);
    setForm({ nombre: '', categoria: 'aros', descripcion: '', precio: '', marca: '', medidas: '', stock: '', imagen: '' });
    setModal(true);
  };

  const abrirEditar = (p) => {
    setEditando(p);
    setForm({ nombre: p.nombre, categoria: p.categoria, descripcion: p.descripcion, precio: p.precio, marca: p.marca, medidas: p.medidas, stock: p.stock, imagen: p.imagen || '' });
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
    setCargando(true);
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    try {
      if (editando) {
        await api.put(`/api/productos/${editando._id}`, form, { headers });
      } else {
        await api.post('/api/productos', form, { headers });
      }
      setModal(false);
      cargar();
    } catch (err) {
      alert('Error: ' + (err.response?.data?.mensaje || err.message));
    } finally {
      setCargando(false);
    }
  };

  const eliminar = async (id) => {
    if (!window.confirm('¿Eliminar este producto?')) return;
    setEliminando(id);
    const token = localStorage.getItem('token');
    try {
      await api.delete(`/api/productos/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      cargar();
    } catch (err) {
      alert('Error: ' + (err.response?.data?.mensaje || err.message));
    } finally {
      setEliminando(null);
    }
  };

  return (
    <div className="admin-crud">
      <div className="admin-crud-header">
        <div className="admin-crud-header-left">
          <Link to="/admin" className="btn-back">
            <FaArrowLeft />
          </Link>
          <h2>Gestionar Productos</h2>
        </div>
        <button className="btn-admin" onClick={abrirNuevo}><FaPlus /> Nuevo Producto</button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p._id}>
              <td>{p.imagen ? <img src={p.imagen} alt="" className="admin-img-thumb" /> : '—'}</td>
              <td>{p.nombre}</td>
              <td>{p.categoria}</td>
              <td>S/{p.precio}</td>
              <td>{p.stock}</td>
              <td className="admin-table-actions">
                <button className="btn-edit" onClick={() => abrirEditar(p)}>Editar</button>
                <button className="btn-delete" onClick={() => eliminar(p._id)} disabled={eliminando === p._id}>
                  {eliminando === p._id ? <><FaSpinner className="fa-spin" /> Eliminando</> : 'Eliminar'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal && (
        <div className="admin-modal-overlay" onClick={() => setModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <h3>{editando ? 'Editar Producto' : 'Nuevo Producto'}</h3>
            <form onSubmit={guardar} className="admin-form">
              <div className="form-group">
                <label>Nombre</label>
                <input value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Categoría</label>
                  <select value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })}>
                    <option value="aros">Aros</option>
                    <option value="llantas">Llantas</option>
                    <option value="accesorios">Accesorios</option>
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
                  <label>Marca</label>
                  <input value={form.marca} onChange={e => setForm({ ...form, marca: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Medidas</label>
                  <input value={form.medidas} onChange={e => setForm({ ...form, medidas: e.target.value })} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Stock</label>
                  <input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
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

export default AdminProductos;
