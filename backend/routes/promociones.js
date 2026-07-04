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
