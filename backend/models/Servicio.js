// ═══════════════════════════════════════════════════════════════
// models/Servicio.js — MODELO DE SERVICIO
//
// Tipos: reparacion | mantenimiento | delivery
//
// Campos:
//   nombre      → Nombre del servicio (ej: "Reparación de Aros Aleación")
//   tipo        → 'reparacion' | 'mantenimiento' | 'delivery'
//   descripcion → Detalle del servicio
//   precio      → Costo del servicio (0 = gratuito, como delivery)
//   duracion    → Tiempo estimado (ej: "2-3 días", "1 hora")
// ═══════════════════════════════════════════════════════════════

const mongoose = require('mongoose');

const servicioSchema = new mongoose.Schema({
  nombre: { type: String, required: [true, 'El nombre del servicio es obligatorio'] },
  tipo: {
    type: String,
    required: [true, 'El tipo de servicio es obligatorio'],
    enum: ['reparacion', 'mantenimiento', 'delivery']
  },
  descripcion: { type: String, required: [true, 'La descripción es obligatoria'] },
  precio: { type: Number, default: 0 },
  imagen: { type: String, default: '' },
  duracion: { type: String, default: '' },     // Tiempo estimado: "2-3 días", "1 hora", etc.
  disponible: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Servicio', servicioSchema);
