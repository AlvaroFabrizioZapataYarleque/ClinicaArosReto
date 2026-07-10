const mongoose = require('mongoose');

const estadoHistorialSchema = new mongoose.Schema({
  estado: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  comentario: { type: String, default: '' }
}, { _id: false });

const solicitudServicioSchema = new mongoose.Schema({
  servicioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Servicio', required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', default: null },
  nombre: { type: String, required: true },
  empresa: { type: String, default: '' },
  vehiculo: { type: String, default: '' },
  detalles: { type: String, required: true },
  tipoEntrega: { type: String, enum: ['local', 'delivery'], default: 'local' },
  direccionDelivery: { type: String, default: '' },
  estado: {
    type: String,
    enum: ['pendiente', 'vehiculo_en_local', 'mecanico_asignado', 'en_reparacion', 'listo_entrega', 'entregado', 'cancelado', 'rechazado'],
    default: 'pendiente'
  },
  estadoHistorial: [estadoHistorialSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SolicitudServicio', solicitudServicioSchema);
