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
const { proteger } = require('../middleware/auth');
const { esAdmin } = require('../middleware/adminAuth');
const {
  obtenerPromociones,
  obtenerPromocion,
  crearPromocion,
  actualizarPromocion,
  eliminarPromocion
} = require('../controllers/promocionController');

router.get('/', obtenerPromociones);
router.get('/:id', obtenerPromocion);
router.post('/', proteger, esAdmin, crearPromocion);
router.put('/:id', proteger, esAdmin, actualizarPromocion);
router.delete('/:id', proteger, esAdmin, eliminarPromocion);

module.exports = router;
