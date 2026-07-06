# Guía para Alzar el Backend (Node.js + Express + MongoDB)

## Requisitos Previos

- Node.js v18 o superior instalado
- MongoDB instalado y corriendo localmente
- npm incluido con Node.js

## 1. Instalar MongoDB

### Windows

1. Descarga MongoDB Community desde https://www.mongodb.com/try/download/community
2. Ejecuta el instalador, selecciona "Complete"
3. Durante la instalación, marca "Install MongoDB as a Service"
4. Verifica que el servicio está corriendo:
   ```bash
   net start MongoDB
   ```

### Linux (Ubuntu/Debian)

```bash
# Importar clave GPG
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Agregar repositorio
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Instalar
sudo apt-get update
sudo apt-get install -y mongodb-org

# Iniciar servicio
sudo systemctl start mongod
sudo systemctl enable mongod
```

## 2. Instalar Dependencias del Backend

Abre una terminal y navega a la carpeta del backend:

```bash
cd backend
npm install
```

Esto instalará:
- `express` — Framework web
- `mongoose` — ODM para MongoDB
- `cors` — Seguridad de peticiones cruzadas
- `bcryptjs` — Encriptación de contraseñas
- `jsonwebtoken` — Tokens JWT
- `nodemon` (dev) — Recarga automática

## 3. Poblar la Base de Datos (Primera Vez)

Carga datos de ejemplo (productos, servicios y promociones):

```bash
npm run seed
```

Esto insertará:
- **9 productos** (3 aros, 3 llantas, 3 accesorios)
- **8 servicios** (reparación, mantenimiento, delivery)
- **5 promociones** con códigos de descuento

## 4. Ejecutar en Desarrollo

```bash
npm run dev
```

El servidor se levantará en `http://localhost:4000` con nodemon (recarga automática al cambiar archivos).

### Verificar que funciona

```bash
curl http://localhost:4000/api/productos
```

Deberías recibir un array JSON con los productos.

## 5. Ejecutar en Producción

```bash
npm start
```

## 6. Estructura del Backend

```
backend/
├── server.js                    # Punto de entrada: configura Express, CORS, rutas
├── package.json                 # Dependencias y scripts
├── config/
│   └── db.js                    # Conexión a MongoDB (mongoose.connect)
├── models/                      # Esquemas de la base de datos
│   ├── Usuario.js               # Autenticación (bcrypt + JWT)
│   ├── Producto.js              # Aros, llantas, accesorios
│   ├── Servicio.js              # Reparación, mantenimiento, delivery
│   └── Promocion.js             # Descuentos y ofertas
├── controllers/                 # Lógica de negocio
│   ├── authController.js        # Login, registro, perfil
│   ├── productoController.js    # CRUD de productos
│   ├── servicioController.js    # CRUD de servicios
│   └── promocionController.js   # CRUD de promociones
├── routes/                      # Definición de endpoints
│   ├── auth.js                  # POST /api/auth/login, /registrar, GET /perfil
│   ├── productos.js             # CRUD /api/productos
│   ├── servicios.js             # CRUD /api/servicios
│   └── promociones.js           # CRUD /api/promociones
├── middleware/
│   ├── auth.js                  # Protege rutas con JWT
│   └── errorHandler.js          # Captura errores globalmente
└── data/
    └── seed.js                  # Pobla la BD con datos de ejemplo
```

## 7. API Endpoints

### Autenticación

| Método | Endpoint | Body | Descripción |
|--------|----------|------|-------------|
| POST | `/api/auth/registrar` | `{ nombre, email, password, telefono }` | Registrar nuevo usuario |
| POST | `/api/auth/login` | `{ email, password }` | Iniciar sesión |
| GET | `/api/auth/perfil` | Header: `Authorization: Bearer <token>` | Obtener perfil |

### Productos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/productos` | Listar todos (filtro: `?categoria=aros`) |
| GET | `/api/productos/:id` | Obtener por ID |
| POST | `/api/productos` | Crear nuevo |
| PUT | `/api/productos/:id` | Actualizar |
| DELETE | `/api/productos/:id` | Eliminar |

### Servicios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/servicios` | Listar todos (filtro: `?tipo=reparacion`) |
| GET | `/api/servicios/:id` | Obtener por ID |
| POST | `/api/servicios` | Crear nuevo |
| PUT | `/api/servicios/:id` | Actualizar |
| DELETE | `/api/servicios/:id` | Eliminar |

### Promociones

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/promociones` | Listar promociones vigentes |
| GET | `/api/promociones/:id` | Obtener por ID |
| POST | `/api/promociones` | Crear nueva |
| PUT | `/api/promociones/:id` | Actualizar |
| DELETE | `/api/promociones/:id` | Eliminar |

## 8. Conexión a MongoDB Atlas (Producción)

Para producción, usa MongoDB Atlas en la nube:

1. Crea una cuenta en https://www.mongodb.com/atlas
2. Crea un cluster gratuito (M0)
3. Obtén tu URI de conexión
4. Configura la variable de entorno:

```bash
# En Windows PowerShell
$env:MONGO_URI="mongodb+srv://usuario:password@cluster.mongodb.net/arosreto?retryWrites=true&w=majority"

# O crea un archivo .env en backend/
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/arosreto?retryWrites=true&w=majority
JWT_SECRET=tu_secreto_super_seguro
```

> **Nota**: El código ya soporta `process.env.MONGO_URI` y `process.env.JWT_SECRET` vía `dotenv`.

## 9. Solución de Problemas

| Problema | Causa | Solución |
|----------|-------|----------|
| `ECONNREFUSED :27017` | MongoDB no está corriendo | Iniciar MongoDB: `net start MongoDB` |
| `querySrv ECONNREFUSED _mongodb._tcp.cluster...` | DNS no resuelve SRV (ISP o Windows) | Usar URI estándar sin `+srv` (ver abajo) |
| `bad auth: Authentication failed` | Usuario/contraseña incorrectos | Revisar credenciales o agregar `&authSource=admin` |
| `npm run seed` falla | MongoDB no accesible | Verificar conexión |
| Token inválido | JWT_SECRET cambiado | Usar siempre el mismo secret |
| CORS error | Frontend en otro puerto | Ya configurado en server.js con `cors()` |

### Fix: `querySrv ECONNREFUSED` en MongoDB Atlas

Algunos ISPs o configuraciones de Windows bloquean las consultas DNS tipo SRV que usa `mongodb+srv://`. Para solucionarlo:

1. Agrega `require('dotenv').config()` al inicio de `server.js` (si no está):
   ```js
   require('dotenv').config();
   ```

2. Instala `dotenv`:
   ```bash
   npm install dotenv
   ```

3. Reemplaza la URI del `.env` con el formato estándar (sin `+srv`), usando los hosts de cada shard:
   ```
   MONGO_URI=mongodb://usuario:password@shard00.mongodb.net:27017,shard01.mongodb.net:27017,shard02.mongodb.net:27017/arosreto?ssl=true&retryWrites=true&w=majority&authSource=admin
   ```

   > Para obtener los shards, ejecuta: `nslookup -type=srv _mongodb._tcp.tu-cluster.mongodb.net`
