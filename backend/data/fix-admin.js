const dns = require('dns');
const mongoose = require('mongoose');
const Usuario = require('../models/Usuario');

const ATLAS_USER = 'alvarozapata505_db_user';
const ATLAS_PASS = 'LSNW5hVkjMR6pMTi';
const ATLAS_HOST = 'cluster0.pmgswl3.mongodb.net';
const ATLAS_DB = 'arosreto';

const resolverSRV = () => {
  return new Promise((resolve, reject) => {
    const r = new dns.Resolver();
    r.setServers(['8.8.8.8', '8.8.4.4']);
    r.resolveSrv(`_mongodb._tcp.${ATLAS_HOST}`, (err, hosts) => {
      if (err) return reject(err);
      resolve(hosts);
    });
  });
};

const main = async () => {
  console.log('Resolviendo SRV...');
  const hosts = await resolverSRV();
  const hostsStr = hosts.map(h => `${h.name}:${h.port}`).join(',');
  const uri = `mongodb://${ATLAS_USER}:${ATLAS_PASS}@${hostsStr}/${ATLAS_DB}?ssl=true&retryWrites=true&w=majority&authSource=admin`;

  console.log('Conectando...');
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
  console.log('Conectado');

  const email = 'alvarozapata505@gmail.com';
  const existe = await Usuario.findOne({ email });

  if (existe) {
    console.log('Admin existe, eliminando...');
    await Usuario.deleteOne({ email });
    console.log('Admin eliminado');
  }

  console.log('Creando admin...');
  await Usuario.create({ nombre: 'Admin', email, password: 'admin123', rol: 'admin' });
  console.log('Admin creado correctamente');

  const verificado = await Usuario.findOne({ email }).select('+password');
  console.log('Verificado:', verificado ? 'OK' : 'ERROR');
  console.log('Password hasheado:', verificado.password.substring(0, 20) + '...');

  await mongoose.disconnect();
  process.exit(0);
};

main().catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
