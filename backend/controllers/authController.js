const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'arosreto_secret_key_2024', {
    expiresIn: '30d'
  });
};

const registrar = async (req, res, next) => {
  try {
    const { nombre, email, password, telefono, direccion } = req.body;

    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(400).json({ mensaje: 'El email ya está registrado' });
    }

    const usuario = await Usuario.create({ nombre, email, password, telefono, direccion });

    res.status(201).json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarToken(usuario._id)
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }

    const coincide = await usuario.compararPassword(password);
    if (!coincide) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }

    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarToken(usuario._id)
    });
  } catch (error) {
    next(error);
  }
};

const perfil = async (req, res) => {
  const usuario = await Usuario.findById(req.usuario.id).select('-password');
  res.json(usuario);
};

module.exports = { registrar, login, perfil };
