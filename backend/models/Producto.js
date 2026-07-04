const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  categoria: { type: String, required: true, enum: ['aros', 'llantas', 'accesorios'] },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  imagen: { type: String, default: '' },
  marca: { type: String, default: '' },
  medidas: { type: String, default: '' },
  stock: { type: Number, default: 0 },
  disponible: { type: Boolean, default: true },
  destacado: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Producto', productoSchema);
