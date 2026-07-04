// ═══════════════════════════════════════════════════════════════
// routes/auth.js — RUTAS DE AUTENTICACIÓN
//
// POST /api/auth/registrar  → Crear cuenta nueva
// POST /api/auth/login      → Iniciar sesión
// GET  /api/auth/perfil     → Obtener datos del usuario (requiere JWT)
// ═══════════════════════════════════════════════════════════════

const express = require('express');
const router = express.Router();
const { registrar, login, perfil } = require('../controllers/authController');
const { proteger } = require('../middleware/auth');

router.post('/registrar', registrar);           // Pública - crea usuario y devuelve token
router.post('/login', login);                   // Pública - valida credenciales y devuelve token
router.get('/perfil', proteger, perfil);        // Protegida - requiere token Bearer

module.exports = router;
