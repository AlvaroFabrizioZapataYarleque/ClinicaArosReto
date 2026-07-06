const express = require('express');
const router = express.Router();
const { proteger } = require('../middleware/auth');
const { esAdmin } = require('../middleware/adminAuth');
const { obtenerSolicitudes, crearSolicitud, actualizarEstadoSolicitud } = require('../controllers/solicitudController');

router.post('/', crearSolicitud);
router.get('/', proteger, esAdmin, obtenerSolicitudes);
router.put('/:id', proteger, esAdmin, actualizarEstadoSolicitud);

module.exports = router;
