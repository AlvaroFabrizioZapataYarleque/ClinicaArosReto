// ═══════════════════════════════════════════════════════════════
// models/Promocion.js — MODELO DE PROMOCIÓN
//
// Campos:
//   titulo      → Título de la promo (ej: "30% Descuento")
//   descripcion → Texto explicativo de la oferta
//   descuento   → Porcentaje de descuento (0-100)
//   codigo      → Código promocional para canjear (ej: "TEMPORADA30")
//   vigente     → true = promoción activa, false = expirada
//   fechaInicio → Desde cuándo aplica
//   fechaFin    → Hasta cuándo aplica (null = indefinido)
// ═══════════════════════════════════════════════════════════════

const mongoose = require('mongoose');

const promocionSchema = new mongoose.Schema({
  titulo: { type: String, required: [true, 'El título es obligatorio'] },
  descripcion: { type: String, required: [true, 'La descripción es obligatoria'] },
  descuento: { type: Number, required: [true, 'El descuento es obligatorio'] },
  codigo: { type: String, default: '' },
  imagen: { type: String, default: '' },
  vigente: { type: Boolean, default: true },     // false = promoción desactivada/expirada
  fechaInicio: { type: Date, default: Date.now },
  fechaFin: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Promocion', promocionSchema);
