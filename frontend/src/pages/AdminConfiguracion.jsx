import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { FaArrowLeft, FaSave, FaSpinner, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaWhatsapp, FaInfoCircle } from 'react-icons/fa';
import '../styles/Admin.css';

const AdminConfiguracion = () => {
  const [form, setForm] = useState({ direccion: '', telefonos: '', email: '', horario: '', lat: '', lng: '', facebook: '', instagram: '', whatsapp: '', descripcion: '' });
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    api.get('/api/configuracion')
      .then(({ data }) => setForm(data))
      .catch(() => {})
      .finally(() => setCargando(false));
  }, []);

  const guardar = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setMensaje('');
    try {
      await api.put('/api/configuracion', form);
      window.dispatchEvent(new Event('config-updated'));
      setMensaje('Configuración actualizada correctamente');
    } catch (err) {
      alert('Error: ' + (err.response?.data?.mensaje || err.message));
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) return <div className="admin-loading"><FaSpinner className="fa-spin" /> Cargando...</div>;

  return (
    <div className="admin-crud">
      <div className="admin-crud-header">
        <div className="admin-crud-header-left">
          <Link to="/admin" className="btn-back">
            <FaArrowLeft />
          </Link>
          <h2>Configuración del Sitio</h2>
        </div>
      </div>

      {mensaje && <div className="perfil-mensaje perfil-mensaje-exito" style={{ marginBottom: 20 }}>{mensaje}</div>}

      <form onSubmit={guardar} className="admin-form" style={{ maxWidth: 700, margin: '0 auto', background: 'white', padding: 32, borderRadius: 12, boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ marginBottom: 20, color: 'var(--secondary)' }}><FaInfoCircle /> Información de la Empresa</h3>

        <div className="form-group">
          <label><FaInfoCircle /> Descripción</label>
          <textarea value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} rows={3} placeholder="Descripción breve de la empresa" />
        </div>

        <h3 style={{ margin: '24px 0 16px', color: 'var(--secondary)' }}><FaMapMarkerAlt /> Contacto</h3>

        <div className="form-group">
          <label><FaMapMarkerAlt /> Dirección</label>
          <input value={form.direccion} onChange={e => setForm({ ...form, direccion: e.target.value })} placeholder="Av. Ejemplo 123, Lima" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label><FaPhone /> Teléfonos</label>
            <input value={form.telefonos} onChange={e => setForm({ ...form, telefonos: e.target.value })} placeholder="(511) 123 4567 – 999 888 777" />
          </div>
          <div className="form-group">
            <label><FaEnvelope /> Email</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="contacto@ejemplo.com" />
          </div>
        </div>
        <div className="form-group">
          <label><FaClock /> Horario de Atención</label>
          <input value={form.horario} onChange={e => setForm({ ...form, horario: e.target.value })} placeholder="Lun-Sab: 8:00am - 7:00pm" />
        </div>

        <h3 style={{ margin: '24px 0 16px', color: 'var(--secondary)' }}><FaMapMarkerAlt /> Ubicación (Mapa)</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Latitud</label>
            <input type="number" step="any" value={form.lat} onChange={e => setForm({ ...form, lat: e.target.value })} placeholder="-12.2025" />
          </div>
          <div className="form-group">
            <label>Longitud</label>
            <input type="number" step="any" value={form.lng} onChange={e => setForm({ ...form, lng: e.target.value })} placeholder="-76.9500" />
          </div>
        </div>

        <h3 style={{ margin: '24px 0 16px', color: 'var(--secondary)' }}>Redes Sociales</h3>
        <div className="form-row">
          <div className="form-group">
            <label><FaFacebook /> Facebook (URL completa)</label>
            <input value={form.facebook} onChange={e => setForm({ ...form, facebook: e.target.value })} placeholder="https://facebook.com/tu-pagina" />
          </div>
          <div className="form-group">
            <label><FaInstagram /> Instagram (URL completa)</label>
            <input value={form.instagram} onChange={e => setForm({ ...form, instagram: e.target.value })} placeholder="https://instagram.com/tu-perfil" />
          </div>
        </div>
        <div className="form-group">
          <label><FaWhatsapp /> WhatsApp (número sin +)</label>
          <input value={form.whatsapp} onChange={e => setForm({ ...form, whatsapp: e.target.value })} placeholder="51934096012" />
        </div>

        <div className="admin-modal-buttons" style={{ marginTop: 24 }}>
          <button type="submit" className="btn-admin" disabled={guardando}>
            {guardando ? <><FaSpinner className="fa-spin" /> Guardando...</> : <><FaSave /> Guardar Cambios</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminConfiguracion;
