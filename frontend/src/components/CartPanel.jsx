import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { FaTrash, FaPlus, FaMinus, FaWhatsapp, FaTimes, FaShoppingCart, FaSpinner, FaTruck, FaStore } from 'react-icons/fa';
import './CartPanel.css';

const TELEFONO = '51935430323'; // Número de WhatsApp del negocio

const CartPanel = () => {
  const { items, eliminar, actualizarCantidad, totalPrecio, limpiar, panelAbierto, cerrarPanel } = useCart();
  const { usuario } = useAuth();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', dni: '', direccion: '', tipoEntrega: 'recojo', direccionDelivery: '' });
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');

  const abrirFormulario = () => {
    setError('');
    if (usuario) {
      setForm({
        nombre: usuario.nombre || '',
        email: usuario.email || '',
        telefono: usuario.telefono || '',
        dni: usuario.dni || '',
        direccion: usuario.direccion || '',
        tipoEntrega: 'recojo',
        direccionDelivery: ''
      });
    } else {
      setForm({ nombre: '', email: '', telefono: '', dni: '', direccion: '', tipoEntrega: 'recojo', direccionDelivery: '' });
    }
    setMostrarForm(true);
  };

  const generarMensaje = () => {
    let msg = '🛒 *Nuevo Pedido - Aros Reto*%0A%0A';
    msg += '*Productos:*%0A';
    items.forEach(i => {
      msg += `\u2022 ${i.nombre} x${i.cantidad} = S/${(i.precio * i.cantidad).toFixed(2)}%0A`;
    });
    msg += `%0A*Total: S/${totalPrecio.toFixed(2)}*%0A%0A`;
    msg += '*Datos del cliente:*%0A';
    msg += `Nombre: ${form.nombre}%0A`;
    msg += `DNI: ${form.dni}%0A`;
    msg += `Email: ${form.email}%0A`;
    msg += `Tel\u00e9fono: ${form.telefono}%0A`;
    msg += `Tipo de entrega: ${form.tipoEntrega === 'delivery' ? 'Delivery' : 'Recojo en tienda'}%0A`;
    if (form.tipoEntrega === 'delivery') msg += `Direcci\u00f3n de delivery: ${form.direccionDelivery}%0A`;
    else if (form.direccion) msg += `Direcci\u00f3n: ${form.direccion}%0A`;
    return msg;
  };

  const validarForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Ingresa un email válido');
      return false;
    }
    if (!/^\d{8}$/.test(form.dni)) {
      setError('El DNI debe tener exactamente 8 dígitos numéricos');
      return false;
    }
    const soloDigitos = form.telefono.replace(/\D/g, '');
    if (soloDigitos.length < 7 || soloDigitos.length > 12) {
      setError('El teléfono debe tener entre 7 y 12 dígitos');
      return false;
    }
    if (form.tipoEntrega === 'delivery' && !form.direccionDelivery.trim()) {
      setError('Ingresa la dirección de delivery');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validarForm()) return;
    setEnviando(true);
    try {
      await api.post('/api/pedidos', {
        items: items.map(i => ({ productoId: i._id, nombre: i.nombre, precio: i.precio, cantidad: i.cantidad })),
        total: totalPrecio,
        nombre: form.nombre,
        email: form.email,
        telefono: form.telefono,
        dni: form.dni,
        direccion: form.direccion,
        tipoEntrega: form.tipoEntrega,
        direccionDelivery: form.direccionDelivery
      });
      const msg = generarMensaje();
      window.open(`https://wa.me/${TELEFONO}?text=${msg}`, '_blank');
      limpiar();
      setMostrarForm(false);
      cerrarPanel();
    } catch (err) {
      alert('Error al procesar pedido: ' + (err.response?.data?.mensaje || err.message));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      <div className={`cart-panel-overlay ${panelAbierto ? 'active' : ''}`} onClick={cerrarPanel}>
      <div className={`cart-panel ${panelAbierto ? 'active' : ''}`} onClick={e => e.stopPropagation()}>
        <div className="cart-panel-header">
          <h2><FaShoppingCart /> Carrito</h2>
          <button className="cart-panel-close" onClick={cerrarPanel}>
            <FaTimes />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-panel-empty">
            <FaShoppingCart className="empty-icon" />
            <p>Tu carrito esta vacío</p>
          </div>
        ) : (
          <>
            <div className="cart-panel-items">
              {items.map(item => (
                <div key={item._id} className="cart-panel-item">
                  {item.imagen && <img src={item.imagen} alt="" className="cart-panel-item-img" />}
                  <div className="cart-panel-item-info">
                    <h4>{item.nombre}</h4>
                    <p className="cart-panel-item-precio">S/{item.precio.toFixed(2)}</p>
                  </div>
                  <div className="cart-panel-item-cantidad">
                    <button onClick={() => actualizarCantidad(item._id, item.cantidad - 1)}><FaMinus /></button>
                    <span>{item.cantidad}</span>
                    <button onClick={() => actualizarCantidad(item._id, item.cantidad + 1)}><FaPlus /></button>
                  </div>
                  <div className="cart-panel-item-subtotal">
                    S/{(item.precio * item.cantidad).toFixed(2)}
                  </div>
                  <button className="cart-panel-item-eliminar" onClick={() => eliminar(item._id)}>
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-panel-footer">
              <div className="cart-panel-total">
                <span>Total:</span>
                <strong>S/{totalPrecio.toFixed(2)}</strong>
              </div>
              <button className="btn-panel-pedir" onClick={abrirFormulario}>
                <FaWhatsapp /> Solicitar Pedido
              </button>
              <button className="btn-panel-limpiar" onClick={limpiar}>Vaciar Carrito</button>
            </div>
          </>
        )}
      </div>

      {mostrarForm && (
        <div className="cart-panel-form-overlay" onClick={() => { setError(''); setMostrarForm(false); }}>
          <div className="cart-panel-form" onClick={e => e.stopPropagation()}>
            <div className="cart-panel-form-header">
              <h3>Completa tus datos</h3>
              <button className="cart-panel-close" onClick={() => { setError(''); setMostrarForm(false); }}>
                <FaTimes />
              </button>
            </div>
            <p>Te contactaremos vía WhatsApp para coordinar el pago y la entrega.</p>
            {error && <div className="auth-error" style={{ marginBottom: '10px', color: '#dc3545', background: '#ffe6e6', padding: '8px', borderRadius: '4px', fontSize: '0.9rem' }}>{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre completo *</label>
                <input value={form.nombre} onChange={e => { setError(''); setForm({ ...form, nombre: e.target.value }); }} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>DNI *</label>
                  <input value={form.dni} onChange={e => { setError(''); setForm({ ...form, dni: e.target.value.replace(/\D/g, '').slice(0, 8) }); }} maxLength={8} required />
                </div>
                <div className="form-group">
                  <label>Teléfono *</label>
                  <input type="tel" value={form.telefono} onChange={e => { setError(''); setForm({ ...form, telefono: e.target.value.replace(/\D/g, '').slice(0, 12) }); }} maxLength={12} required />
                </div>
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input type="email" value={form.email} onChange={e => { setError(''); setForm({ ...form, email: e.target.value }); }} required />
              </div>

              <div className="form-group">
                <label>Tipo de entrega</label>
                <div className="tipo-entrega-options">
                  <label className={`tipo-entrega-option ${form.tipoEntrega === 'recojo' ? 'active' : ''}`}>
                    <input type="radio" name="tipoEntrega" value="recojo" checked={form.tipoEntrega === 'recojo'} onChange={() => setForm({ ...form, tipoEntrega: 'recojo' })} />
                    <FaStore /> Recojo en tienda
                  </label>
                  <label className={`tipo-entrega-option ${form.tipoEntrega === 'delivery' ? 'active' : ''}`}>
                    <input type="radio" name="tipoEntrega" value="delivery" checked={form.tipoEntrega === 'delivery'} onChange={() => setForm({ ...form, tipoEntrega: 'delivery' })} />
                    <FaTruck /> Delivery
                  </label>
                </div>
              </div>

              {form.tipoEntrega === 'delivery' && (
                <div className="form-group">
                  <label>Dirección de delivery *</label>
                  <input value={form.direccionDelivery} onChange={e => { setError(''); setForm({ ...form, direccionDelivery: e.target.value }); }} placeholder="Av. Ejemplo 123, Lima" required />
                </div>
              )}

              <div className="cart-panel-form-buttons">
                <button type="button" className="btn btn-secondary" onClick={() => { setError(''); setMostrarForm(false); }}>Cancelar</button>
                <button type="submit" className="btn btn-primary" disabled={enviando}>
                  {enviando ? <><FaSpinner className="fa-spin" /> Enviando...</> : <><FaWhatsapp /> Enviar a WhatsApp</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default CartPanel;
