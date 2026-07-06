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
const { proteger } = require('../middleware/auth');
const { esAdmin } = require('../middleware/adminAuth');
const {
  obtenerServicios,
  obtenerServicio,
  crearServicio,
  actualizarServicio,
  eliminarServicio
} = require('../controllers/servicioController');

router.get('/', obtenerServicios);
router.get('/:id', obtenerServicio);
router.post('/', proteger, esAdmin, crearServicio);
router.put('/:id', proteger, esAdmin, actualizarServicio);
router.delete('/:id', proteger, esAdmin, eliminarServicio);

module.exports = router;
