import * as vscode from 'vscode';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "launchpad" is now active!');

    const provider = new HelloWorldViewProvider(context);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(HelloWorldViewProvider.viewType, provider)
    );

    let disposable = vscode.commands.registerCommand('launchpad.helloWorld', () => {
        vscode.window.showInformationMessage('Launchpad: Hola Mundo!');
    });

    let resetDisposable = vscode.commands.registerCommand('launchpad.resetProgress', async () => {
        try {
            const req = await fetch('http://localhost:3000/api/exercises');
            const exercisesResult = await req.json() as any[];
            for (const ex of exercisesResult) {
                await context.globalState.update(`completed_${ex.id}`, false);
            }
            vscode.window.showInformationMessage('Launchpad: Progreso borrado. Recarga la ventana (Ctrl+R) para ver los cambios.');
        } catch(e) {}
    });

    context.subscriptions.push(disposable, resetDisposable);
}

class HelloWorldViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'launchpad.helloWorldView';

    constructor(
        private readonly _context: vscode.ExtensionContext,
    ) { }

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken,
    ) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._context.extensionUri]
        };
        
        webviewView.title = "Launchpad";
        
        this._getHtmlForWebview(webviewView.webview).then(html => {
            webviewView.webview.html = html;
            this._checkAuthSilently(webviewView.webview);
        });

        webviewView.webview.onDidReceiveMessage(data => {
            switch (data.type) {
                case 'login':
                    this._login(webviewView.webview);
                    break;
                case 'startExercise':
                    this._startExercise(webviewView.webview, data.id);
                    break;
                case 'validateExercise':
                    this._validateExercise(webviewView.webview, data.id);
                    break;
            }
        });
    }

    private async _checkAuthSilently(webview: vscode.Webview) {
        try {
            const session = await vscode.authentication.getSession('github', ['read:user', 'user:email'], { createIfNone: false });
            if (session) {
                const completedExercises: string[] = [];
                try {
                    const req = await fetch('http://localhost:3000/api/exercises');
                    const dbExercises = await req.json() as any[];
                    for (const ex of dbExercises) {
                        if (this._context.globalState.get<boolean>(`completed_${ex.id}`, false)) {
                            completedExercises.push(ex.id);
                        }
                    }
                } catch(e) {}
                
                webview.postMessage({ 
                    type: 'authSuccess', 
                    user: session.account.label,
                    completedExercises: completedExercises
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    private async _login(webview: vscode.Webview) {
        try {
            const session = await vscode.authentication.getSession('github', ['read:user', 'user:email'], { createIfNone: true });
            
            if (!session) {
                vscode.window.showErrorMessage('Necesitas iniciar sesión en GitHub para comenzar.');
                webview.postMessage({ type: 'authFailed' });
                return;
            }

            vscode.window.showInformationMessage(`¡Bienvenido, ${session.account.label}!`);
            
            const completedExercises: string[] = [];
            try {
                const req = await fetch('http://localhost:3000/api/exercises');
                const dbExercises = await req.json() as any[];
                for (const ex of dbExercises) {
                    if (this._context.globalState.get<boolean>(`completed_${ex.id}`, false)) {
                        completedExercises.push(ex.id);
                    }
                }
            } catch(e) {}
            
            webview.postMessage({ 
                type: 'authSuccess', 
                user: session.account.label,
                completedExercises: completedExercises
            });

        } catch (error) {
            vscode.window.showErrorMessage('Hubo un problema al autorizar GitHub o cancelaste el inicio de sesion.');
            webview.postMessage({ type: 'authFailed' });
            console.error(error);
        }
    }

    private async _startExercise(webview: vscode.Webview, id: string) {
        try {
            if (!vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length === 0) {
                vscode.window.showErrorMessage('Abre una carpeta o espacio de trabajo en VS Code primero.');
                webview.postMessage({ type: 'errorCreatingEnv' });
                return;
            }

            const workspaceRoot = vscode.workspace.workspaceFolders[0].uri;
            
            try {
                await execAsync('git status', { cwd: workspaceRoot.fsPath });
            } catch (err: any) {
                if (err.message && err.message.toLowerCase().includes('not a git repository')) {
                    try {
                        await execAsync('git init', { cwd: workspaceRoot.fsPath });
                        vscode.window.showInformationMessage('Repositorio de progreso inicializado en la carpeta.');
                    } catch (e) {
                         console.error('Git init error', e);
                    }
                }
            }

            let exercises: any[] = [];
            try {
                const res = await fetch('http://localhost:3000/api/exercises');
                exercises = await res.json() as any[];
            } catch(e) {
                vscode.window.showErrorMessage('No se pudieron descargar los ejercicios. Revisa tu internet o backend.');
                return;
            }

            const exercise = exercises.find(e => e.id === id);
            if (!exercise) return;

            const backendFolder = vscode.Uri.joinPath(workspaceRoot, 'Launchpad-Missions');
            try {
                await vscode.workspace.fs.createDirectory(backendFolder);
            } catch (e) {}

            const exerciseFolder = vscode.Uri.joinPath(backendFolder, exercise.slug);
            try {
                await vscode.workspace.fs.createDirectory(exerciseFolder);
            } catch (e) {}

            const htmlFile = vscode.Uri.joinPath(exerciseFolder, 'index.html');
            const cssFile = vscode.Uri.joinPath(exerciseFolder, 'style.css');
            const jsFile = vscode.Uri.joinPath(exerciseFolder, 'script.js');

            let htmlExists = false;
            try {
                await vscode.workspace.fs.stat(htmlFile);
                htmlExists = true;
            } catch {
                htmlExists = false;
            }

            if (!htmlExists) {
                await vscode.workspace.fs.writeFile(htmlFile, Buffer.from(exercise.html_template, 'utf8'));
                await vscode.workspace.fs.writeFile(cssFile, Buffer.from(exercise.css_template, 'utf8'));
                
                if (exercise.js_template && exercise.js_template.trim().length > 0) {
                    await vscode.workspace.fs.writeFile(jsFile, Buffer.from(exercise.js_template, 'utf8'));
                }
            }

            const doc = await vscode.workspace.openTextDocument(htmlFile);
            await vscode.window.showTextDocument(doc);
            
            webview.postMessage({ type: 'exerciseReady', exercise: {
                title: exercise.title,
                description: exercise.description,
                folderName: exercise.slug
            } });

        } catch (error) {
            vscode.window.showErrorMessage('Error al preparar el entorno.');
            console.error(error);
        }
    }

    private async _validateExercise(webview: vscode.Webview, id: string) {
        if (!vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length === 0) {
            vscode.window.showErrorMessage('No hay workspace abierto.');
            webview.postMessage({ type: 'validationError', message: 'No hay workspace.' });
            return;
        }

        let exercises: any[] = [];
        try {
            const res = await fetch('http://localhost:3000/api/exercises');
            exercises = await res.json() as any[];
        } catch(e) {
            vscode.window.showErrorMessage('Error de conexión al servidor.');
            return;
        }

        const exercise = exercises.find(e => e.id === id);
        if (!exercise) return;

        const workspaceRoot = vscode.workspace.workspaceFolders[0].uri;
        const htmlFile = vscode.Uri.joinPath(workspaceRoot, 'Launchpad-Missions', exercise.slug, 'index.html');
        const cssFile = vscode.Uri.joinPath(workspaceRoot, 'Launchpad-Missions', exercise.slug, 'style.css');
        const jsFile = vscode.Uri.joinPath(workspaceRoot, 'Launchpad-Missions', exercise.slug, 'script.js');

        try {
            await vscode.workspace.saveAll();

            let htmlText = "";
            let cssText = "";
            let jsText = "";
            try {
                const htmlData = await vscode.workspace.fs.readFile(htmlFile);
                htmlText = Buffer.from(htmlData).toString('utf8');
            } catch (e) {
                throw new Error("No se encontró el index.html");
            }
            
            try {
                const cssData = await vscode.workspace.fs.readFile(cssFile);
                cssText = Buffer.from(cssData).toString('utf8');
            } catch (e) {}

            try {
                const jsData = await vscode.workspace.fs.readFile(jsFile);
                jsText = Buffer.from(jsData).toString('utf8');
            } catch (e) {}

            let text = `
==== ARCHIVO HTML ====
${htmlText}

==== ARCHIVO CSS ====
${cssText}
`;
            if (jsText) {
                text += `\n==== ARCHIVO JS ====\n${jsText}\n`;
            }
            
            // Llama a nuestro backend en Express
            try {
                let githubUsername = "";
                try {
                    const session = await vscode.authentication.getSession('github', ['read:user'], { createIfNone: false });
                    if (session) githubUsername = session.account.label;
                } catch(e) {}

                const response = await fetch('http://localhost:3000/api/evaluate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        userCode: text,
                        exerciseInstruction: exercise.instruction_for_ai,
                        exerciseId: exercise.id,
                        githubUsername: githubUsername
                    })
                });

                if (!response.ok) {
                    throw new Error('Error de servidor backend');
                }

                const aiResult = await response.json() as any;

                if (aiResult.aprobado) {
                    await this._context.globalState.update(`completed_${id}`, true);
                    
                    try {
                        await execAsync('git add .', { cwd: workspaceRoot.fsPath });
                        await execAsync(`git commit -m "🔥🏅 Superado: ${exercise.title}"`, { cwd: workspaceRoot.fsPath });
                        vscode.window.showInformationMessage('¡Éxito! Hito de Git completado exitosamente. 🎉');
                    } catch (gitErr: any) {}

                    webview.postMessage({ type: 'validationSuccess', feedback: aiResult, id: id });
                } else {
                    webview.postMessage({ type: 'validationError', message: aiResult.mensajeGeneral, feedback: aiResult });
                }

            } catch (err) {
                vscode.window.showErrorMessage('No se pudo conectar al servidor backend. Asegúrate que esté corriendo.');
                webview.postMessage({ type: 'validationError', message: 'Fallo de conexión.', feedback: null });
            }

        } catch (error) {
            vscode.window.showErrorMessage('No se encontraron los archivos del ejercicio.');
            webview.postMessage({ type: 'validationError', message: 'Faltan archivos de ejercicio.', feedback: null });
        }
    }

    async _getHtmlForWebview(webview: vscode.Webview) {
        let exercisesJson = "[]";
        try {
            const req = await fetch('http://localhost:3000/api/exercises');
            const data = await req.json() as any[];
            exercisesJson = JSON.stringify(data.map((ex: any) => ({
                id: ex.id,
                title: ex.title,
                description: ex.description,
                folderName: ex.slug
            })));
        } catch(e) {
            console.log("No backend connection yet");
        }
        
        return `<!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Launchpad Misiones</title>
                <style>
                    body {
                        padding: 20px;
                        font-family: var(--vscode-font-family);
                        color: var(--vscode-editor-foreground);
                        background-color: var(--vscode-editor-background);
                    }
                    .header {
                        display: flex;
                        align-items: center;
                        border-bottom: 2px solid var(--vscode-panel-border);
                        padding-bottom: 10px;
                        margin-bottom: 15px;
                    }
                    .header h2 {
                        margin: 0;
                        font-size: 1.5em;
                        color: var(--vscode-textLink-foreground);
                        font-weight: 800;
                    }
                    .card {
                        background-color: var(--vscode-editorWidget-background);
                        border: 1px solid var(--vscode-widget-border);
                        border-radius: 8px;
                        padding: 15px;
                        margin-bottom: 15px;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    }
                    .card h3 {
                        margin-top: 0;
                        color: var(--vscode-activityBarBadge-background);
                        font-size: 1.1em;
                    }
                    code {
                        background-color: var(--vscode-textCodeBlock-background);
                        padding: 2px 4px;
                        border-radius: 4px;
                        font-family: monospace;
                        color: var(--vscode-textPreformat-foreground);
                    }
                    .btn {
                        background-color: var(--vscode-button-background);
                        color: var(--vscode-button-foreground);
                        border: none;
                        padding: 10px 15px;
                        font-size: 1em;
                        border-radius: 4px;
                        cursor: pointer;
                        width: 100%;
                        font-weight: bold;
                        transition: all 0.2s;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                        margin-bottom: 10px;
                    }
                    .btn:hover {
                        background-color: var(--vscode-button-hoverBackground);
                        transform: translateY(-2px);
                    }
                    .btn-secondary {
                        background-color: var(--vscode-button-secondaryBackground);
                        color: var(--vscode-button-secondaryForeground);
                        box-shadow: none;
                    }
                    .btn-secondary:hover {
                        background-color: var(--vscode-button-secondaryHoverBackground);
                        transform: translateY(-1px);
                    }
                    .progress-container {
                        width: 100%;
                        background-color: var(--vscode-editorWidget-background);
                        border-radius: 8px;
                        margin-bottom: 20px;
                        border: 1px solid var(--vscode-panel-border);
                        overflow: hidden;
                    }
                    .progress-bar {
                        height: 10px;
                        background: linear-gradient(90deg, #4CAF50, #8BC34A);
                        width: 0%;
                        transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
                    }
                    .progress-text {
                        padding: 8px 12px;
                        font-size: 0.85em;
                        display: flex;
                        justify-content: space-between;
                        color: var(--vscode-descriptionForeground);
                        font-weight: 600;
                    }
                    .level-list {
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                    }
                    .level-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 12px;
                        background: var(--vscode-input-background);
                        border: 1px solid var(--vscode-panel-border);
                        border-radius: 6px;
                    }
                    .level-info h4 { margin: 0; font-size: 1.1em; color: var(--vscode-editor-foreground); }
                    .level-info p { margin: 4px 0 0 0; font-size: 0.9em; opacity: 0.8; }
                    .level-action .btn { margin: 0; padding: 6px 15px; width: auto; font-size: 0.9em; box-shadow: none;}
                    .completed-badge {
                        color: #4CAF50;
                        font-weight: bold;
                        display: flex;
                        align-items: center;
                        gap: 5px;
                        font-size: 0.9em;
                        animation: popIn 0.5s cubic-bezier(0.2, -0.8, 0.2, 2);
                    }
                    @keyframes popIn {
                        from { transform: scale(0); opacity: 0;}
                        to { transform: scale(1); opacity: 1;}
                    }
                    #status {
                        margin-top: 10px;
                        font-weight: bold;
                        text-align: center;
                        padding: 10px;
                        border-radius: 4px;
                    }
                    .ai-feedback {
                        margin-top: 15px;
                        padding: 15px;
                        border-radius: 8px;
                        background-color: var(--vscode-editor-background);
                        border-left: 4px solid var(--vscode-activityBarBadge-background);
                    }
                    .ai-feedback h4 {
                        margin-top: 0;
                        color: var(--vscode-activityBarBadge-background);
                        margin-bottom: 5px;
                    }
                    .ai-feedback ul {
                        margin: 0;
                        padding-left: 20px;
                        font-size: 0.9em;
                        color: var(--vscode-editor-foreground);
                    }
                    .ai-feedback ul li {
                        margin-bottom: 5px;
                    }
                    .ai-good { border-left-color: #4CAF50; }
                    .ai-good h4 { color: #4CAF50; }
                    .ai-bad { border-left-color: #F44336; }
                    .ai-bad h4 { color: #F44336; }
                    .hidden { display: none !important; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h2>🚀 Launchpad HTML/CSS</h2>
                </div>
                
                <div id="login-view">
                    <div class="card">
                        <h3>Identificación Requerida</h3>
                        <p>Inicia sesión con GitHub para guardar tu progreso e inscribirte a los cursos.</p>
                    </div>
                    <button class="btn" id="loginBtn">🔓 Iniciar Sesión con GitHub</button>
                    <div id="loginStatus" style="text-align: center; margin-top: 10px; color: var(--vscode-textLink-foreground);"></div>
                </div>

                <div id="menu-view" class="hidden">
                    <div class="card" style="padding: 10px 15px; display: flex; justify-content: space-between; align-items: center;">
                        <span>👩‍🚀 Perfil de Academia</span>
                        <strong id="usernameDisplay" style="color: var(--vscode-activityBarBadge-background);">Usuario</strong>
                    </div>

                    <div class="progress-container">
                        <div class="progress-text">
                            <span>Progreso Total</span>
                            <span id="progressPercent">0% (0/X)</span>
                        </div>
                        <div class="progress-bar" id="progressBar"></div>
                    </div>
                    
                    <h3 style="margin-top: 20px;">Misiones de Flexbox</h3>
                    
                    <div class="level-list" id="exercisesList">
                        <!-- Misiones renderizadas por JS -->
                    </div>
                </div>

                <div id="exercise-view" class="hidden">
                    <button class="btn btn-secondary" id="backToMenuBtn" style="font-size: 0.85em; padding: 6px;">⬅ Volver al Escuadrón</button>
                    <div class="card" style="margin-top: 10px;">
                        <h3 id="currentExerciseTitle">Nivel: En curso...</h3>
                        <p id="currentExerciseDesc"></p>
                        <hr style="border: 0; border-top: 1px solid var(--vscode-panel-border); margin: 10px 0;">
                        <p style="margin-bottom:0">Abre tu Workspace y edita: <br><code id="currentExerciseFiles"></code></p>
                        <p style="margin-top:5px; font-size: 0.9em; opacity: 0.8"><i>Debes usar CSS puro y flexbox, ¡sin trampas!</i></p>
                    </div>
                    <button class="btn" id="validateBtn">🧠 Que la IA evalúe mi código</button>
                    <div id="status" class="hidden"></div>
                    <div id="aiBox" class="hidden"></div>
                </div>

                <script>
                    const vscode = acquireVsCodeApi();
                    const exercises = ${exercisesJson};
                    let completedSet = new Set();
                    let currentActiveExerciseId = null;
                    
                    const loginView = document.getElementById('login-view');
                    const menuView = document.getElementById('menu-view');
                    const exerciseView = document.getElementById('exercise-view');
                    const exercisesListEl = document.getElementById('exercisesList');
                    
                    const loginBtn = document.getElementById('loginBtn');
                    const validateBtn = document.getElementById('validateBtn');
                    const backToMenuBtn = document.getElementById('backToMenuBtn');
                    const statusEl = document.getElementById('status');
                    const aiBox = document.getElementById('aiBox');

                    loginBtn.addEventListener('click', () => {
                        loginBtn.disabled = true;
                        vscode.postMessage({ type: 'login' });
                    });

                    function renderExercises() {
                        exercisesListEl.innerHTML = '';
                        exercises.forEach(ex => {
                            const isCompleted = completedSet.has(ex.id);
                            
                            const div = document.createElement('div');
                            div.className = 'level-item';
                            div.innerHTML = \`
                                <div class="level-info">
                                    <h4>\${ex.title}</h4>
                                    <p>\${ex.description}</p>
                                </div>
                                <div class="level-action" id="action-\${ex.id}">
                                    \${isCompleted 
                                        ? '<span class="completed-badge">✅ Completado</span>'
                                        : \`<button class="btn start-btn" data-id="\${ex.id}">Iniciar</button>\`
                                    }
                                </div>
                            \`;
                            exercisesListEl.appendChild(div);
                        });

                        document.querySelectorAll('.start-btn').forEach(btn => {
                            btn.addEventListener('click', (e) => {
                                const id = e.target.getAttribute('data-id');
                                currentActiveExerciseId = id;
                                e.target.disabled = true;
                                e.target.innerText = "Preparando...";
                                vscode.postMessage({ type: 'startExercise', id: id });
                            });
                        });
                        
                        updateProgressUI();
                    }

                    validateBtn.addEventListener('click', () => {
                        if(!currentActiveExerciseId) return;
                        validateBtn.disabled = true;
                        aiBox.classList.add('hidden');
                        statusEl.classList.remove('hidden');
                        statusEl.innerText = 'La IA está leyendo tu código...';
                        statusEl.style.backgroundColor = 'transparent';
                        vscode.postMessage({ type: 'validateExercise', id: currentActiveExerciseId });
                    });
                    
                    backToMenuBtn.addEventListener('click', () => {
                        exerciseView.classList.add('hidden');
                        menuView.classList.remove('hidden');
                        statusEl.classList.add('hidden');
                        aiBox.classList.add('hidden');
                        currentActiveExerciseId = null;
                        renderExercises();
                    });

                    window.addEventListener('message', event => {
                        const message = event.data;
                        switch (message.type) {
                            case 'authSuccess':
                                document.getElementById('usernameDisplay').innerText = message.user;
                                loginView.classList.add('hidden');
                                menuView.classList.remove('hidden');
                                
                                completedSet = new Set(message.completedExercises || []);
                                renderExercises();
                                break;
                                
                            case 'authFailed':
                                loginBtn.disabled = false;
                                break;
                                
                            case 'exerciseReady':
                                const ex = message.exercise;
                                menuView.classList.add('hidden');
                                exerciseView.classList.remove('hidden');
                                document.getElementById('currentExerciseTitle').innerText = ex.title;
                                document.getElementById('currentExerciseDesc').innerText = ex.description;
                                document.getElementById('currentExerciseFiles').innerText = \`Launchpad-Missions/\${ex.folderName}/...\`;
                                break;
                                
                            case 'errorCreatingEnv':
                                renderExercises(); 
                                break;
                                
                            case 'validationSuccess':
                                renderFeedback(message.feedback, true);
                                validateBtn.disabled = false;
                                statusEl.innerText = message.feedback.mensajeGeneral + ' 🎉';
                                statusEl.style.color = '#fff';
                                statusEl.style.backgroundColor = 'rgba(76, 175, 80, 0.4)';
                                
                                if (message.id) {
                                    completedSet.add(message.id);
                                }
                                
                                setTimeout(() => {
                                    exerciseView.classList.add('hidden');
                                    menuView.classList.remove('hidden');
                                    statusEl.classList.add('hidden');
                                    aiBox.classList.add('hidden');
                                    renderExercises();
                                }, 6000);
                                break;
                                
                            case 'validationError':
                                renderFeedback(message.feedback, false);
                                validateBtn.disabled = false;
                                statusEl.innerText = message.message + ' ❌';
                                statusEl.style.color = '#fff';
                                statusEl.style.backgroundColor = 'rgba(244, 67, 54, 0.4)';
                                break;
                        }
                    });
                    
                    function escapeHTML(str) {
                        if (!str) return "";
                        return str.replace(/[&<>'"]/g, tag => ({
                            '&': '&amp;',
                            '<': '&lt;',
                            '>': '&gt;',
                            "'": '&#39;',
                            '"': '&quot;'
                        }[tag] || tag));
                    }

                    function renderFeedback(feedback, success) {
                        if (!feedback) return;
                        aiBox.classList.remove('hidden');
                        
                        let html = \`\`;
                        if (feedback.mensajeGeneral) {
                            html += \`<div style="font-size:1.05em; font-weight:600; padding-bottom: 10px; margin-bottom:15px; border-bottom: 1px solid var(--vscode-panel-border); color: \${success ? '#4CAF50' : '#F44336'}">
                                \${success ? '🏆' : '⚠️'} \${escapeHTML(feedback.mensajeGeneral)}
                            </div>\`;
                        }

                        if (feedback.cosasMalas && feedback.cosasMalas.length > 0) {
                            html += \`<div class="ai-feedback ai-bad"><h4>❌ Errores que corregir</h4><ul>\`;
                            feedback.cosasMalas.forEach(m => html += \`<li>\${escapeHTML(m)}</li>\`);
                            html += \`</ul></div>\`;
                        }
                        if (feedback.revisar && feedback.revisar.length > 0) {
                            html += \`<div class="ai-feedback"><h4>🔍 Sugerencias</h4><ul>\`;
                            feedback.revisar.forEach(m => html += \`<li>\${escapeHTML(m)}</li>\`);
                            html += \`</ul></div>\`;
                        }
                        if (feedback.cosasBuenas && feedback.cosasBuenas.length > 0) {
                            html += \`<div class="ai-feedback ai-good"><h4>✅ Lo Bueno</h4><ul>\`;
                            feedback.cosasBuenas.forEach(m => html += \`<li>\${escapeHTML(m)}</li>\`);
                            html += \`</ul></div>\`;
                        }
                        aiBox.innerHTML = html;
                    }

                    function updateProgressUI() {
                        const total = exercises.length;
                        const completed = completedSet.size;
                        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
                        
                        document.getElementById('progressBar').style.width = percent + '%';
                        document.getElementById('progressPercent').innerText = \`\${percent}% (\${completed}/\${total})\`;
                    }
                </script>
            </body>
            </html>`;
    }
}

export function deactivate() {}
