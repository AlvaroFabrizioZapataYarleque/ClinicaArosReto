const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
  slug: { type: String, required: [true, 'El slug es obligatorio'], unique: true },
  icono: { type: String, default: 'GiCarWheel' },
  orden: { type: Number, default: 0 },
  activo: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Categoria', categoriaSchema);
