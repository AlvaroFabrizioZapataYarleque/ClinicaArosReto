// ═══════════════════════════════════════════════════════════════
// server.js — PUNTO DE ENTRADA DEL BACKEND
// Clínica de Aros Reto S.A.C.
// 
// Configura y levanta el servidor Express con:
//   • Conexión a MongoDB (mongoose)
//   • Middleware CORS para peticiones cruzadas
//   • Parseo de JSON en body
//   • Rutas de la API (auth, productos, servicios, promociones)
//   • Manejador global de errores
// ═══════════════════════════════════════════════════════════════

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { conectarDB } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 4000;          // Puerto: 4000 por defecto, o el que defina la variable de entorno

conectarDB();                                    // Inicia conexión a MongoDB

app.use(cors());                                 // Permite peticiones desde cualquier origen (frontend)
app.use(express.json());                         // Convierte el body de las requests a JSON automáticamente

// ─── Rutas de la API ──────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'));           // Autenticación: login, registro, perfil
app.use('/api/productos', require('./routes/productos')); // CRUD de productos (aros, llantas, accesorios)
app.use('/api/servicios', require('./routes/servicios')); // CRUD de servicios (reparación, mantenimiento, delivery)
app.use('/api/promociones', require('./routes/promociones')); // CRUD de promociones
app.use('/api/categorias', require('./routes/categorias'));   // CRUD de categorías
app.use('/api/pedidos', require('./routes/pedidos'));         // Pedidos (carrito → WhatsApp)
app.use('/api/solicitudes', require('./routes/solicitudes')); // Solicitudes de servicio
app.use('/api/admin', require('./routes/admin'));             // Panel admin protegido

app.use(errorHandler);                           // Middleware que captura errores no controlados

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
