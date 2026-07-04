# Contexto del Proyecto para Asistentes IA

Este archivo describe el proyecto **Clínica de Aros Reto S.A.C.** para que un asistente IA pueda entender el contexto completo y ayudar con correcciones, nuevas funcionalidades o mejoras.

## 1. Información General

- **Nombre del Proyecto**: Clínica de Aros Reto S.A.C. (Aros Reto)
- **Tipo**: Plataforma web corporativa + catálogo de productos/servicios
- **Stack**: React + Vite (frontend) | Node.js + Express + MongoDB (backend)
- **Repositorio**: https://github.com/TU_USUARIO/aros-reto

## 2. Carpeta Raíz

La carpeta raíz del proyecto es `ArosReto/`. Contiene dos subproyectos independientes:

```
ArosReto/
├── backend/         → API REST con Node.js + Express + MongoDB
├── frontend/        → SPA con React + Vite
├── AI_CONTEXT.md    → Este archivo (contexto para IA)
├── README.md        → Documentación principal
└── .gitignore       → Archivos ignorados por Git
```

## 3. Backend (`backend/`)

### 3.1 Stack
- Node.js 18+, Express 4.18.2, Mongoose 7.6.3
- MongoDB como base de datos
- JWT (jsonwebtoken 9.0.2) para autenticación
- bcryptjs 2.4.3 para hash de contraseñas

### 3.2 Puertos
- Desarrollo: `http://localhost:4000`
- MongoDB: `mongodb://localhost:27017/arosreto`

### 3.3 Scripts
```json
{
  "start": "node server.js",
  "dev": "nodemon server.js",
  "seed": "node data/seed.js"
}
```

### 3.4 Estructura de Rutas

| Verbo | Ruta | Controlador | Middleware |
|-------|------|-------------|------------|
| POST | /api/auth/registrar | authController.registrar | - |
| POST | /api/auth/login | authController.login | - |
| GET | /api/auth/perfil | authController.perfil | proteger |
| GET | /api/productos | productoController.obtenerProductos | - |
| GET | /api/productos/:id | productoController.obtenerProducto | - |
| POST | /api/productos | productoController.crearProducto | - |
| PUT | /api/productos/:id | productoController.actualizarProducto | - |
| DELETE | /api/productos/:id | productoController.eliminarProducto | - |
| GET | /api/servicios | servicioController.obtenerServicios | - |
| GET | /api/servicios/:id | servicioController.obtenerServicio | - |
| POST | /api/servicios | servicioController.crearServicio | - |
| PUT | /api/servicios/:id | servicioController.actualizarServicio | - |
| DELETE | /api/servicios/:id | servicioController.eliminarServicio | - |
| GET | /api/promociones | promocionController.obtenerPromociones | - |
| GET | /api/promociones/:id | promocionController.obtenerPromocion | - |
| POST | /api/promociones | promocionController.crearPromocion | - |
| PUT | /api/promociones/:id | promocionController.actualizarPromocion | - |
| DELETE | /api/promociones/:id | promocionController.eliminarPromocion | - |

### 3.5 Filtros disponibles
- `GET /api/productos?categoria=aros` → Filtra por categoría
- `GET /api/productos?categoria=llantas` → Filtra por categoría
- `GET /api/productos?categoria=accesorios` → Filtra por categoría
- `GET /api/servicios?tipo=reparacion` → Filtra por tipo
- `GET /api/servicios?tipo=mantenimiento` → Filtra por tipo
- `GET /api/servicios?tipo=delivery` → Filtra por tipo

### 3.6 Modelos de Datos

**Usuario**
- nombre: String (requerido)
- email: String (requerido, único)
- password: String (requerido, se hashea automáticamente con bcrypt)
- telefono: String
- direccion: String
- rol: String (enum: 'cliente' | 'admin', default: 'cliente')
- Método: `compararPassword(password)` → boolean

**Producto**
- nombre: String (requerido)
- categoria: String (requerido, enum: 'aros' | 'llantas' | 'accesorios')
- descripcion: String (requerido)
- precio: Number (requerido)
- imagen: String
- marca: String
- medidas: String
- stock: Number
- disponible: Boolean (default: true)
- destacado: Boolean (default: false)

**Servicio**
- nombre: String (requerido)
- tipo: String (requerido, enum: 'reparacion' | 'mantenimiento' | 'delivery')
- descripcion: String (requerido)
- precio: Number
- duracion: String (ej: "2-3 días")
- disponible: Boolean (default: true)

**Promocion**
- titulo: String (requerido)
- descripcion: String (requerido)
- descuento: Number (requerido, porcentaje)
- codigo: String (código promocional)
- vigente: Boolean (default: true)
- fechaInicio: Date
- fechaFin: Date

## 4. Frontend (`frontend/`)

### 4.1 Stack
- React 18.2.0, Vite 5.x
- React Router DOM 6.20.0 (SPA routing)
- Axios 1.6.2 (HTTP client)
- React Icons 4.12.0 (íconos)

### 4.2 Puertos
- Desarrollo: `http://localhost:3000`
- Proxy automático: `/api/*` → `http://localhost:4000`

### 4.3 Scripts
```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

### 4.4 Rutas del Frontend

| Ruta | Archivo | Componente |
|------|---------|------------|
| `/` | `Inicio.jsx` | Hero + ProductTabs + ServicesSection + PromotionsSection |
| `/productos` | `Productos.jsx` | ProductTabs (completo) |
| `/servicios` | `Servicios.jsx` | Detalle de servicios |
| `/promociones` | `Promociones.jsx` | Grid de promos |
| `/nosotros` | `Nosotros.jsx` | Historia, Misión, Visión, Valores |
| `/login` | `Login.jsx` | Formulario de inicio de sesión |
| `/registro` | `Registro.jsx` | Formulario de registro |

### 4.5 Componentes Principales

**Navbar**
- Props/Funcionalidad: Menú responsive, enlaces activos, auth state
- Estado: `abierto` (boolean, toggle menú mobile)
- Dependencias: `react-router-dom` (Link, useLocation), `AuthContext` (useAuth), `react-icons/hi` (HiMenu, HiX), `react-icons/fa` (FaUser, FaSignOutAlt)

**Hero**
- Props/Funcionalidad: Banner principal con estadísticas y features
- Sin props externos, datos estáticos
- Animaciones CSS con `fadeInUp`

**ProductTabs**
- Props: `limitado` (boolean, si es true muestra solo 4 items)
- Estado: `activo` (string, tab actual: 'aros' | 'llantas' | 'accesorios')
- Datos: Hardcodeados en el componente (productos mock)
- Íconos: `GiCarWheel`, `GiTireTracks`, `HiOutlineSparkles`

**ServicesSection**
- Datos estáticos con 3 servicios (Reparación, Mantenimiento, Delivery)
- Animaciones con `fadeInUp`

**PromotionsSection**
- Props/Funcionalidad: Muestra 3 promociones destacadas con enlace a /promociones
- Datos estáticos

**Footer**
- Información de contacto estática
- Wave SVG decorativo
- Redes sociales con hover effect

### 4.6 Autenticación (AuthContext)

```javascript
// Contexto disponible con useAuth()
const { usuario, token, cargando, login, registrar, cerrarSesion } = useAuth();
```

- **login(email, password)**: POST /api/auth/login → guarda token en localStorage
- **registrar({nombre, email, password, telefono})**: POST /api/auth/registrar → guarda token
- **cerrarSesion()**: Elimina token de localStorage y limpia estado
- **Persistencia**: Al cargar la app, busca token en localStorage y obtiene perfil vía GET /api/auth/perfil

### 4.7 Estilos

- **Design system**: Variables CSS en `src/styles/global.css`
- **Paleta**:
  - `#fcb900` (dorado primario)
  - `#005a87` (azul secundario)
  - `#0077b6` (azul claro)
  - `#023e8a` (azul acento)
- **Gradientes**: 4 gradientes definidos para diferentes usos
- **Animaciones**: `fadeInUp` (0.6s, desde translateY(30px))
- **Responsive**: Breakpoints en 768px y 1024px
- **Componentes globales**: `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.card`, `.section-title`, `.section-subtitle`

## 5. Cómo ejecutar el proyecto completo

```bash
# Terminal 1: Backend
cd ArosReto
cd backend
npm install
npm run seed     # Solo la primera vez
npm run dev

# Terminal 2: Frontend
cd ArosReto
cd frontend
npm install
npm run dev

# Abrir en navegador: http://localhost:3000
```

## 6. Posibles mejoras futuras

- [ ] Conexión real a MongoDB Atlas (producción)
- [ ] Variables de entorno (.env) para secrets
- [ ] Panel de administración para CRUD de productos
- [ ] Carrito de compras funcional
- [ ] Pasarela de pagos (Mercado Pago, Culqi)
- [ ] Subida de imágenes a Cloudinary/S3
- [ ] Modo oscuro
- [ ] PWA (Progressive Web App)
- [ ] SEO con React Helmet
- [ ] Tests unitarios (Jest + React Testing Library)
- [ ] Docker compose para el stack completo
- [ ] CI/CD con GitHub Actions
- [ ] Internacionalización (i18n) para otros idiomas
- [ ] Notificaciones push
- [ ] Chat en vivo con WebSockets

## 7. Convenciones del Proyecto

- **Nombres de archivos**: PascalCase para componentes, camelCase para utilidades
- **CSS**: Archivos separados por componente (`.jsx` + `.css` homónimos)
- **Rutas API**: En español y plural (`/api/productos`, `/api/servicios`)
- **Ids de modelos**: `_id` (MongoDB ObjectId)
- **Estado global**: Context API (sin Redux para mantenerlo simple)
- **Commits Git**: Formato convencional (feat:, fix:, docs:, refactor:, etc.)
