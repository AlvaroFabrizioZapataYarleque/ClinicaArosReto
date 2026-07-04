// ═══════════════════════════════════════════════════════════════
// middleware/errorHandler.js — MANEJADOR GLOBAL DE ERRORES
//
// Captura cualquier error que ocurra en los controladores
// y devuelve una respuesta JSON estructurada.
//
// Errores manejados:
//   • ValidationError → 400 (errores de validación de Mongoose)
//   • Código 11000    → 400 (duplicado en campo unique)
//   • Otros           → 500 (error interno del servidor)
// ═══════════════════════════════════════════════════════════════

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);                   // Log del error completo para debug

  // Error de validación de Mongoose (campos requeridos, tipos incorrectos, etc.)
  if (err.name === 'ValidationError') {
    const mensajes = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({ mensaje: 'Error de validación', errores: mensajes });
  }

  // Error de índice único duplicado (ej: email repetido)
  if (err.code === 11000) {
    return res.status(400).json({ mensaje: 'El valor ya existe en la base de datos' });
  }

  // Cualquier otro error no contemplado
  res.status(500).json({ mensaje: 'Error del servidor' });
};

module.exports = errorHandler;
