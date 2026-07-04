const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    const mensajes = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({ mensaje: 'Error de validación', errores: mensajes });
  }

  if (err.code === 11000) {
    return res.status(400).json({ mensaje: 'El valor ya existe en la base de datos' });
  }

  res.status(500).json({ mensaje: 'Error del servidor' });
};

module.exports = errorHandler;
