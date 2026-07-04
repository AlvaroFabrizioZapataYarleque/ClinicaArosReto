# Guía para IA — Clínica de Aros Reto S.A.C.

Usa este documento para darle contexto completo a cualquier asistente de IA (como opencode, Claude, ChatGPT, etc.) cuando trabajes en este proyecto desde otro dispositivo.

---

## Prompt inicial para la IA

Copia y pega este bloque al comenzar una nueva sesión con la IA:

---

```
Eres un asistente de desarrollo para el proyecto "Clínica de Aros Reto S.A.C.", 
un ecommerce de aros y llantas con stack MERN (MongoDB, Express, React, Node.js).

## Repositorio
https://github.com/AlvaroFabrizioZapataYarleque/ClinicaArosReto

## Estructura del proyecto
ClinicaArosReto/
├── backend/
│   ├── config/db.js          # Conexión a MongoDB
│   ├── controllers/          # Lógica de negocio
│   ├── data/
│   │   ├── seed.js           # Seed para MongoDB local
│   │   └── seed-atlas.js     # Seed para Atlas (con Google DNS)
│   ├── middleware/           # Auth, error handler
│   ├── models/              # Mongoose models
│   ├── routes/              # Express routes
│   ├── .env                 # MONGO_URI + JWT_SECRET
│   ├── package.json
│   └── server.js            # Entry point
├── frontend/
│   ├── src/
│   │   ├── api.js           # Axios instance
│   │   ├── components/      # Navbar, Hero, ProductTabs, etc.
│   │   ├── context/         # AuthContext (login state)
│   │   └── pages/           # Inicio, Productos, Servicios, etc.
│   ├── vercel.json          # SPA fallback
│   ├── vite.config.js       # Dev proxy /api → localhost:4000
│   └── package.json
├── docs/
│   ├── DEPLOY.md
│   ├── CONEXION_LOCAL.md
│   └── GUIA_IA.md
└── README.md

## URLs de producción
- Backend API: https://clinicaarosreto.onrender.com
- Frontend: https://clinica-aros-reto.vercel.app

## Conexión a MongoDB Atlas
- Usuario: alvarozapata505_db_user
- Cluster: cluster0.pmgswl3.mongodb.net
- DB: arosreto
- NOTA: El ISP del usuario (Perú) BLOQUEA consultas DNS SRV.
  Para seed local usar: node data/seed-atlas.js
- El puerto 27018 está bloqueado, solo el 27017 funciona.
- ReplicaSet no debe especificarse en la URI (el driver lo detecta solo).
- Network Access: 0.0.0.0/0 está agregado.

## API Endpoints
- POST /api/auth/registrar  (body: nombre, email, password)
- POST /api/auth/login      (body: email, password)
- GET  /api/auth/perfil     (header: Authorization: Bearer <token>)
- GET  /api/productos
- GET  /api/servicios
- GET  /api/promociones

## Variables de entorno necesarias
Backend (.env):
  MONGO_URI=<uri_de_atlas>
  JWT_SECRET=<secreto>

Frontend (entorno Vercel):
  VITE_API_URL=https://clinicaarosreto.onrender.com

## Datos seedados
- 9 productos (aros, llantas, accesorios)
- 8 servicios (reparación, mantenimiento, delivery)
- 5 promociones

## Problema crítico conocido
El ISP del usuario en Perú bloquea SRV records DNS.
Esto afecta la conexión con mongodb+srv:// desde la red local.
Solución: Usar Google DNS (8.8.8.8) manualmente como en seed-atlas.js.
En Render/Vercel esto NO es problema (sus servidores no tienen bloqueo).

## Convenciones
- Nombres en español (rutas, modelos, variables)
- Diseño con colores #fcb900 (amarillo) y #005a87 (azul)
- JWT expira en 30 días
```

---

## Archivos clave para modificar

| Archivo | Propósito |
|---|---|
| `backend/models/Producto.js` | Schema de productos |
| `backend/models/Servicio.js` | Schema de servicios |
| `backend/models/Promocion.js` | Schema de promociones |
| `backend/controllers/authController.js` | Lógica de registro/login/JWT |
| `backend/middleware/auth.js` | Protección de rutas con JWT |
| `frontend/src/api.js` | Configuración de Axios (baseURL) |
| `frontend/src/context/AuthContext.jsx` | Estado global de autenticación |
| `frontend/src/pages/` | Páginas del frontend |
| `frontend/src/components/` | Componentes reutilizables |

---

## Comandos rápidos

```bash
# Backend
cd backend && npm install && npm run dev

# Seed local
cd backend && npm run seed

# Seed Atlas (cuando ISP bloquea SRV)
cd backend && node data/seed-atlas.js

# Frontend
cd frontend && npm install && npm run dev

# Build frontend
cd frontend && npm run build
```
