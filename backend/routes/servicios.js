// ═══════════════════════════════════════════════════════════════
// routes/servicios.js — RUTAS DE SERVICIOS
//
// GET    /api/servicios           → Listar servicios (?tipo=reparacion)
// GET    /api/servicios/:id       → Obtener por ID
// POST   /api/servicios           → Crear nuevo
// PUT    /api/servicios/:id       → Actualizar
// DELETE /api/servicios/:id       → Eliminar
// ═══════════════════════════════════════════════════════════════

const express = require('express');
const router = express.Router();
const {
  obtenerServicios,
  obtenerServicio,
  crearServicio,
  actualizarServicio,
  eliminarServicio
} = require('../controllers/servicioController');

router.get('/', obtenerServicios);
router.get('/:id', obtenerServicio);
router.post('/', crearServicio);
router.put('/:id', actualizarServicio);
router.delete('/:id', eliminarServicio);

module.exports = router;
