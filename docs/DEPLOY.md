# Guía de Despliegue — Clínica de Aros Reto S.A.C.

## Stack
- **Frontend:** React + Vite (alojado en Vercel)
- **Backend:** Node.js + Express + Mongoose (alojado en Render)
- **Base de datos:** MongoDB Atlas (M0 gratis)

---

## 1. MongoDB Atlas

### Crear cluster
1. Ve a https://cloud.mongodb.com e inicia sesión
2. Crea un proyecto (ej: `ClinicaArosReto`)
3. Build a Database → **M0 Free** (512 MB storage)
4. Elige región (ej: `us-east-1`)
5. Crea un **Database User** (User y Password)
6. En **Network Access** → Add IP Address → `0.0.0.0/0` (Allow All)
7. Una vez creado, haz clic en **Connect** → **Drivers**
8. Copia la URI: `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/`

### Poblar la base de datos (seed)

#### Paso 1: Configurar variables de entorno
Crea `backend/.env`:
```
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@cluster0.xxxxx.mongodb.net/arosreto
JWT_SECRET=tu_secreto_jwt_aqui
```

#### Paso 2: Ejecutar seed
```bash
cd backend
npm run seed
```
Si falla con `querySrv ECONNREFUSED` (bloqueo del ISP peruano):
```bash
node data/seed-atlas.js
```

> **¿Por qué falla?** Algunos ISP en Perú bloquean las consultas DNS SRV que MongoDB necesita para resolver `mongodb+srv://`. El script `seed-atlas.js` usa Google DNS (8.8.8.8) para evitarlo.

---

## 2. Render — Backend

### Requisitos
- Cuenta en https://render.com (login con GitHub)

### Pasos
1. **Dashboard → New → Web Service**
2. Conecta tu repositorio de GitHub (`ClinicaArosReto`)
3. Configura:
   - **Name:** `clinica-aros-reto-api`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free
4. **Advanced → Add Environment Variables:**
   ```
   MONGO_URI=mongodb+srv://<usuario>:<contraseña>@cluster0.xxxxx.mongodb.net/arosreto
   JWT_SECRET=tu_secreto_jwt_aqui
   ```
5. **Create Web Service**
6. Render desplegará automáticamente. Obtendrás una URL como:
   ```
   https://clinica-aros-reto-api.onrender.com
   ```

### Notas sobre Render Free
- El servicio **duerme después de 30 min sin actividad**
- Al recibir una petición, tarda ~30s en "despertar"
- Para evitar el sleep, usa UptimeRobot (gratis) para hacer ping cada 15 min
- El puerto lo asigna Render automáticamente (variable `PORT`)

---

## 3. Vercel — Frontend

### Requisitos
- Cuenta en https://vercel.com (login con GitHub)

### Pasos
1. **Dashboard → Add New → Project**
2. Importa el repositorio `ClinicaArosReto`
3. Configura:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. **Environment Variables:**
   ```
   VITE_API_URL=https://clinica-aros-reto-api.onrender.com
   ```
   > **Importante:** Sin esta variable, el frontend intentará conectarse a `localhost:4000`
5. **Deploy**
6. Vercel te dará una URL como:
   ```
   https://clinica-aros-reto.vercel.app
   ```

---

## 4. Verificar el despliegue

### Probar API
```bash
curl https://tu-api.onrender.com/api/productos
curl https://tu-api.onrender.com/api/servicios
curl https://tu-api.onrender.com/api/promociones
```

### Probar frontend
Abrir `https://tu-frontend.vercel.app` en el navegador.

---

## 5. Solución de problemas comunes

### Error: `querySrv ECONNREFUSED`
- **Causa:** ISP bloquea consultas DNS SRV
- **Solución local:** Usar `seed-atlas.js` en lugar del seed normal
- **En Render/Vercel:** No ocurre porque los servidores de Render/Vercel no tienen ese bloqueo

### Error: `Server selection timed out`
- **Causa:** IP no whitelisted en Atlas Network Access
- **Solución:** Agregar `0.0.0.0/0` en Atlas → Network Access

### Error: `502 Bad Gateway`
- **Causa:** El servidor backend se cayó o está iniciando
- **Solución:** Esperar ~30s (Render free tier) o revisar logs

### Error: 404 en rutas del frontend
- **Causa:** React Router necesita SPA fallback
- **Solución:** Vercel detecta automáticamente SPA. Si no funciona, agregar `frontend/vercel.json`:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```

---

## URLs del proyecto (producción)
| Servicio | URL |
|---|---|
| Backend API | `https://clinicaarosreto.onrender.com` |
| Frontend | `https://clinica-aros-reto.vercel.app` |
