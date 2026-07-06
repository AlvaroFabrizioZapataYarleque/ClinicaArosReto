const express = require('express');
const router = express.Router();
const { proteger } = require('../middleware/auth');
const { esAdmin } = require('../middleware/adminAuth');
const {
  obtenerPedidos,
  obtenerMetricas,
  actualizarEstadoPedido,
  eliminarPedido
} = require('../controllers/pedidoController');

router.use(proteger, esAdmin);

router.get('/pedidos', obtenerPedidos);
router.get('/metricas', obtenerMetricas);
router.put('/pedidos/:id', actualizarEstadoPedido);
router.delete('/pedidos/:id', eliminarPedido);

module.exports = router;
