const express = require('express');
const router = express.Router();
const { crearPedido, obtenerPedidosUsuario } = require('../controllers/pedidoController');
const { proteger, protegerOpcional } = require('../middleware/auth');

router.post('/', protegerOpcional, crearPedido);
router.get('/mis-pedidos', proteger, obtenerPedidosUsuario);

module.exports = router;
