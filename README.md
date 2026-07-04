# Clínica de Aros Reto S.A.C.

![Aros Reto](https://img.shields.io/badge/Aros%20Reto-v1.0.0-blue)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB)
![Node](https://img.shields.io/badge/Node.js-18.x-339933)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248)

Plataforma web oficial de **Clínica de Aros Reto S.A.C.**, empresa peruana con más de 10 años de experiencia en reparación, mantenimiento y venta de aros para todo tipo de automóviles.

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [Despliegue en GitHub Pages (Opcional)](#despliegue-en-github-pages-opcional)

## 📖 Descripción del Proyecto

Sitio web corporativo con catálogo de productos y servicios para la empresa **Clínica de Aros Reto S.A.C.** Incluye:

- **Landing Page** con hero section, estadísticas y características
- **Catálogo de Productos** con tabs por categoría: Aros, Llantas, Accesorios
- **Servicios**: Reparación, Mantenimiento y Delivery
- **Promociones** con códigos de descuento
- **Página Institucional**: Historia, Misión, Visión y Valores
- **Autenticación**: Login y Registro de usuarios

### 🎨 Identidad Visual

| Elemento | Código | Uso |
|----------|--------|-----|
| **Color Primario** | `#fcb900` | Dorado corporativo, acentos, badges |
| **Color Secundario** | `#005a87` | Azul profundo, headers, fondos |
| **Gradiente Principal** | `#005a87 → #0077b6 → #023e8a` | Fondos de secciones |
| **Gradiente Acento** | `#fcb900 → #ffd60a → #e6a600` | Botones, elementos destacados |

## 🛠️ Tecnologías Utilizadas

### Frontend (`/frontend`)

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 18.2.0 | Librería UI |
| Vite | 5.x | Build tool y dev server |
| React Router DOM | 6.20.0 | Rutas SPA |
| Axios | 1.6.2 | HTTP client |
| React Icons | 4.12.0 | Íconos vectoriales |

### Backend (`/backend`)

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Node.js | 18.x | Runtime |
| Express | 4.18.2 | Framework HTTP |
| MongoDB / Mongoose | 7.x | Base de datos NoSQL |
| JSON Web Token | 9.0.2 | Autenticación |
| bcryptjs | 2.4.3 | Hash de contraseñas |
| CORS | 2.8.5 | Seguridad de peticiones |

## 📁 Estructura del Proyecto

```
ArosReto/
├── backend/                    # API REST
│   ├── config/db.js           # Conexión a MongoDB
│   ├── controllers/           # Lógica de negocio
│   │   ├── authController.js  # Login, registro, perfil
│   │   ├── productoController.js
│   │   ├── servicioController.js
│   │   └── promocionController.js
│   ├── data/seed.js           # Datos de ejemplo para la DB
│   ├── middleware/
│   │   ├── auth.js            # Middleware JWT
│   │   └── errorHandler.js    # Manejo de errores
│   ├── models/                # Esquemas Mongoose
│   │   ├── Usuario.js
│   │   ├── Producto.js
│   │   ├── Servicio.js
│   │   └── Promocion.js
│   ├── routes/                # Rutas REST
│   │   ├── auth.js
│   │   ├── productos.js
│   │   ├── servicios.js
│   │   └── promociones.js
│   ├── server.js              # Punto de entrada
│   └── package.json
│
├── frontend/                   # Aplicación React
│   ├── src/
│   │   ├── components/        # Componentes reutilizables
│   │   │   ├── Navbar.jsx     # Barra de navegación
│   │   │   ├── Hero.jsx       # Banner principal
│   │   │   ├── ProductTabs.jsx # Tabs de productos
│   │   │   ├── ServicesSection.jsx
│   │   │   ├── PromotionsSection.jsx
│   │   │   └── Footer.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Estado de autenticación
│   │   ├── pages/             # Páginas
│   │   │   ├── Inicio.jsx
│   │   │   ├── Productos.jsx
│   │   │   ├── Servicios.jsx
│   │   │   ├── Promociones.jsx
│   │   │   ├── Nosotros.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Registro.jsx
│   │   └── styles/
│   │       └── global.css     # Design system y variables CSS
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── AI_CONTEXT.md               # Contexto para asistentes IA
└── README.md
```

## ⚙️ Requisitos Previos

- **Node.js** v18 o superior
- **MongoDB** corriendo localmente (puerto por defecto 27017)
- **npm** incluido con Node.js

## 🚀 Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/aros-reto.git
cd aros-reto
```

### 2. Backend

```bash
cd backend
npm install                    # Instalar dependencias
npm run seed                   # Poblar base de datos con datos de ejemplo
npm run dev                    # Iniciar servidor (puerto 4000)
```

El backend se ejecutará en `http://localhost:4000`.

### 3. Frontend

Abre otra terminal:

```bash
cd frontend
npm install                    # Instalar dependencias
npm run dev                    # Iniciar servidor de desarrollo (puerto 3000)
```

El frontend se ejecutará en `http://localhost:3000`.

### 4. Abrir en el navegador

Visita [http://localhost:3000](http://localhost:3000)

## 📡 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/registrar` | Registrar nuevo usuario |
| POST | `/api/auth/login` | Iniciar sesión |
| GET | `/api/auth/perfil` | Obtener perfil del usuario (requiere token) |
| GET | `/api/productos` | Listar productos (filtro: `?categoria=aros`) |
| GET | `/api/productos/:id` | Obtener producto por ID |
| POST | `/api/productos` | Crear producto |
| PUT | `/api/productos/:id` | Actualizar producto |
| DELETE | `/api/productos/:id` | Eliminar producto |
| GET | `/api/servicios` | Listar servicios (filtro: `?tipo=reparacion`) |
| GET | `/api/promociones` | Listar promociones vigentes |

## 📦 Build de Producción

### Frontend

```bash
cd frontend
npm run build
```

El build se genera en `frontend/dist/`.

## 🤝 Contribuir

1. Haz fork del proyecto
2. Crea tu rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. Push (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Todos los derechos reservados - Clínica de Aros Reto S.A.C.
