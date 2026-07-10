const mongoose = require('mongoose');

const pedidoItemSchema = new mongoose.Schema({
  productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
  nombre: String,
  precio: Number,
  cantidad: Number,
}, { _id: false });

const estadoHistorialSchema = new mongoose.Schema({
  estado: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  comentario: { type: String, default: '' }
}, { _id: false });

const pedidoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', default: null },
  items: [pedidoItemSchema],
  total: { type: Number, required: true },
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  telefono: { type: String, required: true },
  dni: { type: String, required: true },
  direccion: { type: String, default: '' },
  tipoEntrega: { type: String, enum: ['recojo', 'delivery'], default: 'recojo' },
  direccionDelivery: { type: String, default: '' },
  estado: {
    type: String,
    enum: ['pendiente', 'confirmado', 'en_preparacion', 'listo_entrega', 'entregado', 'cancelado', 'rechazado'],
    default: 'pendiente'
  },
  estadoHistorial: [estadoHistorialSchema],
  fechaPedido: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pedido', pedidoSchema);
