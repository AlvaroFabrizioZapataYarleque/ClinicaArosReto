# Guía para Alzar el Frontend (React + Vite)

## Requisitos Previos

- Node.js v18 o superior instalado
- npm incluido con Node.js
- El backend debe estar corriendo (ver `ALZAR_BACKEND.md`)

## 1. Instalar Dependencias

Abre una terminal y navega a la carpeta del frontend:

```bash
cd frontend
npm install
```

Esto instalará todas las dependencias listadas en `package.json`:
- `react`, `react-dom` — Librería principal
- `react-router-dom` — Enrutamiento SPA
- `axios` — Cliente HTTP para consumir la API
- `react-icons` — Íconos vectoriales
- `vite`, `@vitejs/plugin-react` — Build tool

## 2. Ejecutar en Desarrollo

```bash
npm run dev
```

El servidor de desarrollo se levantará en `http://localhost:3000`.

### Características del Dev Server

- **Hot Module Replacement (HMR)**: Los cambios en el código se reflejan al instante sin recargar la página
- **Proxy automático**: Las peticiones a `/api/*` se redirigen al backend en `http://localhost:4000` (configurado en `vite.config.js`)

## 3. Build para Producción

```bash
npm run build
```

Esto genera la carpeta `dist/` con los archivos estáticos optimizados:
- HTML minificado
- CSS purgado y minificado (~23 KB)
- JS empaquetado y minificado (~262 KB, ~87 KB gzip)

### Previsualizar el Build

```bash
npm run preview
```

Sirve el contenido de `dist/` localmente para verificar antes de desplegar.

## 4. Estructura del Frontend

```
frontend/
├── index.html                # Punto de entrada HTML
├── vite.config.js            # Configuración de Vite (proxy, plugins)
├── package.json              # Dependencias y scripts
├── public/                   # Archivos estáticos
└── src/
    ├── main.jsx              # Punto de entrada React (BrowserRouter + AuthProvider)
    ├── App.jsx               # Componente raíz (define las rutas)
    ├── styles/global.css     # Design system (variables CSS, botones, animaciones)
    ├── context/AuthContext.jsx  # Estado global de autenticación
    ├── components/           # Componentes reutilizables
    │   ├── Navbar.jsx        # Barra de navegación
    │   ├── Hero.jsx          # Banner principal
    │   ├── ProductTabs.jsx   # Tabs de productos
    │   ├── ServicesSection.jsx  # Sección de servicios
    │   ├── PromotionsSection.jsx # Sección de promociones
    │   └── Footer.jsx        # Pie de página
    ├── pages/                # Páginas de la aplicación
    │   ├── Inicio.jsx        # Landing page
    │   ├── Productos.jsx     # Catálogo de productos
    │   ├── Servicios.jsx     # Servicios detallados
    │   ├── Promociones.jsx   # Todas las promociones
    │   ├── Nosotros.jsx      # Historia + Misión + Visión + Valores
    │   ├── Login.jsx         # Inicio de sesión
    │   └── Registro.jsx      # Registro de usuarios
    └── hooks/                # Hooks personalizados (para futuros desarrollos)
```

## 5. Variables de Entorno (Opcional)

Si necesitas apuntar a un backend en producción, crea un archivo `.env` en `frontend/`:

```env
VITE_API_URL=https://tu-dominio.com/api
```

Luego úsalo en el código con `import.meta.env.VITE_API_URL`.

## 6. Despliegue en Producción

### Opción A: Servir con Nginx

```nginx
server {
    listen 80;
    server_name tudominio.com;

    root /var/www/aros-reto/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Opción B: Netlify / Vercel

Sube la carpeta `frontend/` completa y configura:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Redirects**: `/* /index.html 200` (para SPA routing)

### Opción C: GitHub Pages

1. Build: `npm run build`
2. Sube la carpeta `dist/` a la rama `gh-pages`
3. O usa el action `peaceiris/actions-gh-pages`

## 7. Solución de Problemas

| Problema | Causa | Solución |
|----------|-------|----------|
| `npm run dev` no funciona | Node.js desactualizado | Instalar Node.js v18+ |
| Error de CORS | Backend no corriendo | Iniciar backend en puerto 4000 |
| Página en blanco | Error en consola | Revisar `vite.config.js` |
| Build falla | Error de sintaxis | Revisar logs del build |
| Rutas no funcionan | SPA routing mal configurado | Agregar regla de redirección al servidor |
