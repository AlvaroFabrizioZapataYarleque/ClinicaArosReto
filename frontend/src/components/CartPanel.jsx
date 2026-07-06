import { useState } from 'react';
import { useCart } from '../context/CartContext';
import api from '../api';
import { FaTrash, FaPlus, FaMinus, FaWhatsapp, FaTimes, FaShoppingCart, FaSpinner } from 'react-icons/fa';
import './CartPanel.css';

const TELEFONO = '51934096012';

const CartPanel = () => {
  const { items, eliminar, actualizarCantidad, totalPrecio, limpiar, panelAbierto, cerrarPanel } = useCart();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', dni: '', direccion: '' });
  const [enviando, setEnviando] = useState(false);

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
    if (form.direccion) msg += `Direcci\u00f3n: ${form.direccion}%0A`;
    return msg;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    try {
      await api.post('/api/pedidos', {
        items: items.map(i => ({ productoId: i._id, nombre: i.nombre, precio: i.precio, cantidad: i.cantidad })),
        total: totalPrecio,
        ...form
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
              <button className="btn-panel-pedir" onClick={() => setMostrarForm(true)}>
                <FaWhatsapp /> Solicitar Pedido
              </button>
              <button className="btn-panel-limpiar" onClick={limpiar}>Vaciar Carrito</button>
            </div>
          </>
        )}
      </div>

      {mostrarForm && (
        <div className="cart-panel-form-overlay" onClick={() => setMostrarForm(false)}>
          <div className="cart-panel-form" onClick={e => e.stopPropagation()}>
            <div className="cart-panel-form-header">
              <h3>Completa tus datos</h3>
              <button className="cart-panel-close" onClick={() => setMostrarForm(false)}>
                <FaTimes />
              </button>
            </div>
            <p>Te contactaremos v\u00eda WhatsApp para coordinar el pago y la entrega.</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre completo *</label>
                <input value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>DNI *</label>
                  <input value={form.dni} onChange={e => setForm({ ...form, dni: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Tel\u00e9fono *</label>
                  <input type="tel" value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} required />
                </div>
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Direcci\u00f3n</label>
                <input value={form.direccion} onChange={e => setForm({ ...form, direccion: e.target.value })} />
              </div>
              <div className="cart-panel-form-buttons">
                <button type="button" className="btn btn-secondary" onClick={() => setMostrarForm(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary" disabled={enviando}>
                  {enviando ? <><FaSpinner className="fa-spin" /> Enviando...</> : <><FaWhatsapp /> Enviar a WhatsApp</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPanel;
