const express = require('express');
const router = express.Router();
const { crearPedido, obtenerPedidosUsuario, obtenerEstadoActualPedido } = require('../controllers/pedidoController');
const { proteger, protegerOpcional } = require('../middleware/auth');

router.post('/', protegerOpcional, crearPedido);
router.get('/mis-pedidos', proteger, obtenerPedidosUsuario);
router.get('/estado-actual', proteger, obtenerEstadoActualPedido);

module.exports = router;
