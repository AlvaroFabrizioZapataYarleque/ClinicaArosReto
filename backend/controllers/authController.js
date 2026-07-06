// ═══════════════════════════════════════════════════════════════
// controllers/authController.js — CONTROLADOR DE AUTENTICACIÓN
//
// Funciones:
//   registrar → POST /api/auth/registrar
//   login     → POST /api/auth/login
//   perfil    → GET  /api/auth/perfil (requiere token JWT)
//
// Flujo:
//   1. Recibe email + password del body
//   2. Verifica credenciales contra MongoDB
//   3. Si son válidas, genera un JWT con expiración de 30 días
//   4. Devuelve { _id, nombre, email, token }
// ═══════════════════════════════════════════════════════════════

const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

// ─── Generar Token JWT ─────────────────────────────────────────
// Crea un token firmado con el ID del usuario, válido por 30 días
const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'arosreto_secret_key_2024', {
    expiresIn: '30d'
  });
};

// ─── POST /api/auth/registrar ──────────────────────────────────
// Crea un nuevo usuario en BD y devuelve token JWT
const registrar = async (req, res, next) => {
  try {
    const { nombre, email, password, telefono, direccion } = req.body;

    // Verificar si el email ya existe (campo unique en modelo)
    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(400).json({ mensaje: 'El email ya está registrado' });
    }

    // Crear usuario (el password se hashea automáticamente vía hook pre('save'))
    const usuario = await Usuario.create({ nombre, email, password, telefono, direccion });

    // Responder con datos del usuario + token
    res.status(201).json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      token: generarToken(usuario._id)
    });
  } catch (error) {
    next(error);  // Pasa el error al middleware errorHandler
  }
};

// ─── POST /api/auth/login ──────────────────────────────────────
// Verifica credenciales y devuelve token JWT
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }

    // Comparar contraseña usando el método del modelo (bcrypt)
    const coincide = await usuario.compararPassword(password);
    if (!coincide) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }

    // Credenciales válidas → devolver token
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      token: generarToken(usuario._id)
    });
  } catch (error) {
    next(error);
  }
};

// ─── GET /api/auth/perfil ──────────────────────────────────────
// Devuelve los datos del usuario autenticado (requiere middleware proteger)
// El middleware auth.js ya agregó req.usuario con los datos (sin password)
const perfil = async (req, res) => {
  const usuario = await Usuario.findById(req.usuario.id).select('-password');
  res.json(usuario);
};

module.exports = { registrar, login, perfil };
