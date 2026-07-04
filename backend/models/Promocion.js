const mongoose = require('mongoose');

const promocionSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  descuento: { type: Number, required: true },
  codigo: { type: String, default: '' },
  imagen: { type: String, default: '' },
  vigente: { type: Boolean, default: true },
  fechaInicio: { type: Date, default: Date.now },
  fechaFin: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Promocion', promocionSchema);
