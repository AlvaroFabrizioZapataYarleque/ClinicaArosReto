const Servicio = require('../models/Servicio');

const obtenerServicios = async (req, res, next) => {
  try {
    const { tipo } = req.query;
    const filtro = {};
    if (tipo) filtro.tipo = tipo;
    const servicios = await Servicio.find(filtro).sort({ createdAt: -1 });
    res.json(servicios);
  } catch (error) {
    next(error);
  }
};

const obtenerServicio = async (req, res, next) => {
  try {
    const servicio = await Servicio.findById(req.params.id);
    if (!servicio) return res.status(404).json({ mensaje: 'Servicio no encontrado' });
    res.json(servicio);
  } catch (error) {
    next(error);
  }
};

const crearServicio = async (req, res, next) => {
  try {
    const servicio = await Servicio.create(req.body);
    res.status(201).json(servicio);
  } catch (error) {
    next(error);
  }
};

const actualizarServicio = async (req, res, next) => {
  try {
    const servicio = await Servicio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!servicio) return res.status(404).json({ mensaje: 'Servicio no encontrado' });
    res.json(servicio);
  } catch (error) {
    next(error);
  }
};

const eliminarServicio = async (req, res, next) => {
  try {
    const servicio = await Servicio.findByIdAndDelete(req.params.id);
    if (!servicio) return res.status(404).json({ mensaje: 'Servicio no encontrado' });
    res.json({ mensaje: 'Servicio eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = { obtenerServicios, obtenerServicio, crearServicio, actualizarServicio, eliminarServicio };
