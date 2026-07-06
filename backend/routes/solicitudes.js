const express = require('express');
const router = express.Router();
const { proteger, protegerOpcional } = require('../middleware/auth');
const { esAdmin } = require('../middleware/adminAuth');
const { obtenerSolicitudes, crearSolicitud, actualizarEstadoSolicitud, obtenerSolicitudesUsuario } = require('../controllers/solicitudController');

router.post('/', protegerOpcional, crearSolicitud);
router.get('/', proteger, esAdmin, obtenerSolicitudes);
router.get('/mis-solicitudes', proteger, obtenerSolicitudesUsuario);
router.put('/:id', proteger, esAdmin, actualizarEstadoSolicitud);

module.exports = router;
