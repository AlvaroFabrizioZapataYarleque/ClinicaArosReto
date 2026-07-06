const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'arosreto_secret_key_2024', {
    expiresIn: '30d'
  });
};

const registrar = async (req, res, next) => {
  try {
    const { nombre, email, password, telefono, direccion, dni, vehiculos } = req.body;

    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(400).json({ mensaje: 'El email ya está registrado' });
    }

    const usuario = await Usuario.create({ nombre, email, password, telefono, direccion, dni, vehiculos });

    res.status(201).json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      telefono: usuario.telefono,
      dni: usuario.dni,
      direccion: usuario.direccion,
      vehiculos: usuario.vehiculos,
      rol: usuario.rol,
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
      telefono: usuario.telefono,
      dni: usuario.dni,
      direccion: usuario.direccion,
      vehiculos: usuario.vehiculos,
      rol: usuario.rol,
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

const actualizarPerfil = async (req, res, next) => {
  try {
    const campos = ['nombre', 'telefono', 'dni', 'direccion', 'vehiculos'];
    const datos = {};
    campos.forEach(c => {
      if (req.body[c] !== undefined) datos[c] = req.body[c];
    });
    const usuario = await Usuario.findByIdAndUpdate(req.usuario.id, datos, { new: true }).select('-password');
    res.json(usuario);
  } catch (error) {
    next(error);
  }
};

const cambiarPassword = async (req, res, next) => {
  try {
    const { passwordActual, passwordNuevo } = req.body;
    const usuario = await Usuario.findById(req.usuario.id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const coincide = await usuario.compararPassword(passwordActual);
    if (!coincide) return res.status(400).json({ mensaje: 'La contraseña actual no es correcta' });

    if (passwordNuevo.length < 6) return res.status(400).json({ mensaje: 'La contraseña debe tener al menos 6 caracteres' });

    usuario.password = passwordNuevo;
    await usuario.save();
    res.json({ mensaje: 'Contraseña actualizada correctamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = { registrar, login, perfil, actualizarPerfil, cambiarPassword };
