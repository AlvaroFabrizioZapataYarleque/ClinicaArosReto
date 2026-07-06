const express = require('express');
const router = express.Router();
const { proteger } = require('../middleware/auth');
const { esAdmin } = require('../middleware/adminAuth');
const {
  obtenerCategorias,
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
} = require('../controllers/categoriaController');

router.get('/', obtenerCategorias);
router.get('/:id', obtenerCategoria);
router.post('/', proteger, esAdmin, crearCategoria);
router.put('/:id', proteger, esAdmin, actualizarCategoria);
router.delete('/:id', proteger, esAdmin, eliminarCategoria);

module.exports = router;
