const Promocion = require('../models/Promocion');

const obtenerPromociones = async (req, res, next) => {
  try {
    const promociones = await Promocion.find({ vigente: true }).sort({ createdAt: -1 });
    res.json(promociones);
  } catch (error) {
    next(error);
  }
};

const obtenerPromocion = async (req, res, next) => {
  try {
    const promocion = await Promocion.findById(req.params.id);
    if (!promocion) return res.status(404).json({ mensaje: 'Promoción no encontrada' });
    res.json(promocion);
  } catch (error) {
    next(error);
  }
};

const crearPromocion = async (req, res, next) => {
  try {
    const promocion = await Promocion.create(req.body);
    res.status(201).json(promocion);
  } catch (error) {
    next(error);
  }
};

const actualizarPromocion = async (req, res, next) => {
  try {
    const promocion = await Promocion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!promocion) return res.status(404).json({ mensaje: 'Promoción no encontrada' });
    res.json(promocion);
  } catch (error) {
    next(error);
  }
};

const eliminarPromocion = async (req, res, next) => {
  try {
    const promocion = await Promocion.findByIdAndDelete(req.params.id);
    if (!promocion) return res.status(404).json({ mensaje: 'Promoción no encontrada' });
    res.json({ mensaje: 'Promoción eliminada correctamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = { obtenerPromociones, obtenerPromocion, crearPromocion, actualizarPromocion, eliminarPromocion };
