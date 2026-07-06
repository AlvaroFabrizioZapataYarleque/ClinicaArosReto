# Conexión Local — Clínica de Aros Reto S.A.C.

Guía para ejecutar el proyecto completo en un entorno local (desarrollo).

---

## Requisitos

- **Node.js** v18 o superior
- **npm**
- **MongoDB** (local o Atlas)
- **Git**

---

## 1. Clonar el repositorio

```bash
git clone https://github.com/AlvaroFabrizioZapataYarleque/ClinicaArosReto.git
cd ClinicaArosReto
```

---

## 2. Backend

### 2.1 Configurar variables de entorno

Crea `backend/.env`:

```env
# Modo local (MongoDB en localhost)
MONGO_URI=mongodb://localhost:27017/arosreto

# Modo Atlas (si prefieres usar la nube desde local)
# MONGO_URI=mongodb+srv://<usuario>:<contraseña>@cluster0.xxxxx.mongodb.net/arosreto

JWT_SECRET=mi_secreto_local_2024
```

### 2.2 Instalar dependencias

```bash
cd backend
npm install
```

### 2.3 Iniciar MongoDB local

**Windows:**
```bash
# Si MongoDB está instalado como servicio
net start MongoDB

# O manualmente
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath="C:\data\db"
```

**Linux/Mac:**
```bash
sudo systemctl start mongod
```

### 2.4 Poblar la base de datos

#### Opción A — MongoDB local
```bash
cd backend
npm run seed
```

#### Opción B — MongoDB Atlas (si tu ISP bloquea SRV)
```bash
cd backend
node data/seed-atlas.js
```

> El script `seed-atlas.js` usa Google DNS (8.8.8.8) para resolver los SRV records que algunos ISP peruanos bloquean.

### 2.5 Iniciar el servidor

```bash
cd backend
npm run dev    # Con nodemon (hot reload)
# o
npm start      # Sin nodemon
```

El servidor correrá en `http://localhost:4000`.

---

## 3. Frontend

### 3.1 Instalar dependencias

```bash
cd frontend
npm install
```

### 3.2 Iniciar en modo desarrollo

```bash
cd frontend
npm run dev
```

El frontend correrá en `http://localhost:3000`.

Vite configura automáticamente un proxy: las peticiones a `/api/*` se redirigen a `http://localhost:4000`.

### 3.3 Build para producción

```bash
cd frontend
npm run build
npm run preview   # Servir el build localmente
```

---

## 4. Probar la conexión

- **Backend:** `http://localhost:4000/api/productos`
- **Frontend:** `http://localhost:3000`
- **Registro:** `POST http://localhost:4000/api/auth/registrar`
- **Login:** `POST http://localhost:4000/api/auth/login`

---

## 5. Estructura de puertos

| Servicio | Puerto | Entorno |
|---|---|---|
| Frontend (Vite) | 3000 | Desarrollo |
| Backend (Express) | 4000 | Desarrollo |
| MongoDB | 27017 | Local |
| Frontend (Vercel) | 443 | Producción |
| Backend (Render) | 10000 | Producción |

---

## 6. Solución de problemas comunes

### ISP bloquea DNS SRV / querySrv ECONNREFUSED

**Síntoma:** Error `querySrv ECONNREFUSED _mongodb._tcp.cluster0.xxxxx.mongodb.net`

**Causa:** El driver de MongoDB en Node.js usa `dns.resolveSrv()` para resolver `mongodb+srv://`. Algunos ISP o configuraciones de Windows bloquean las consultas SRV.

**Solución 1 — Usar URI estándar (recomendado):**
```env
MONGO_URI=mongodb://usuario:password@shard00.mongodb.net:27017,shard01.mongodb.net:27017,shard02.mongodb.net:27017/arosreto?ssl=true&retryWrites=true&w=majority&authSource=admin
```
Para obtener los hosts de cada shard, ejecuta:
```bash
nslookup -type=srv _mongodb._tcp.tu-cluster.mongodb.net
```

**Solución 2 — Seed alternativo (solo para poblar):**
```bash
node data/seed-atlas.js
```

**Solución 3 — Forzar dotenv (si el .env no se carga):**
Asegúrate de que `server.js` tenga `require('dotenv').config()` al inicio y que `dotenv` esté instalado:
```bash
npm install dotenv
```

### Puerto 27017 bloqueado por ISP

**Síntoma:** `Test-NetConnection <host> -Port 27017` falla o Mongoose no conecta.

**Solución:**
- Verifica con `Test-NetConnection ac-xxxxx-shard-00-00.xxxxx.mongodb.net -Port 27017`
- Si el puerto está abierto pero Mongoose falla, prueba conectando sin especificar `replicaSet`:
  ```
  mongodb://user:pass@host1:27017,host2:27017,host3:27017/db?ssl=true
  ```

### MongoNetworkError / auth失败

**Síntoma:** Error de autenticación al conectar a Atlas.

**Solución:** Verifica que en Atlas Network Access esté agregada tu IP o `0.0.0.0/0`.
