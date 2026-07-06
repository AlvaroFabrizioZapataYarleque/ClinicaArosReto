const mongoose = require('mongoose');

const solicitudServicioSchema = new mongoose.Schema({
  servicioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Servicio', required: true },
  nombre: { type: String, required: true },
  empresa: { type: String, default: '' },
  detalles: { type: String, required: true },
  estado: { type: String, enum: ['pendiente', 'en_proceso', 'completado', 'cancelado'], default: 'pendiente' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SolicitudServicio', solicitudServicioSchema);
