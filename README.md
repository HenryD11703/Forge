# Forge — Learn to Code

Aprende HTML, CSS, JavaScript y Git directamente desde VS Code. Forge te da misiones reales, evaluación automática con IA y pistas cuando te atascas — sin salir de tu editor.

[![VS Code Marketplace](https://img.shields.io/badge/VS%20Code-Marketplace-0078d7?logo=visual-studio-code&logoColor=white)](https://marketplace.visualstudio.com/items?itemName=HenryDavidQuel.forge-dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Sponsor](https://img.shields.io/badge/Sponsor-GitHub-%23ea4aaa?logo=github-sponsors)](https://github.com/sponsors/HenryD11703)

---

![Demo Forge](https://raw.githubusercontent.com/HenryD11703/Forge/main/imgs/image.png)

---

## Qué hace

Forge convierte VS Code en una plataforma de aprendizaje interactivo. Cada misión abre los archivos que necesitas, tú escribes el código, y cuando estás listo presionas **Validar Misión**. Un modelo de lenguaje revisa tu solución y te da feedback específico sobre qué está bien y qué mejorar.

Si te quedas atascado, puedes revelar pistas una a una desde el mismo panel, sin tener que salir a buscar documentación.

Todo el progreso se guarda en tu cuenta de GitHub, así que puedes continuar desde cualquier computadora.

## Instalación

Busca **Forge - Learn to Code** en la pestaña de Extensiones de VS Code (`Ctrl+Shift+X`) o instala directamente desde el Marketplace:

[Instalar Forge](https://marketplace.visualstudio.com/items?itemName=HenryDavidQuel.forge-dev)

## Cómo usarlo

1. Abre el panel de Forge desde la barra lateral
2. Inicia sesión con tu cuenta de GitHub
3. Elige un módulo y selecciona una misión
4. Escribe tu solución en el archivo que se abre automáticamente
5. Presiona **Validar Misión** cuando estés listo

Hay tres tipos de ejercicios:

| Tipo | Archivo generado | Cómo probarlo |
|---|---|---|
| HTML / CSS | `index.html` + `style.css` | Abre en el navegador con Live Server |
| JavaScript | `mision.js` | `node mision.js` en la terminal |
| Terminal / Git | `respuestas.md` | Sigue las instrucciones en el archivo |

## Stack

| Capa | Tecnología |
|---|---|
| Extensión | TypeScript + VS Code API |
| Backend | Express.js en DigitalOcean |
| Base de datos | Supabase (PostgreSQL) |
| Evaluación IA | Groq — Llama 3.3 70B |
| Auth | GitHub OAuth |

## Desarrollo local

Requisitos: Node.js 18+, VS Code 1.80+

```bash
git clone https://github.com/HenryD11703/Forge.git
cd Forge
npm install
npm run compile
```

Presiona `F5` en VS Code para abrir una ventana de extensión de desarrollo.

| Comando | Descripción |
|---|---|
| `npm run compile` | Compila TypeScript una vez |
| `npm run watch` | Recompila automáticamente al guardar |

Para contribuir o levantar el backend localmente, revisa [CONTRIBUTING.md](CONTRIBUTING.md).

## Comandos de la extensión

| Comando | Descripción |
|---|---|
| `Forge: Inicio` | Abre el panel principal |
| `Forge: Reiniciar Progreso` | Borra la sesión guardada localmente |

## Licencia

[MIT](LICENSE) — Henry David Quel, 2026
