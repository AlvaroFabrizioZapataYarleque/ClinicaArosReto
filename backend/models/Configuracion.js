const mongoose = require('mongoose');

const configuracionSchema = new mongoose.Schema({
  direccion: { type: String, default: '' },
  telefonos: { type: String, default: '' },
  email: { type: String, default: '' },
  horario: { type: String, default: '' },
  lat: { type: Number, default: -12.2025 },
  lng: { type: Number, default: -76.9500 },
  facebook: { type: String, default: '' },
  instagram: { type: String, default: '' },
  whatsapp: { type: String, default: '51934096012' },
  descripcion: { type: String, default: '' }
});

module.exports = mongoose.model('Configuracion', configuracionSchema);
