// ═══════════════════════════════════════════════════════════════
// models/Usuario.js — MODELO DE USUARIO (Autenticación)
//
// Campos:
//   nombre   → Nombre completo del usuario
//   email    → Correo electrónico (único en BD)
//   password → Se hashea automáticamente con bcrypt antes de guardar
//   telefono → Teléfono de contacto
//   direccion→ Dirección del usuario
//   rol      → 'cliente' (default) | 'admin'
//
// Hooks:
//   pre('save') → Hashea la contraseña si fue modificada
//
// Métodos:
//   compararPassword(password) → Retorna boolean si coincide
// ═══════════════════════════════════════════════════════════════

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
  email: { type: String, required: [true, 'El email es obligatorio'], unique: true },
  password: { type: String, required: [true, 'La contraseña es obligatoria'] },
  telefono: { type: String, default: '' },
  direccion: { type: String, default: '' },
  rol: { type: String, enum: ['cliente', 'admin'], default: 'cliente' },
  createdAt: { type: Date, default: Date.now }
});

// Hook: antes de guardar, si la contraseña cambió, la hashea con bcrypt (salt=10 rondas)
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar contraseña ingresada vs almacenada (hasheada)
usuarioSchema.methods.compararPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
