const mongoose = require('mongoose');

const servicioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipo: { type: String, required: true, enum: ['reparacion', 'mantenimiento', 'delivery'] },
  descripcion: { type: String, required: true },
  precio: { type: Number, default: 0 },
  imagen: { type: String, default: '' },
  duracion: { type: String, default: '' },
  disponible: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Servicio', servicioSchema);
