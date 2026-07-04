// ═══════════════════════════════════════════════════════════════
// controllers/productoController.js — CRUD DE PRODUCTOS
//
// Endpoints (todos en /api/productos):
//   GET    /            → Listar (filtro opcional: ?categoria=aros)
//   GET    /:id         → Obtener uno por ID
//   POST   /            → Crear nuevo
//   PUT    /:id         → Actualizar
//   DELETE /:id         → Eliminar
// ═══════════════════════════════════════════════════════════════

const Producto = require('../models/Producto');

// ─── GET /api/productos ────────────────────────────────────────
// Lista todos los productos. Si se envía ?categoria=filtro, filtra por esa categoría.
// Ejemplo: GET /api/productos?categoria=aros → solo aros
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

// ─── GET /api/productos/:id ────────────────────────────────────
// Obtiene un producto específico por su _id de MongoDB
const obtenerProducto = async (req, res, next) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    next(error);
  }
};

// ─── POST /api/productos ───────────────────────────────────────
// Crea un nuevo producto. Los campos requeridos son validados por Mongoose.
const crearProducto = async (req, res, next) => {
  try {
    const producto = await Producto.create(req.body);
    res.status(201).json(producto);
  } catch (error) {
    next(error);
  }
};

// ─── PUT /api/productos/:id ────────────────────────────────────
// Actualiza un producto existente. Solo envía los campos a modificar.
const actualizarProducto = async (req, res, next) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    next(error);
  }
};

// ─── DELETE /api/productos/:id ─────────────────────────────────
// Elimina un producto definitivamente de la base de datos
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
