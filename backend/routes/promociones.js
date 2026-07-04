// ═══════════════════════════════════════════════════════════════
// routes/promociones.js — RUTAS DE PROMOCIONES
//
// GET    /api/promociones         → Listar promociones vigentes
// GET    /api/promociones/:id     → Obtener por ID
// POST   /api/promociones         → Crear nueva
// PUT    /api/promociones/:id     → Actualizar
// DELETE /api/promociones/:id     → Eliminar
// ═══════════════════════════════════════════════════════════════

const express = require('express');
const router = express.Router();
const {
  obtenerPromociones,
  obtenerPromocion,
  crearPromocion,
  actualizarPromocion,
  eliminarPromocion
} = require('../controllers/promocionController');

router.get('/', obtenerPromociones);
router.get('/:id', obtenerPromocion);
router.post('/', crearPromocion);
router.put('/:id', actualizarPromocion);
router.delete('/:id', eliminarPromocion);

module.exports = router;
