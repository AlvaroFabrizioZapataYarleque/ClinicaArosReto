const express = require('express');
const router = express.Router();
const { obtenerConfig, actualizarConfig } = require('../controllers/configuracionController');
const { proteger } = require('../middleware/auth');
const { esAdmin } = require('../middleware/adminAuth');

router.get('/', obtenerConfig);
router.put('/', proteger, esAdmin, actualizarConfig);

module.exports = router;
