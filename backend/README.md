# Backend - API de Clínica de Aros Reto S.A.C.

API RESTful para la plataforma de venta y servicios de aros para automóviles.

## 📋 Tabla de Contenidos

- [Tecnologías Instaladas](#tecnologías-instaladas)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Scripts Disponibles](#scripts-disponibles)
- [Modelos de Datos](#modelos-de-datos)
- [Autenticación](#autenticación)
- [Buenas Prácticas](#buenas-prácticas)

## 🛠️ Tecnologías Instaladas

Dependencias del `package.json`:

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `express` | ^4.18.2 | Framework web para Node.js |
| `mongoose` | ^7.6.3 | ODM para MongoDB |
| `cors` | ^2.8.5 | Middleware de seguridad CORS |
| `bcryptjs` | ^2.4.3 | Encriptación de contraseñas |
| `jsonwebtoken` | ^9.0.2 | Tokens JWT para autenticación |
| `nodemon` | ^3.0.1 (dev) | Recarga automática en desarrollo |

**¿Por qué estas dependencias?**

- **Express**: Framework minimalista y rápido para construir APIs REST.
- **Mongoose**: Facilita la interacción con MongoDB mediante esquemas y validaciones.
- **bcryptjs**: Algoritmo seguro para hash de contraseñas (versión JS pura, sin bindings nativos).
- **jsonwebtoken**: Implementación de JWT para autenticación stateless.
- **nodemon**: Reinicia automáticamente el servidor al detectar cambios en desarrollo.

## 📁 Estructura de Carpetas

```
backend/
├── config/
│   └── db.js                  # Configuración de conexión a MongoDB
├── controllers/
│   ├── authController.js       # Lógica de autenticación
│   ├── productoController.js   # CRUD de productos
│   ├── servicioController.js   # CRUD de servicios
│   └── promocionController.js  # CRUD de promociones
├── data/
│   └── seed.js                 # Script para poblar la BD con datos iniciales
├── middleware/
│   ├── auth.js                 # Middleware de protección por JWT
│   └── errorHandler.js         # Middleware global de errores
├── models/
│   ├── Usuario.js             # Modelo de usuario con bcrypt
│   ├── Producto.js            # Modelo de productos (aros, llantas, accesorios)
│   ├── Servicio.js            # Modelo de servicios (reparación, mantenimiento, delivery)
│   └── Promocion.js           # Modelo de promociones
├── routes/
│   ├── auth.js                # Rutas de autenticación
│   ├── productos.js           # Rutas de productos
│   ├── servicios.js           # Rutas de servicios
│   └── promociones.js         # Rutas de promociones
├── server.js                   # Punto de entrada de la aplicación
├── package.json
└── README.md
```

## ⚙️ Instalación

```bash
# 1. Navegar a la carpeta backend
cd backend

# 2. Instalar dependencias
npm install
```

## 🚀 Ejecución

### Desarrollo (con recarga automática)

```bash
npm run dev
```

Servidor disponible en: `http://localhost:4000`

### Producción

```bash
npm start
```

### Poblar Base de Datos

Antes de usar la aplicación, ejecuta el seed para cargar datos de ejemplo:

```bash
npm run seed
```

Esto insertará:
- **9 productos**: 3 aros, 3 llantas, 3 accesorios
- **8 servicios**: 3 reparación, 3 mantenimiento, 2 delivery
- **5 promociones**: con descuentos del 15% al 100%

## 📦 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor en producción |
| `npm run dev` | Inicia con nodemon (recarga automática) |
| `npm run seed` | Pobla la base de datos con datos de ejemplo |

## 📊 Modelos de Datos

### Usuario

| Campo | Tipo | Descripción |
|-------|------|-------------|
| nombre | String (req) | Nombre completo |
| email | String (req, unique) | Correo electrónico |
| password | String (req) | Contraseña (hasheada con bcrypt) |
| telefono | String | Teléfono de contacto |
| direccion | String | Dirección |
| rol | String | `cliente` (por defecto) o `admin` |

### Producto

| Campo | Tipo | Descripción |
|-------|------|-------------|
| nombre | String (req) | Nombre del producto |
| categoria | String (req) | `aros`, `llantas` o `accesorios` |
| descripcion | String (req) | Descripción del producto |
| precio | Number (req) | Precio en soles |
| imagen | String | URL de la imagen |
| marca | String | Marca del producto |
| medidas | String | Medidas del producto |
| stock | Number | Cantidad en stock |
| disponible | Boolean | Si está disponible |
| destacado | Boolean | Si es producto destacado |

### Servicio

| Campo | Tipo | Descripción |
|-------|------|-------------|
| nombre | String (req) | Nombre del servicio |
| tipo | String (req) | `reparacion`, `mantenimiento` o `delivery` |
| descripcion | String (req) | Descripción del servicio |
| precio | Number | Precio del servicio |
| imagen | String | URL de la imagen |
| duracion | String | Tiempo estimado |
| disponible | Boolean | Si está disponible |

### Promocion

| Campo | Tipo | Descripción |
|-------|------|-------------|
| titulo | String (req) | Título de la promoción |
| descripcion | String (req) | Descripción detallada |
| descuento | Number (req) | Porcentaje de descuento |
| codigo | String | Código promocional |
| imagen | String | URL de la imagen |
| vigente | Boolean | Si la promoción está activa |
| fechaInicio | Date | Fecha de inicio |
| fechaFin | Date | Fecha de expiración |

## 🔐 Autenticación

El sistema usa **JWT (JSON Web Tokens)** para autenticación stateless.

### Flujo

1. **Registro**: `POST /api/auth/registrar` — Crea un usuario y devuelve un token
2. **Login**: `POST /api/auth/login` — Verifica credenciales y devuelve un token
3. **Perfil**: `GET /api/auth/perfil` — Requiere token en header `Authorization: Bearer <token>`

### Middleware de protección

```javascript
// Ejemplo de uso en rutas protegidas
const { proteger } = require('../middleware/auth');
router.get('/perfil', proteger, perfil);
```

### Almacenamiento de contraseñas

Las contraseñas se almacenan usando **bcryptjs** con salt de 10 rondas. Nunca se almacenan en texto plano.

## 🧪 Buenas Prácticas

- **Rutas en español**: URLs descriptivas en español (`/api/productos`, `/api/servicios`)
- **Manejo de errores centralizado**: Middleware `errorHandler.js` captura y formatea todos los errores
- **Validación**: Los modelos incluyen validación de campos requeridos y enum para categorías
- **Separación de responsabilidades**: Modelos, controladores y rutas en archivos separados
- **Variables de entorno**: Soporte para `MONGO_URI` y `JWT_SECRET` via `process.env`
