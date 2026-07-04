const Producto = require('../models/Producto');

const obtenerProductos = async (req, res, next) => {
  try {
    const { categoria } = req.query;
    const filtro = {};
    if (categoria) filtro.categoria = categoria;
    const productos = await Producto.find(filtro).sort({ createdAt: -1 });
    res.json(productos);
  } catch (error) {
    next(error);
  }
};

const obtenerProducto = async (req, res, next) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    next(error);
  }
};

const crearProducto = async (req, res, next) => {
  try {
    const producto = await Producto.create(req.body);
    res.status(201).json(producto);
  } catch (error) {
    next(error);
  }
};

const actualizarProducto = async (req, res, next) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    next(error);
  }
};

const eliminarProducto = async (req, res, next) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = { obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, eliminarProducto };
