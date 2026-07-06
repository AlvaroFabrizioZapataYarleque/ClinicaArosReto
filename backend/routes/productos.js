// ═══════════════════════════════════════════════════════════════
// routes/productos.js — RUTAS DE PRODUCTOS
//
// GET    /api/productos           → Listar productos (?categoria=aros)
// GET    /api/productos/:id       → Obtener por ID
// POST   /api/productos           → Crear nuevo
// PUT    /api/productos/:id       → Actualizar
// DELETE /api/productos/:id       → Eliminar
// ═══════════════════════════════════════════════════════════════

const express = require('express');
const router = express.Router();
const { proteger } = require('../middleware/auth');
const { esAdmin } = require('../middleware/adminAuth');
const {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} = require('../controllers/productoController');

router.get('/', obtenerProductos);
router.get('/:id', obtenerProducto);
router.post('/', proteger, esAdmin, crearProducto);
router.put('/:id', proteger, esAdmin, actualizarProducto);
router.delete('/:id', proteger, esAdmin, eliminarProducto);

module.exports = router;
