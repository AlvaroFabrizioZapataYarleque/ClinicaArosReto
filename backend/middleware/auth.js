// ═══════════════════════════════════════════════════════════════
// middleware/auth.js — MIDDLEWARE DE PROTECCIÓN JWT
//
// Verifica que el token JWT sea válido en rutas protegidas.
// Si es válido, agrega req.usuario con los datos del usuario.
//
// Uso:
//   router.get('/perfil', proteger, perfil);
//
// Flujo:
//   1. Extrae token del header "Authorization: Bearer <token>"
//   2. Verifica firma con jwt.verify
//   3. Busca usuario en BD y lo asigna a req.usuario
//   4. Si algo falla → 401 No autorizado
// ═══════════════════════════════════════════════════════════════

const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const proteger = async (req, res, next) => {
  let token;

  // Buscar token en el header Authorization con formato "Bearer xxx"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];    // Extrae solo el token (sin "Bearer")
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'arosreto_secret_key_2024');
      req.usuario = await Usuario.findById(decoded.id).select('-password');  // Guarda usuario en req (sin password)
      next();
    } catch (error) {
      return res.status(401).json({ mensaje: 'Token no válido' });
    }
  }

  // Si no hay token, denegar acceso
  if (!token) {
    return res.status(401).json({ mensaje: 'No autorizado, token requerido' });
  }
};

module.exports = { proteger };
