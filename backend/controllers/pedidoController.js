const Pedido = require('../models/Pedido');

const crearPedido = async (req, res, next) => {
  try {
    const datos = { ...req.body };
    if (req.usuario) datos.usuario = req.usuario.id;
    datos.estadoHistorial = [{ estado: 'pendiente', fecha: new Date(), comentario: 'Pedido creado' }];
    const pedido = await Pedido.create(datos);
    res.status(201).json(pedido);
  } catch (error) {
    next(error);
  }
};

const obtenerPedidos = async (req, res, next) => {
  try {
    const { estado, desde, hasta } = req.query;
    const filtro = {};
    if (estado) filtro.estado = estado;
    if (desde || hasta) {
      filtro.fechaPedido = {};
      if (desde) filtro.fechaPedido.$gte = new Date(desde);
      if (hasta) filtro.fechaPedido.$lte = new Date(hasta);
    }
    const pedidos = await Pedido.find(filtro).sort({ fechaPedido: -1 });
    res.json(pedidos);
  } catch (error) {
    next(error);
  }
};

const obtenerMetricas = async (req, res, next) => {
  try {
    const ahora = new Date();
    const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
    const inicioAnio = new Date(ahora.getFullYear(), 0, 1);

    const [
      pedidosMes,
      pedidosAnio,
      ingresosMes,
      ingresosAnio,
      pedidosPorMes,
      totalPedidos,
      totalIngresos,
      pedidosPorEstado
    ] = await Promise.all([
      Pedido.countDocuments({ fechaPedido: { $gte: inicioMes } }),
      Pedido.countDocuments({ fechaPedido: { $gte: inicioAnio } }),
      Pedido.aggregate([{ $match: { fechaPedido: { $gte: inicioMes } } }, { $group: { _id: null, total: { $sum: '$total' } } }]),
      Pedido.aggregate([{ $match: { fechaPedido: { $gte: inicioAnio } } }, { $group: { _id: null, total: { $sum: '$total' } } }]),
      Pedido.aggregate([
        { $match: { fechaPedido: { $gte: new Date(ahora.getFullYear() - 1, ahora.getMonth(), 1) } } },
        { $group: { _id: { mes: { $month: '$fechaPedido' }, anio: { $year: '$fechaPedido' } }, total: { $sum: '$total' }, cantidad: { $sum: 1 } } },
        { $sort: { '_id.anio': 1, '_id.mes': 1 } }
      ]),
      Pedido.countDocuments(),
      Pedido.aggregate([{ $group: { _id: null, total: { $sum: '$total' } } }]),
      Pedido.aggregate([{ $group: { _id: '$estado', cantidad: { $sum: 1 } } }])
    ]);

    res.json({
      pedidosMes,
      pedidosAnio,
      ingresosMes: ingresosMes[0]?.total || 0,
      ingresosAnio: ingresosAnio[0]?.total || 0,
      pedidosPorMes,
      totalPedidos,
      totalIngresos: totalIngresos[0]?.total || 0,
      pedidosPorEstado
    });
  } catch (error) {
    next(error);
  }
};

const actualizarEstadoPedido = async (req, res, next) => {
  try {
    const { estado, comentario } = req.body;
    const pedido = await Pedido.findById(req.params.id);
    if (!pedido) return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    pedido.estado = estado;
    pedido.estadoHistorial.push({ estado, fecha: new Date(), comentario: comentario || '' });
    await pedido.save();
    res.json(pedido);
  } catch (error) {
    next(error);
  }
};

const eliminarPedido = async (req, res, next) => {
  try {
    const pedido = await Pedido.findByIdAndDelete(req.params.id);
    if (!pedido) return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    res.json({ mensaje: 'Pedido eliminado' });
  } catch (error) {
    next(error);
  }
};

const obtenerPedidosUsuario = async (req, res, next) => {
  try {
    const pedidos = await Pedido.find({ usuario: req.usuario.id }).sort({ fechaPedido: -1 });
    res.json(pedidos);
  } catch (error) {
    next(error);
  }
};

module.exports = { crearPedido, obtenerPedidos, obtenerPedidosUsuario, obtenerMetricas, actualizarEstadoPedido, eliminarPedido };
