# Arquitectura del Proyecto — Clínica de Aros Reto S.A.C.

## Tech Stack

```
Frontend (Vercel)          Backend (Render)          Database (Atlas)
┌─────────────┐    HTTP    ┌──────────────┐   SRV    ┌──────────────┐
│  React+Vite  │ ───/api──> │  Express+Node │ ──────> │   MongoDB    │
│  React Router │ <───JSON── │  Mongoose ODM │ <────── │   Atlas M0   │
│  Axios       │            │  JWT Auth     │         │              │
│  React Icons │            │  CORS         │         │              │
└─────────────┘            └──────────────┘         └──────────────┘
```

---

## Estructura de directorios

```
ClinicaArosReto/
├── backend/                          # API REST (Node.js + Express)
│   ├── config/
│   │   └── db.js                     # Conexión a MongoDB (mongoose)
│   ├── controllers/
│   │   ├── authController.js         # Registro, login, perfil
│   │   ├── productoController.js     # CRUD productos
│   │   ├── servicioController.js     # CRUD servicios
│   │   └── promocionController.js    # CRUD promociones
│   ├── data/
│   │   ├── seed.js                   # Seed para MongoDB local
│   │   └── seed-atlas.js             # Seed para Atlas (resuelve SRV con Google DNS)
│   ├── middleware/
│   │   ├── auth.js                   # Verificación de JWT
│   │   └── errorHandler.js           # Manejo global de errores
│   ├── models/
│   │   ├── Usuario.js                # Schema de usuarios
│   │   ├── Producto.js               # Schema de productos
│   │   ├── Servicio.js               # Schema de servicios
│   │   └── Promocion.js              # Schema de promociones
│   ├── routes/
│   │   ├── auth.js                   # /api/auth/*
│   │   ├── productos.js              # /api/productos/*
│   │   ├── servicios.js              # /api/servicios/*
│   │   └── promociones.js            # /api/promociones/*
│   ├── .env                          # Variables de entorno (local)
│   └── server.js                     # Entry point
│
├── frontend/                         # Cliente React + Vite
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx            # Navegación responsive
│   │   │   ├── Hero.jsx              # Banner principal
│   │   │   ├── ProductTabs.jsx       # Tabs de productos por categoría
│   │   │   ├── ServicesSection.jsx   # Lista de servicios
│   │   │   ├── PromotionsSection.jsx # Grid de promociones
│   │   │   └── Footer.jsx            # Footer con info de contacto
│   │   ├── context/
│   │   │   └── AuthContext.jsx        # Estado global de autenticación
│   │   ├── pages/
│   │   │   ├── Inicio.jsx            # Landing page
│   │   │   ├── Productos.jsx         # Tienda de productos
│   │   │   ├── Servicios.jsx         # Página de servicios
│   │   │   ├── Promociones.jsx       # Página de ofertas
│   │   │   ├── Nosotros.jsx          # About us
│   │   │   ├── Login.jsx            # Inicio de sesión
│   │   │   └── Registro.jsx         # Crear cuenta
│   │   ├── App.jsx                   # Router principal
│   │   ├── api.js                    # Cliente Axios configurado
│   │   └── main.jsx                  # Entry point React
│   ├── vercel.json                   # SPA fallback para Vercel
│   └── vite.config.js               # Dev proxy /api → localhost:4000
│
├── docs/                             # Documentación
│   ├── ARQUITECTURA.md
│   ├── CONEXION_LOCAL.md
│   ├── DEPLOY.md
│   └── GUIA_IA.md
│
├── .gitignore
└── README.md
```

---

## Modelos de datos

### Usuario
```
{
  nombre:     String (req),
  email:      String (req, unique),
  password:   String (req, hasheado con bcryptjs),
  rol:        String ("usuario"|"admin", default: "usuario"),
  createdAt:  Date (auto)
}
```

### Producto
```
{
  nombre:      String (req),
  categoria:   String ("aros"|"llantas"|"accesorios"),
  descripcion: String,
  precio:      Number (req),
  imagen:      String,
  marca:       String,
  medidas:     String,
  stock:       Number (req, default: 0),
  disponible:  Boolean (default: true),
  destacado:   Boolean (default: false)
}
```

### Servicio
```
{
  nombre:      String (req),
  tipo:        String ("reparacion"|"mantenimiento"|"delivery"),
  descripcion: String,
  precio:      Number (req),
  imagen:      String,
  duracion:    String,
  disponible:  Boolean (default: true)
}
```

### Promocion
```
{
  titulo:      String (req),
  descripcion: String,
  descuento:   Number (req),
  codigo:      String (req),
  imagen:      String,
  vigente:     Boolean (default: true),
  fechaInicio: Date (default: now)
}
```

---

## API Endpoints

### Autenticación
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/api/auth/registrar` | Crear cuenta | No |
| POST | `/api/auth/login` | Iniciar sesión | No |
| GET | `/api/auth/perfil` | Obtener perfil | JWT |

### Productos
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/api/productos` | Listar todos | No |
| GET | `/api/productos/:id` | Obtener uno | No |
| POST | `/api/productos` | Crear | Admin |
| PUT | `/api/productos/:id` | Actualizar | Admin |
| DELETE | `/api/productos/:id` | Eliminar | Admin |

### Servicios (misma estructura que productos)
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/servicios` | Listar |
| GET | `/api/servicios/:id` | Obtener uno |

### Promociones (misma estructura)
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/promociones` | Listar |
| GET | `/api/promociones/:id` | Obtener una |

---

## Flujo de datos

```
1. Usuario abre frontend (Vercel)
2. React carga la app, componentes hacen fetch a /api/*
3. Vite proxy (dev) o VITE_API_URL (prod) dirige a backend
4. Express recibe request, la rutea al controlador
5. Controlador usa Mongoose para consultar MongoDB Atlas
6. Respuesta JSON viaja de vuelta al frontend
7. React renderiza los datos
```

---

## Seguridad

- **Passwords:** Hasheados con bcryptjs (10 rounds)
- **JWT:** Token con expiración de 30 días
- **Rutas protegidas:** Middleware `auth.js` verifica Bearer token
- **CORS:** Abierto (`cors()` sin opciones) para desarrollo
- **Variables de entorno:** `.env` en .gitignore (no se sube a GitHub)
