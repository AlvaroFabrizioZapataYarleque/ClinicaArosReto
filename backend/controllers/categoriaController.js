const Categoria = require('../models/Categoria');

const obtenerCategorias = async (req, res, next) => {
  try {
    const filtro = req.query._all ? {} : { activo: true };
    const categorias = await Categoria.find(filtro).sort({ orden: 1, nombre: 1 });
    res.json(categorias);
  } catch (error) {
    next(error);
  }
};

const obtenerCategoria = async (req, res, next) => {
  try {
    const categoria = await Categoria.findById(req.params.id);
    if (!categoria) return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    res.json(categoria);
  } catch (error) {
    next(error);
  }
};

const crearCategoria = async (req, res, next) => {
  try {
    const categoria = await Categoria.create(req.body);
    res.status(201).json(categoria);
  } catch (error) {
    next(error);
  }
};

const actualizarCategoria = async (req, res, next) => {
  try {
    const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!categoria) return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    res.json(categoria);
  } catch (error) {
    next(error);
  }
};

const eliminarCategoria = async (req, res, next) => {
  try {
    const categoria = await Categoria.findByIdAndDelete(req.params.id);
    if (!categoria) return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    res.json({ mensaje: 'Categoría eliminada correctamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = { obtenerCategorias, obtenerCategoria, crearCategoria, actualizarCategoria, eliminarCategoria };
