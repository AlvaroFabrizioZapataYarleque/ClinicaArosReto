import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../api';
import { FaTrash, FaPlus, FaMinus, FaWhatsapp, FaShoppingCart } from 'react-icons/fa';
import '../styles/Carrito.css';

const TELEFONO = '51935430323';

const Carrito = () => {
  const { items, eliminar, actualizarCantidad, totalPrecio, limpiar } = useCart();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', dni: '', direccion: '' });
  const [enviando, setEnviando] = useState(false);

  const generarMensaje = () => {
    let msg = '🛒 *Nuevo Pedido - Aros Reto*%0A%0A';
    msg += '*Productos:*%0A';
    items.forEach(i => {
      msg += `• ${i.nombre} x${i.cantidad} = S/${(i.precio * i.cantidad).toFixed(2)}%0A`;
    });
    msg += `%0A*Total: S/${totalPrecio.toFixed(2)}*%0A%0A`;
    msg += '*Datos del cliente:*%0A';
    msg += `Nombre: ${form.nombre}%0A`;
    msg += `DNI: ${form.dni}%0A`;
    msg += `Email: ${form.email}%0A`;
    msg += `Teléfono: ${form.telefono}%0A`;
    if (form.direccion) msg += `Dirección: ${form.direccion}%0A`;
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
    } catch (err) {
      alert('Error al procesar pedido: ' + (err.response?.data?.mensaje || err.message));
    } finally {
      setEnviando(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="carrito-page">
        <div className="carrito-empty">
          <FaShoppingCart className="empty-icon" />
          <h2>Tu carrito está vacío</h2>
          <p>Agrega productos desde nuestra tienda</p>
          <Link to="/productos" className="btn btn-primary">Ver Productos</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="carrito-page">
      <div className="carrito-container">
        <div className="carrito-header">
          <h1><FaShoppingCart /> Carrito de Compras</h1>
          <button className="btn-limpiar" onClick={limpiar}>Vaciar Carrito</button>
        </div>

        <div className="carrito-items">
          {items.map(item => (
            <div key={item._id} className="carrito-item">
              {item.imagen && <img src={item.imagen} alt="" className="carrito-item-img" />}
              <div className="carrito-item-info">
                <h3>{item.nombre}</h3>
                <p className="carrito-item-precio">S/{item.precio.toFixed(2)}</p>
              </div>
              <div className="carrito-item-cantidad">
                <button onClick={() => actualizarCantidad(item._id, item.cantidad - 1)}><FaMinus /></button>
                <span>{item.cantidad}</span>
                <button onClick={() => actualizarCantidad(item._id, item.cantidad + 1)}><FaPlus /></button>
              </div>
              <div className="carrito-item-subtotal">
                S/{(item.precio * item.cantidad).toFixed(2)}
              </div>
              <button className="carrito-item-eliminar" onClick={() => eliminar(item._id)}>
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        <div className="carrito-footer">
          <div className="carrito-total">
            <span>Total:</span>
            <strong>S/{totalPrecio.toFixed(2)}</strong>
          </div>
          <button className="btn btn-primary btn-pedir" onClick={() => setMostrarForm(true)}>
            <FaWhatsapp /> Solicitar Pedido
          </button>
        </div>
      </div>

      {mostrarForm && (
        <div className="carrito-modal-overlay" onClick={() => setMostrarForm(false)}>
          <div className="carrito-modal" onClick={e => e.stopPropagation()}>
            <h2>Completa tus datos</h2>
            <p>Te contactaremos vía WhatsApp para coordinar el pago y la entrega.</p>
            <form onSubmit={handleSubmit} className="carrito-form">
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
                  <label>Teléfono *</label>
                  <input type="tel" value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} required />
                </div>
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Dirección</label>
                <input value={form.direccion} onChange={e => setForm({ ...form, direccion: e.target.value })} />
              </div>
              <div className="carrito-modal-buttons">
                <button type="button" className="btn btn-secondary" onClick={() => setMostrarForm(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary" disabled={enviando}>
                  <FaWhatsapp /> {enviando ? 'Enviando...' : 'Enviar a WhatsApp'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
