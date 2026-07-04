// ═══════════════════════════════════════════════════════════════
// models/Producto.js — MODELO DE PRODUCTO
//
// Categorías: aros | llantas | accesorios
//
// Campos principales:
//   nombre      → Nombre del producto (ej: "Aro Deportivo 18\"")
//   categoria   → 'aros' | 'llantas' | 'accesorios'
//   descripcion → Texto descriptivo
//   precio      → Precio en soles (S/)
//   marca       → Marca del producto (MMX, Pirelli, etc.)
//   medidas     → Dimensiones (ej: "225/45R17")
//   stock       → Cantidad disponible en inventario
//   destacado   → true = aparece con badge "Destacado" en frontend
// ═══════════════════════════════════════════════════════════════

const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: [true, 'El nombre del producto es obligatorio'] },
  categoria: {
    type: String,
    required: [true, 'La categoría es obligatoria'],
    enum: ['aros', 'llantas', 'accesorios']
  },
  descripcion: { type: String, required: [true, 'La descripción es obligatoria'] },
  precio: { type: Number, required: [true, 'El precio es obligatorio'] },
  imagen: { type: String, default: '' },
  marca: { type: String, default: '' },
  medidas: { type: String, default: '' },
  stock: { type: Number, default: 0 },
  disponible: { type: Boolean, default: true },
  destacado: { type: Boolean, default: false },   // Si es true, aparece con badge "Destacado"
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Producto', productoSchema);
