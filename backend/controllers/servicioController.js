// ═══════════════════════════════════════════════════════════════
// controllers/servicioController.js — CRUD DE SERVICIOS
//
// Endpoints (todos en /api/servicios):
//   GET    /            → Listar (filtro opcional: ?tipo=reparacion)
//   GET    /:id         → Obtener uno por ID
//   POST   /            → Crear nuevo
//   PUT    /:id         → Actualizar
//   DELETE /:id         → Eliminar
//
// Tipos de servicio: reparacion | mantenimiento | delivery
// ═══════════════════════════════════════════════════════════════

const Servicio = require('../models/Servicio');

// ─── GET /api/servicios ────────────────────────────────────────
// Lista servicios. Filtro opcional: ?tipo=reparacion
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

// ─── GET /api/servicios/:id ────────────────────────────────────
const obtenerServicio = async (req, res, next) => {
  try {
    const servicio = await Servicio.findById(req.params.id);
    if (!servicio) return res.status(404).json({ mensaje: 'Servicio no encontrado' });
    res.json(servicio);
  } catch (error) {
    next(error);
  }
};

// ─── POST /api/servicios ───────────────────────────────────────
const crearServicio = async (req, res, next) => {
  try {
    const servicio = await Servicio.create(req.body);
    res.status(201).json(servicio);
  } catch (error) {
    next(error);
  }
};

// ─── PUT /api/servicios/:id ────────────────────────────────────
const actualizarServicio = async (req, res, next) => {
  try {
    const servicio = await Servicio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!servicio) return res.status(404).json({ mensaje: 'Servicio no encontrado' });
    res.json(servicio);
  } catch (error) {
    next(error);
  }
};

// ─── DELETE /api/servicios/:id ─────────────────────────────────
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
