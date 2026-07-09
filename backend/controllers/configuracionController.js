const Configuracion = require('../models/Configuracion');

const obtenerConfig = async (req, res, next) => {
  try {
    let config = await Configuracion.findOne();
    if (!config) {
      config = await Configuracion.create({});
    }
    res.json(config);
  } catch (error) {
    next(error);
  }
};

const actualizarConfig = async (req, res, next) => {
  try {
    let config = await Configuracion.findOne();
    if (!config) {
      config = new Configuracion();
    }
    const campos = ['direccion', 'telefonos', 'email', 'horario', 'lat', 'lng', 'facebook', 'instagram', 'whatsapp', 'descripcion'];
    campos.forEach(c => {
      if (req.body[c] !== undefined) config[c] = req.body[c];
    });
    await config.save();
    res.json(config);
  } catch (error) {
    next(error);
  }
};

module.exports = { obtenerConfig, actualizarConfig };
