// ═══════════════════════════════════════════════════════════════
// data/seed-atlas.js — SEED PARA MONGODB ATLAS
//
// Versión especial que resuelve DNS usando Google DNS (8.8.8.8)
// para evitar bloqueo de SRV records por parte del ISP.
// ═══════════════════════════════════════════════════════════════

const dns = require('dns');
const mongoose = require('mongoose');
const Producto = require('../models/Producto');
const Servicio = require('../models/Servicio');
const Promocion = require('../models/Promocion');
const Usuario = require('../models/Usuario');

const ATLAS_USER = 'alvarozapata505_db_user';
const ATLAS_PASS = 'LSNW5hVkjMR6pMTi';
const ATLAS_HOST = 'cluster0.pmgswl3.mongodb.net';
const ATLAS_DB = 'arosreto';

// ─── Resolver SRV con DNS de Google ───────────────────────────
const resolverSRV = () => {
  return new Promise((resolve, reject) => {
    const r = new dns.Resolver();
    r.setServers(['8.8.8.8', '8.8.4.4']);   // Google DNS
    r.resolveSrv(`_mongodb._tcp.${ATLAS_HOST}`, (err, hosts) => {
      if (err) return reject(err);
      resolve(hosts);
    });
  });
};

// ─── Construir URI desde hosts resueltos ───────────────────────
const construirURI = (hosts) => {
  // Ordenar por prioridad
  hosts.sort((a, b) => a.priority - b.priority);

  const hostsStr = hosts.map(h => `${h.name}:${h.port}`).join(',');

  return `mongodb://${ATLAS_USER}:${ATLAS_PASS}@${hostsStr}/${ATLAS_DB}?ssl=true&retryWrites=true&w=majority&authSource=admin`;
};

const productos = [
  { nombre: 'Aro Deportivo 18"', categoria: 'aros', descripcion: 'Aro de aleación ligera diseño deportivo 5 radios', precio: 450, marca: 'MMX', medidas: '18x8', stock: 10 },
  { nombre: 'Aro Clásico 16"', categoria: 'aros', descripcion: 'Aro clásico cromado para vehículos sedan', precio: 320, marca: 'Dream', medidas: '16x7', stock: 15 },
  { nombre: 'Aro Todo Terreno 20"', categoria: 'aros', descripcion: 'Aro robusto para camionetas SUV 4x4', precio: 580, marca: 'Fuel', medidas: '20x9', stock: 8 },
  { nombre: 'Llantas Pirelli 225/45R17', categoria: 'llantas', descripcion: 'Neumático deportivo de alto rendimiento', precio: 280, marca: 'Pirelli', medidas: '225/45R17', stock: 20 },
  { nombre: 'Llantas Michelin 205/55R16', categoria: 'llantas', descripcion: 'Neumático de excelente durabilidad', precio: 250, marca: 'Michelin', medidas: '205/55R16', stock: 25 },
  { nombre: 'Llantas Bridgestone 265/70R17', categoria: 'llantas', descripcion: 'Neumático para todo terreno', precio: 320, marca: 'Bridgestone', medidas: '265/70R17', stock: 12 },
  { nombre: 'Kit de Neumáticos Run Flat', categoria: 'accesorios', descripcion: 'Kit antipinchazos para emergencias', precio: 85, marca: 'Slime', medidas: '', stock: 30 },
  { nombre: 'Tapas de Válvulas LED', categoria: 'accesorios', descripcion: 'Tapas luminosas para válvulas de neumáticos', precio: 25, marca: 'AutoStyle', medidas: '', stock: 50 },
  { nombre: 'Cámaras de Seguridad TPMS', categoria: 'accesorios', descripcion: 'Sensores de presión para neumáticos', precio: 150, marca: 'Orange', medidas: '', stock: 18 }
];

const servicios = [
  { nombre: 'Reparación de Aros Aleación', tipo: 'reparacion', descripcion: 'Reparación profesional de aros de aleación: enderezado, soldadura y pintura', precio: 120, duracion: '2-3 días' },
  { nombre: 'Reparación de Aros Acero', tipo: 'reparacion', descripcion: 'Enderezado y reparación de aros de acero', precio: 80, duracion: '1-2 días' },
  { nombre: 'Pulido y Cromado', tipo: 'reparacion', descripcion: 'Pulido profesional y cromado de aros', precio: 150, duracion: '3-4 días' },
  { nombre: 'Mantenimiento General', tipo: 'mantenimiento', descripcion: 'Revisión general, balanceo y alineación de aros y llantas', precio: 60, duracion: '2 horas' },
  { nombre: 'Cambio de Neumáticos', tipo: 'mantenimiento', descripcion: 'Servicio de cambio y montaje de neumáticos nuevos', precio: 40, duracion: '1 hora' },
  { nombre: 'Balanceo Electrónico', tipo: 'mantenimiento', descripcion: 'Balanceo electrónico de precisión para llantas', precio: 35, duracion: '30 min' },
  { nombre: 'Delivery de Aros', tipo: 'delivery', descripcion: 'Entrega a domicilio de aros y llantas comprados en tienda', precio: 0, duracion: '24 horas' },
  { nombre: 'Delivery de Reparaciones', tipo: 'delivery', descripcion: 'Recojo y entrega de aros reparados a domicilio', precio: 25, duracion: '24 horas' }
];

const promociones = [
  { titulo: 'Descuento por Temporada', descripcion: '30% de descuento en reparación de aros de aleación', descuento: 30, codigo: 'TEMPORADA30' },
  { titulo: 'Compra 3 Llantas y la 4ta Gratis', descripcion: 'En la compra de 3 llantas seleccionadas, llévate la cuarta completamente gratis', descuento: 25, codigo: 'LLANTA4' },
  { titulo: 'Mantenimiento Premium', descripcion: 'Paquete completo de mantenimiento con 20% de descuento', descuento: 20, codigo: 'PREMIUM20' },
  { titulo: 'Delivery Gratis', descripcion: 'Delivery gratuito en compras mayores a S/500', descuento: 100, codigo: 'DELIVERYFREE' },
  { titulo: '2x1 en Accesorios', descripcion: 'Lleva 2 accesorios al precio de 1', descuento: 50, codigo: '2X1ACCE' }
];

const main = async () => {
  console.log('🔍 Resolviendo SRV con Google DNS (8.8.8.8)...');
  let hosts;
  try {
    hosts = await resolverSRV();
    console.log(`✅ Hosts encontrados: ${hosts.length}`);
    hosts.forEach(h => console.log(`   ${h.name}:${h.port}`));
  } catch (e) {
    console.error('❌ Error resolviendo SRV:', e.message);
    console.log('   Intentando conectar sin SRV...');
  }

  const uri = hosts ? construirURI(hosts) : `mongodb+srv://${ATLAS_USER}:${ATLAS_PASS}@${ATLAS_HOST}/${ATLAS_DB}?retryWrites=true&w=majority`;

  console.log('\n📡 Conectando a MongoDB Atlas...');
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
  console.log('✅ Base de datos conectada');

  console.log('\n🗑️  Limpiando colecciones existentes...');
  await Producto.deleteMany();
  await Servicio.deleteMany();
  await Promocion.deleteMany();

  const adminExiste = await Usuario.findOne({ email: 'alvarozapata505@gmail.com' });
  if (!adminExiste) {
    console.log('👑 Creando usuario administrador...');
    await Usuario.create({ nombre: 'Admin', email: 'alvarozapata505@gmail.com', password: 'admin123', rol: 'admin' });
  } else {
    console.log('👑 Admin ya existe, omitiendo...');
  }

  console.log('📦 Insertando productos...');
  await Producto.insertMany(productos);

  console.log('🔧 Insertando servicios...');
  await Servicio.insertMany(servicios);

  console.log('🏷️  Insertando promociones...');
  await Promocion.insertMany(promociones);

  console.log('\n✅✅✅ DATOS INSERTADOS CORRECTAMENTE ✅✅✅');
  console.log(`   • ${productos.length} productos`);
  console.log(`   • ${servicios.length} servicios`);
  console.log(`   • ${promociones.length} promociones`);
  console.log(`   • 1 administrador (alvarozapata505@gmail.com)`);

  await mongoose.disconnect();
  process.exit(0);
};

main().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
