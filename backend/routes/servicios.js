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
