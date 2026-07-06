// ═══════════════════════════════════════════════════════════════
// scripts/seedCategorias.js — POBLAR CATEGORÍAS INICIALES
// Ejecutar: node scripts/seedCategorias.js
// ═══════════════════════════════════════════════════════════════

require('dotenv').config();
const { conectarDB } = require('../config/db');
const Categoria = require('../models/Categoria');

const categorias = [
  { nombre: 'Aros', slug: 'aros', icono: 'GiCarWheel', orden: 1 },
  { nombre: 'Llantas', slug: 'llantas', icono: 'GiTireTracks', orden: 2 },
  { nombre: 'Accesorios', slug: 'accesorios', icono: 'HiOutlineSparkles', orden: 3 }
];

const seed = async () => {
  await conectarDB();
  for (const c of categorias) {
    await Categoria.findOneAndUpdate(
      { slug: c.slug },
      c,
      { upsert: true, new: true }
    );
  }
  console.log('Categorías iniciales insertadas/actualizadas correctamente.');
  process.exit(0);
};

seed();
