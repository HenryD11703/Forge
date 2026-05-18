# Forge — Guía para Desarrolladores

Forge es una extensión de VS Code que convierte el editor en una plataforma de aprendizaje interactivo. Los estudiantes aprenden HTML, CSS, JavaScript y Git completando ejercicios guiados que son evaluados automáticamente por un LLM.

---

## Índice

1. [Arquitectura general](#arquitectura-general)
2. [Estructura del repositorio](#estructura-del-repositorio)
3. [Cómo funciona el flujo completo](#cómo-funciona-el-flujo-completo)
4. [Base de datos](#base-de-datos)
5. [Backend](#backend)
6. [Extensión de VS Code](#extensión-de-vs-code)
7. [Setup local](#setup-local)
8. [Añadir o modificar ejercicios](#añadir-o-modificar-ejercicios)
9. [Publicar la extensión](#publicar-la-extensión)
10. [Desplegar el backend](#desplegar-el-backend)

---

## Arquitectura general

```mermaid
flowchart TD
    subgraph VSCode["VS Code (usuario)"]
        Editor["Editor de código\nindex.html / mision.js / respuestas.md"]
        Sidebar["Forge Sidebar (webview)\n- Lista de módulos\n- Vista de ejercicio\n- Pistas revelables\n- Resultado de IA"]
    end

    subgraph Backend["Backend — DigitalOcean App Platform"]
        Express["Express.js\n/api/modules\n/api/exercises/:slug\n/api/evaluate"]
    end

    subgraph DB["Supabase"]
        Postgres["PostgreSQL\nmódulos · ejercicios · progreso"]
    end

    Groq["Groq API\nLlama 3.3 70B"]

    Sidebar -->|"HTTP fetch"| Express
    Express -->|"Supabase JS SDK"| Postgres
    Express -->|"Groq SDK"| Groq
```

**Stack completo:**

| Capa | Tecnología |
|------|-----------|
| Extensión | TypeScript + VS Code Extension API |
| UI del sidebar | HTML/CSS/JS vanilla (webview) |
| Backend | Node.js + Express |
| Base de datos | Supabase (PostgreSQL) |
| IA | Groq SDK → Llama 3.3 70B Versatile |
| Auth | GitHub OAuth vía VS Code Authentication API |
| Deploy backend | DigitalOcean App Platform |
| Deploy extensión | VS Code Marketplace |

---

## Estructura del repositorio

```
Launchpad/
├── src/
│   └── extension.ts          # Punto de entrada de la extensión. Toda la lógica del lado VS Code.
├── media/
│   └── webview.js            # JS que corre dentro del webview (sidebar). Renderiza UI y maneja mensajes.
├── backend/
│   ├── server.js             # API Express: /api/modules, /api/exercises/:slug, /api/evaluate
│   ├── .env                  # Variables de entorno (no commitear)
│   ├── .env.example          # Plantilla de variables
│   └── scripts/
│       ├── migration2.sql    # DDL: crea tablas modules, agrega columnas a exercises
│       ├── migration3.sql    # DDL: agrega columna hints a exercises
│       ├── seedMaster.cjs    # Seed principal: inserta los 14 ejercicios activos con hints y module_id
│       └── ...               # Seeds y scripts de utilidad anteriores (legacy)
├── package.json              # Manifiesto de la extensión (comandos, vistas, publisher)
├── tsconfig.json
└── CONTRIBUTING.md           # Este archivo
```

---

## Cómo funciona el flujo completo

### 1. Autenticación

Al abrir el sidebar, la extensión intenta hacer autenticación silenciosa reutilizando la sesión de GitHub que VS Code ya tiene (Copilot, Source Control, etc.). Si no hay sesión, muestra el botón "Continuar con GitHub".

```
extension.ts → _checkAuthSilently()
  → vscode.authentication.getSession('github', [...scopes], { silent: true })
  → si hay sesión → _loadAndSendModules()
  → si no → permanece en pantalla de login
```

El `githubUsername` se persiste en `context.globalState` para no pedir auth en cada apertura.

### 2. Carga de módulos

```
webview.js → postMessage({ command: 'loadModules' })
  → extension.ts → _loadAndSendModules()
  → GET /api/modules?githubUsername=xxx
  → server.js devuelve módulos + ejercicios + progreso del usuario
  → webview.js → renderModules()
```

### 3. Inicio de ejercicio

```
webview.js → startEx(slug) → postMessage({ command: 'startExercise', slug })
  → extension.ts → _startExercise(slug)
  → GET /api/exercises/:slug
  → crea carpeta workspace/<slug>/
  → según exercise.type:
      'html'     → crea index.html + style.css, abre index.html en columna 1
      'js'       → crea mision.js (desde js_template), abre en columna 1
      'terminal' → crea respuestas.md, abre terminal integrada
  → postMessage({ command: 'exerciseStarted', exercise: { ...datos, hints: [...] } })
  → webview.js → renderExercise() + renderHints()
```

### 4. Validación con IA

```
webview.js → postMessage({ command: 'validate' })
  → extension.ts → _validateExercise()
  → lee el archivo del usuario (index.html+style.css / mision.js / respuestas.md)
  → POST /api/evaluate { userCode, exerciseInstruction, exerciseId, githubUsername, exerciseType }
  → server.js → Groq API (Llama 3.3 70B)
  → respuesta JSON: { aprobado, cosasBuenas, cosasMalas, revisar, mensajeGeneral }
  → si aprobado → guarda progreso en user_progress
  → webview.js → renderResult()
```

### 5. Comunicación extensión ↔ webview

La extensión y el webview se comunican por **message passing** (no tienen acceso directo entre sí):

| Dirección | Comando | Qué hace |
|-----------|---------|----------|
| webview → ext | `login` | Inicia auth GitHub |
| webview → ext | `logout` | Limpia sesión |
| webview → ext | `loadModules` | Recarga lista de módulos |
| webview → ext | `startExercise` | Inicia ejercicio por slug |
| webview → ext | `validate` | Valida el código actual |
| ext → webview | `modulesLoaded` | Envía datos de módulos |
| ext → webview | `exerciseStarted` | Envía datos del ejercicio activo |
| ext → webview | `validationResult` | Envía resultado de la IA |
| ext → webview | `validating` | Estado de carga durante evaluación |
| ext → webview | `loading` | Estado de carga general |
| ext → webview | `error` | Mensaje de error |
| ext → webview | `loggedOut` | Confirma cierre de sesión |

---

## Base de datos

### Tablas principales

#### `modules`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | UUID | PK |
| `slug` | TEXT | Identificador único (`M01-HTML`, `M02-CSS`, etc.) |
| `title` | TEXT | Nombre del módulo |
| `description` | TEXT | Descripción corta |
| `icon` | TEXT | Emoji del módulo |
| `sort_order` | INT | Orden de aparición |

#### `exercises`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | UUID | PK |
| `slug` | TEXT | Identificador único (`M01-HTML-Estructura`) — es también el nombre de carpeta |
| `title` | TEXT | Nombre del ejercicio |
| `description` | TEXT | Descripción corta |
| `type` | TEXT | `'html'`, `'js'` o `'terminal'` |
| `html_template` | TEXT | Contenido inicial del `index.html` (o wrapper para ejercicios JS) |
| `css_template` | TEXT | Contenido inicial del `style.css` |
| `js_template` | TEXT | Contenido inicial del `mision.js` (solo ejercicios JS) |
| `instruction_for_ai` | TEXT | Reglas estrictas que recibe el LLM para evaluar |
| `hints` | JSONB | Array de strings HTML con pistas revelables |
| `module_id` | UUID | FK → modules |
| `sort_order` | INT | Orden dentro del módulo |
| `status` | TEXT | `'approved'` para ser visible, `'draft'` para oculto |

#### `users`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | UUID | PK |
| `github_username` | TEXT | Username de GitHub |

#### `user_progress`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| `user_id` | UUID | FK → users |
| `exercise_id` | UUID | FK → exercises |

### Slugs de módulos activos

| Slug | Módulo |
|------|--------|
| `M01-HTML` | HTML: Los Cimientos |
| `M02-CSS` | CSS: Dominando el Estilo |
| `M03-VARS` | JS: Variables & Tipos |
| `M04-IF` | JS: Decisiones |
| `M05-FOR` | JS: Ciclos |
| `M06-FN` | JS: Funciones |
| `M07-DATA` | JS: Arrays & Objetos |
| `M08-GIT` | Git: Control de Versiones |

---

## Backend

### Endpoints

#### `GET /api/modules?githubUsername=xxx`
Devuelve todos los módulos con sus ejercicios y el progreso del usuario indicado.

```json
[
  {
    "id": "...",
    "slug": "M01-HTML",
    "title": "HTML: Los Cimientos",
    "icon": "🏗️",
    "exercises": [
      { "id": "...", "slug": "M01-HTML-Estructura", "title": "...", "type": "html", "completed": true }
    ],
    "totalExercises": 3,
    "completedExercises": 1
  }
]
```

#### `GET /api/exercises/:slug`
Devuelve el detalle completo de un ejercicio (incluyendo templates y hints).

```json
{
  "id": "...",
  "slug": "M01-HTML-Estructura",
  "title": "La Primera Piedra (Estructura)",
  "type": "html",
  "html_template": "<!-- teoría + misión --> <!DOCTYPE html>...",
  "css_template": "body { ... }",
  "js_template": "",
  "hints": ["Pista 1 en HTML...", "Pista 2...", "..."],
  "instruction_for_ai": "REGLA ESTRICTA: ..."
}
```

#### `POST /api/evaluate`
Evalúa el código del estudiante usando Groq.

**Body:**
```json
{
  "userCode": "<!-- código del estudiante -->",
  "exerciseInstruction": "REGLA ESTRICTA: ...",
  "exerciseId": "uuid",
  "githubUsername": "alumno123",
  "exerciseType": "html"
}
```

**Response:**
```json
{
  "aprobado": false,
  "cosasBuenas": ["Estructura básica correcta"],
  "cosasMalas": ["Falta el h1 con el texto exacto"],
  "revisar": ["Revisar el atributo lang"],
  "mensajeGeneral": "Casi, revisa el contenido del h1."
}
```

### Prompt de evaluación

El sistema prompt del LLM es intencionalmente **estricto**. No aprueba si hay omisiones. La instrucción específica del ejercicio (`instruction_for_ai`) define exactamente qué verificar. Si el ejercicio dice "REGLA ESTRICTA: validar que existe un `<h1>` con el texto exacto", el modelo debe rechazar cualquier variación.

---

## Extensión de VS Code

### Archivos clave

**`src/extension.ts`** — todo el código TypeScript de la extensión:
- `activate()` — registra el provider y los comandos
- `ForgeViewProvider` — clase principal que gestiona el webview del sidebar
- `_checkAuthSilently()` — intenta reutilizar sesión GitHub existente
- `_startExercise(slug)` — descarga el ejercicio, crea archivos, abre editor
- `_validateExercise()` — lee el archivo del usuario y llama al backend
- `_buildHtml(webview)` — genera el HTML completo del sidebar (inline)

**`media/webview.js`** — JS que corre dentro del webview:
- `renderModules(data, username)` — construye la lista de módulos/ejercicios
- `renderExercise(ex)` — muestra la vista de ejercicio activo con hints
- `renderResult(r)` — muestra el resultado de la evaluación

### Comandos registrados

| Comando | ID | Descripción |
|---------|-----|-------------|
| Forge: Inicio | `forge.start` | Muestra mensaje de bienvenida |
| Forge: Reiniciar Progreso | `forge.resetProgress` | Borra sesión local (githubUsername en globalState) |

### Tipos de ejercicio y archivos generados

| `type` | Archivo creado | Template usado | Cómo probar |
|--------|----------------|----------------|-------------|
| `html` | `index.html` + `style.css` | `html_template` + `css_template` | Live Server |
| `js` | `mision.js` | `js_template` | `node <slug>/mision.js` |
| `terminal` | `respuestas.md` | `html_template` | Terminal integrada |

Los archivos se crean en `<carpeta-workspace>/<slug>/`. Si el archivo ya existe (el alumno retoma el ejercicio), no se sobreescribe.

---

## Setup local

### Requisitos

- Node.js 18+
- VS Code 1.80+
- Cuenta en [Supabase](https://supabase.com)
- API Key de [Groq](https://console.groq.com)

### 1. Clonar y preparar la extensión

```bash
git clone https://github.com/HenryD11703/Forge.git
cd Launchpad
npm install
npm run compile
```

Abre el proyecto en VS Code y presiona `F5` para lanzar una ventana de extensión de desarrollo.

### 2. Preparar el backend

```bash
cd backend
cp .env.example .env
# Edita .env con tus credenciales
npm install
node server.js
```

### 3. Variables de entorno del backend

```env
GROQ_API_KEY=gsk_...
PROJECT_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
SUPABASE_PASSWORD=tu_password
CONNECTION_STRING=postgresql://postgres.xxx:[password]@aws-0-region.pooler.supabase.com:6543/postgres
```

> **Nota WSL2:** La conexión directa de Supabase usa IPv6. Usa el **Session Pooler** (`puerto 6543`) para IPv4.

### 4. Correr las migraciones en Supabase

Ejecuta en orden en el SQL Editor de Supabase:
1. `backend/scripts/migration2.sql` — crea tablas y columnas base
2. `backend/scripts/migration3.sql` — agrega columna `hints`

### 5. Poblar la base de datos

```bash
cd backend
node scripts/seedMaster.cjs
```

Esto inserta los 14 ejercicios activos asignados a sus módulos correspondientes.

---

## Añadir o modificar ejercicios

Todos los ejercicios activos se definen en `backend/scripts/seedMaster.cjs`. Cada ejercicio tiene esta estructura:

```js
{
    moduleSlug: 'M01-HTML',   // Slug del módulo al que pertenece
    sortOrder: 1,             // Posición dentro del módulo
    type: 'html',             // 'html' | 'js' | 'terminal'
    title: "Nombre del ejercicio",
    folderName: "M01-HTML-MiEjercicio",   // Slug único y nombre de la carpeta que se crea
    description: "Descripción corta para el sidebar.",
    htmlTemplate: `<!-- Teoría en comentario + código inicial -->`,
    cssTemplate: `/* CSS inicial */`,
    jsTemplate: `// JS inicial (solo para type: 'js')`,
    instructionForAI: "REGLA ESTRICTA: lo que el LLM debe verificar.",
    hints: [
        "Primera pista (HTML permitido, ej: <code>tag</code>)",
        "Segunda pista más específica",
        "Tercera pista casi directa",
        "Solución completa"
    ]
}
```

### Convenciones importantes

**`folderName` (slug):** Usa el patrón `M0X-TEMA-NombreCorto`. Este valor se usa como nombre de la carpeta en el workspace del alumno y como slug en la URL del API. Debe ser único.

**`instructionForAI`:** Es lo más crítico. El LLM es el único evaluador — si la instrucción es ambigua, aprobará código incorrecto. Usa "REGLA ESTRICTA:" para criterios bloqueantes y sé específico con los valores exactos esperados.

**`hints`:** Deben ir de menos a más revelador. La última pista puede ser la solución completa. Soportan HTML inline (`<code>`, `<br>`, `<strong>`).

**`type: 'terminal'`:** Usa `htmlTemplate` para el contenido de `respuestas.md` (no existe `terminalTemplate`).

Después de editar, re-corre el seed:

```bash
cd backend && node scripts/seedMaster.cjs
```

El seed hace `DELETE FROM exercises` antes de insertar, así que los cambios son destructivos. El progreso de los usuarios (`user_progress`) **no** se borra.

---

## Publicar la extensión

La extensión se publica en el VS Code Marketplace bajo el publisher `HenryDavidQuel`.

```bash
# Desde la raíz del proyecto
npx @vscode/vsce publish
```

Antes de publicar, incrementa la versión en `package.json`. El comando compila TypeScript automáticamente vía el script `vscode:prepublish`.

Para empaquetar sin publicar (genera un `.vsix`):

```bash
npx @vscode/vsce package
```

---

## Desplegar el backend

El backend corre en **DigitalOcean App Platform** apuntando a la rama `main`. El deploy es automático en cada push a `main`.

Variables de entorno necesarias en la app de DigitalOcean:
- `GROQ_API_KEY`
- `PROJECT_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

El archivo `backend/package.json` define `"start": "node server.js"` como el comando de inicio.

---

## Consideraciones de seguridad

- El `SUPABASE_SERVICE_ROLE_KEY` tiene acceso total a la base de datos — nunca exponerlo en el cliente.
- El webview del sidebar usa una CSP estricta (`default-src 'none'`). Scripts externos no cargan.
- Los hints se renderizan con `innerHTML` en el webview — su contenido viene del backend propio, no del usuario.
- La evaluación de código se hace en el backend, no en la extensión. El código del alumno nunca se ejecuta en el servidor.
