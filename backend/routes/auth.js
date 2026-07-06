const express = require('express');
const router = express.Router();
const { registrar, login, perfil, actualizarPerfil, cambiarPassword } = require('../controllers/authController');
const { proteger } = require('../middleware/auth');

router.post('/registrar', registrar);
router.post('/login', login);
router.get('/perfil', proteger, perfil);
router.put('/perfil', proteger, actualizarPerfil);
router.put('/password', proteger, cambiarPassword);

module.exports = router;
