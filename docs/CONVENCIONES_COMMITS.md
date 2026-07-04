# Convenciones para Commits (Conventional Commits)

Este proyecto sigue el estándar **Conventional Commits** para mantener un historial claro, legible y automatizable. Usa esta guía cuando le pidas a la IA o a cualquier desarrollador que haga commits.

## 📋 Formato Básico

```
<tipo>(<alcance opcional>): <descripción breve>

<cuerpo opcional>

<pie opcional>
```

## 🏷️ Tipos de Commits

| Tipo | Cuándo usarlo | Ejemplo |
|------|---------------|---------|
| `feat` | Nueva funcionalidad | `feat(productos): agregar filtro por categoría` |
| `fix` | Corrección de bug | `fix(navbar): corregir menú responsive en mobile` |
| `docs` | Cambios en documentación | `docs: agregar guía de despliegue` |
| `style` | Cambios de formato (CSS, espacios, etc.) | `style(hero): ajustar padding del banner` |
| `refactor` | Refactorización sin cambiar funcionalidad | `refactor(auth): extraer lógica JWT a middleware` |
| `perf` | Mejora de rendimiento | `perf: optimizar carga de imágenes` |
| `test` | Agregar o modificar tests | `test(productos): agregar tests de CRUD` |
| `build` | Cambios en build o dependencias | `build: actualizar vite a versión 5` |
| `ci` | Cambios en CI/CD | `ci: agregar GitHub Actions para deploy` |
| `chore` | Tareas de mantenimiento | `chore: limpiar console.log` |
| `revert` | Revertir un commit anterior | `revert: revertir feat(productos): agregar filtro` |

## 📝 Reglas

### 1. Descripción breve (obligatorio)
- Máximo 72 caracteres
- En imperativo: "agregar", no "agregué" ni "agrega"
- Sin punto final
- En español (a menos que el proyecto esté en inglés)

### 2. Alcance (opcional pero recomendado)
Indica la parte del código afectada:
- `navbar`, `hero`, `footer` — Componentes
- `auth`, `productos`, `servicios` — Módulos
- `api`, `routes`, `models` — Capas del backend
- `docs`, `styles`, `config` — General

### 3. Cuerpo (opcional)
- Explica el QUÉ y el POR QUÉ, no el CÓMO
- Separado de la descripción por una línea en blanco
- Usa viñetas si hay múltiples cambios

### 4. Pie (opcional)
- Referencias a issues: `Closes #123`, `Fixes #456`
- Breaking changes: `BREAKING CHANGE: ...`

## 🎯 Ejemplos para este Proyecto

### Frontend

```bash
# Nuevo componente
feat(hero): agregar sección de estadísticas

# Corrección de diseño
fix(productTabs): corregir grid en tablets

# Cambio de estilos
style(navbar): ajustar colores del menú activo

# Refactorización
refactor(authContext): separar lógica de API calls

# Documentación
docs: agregar README del frontend
```

### Backend

```bash
# Nueva ruta
feat(api): agregar endpoint GET /api/promociones

# Corrección
fix(auth): validar email duplicado en registro

# Refactorización
refactor(productos): usar async/await en controladores

# Documentación
docs(backend): agregar comentarios a modelos
```

### General

```bash
# Documentación
docs: agregar AI_CONTEXT.md para asistentes IA

# Configuración
build: instalar dependencia axios

# Chore
chore: eliminar archivos temporales
```

## 🚫 Anti-patrones (NO hacer)

| ❌ Mal | ✅ Bien |
|--------|---------|
| `arregle el bug` | `fix(navbar): corregir menú en mobile` |
| `cambios varios` | `feat: ...` + `fix: ...` (commits separados) |
| `actualizado` | `feat(productos): agregar filtro por precio` |
| `fix arreglo` | `fix(auth): validar token expirado` |
| `asd123` | `style(hero): ajustar padding responsive` |

## 🔄 Flujo de Trabajo Recomendado

```bash
# 1. Ver estado actual
git status

# 2. Agregar archivos específicos (no usar git add -A siempre)
git add frontend/src/components/Navbar.jsx
git add frontend/src/components/Navbar.css

# 3. Commit con mensaje convencional
git commit -m "style(navbar): ajustar colores del menú activo"

# 4. Subir cambios
git push
```

## 🤖 Instrucciones para la IA

Cuando le pidas a la IA que haga cambios y commits, dile algo como:

> "Usa Conventional Commits para los commits. Los tipos válidos son: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert. Usa español para los mensajes."

O simplemente:

> "Haz commits siguiendo las convenciones de CONVENCIONES_COMMITS.md"
