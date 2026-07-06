const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const vehiculoSchema = new mongoose.Schema({
  marca: { type: String, default: '' },
  modelo: { type: String, default: '' },
  placa: { type: String, default: '' },
  anio: { type: String, default: '' }
}, { _id: true });

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
  email: { type: String, required: [true, 'El email es obligatorio'], unique: true },
  password: { type: String, required: [true, 'La contraseña es obligatoria'] },
  telefono: { type: String, default: '' },
  dni: { type: String, default: '' },
  direccion: { type: String, default: '' },
  vehiculos: { type: [vehiculoSchema], default: [] },
  rol: { type: String, enum: ['cliente', 'admin'], default: 'cliente' },
  createdAt: { type: Date, default: Date.now }
});

usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

usuarioSchema.methods.compararPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
