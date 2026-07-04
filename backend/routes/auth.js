const express = require('express');
const router = express.Router();
const { registrar, login, perfil } = require('../controllers/authController');
const { proteger } = require('../middleware/auth');

router.post('/registrar', registrar);
router.post('/login', login);
router.get('/perfil', proteger, perfil);

module.exports = router;
