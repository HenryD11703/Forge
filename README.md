# 🚀 Forge — Learn to Code

> Forja tu carrera como desarrollador directamente desde VS Code.

Forge es una extensión de VS Code que convierte tu editor en una plataforma de aprendizaje interactivo. Aprende **HTML**, **CSS**, **JavaScript** y **Git** completando misiones guiadas con evaluación automática mediante IA.

---

## ✨ Características

- **Misiones progresivas** — ejercicios organizados en módulos con dificultad creciente
- **Evaluación con IA** — tu código es revisado por un modelo de lenguaje que te da feedback detallado
- **3 tipos de ejercicios** — HTML/CSS, JavaScript puro y comandos de terminal/Git
- **Progreso persistente** — tu avance se guarda por usuario con tu cuenta de GitHub
- **Todo dentro de VS Code** — sin salir de tu editor

---

## 🚀 Instalación

1. Abre VS Code
2. Ve a la pestaña de Extensiones (`Ctrl+Shift+X`)
3. Busca **Forge - Learn to Code**
4. Haz clic en **Instalar**

---

## 📖 Cómo usar

1. Haz clic en el ícono de Forge en la barra lateral
2. Inicia sesión con tu cuenta de **GitHub**
3. Elige un módulo y selecciona una misión
4. Escribe tu solución en el archivo que se abre automáticamente
5. Haz clic en **Validar Misión** cuando estés listo

### Tipos de ejercicios

| Tipo | Archivo | Cómo probarlo |
|------|---------|---------------|
| **HTML/CSS** | `index.html` + `style.css` | Abre en el navegador |
| **JavaScript** | `mision.js` | `node <slug>/mision.js` en la terminal |
| **Terminal/Git** | `respuestas.md` | Terminal integrada que se abre automáticamente |

---

## 🛠️ Stack técnico

| Capa | Tecnología |
|------|-----------|
| Extensión | TypeScript + VS Code API |
| Backend | Express.js |
| Base de datos | Supabase |
| IA | Groq / Llama 3.3 70B |
| Despliegue | DigitalOcean |
| Auth | GitHub OAuth (vía VS Code) |

---

## 🔧 Desarrollo local

### Requisitos

- Node.js 18+
- VS Code 1.80+
- Backend de Forge corriendo localmente o en DigitalOcean

### Pasos

```bash
git clone https://github.com/HenryD11703/Launchpad.git
cd Launchpad
npm install
npm run compile
```

Abre el proyecto en VS Code y presiona `F5` para lanzar una ventana de extensión de desarrollo.

### Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run compile` | Compila TypeScript |
| `npm run watch` | Modo watch para desarrollo |

---

## 📋 Comandos de la extensión

| Comando | Descripción |
|---------|-------------|
| `Launchpad: Inicio` | Abre el panel de Forge |
| `Launchpad: Reiniciar Progreso` | Borra la sesión guardada localmente |

---

## 📄 Licencia

[MIT](LICENSE) © 2026 Henry David Quel
