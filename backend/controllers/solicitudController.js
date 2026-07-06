const SolicitudServicio = require('../models/SolicitudServicio');

const obtenerSolicitudes = async (req, res) => {
  try {
    const solicitudes = await SolicitudServicio.find().populate('servicioId', 'nombre tipo').sort({ createdAt: -1 });
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener solicitudes', error: error.message });
  }
};

const crearSolicitud = async (req, res) => {
  try {
    const solicitud = new SolicitudServicio(req.body);
    await solicitud.save();
    res.status(201).json(solicitud);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear solicitud', error: error.message });
  }
};

const actualizarEstadoSolicitud = async (req, res) => {
  try {
    const { estado } = req.body;
    const solicitud = await SolicitudServicio.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true }
    ).populate('servicioId', 'nombre tipo');
    if (!solicitud) return res.status(404).json({ mensaje: 'Solicitud no encontrada' });
    res.json(solicitud);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar solicitud', error: error.message });
  }
};

module.exports = { obtenerSolicitudes, crearSolicitud, actualizarEstadoSolicitud };
