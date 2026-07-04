# Frontend - Aplicación React de Clínica de Aros Reto S.A.C.

Aplicación SPA (Single Page Application) construida con React y Vite.

## 📋 Tabla de Contenidos

- [Tecnologías Instaladas](#tecnologías-instaladas)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Build de Producción](#build-de-producción)
- [Rutas de la Aplicación](#rutas-de-la-aplicación)
- [Componentes](#componentes)
- [Estilos y Design System](#estilos-y-design-system)
- [Proxy de API](#proxy-de-api)

## 🛠️ Tecnologías Instaladas

Dependencias del `package.json`:

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `react` | ^18.2.0 | Librería principal para la UI |
| `react-dom` | ^18.2.0 | Renderizado en el DOM |
| `react-router-dom` | ^6.20.0 | Enrutamiento SPA |
| `axios` | ^1.6.2 | Cliente HTTP para consumir la API |
| `react-icons` | ^4.12.0 | Biblioteca de íconos vectoriales |
| `vite` | ^5.0.0 (dev) | Build tool y dev server |
| `@vitejs/plugin-react` | ^4.2.0 (dev) | Plugin de Vite para React |

**¿Por qué estas dependencias?**

- **Vite**: Build tool ultrarrápido con HMR (Hot Module Replacement) instantáneo.
- **React Router DOM**: Enrutamiento declarativo para SPA con soporte de nested routes.
- **Axios**: Cliente HTTP con interceptors, mejor manejo de errores que fetch nativo.
- **React Icons**: Más de 20,000 íconos listos para importar (FontAwesome, Bootstrap, etc.).

## 📁 Estructura de Carpetas

```
frontend/
├── public/                       # Archivos estáticos
├── src/
│   ├── components/               # Componentes reutilizables
│   │   ├── Navbar.jsx            # Barra de navegación responsive
│   │   ├── Navbar.css
│   │   ├── Hero.jsx              # Banner principal con estadísticas
│   │   ├── Hero.css
│   │   ├── ProductTabs.jsx       # Tabs de productos (Aros/Llantas/Accesorios)
│   │   ├── ProductTabs.css
│   │   ├── ServicesSection.jsx   # Sección de servicios
│   │   ├── ServicesSection.css
│   │   ├── PromotionsSection.jsx # Sección de promociones
│   │   ├── PromotionsSection.css
│   │   ├── Footer.jsx            # Footer completo con contacto
│   │   └── Footer.css
│   ├── context/
│   │   └── AuthContext.jsx       # Estado global de autenticación
│   ├── pages/                    # Páginas de la aplicación
│   │   ├── Inicio.jsx            # Landing page
│   │   ├── Productos.jsx         # Catálogo completo de productos
│   │   ├── Servicios.jsx         # Página de servicios con detalle
│   │   ├── Servicios.css
│   │   ├── Promociones.jsx       # Grid de todas las promociones
│   │   ├── Promociones.css
│   │   ├── Nosotros.jsx          # Historia, Misión, Visión y Valores
│   │   ├── Nosotros.css
│   │   ├── Login.jsx             # Formulario de inicio de sesión
│   │   ├── Registro.jsx          # Formulario de registro
│   │   └── Auth.css              # Estilos compartidos de autenticación
│   ├── styles/
│   │   └── global.css            # Variables CSS y estilos globales
│   ├── App.jsx                   # Componente raíz con rutas
│   ├── main.jsx                  # Punto de entrada con providers
│   └── hooks/                    # Hooks personalizados (futuro)
├── index.html                    # HTML base
├── vite.config.js                # Configuración de Vite
├── package.json
└── README.md
```

## ⚙️ Instalación

```bash
# 1. Navegar a la carpeta frontend
cd frontend

# 2. Instalar dependencias
npm install
```

## 🚀 Ejecución

### Desarrollo

```bash
npm run dev
```

Aplicación disponible en: `http://localhost:3000`

El servidor de desarrollo de Vite incluye:
- **HMR**: Los cambios se reflejan instantáneamente
- **Proxy**: Redirige `/api/*` al backend en puerto 4000

### Producción

```bash
npm run build    # Genera build en /dist
npm run preview  # Previsualiza el build localmente
```

## 📍 Rutas de la Aplicación

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | Inicio | Landing page con Hero, Productos, Servicios y Promos |
| `/productos` | Productos | Catálogo completo con tabs por categoría |
| `/servicios` | Servicios | Detalle de todos los servicios ofrecidos |
| `/promociones` | Promociones | Grid con todas las promociones disponibles |
| `/nosotros` | Nosotros | Historia, Misión, Visión y Valores de la empresa |
| `/login` | Login | Formulario de inicio de sesión |
| `/registro` | Registro | Formulario de registro de nuevo usuario |

## 🧩 Componentes

### Navbar
- Barra de navegación fija con efecto blur
- Enlaces activos resaltados con gradiente azul
- Botones de Login/Registro o nombre de usuario/cerrar sesión según estado
- Menú responsive con toggle para mobile

### Hero
- Banner principal a pantalla completa con gradiente
- Badge corporativo con animación
- Título con highlight en dorado
- Subtítulo descriptivo
- Botones CTA (Ver Productos, Nuestros Servicios)
- Estadísticas (10+ años, 5000+ clientes, 100% garantía)
- Features flotantes (Calidad, Profesionalismo, Delivery)

### ProductTabs
- Tabs interactivas: Aros | Llantas | Accesorios
- Tarjetas de producto con imagen placeholder, marca, nombre, precio
- Badge "Destacado" en productos destacados
- Botón de compra rápida

### ServicesSection
- Fondo con gradiente azul
- 3 tarjetas: Reparación, Mantenimiento, Delivery
- Cada tarjeta con header de color distintivo
- Lista de servicios incluidos
- Indicadores de garantía y tiempo

### PromotionsSection
- Promos destacadas con badges de descuento
- Código promocional en estilo dashed
- Indicador de tiempo limitado

### Footer
- Wave SVG decorativo en la parte superior
- Logo y descripción de la empresa
- Redes sociales con efecto hover
- Enlaces rápidos
- Información de contacto (dirección, teléfono, email, horario)

### Auth (Login / Registro)
- Fondo con gradiente azul
- Tarjeta blanca centrada con sombra
- Icono corporativo en el header
- Validación de formularios
- Manejo de errores con mensajes visibles
- Alternancia entre login y registro

## 🎨 Estilos y Design System

El archivo `src/styles/global.css` define un sistema de diseño completo mediante variables CSS:

### Colores

```css
--primary: #fcb900;          /* Dorado principal */
--primary-dark: #e6a600;     /* Dorado oscuro */
--primary-light: #ffd60a;    /* Dorado claro */
--secondary: #005a87;        /* Azul principal */
--secondary-dark: #003d5c;   /* Azul oscuro */
--secondary-light: #0077b6;  /* Azul claro */
--accent: #023e8a;           /* Azul acento */
```

### Gradientes

```css
--gradient-primary:  linear-gradient(135deg, #005a87, #0077b6, #023e8a);
--gradient-accent:   linear-gradient(135deg, #fcb900, #ffd60a, #e6a600);
--gradient-hero:     linear-gradient(135deg, #003d5c, #005a87, #0077b6);
--gradient-card:     linear-gradient(145deg, #ffffff, #f8f9fa);
```

### Componentes Globales

- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline` — Botones reutilizables
- `.card` — Tarjeta con sombra y hover effect
- `.container` — Contenedor responsive (max-width: 1200px)
- `.section-title`, `.section-subtitle` — Títulos de sección con gradiente

### Animaciones

- `fadeInUp` — Animación de entrada para cards y elementos al hacer scroll
- `fadeIn` — Animación de opacidad

### Responsive

El diseño es completamente responsive con breakpoints en:
- **768px** — Tablets y móviles
- **1024px** — Tablets grandes

## 🔌 Proxy de API

En desarrollo, Vite redirige las peticiones a `/api/*` al backend:

```javascript
// vite.config.js
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:4000',
      changeOrigin: true
    }
  }
}
```

Esto evita problemas de CORS en desarrollo. En producción, el frontend build se sirve desde el mismo dominio que el backend o se configura un proxy inverso (Nginx, etc.).
