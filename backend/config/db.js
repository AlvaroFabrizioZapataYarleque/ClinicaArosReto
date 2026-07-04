// ═══════════════════════════════════════════════════════════════
// config/db.js — CONEXIÓN A MONGODB
// Usa Mongoose para conectar a la base de datos.
// Soporta variable de entorno MONGO_URI o fallback a localhost.
// ═══════════════════════════════════════════════════════════════

const mongoose = require('mongoose');

const conectarDB = async () => {
  try {
    // MONGO_URI = variable de entorno para producción (MongoDB Atlas)
    // Si no existe, usa localhost:27017/arosreto como fallback
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/arosreto');
    console.log('Base de datos conectada');
  } catch (error) {
    console.error('Error al conectar la base de datos:', error.message);
    process.exit(1);  // Si no hay BD, la app no puede funcionar -> termina el proceso
  }
};

module.exports = { conectarDB };
