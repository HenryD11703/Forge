import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

const API_BASE = 'http://localhost:3000/api';

// ─── Types ────────────────────────────────────────────────────────────────
interface Exercise {
    id: string;
    slug: string;
    title: string;
    description: string;
    type: 'html' | 'js' | 'terminal';
    sort_order: number;
    module_id: string;
    completed: boolean;
}

interface Module {
    id: string;
    slug: string;
    title: string;
    description: string;
    icon: string;
    sort_order: number;
    exercises: Exercise[];
    totalExercises: number;
    completedExercises: number;
}

interface ExerciseDetail {
    id: string;
    slug: string;
    title: string;
    description: string;
    type: 'html' | 'js' | 'terminal';
    html_template: string;
    css_template: string;
    instruction_for_ai: string;
}

// ─── Activate ─────────────────────────────────────────────────────────────
export function activate(context: vscode.ExtensionContext) {
    const provider = new LaunchpadViewProvider(context);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(LaunchpadViewProvider.viewType, provider)
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('launchpad.helloWorld', () => {
            vscode.window.showInformationMessage('🚀 Launchpad: ¡Listo para despegar!');
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('launchpad.resetProgress', async () => {
            await context.globalState.update('githubUsername', undefined);
            vscode.window.showInformationMessage('Launchpad: Progreso reiniciado. Recarga la ventana.');
        })
    );
}

export function deactivate() {}

// ─── Provider ─────────────────────────────────────────────────────────────
class LaunchpadViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'launchpad.helloWorldView';

    private _view?: vscode.WebviewView;
    private _githubUsername: string | undefined;
    private _activeExercise: ExerciseDetail | undefined;
    private _activeWorkspaceFolder: string | undefined;

    constructor(private readonly _context: vscode.ExtensionContext) {
        this._githubUsername = this._context.globalState.get('githubUsername');
    }

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        _context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken,
    ) {
        this._view = webviewView;
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._context.extensionUri],
        };
        webviewView.title = 'Launchpad';
        webviewView.webview.html = this._buildHtml(webviewView.webview);

        webviewView.webview.onDidReceiveMessage(async (msg) => {
            switch (msg.command) {
                case 'login':         await this._login(webviewView.webview); break;
                case 'logout':        await this._logout(); break;
                case 'loadModules':   await this._loadAndSendModules(); break;
                case 'startExercise': await this._startExercise(msg.slug); break;
                case 'validate':      await this._validateExercise(); break;
            }
        });

        // Silent auth on startup
        this._checkAuthSilently(webviewView.webview);
    }

    // ─── Auth ─────────────────────────────────────────────────────────────
    private async _checkAuthSilently(_webview: vscode.Webview) {
        if (this._githubUsername) {
            await this._loadAndSendModules();
            return;
        }
        // VS Code stores sessions keyed by scopes — try common scope combos
        // to match whatever session already exists (Copilot, Source Control, etc)
        const scopeCombos = [
            [],                              // any existing session
            ['read:user'],
            ['read:user', 'user:email'],
        ];
        for (const scopes of scopeCombos) {
            try {
                const session = await vscode.authentication.getSession(
                    'github', scopes, { createIfNone: false, silent: true }
                );
                if (session) {
                    this._githubUsername = session.account.label;
                    await this._context.globalState.update('githubUsername', this._githubUsername);
                    await this._loadAndSendModules();
                    return;
                }
            } catch { /* try next */ }
        }
        // No existing session found — stay on login screen
    }

    private async _login(webview: vscode.Webview) {
        try {
            // Try to find any existing GitHub session VS Code already has
            const scopeCombos = [[], ['read:user'], ['read:user', 'user:email']];
            let session: vscode.AuthenticationSession | undefined;

            for (const scopes of scopeCombos) {
                try {
                    session = await vscode.authentication.getSession(
                        'github', scopes, { createIfNone: false, silent: true }
                    );
                    if (session) { break; }
                } catch { /* try next */ }
            }

            // If still no session, ask VS Code to authenticate (will use existing account)
            if (!session) {
                session = await vscode.authentication.getSession(
                    'github', ['read:user'], { createIfNone: true }
                );
            }

            if (!session) {
                webview.postMessage({ command: 'error', text: 'No se pudo autenticar con GitHub.' });
                return;
            }
            this._githubUsername = session.account.label;
            await this._context.globalState.update('githubUsername', this._githubUsername);
            await this._loadAndSendModules();
        } catch (err: any) {
            const msg = err?.message ?? String(err);
            vscode.window.showErrorMessage('Launchpad auth error: ' + msg);
            webview.postMessage({ command: 'error', text: 'Error de autenticación: ' + msg });
        }
    }

    private async _logout() {
        this._githubUsername = undefined;
        this._activeExercise = undefined;
        await this._context.globalState.update('githubUsername', undefined);
        this._send({ command: 'loggedOut' });
    }

    // ─── Modules ──────────────────────────────────────────────────────────
    private async _loadAndSendModules() {
        try {
            this._send({ command: 'loading', text: 'Cargando misiones...' });
            const url = API_BASE + '/modules' + (this._githubUsername ? '?githubUsername=' + this._githubUsername : '');
            const res = await fetch(url);
            if (!res.ok) { throw new Error('HTTP ' + res.status); }
            const modules = await res.json() as Module[];
            this._send({ command: 'modulesLoaded', modules, username: this._githubUsername });
        } catch (err: any) {
            this._send({ command: 'error', text: 'No se pudo conectar al servidor backend. \u00bfEst\u00e1 corriendo el backend?' });
        }
    }

    // ─── Exercise ─────────────────────────────────────────────────────────
    private async _startExercise(slug: string) {
        try {
            this._send({ command: 'loading', text: 'Preparando misión...' });
            const res = await fetch(API_BASE + '/exercises/' + slug);
            if (!res.ok) { throw new Error('Ejercicio no encontrado: ' + slug); }
            const exercise = await res.json() as ExerciseDetail;
            this._activeExercise = exercise;

            const folders = vscode.workspace.workspaceFolders;
            if (!folders?.length) {
                vscode.window.showErrorMessage('Launchpad: Abre una carpeta de trabajo primero.');
                this._send({ command: 'error', text: 'Abre una carpeta en VS Code antes de iniciar.' });
                return;
            }
            this._activeWorkspaceFolder = folders[0].uri.fsPath;

            if (exercise.type === 'html') {
                fs.writeFileSync(path.join(this._activeWorkspaceFolder, 'index.html'), exercise.html_template, 'utf-8');
                fs.writeFileSync(path.join(this._activeWorkspaceFolder, 'style.css'), exercise.css_template || '', 'utf-8');
                const doc = await vscode.workspace.openTextDocument(path.join(this._activeWorkspaceFolder, 'index.html'));
                await vscode.window.showTextDocument(doc, { viewColumn: vscode.ViewColumn.One });
            } else if (exercise.type === 'js') {
                fs.writeFileSync(path.join(this._activeWorkspaceFolder, 'mision.js'), exercise.html_template, 'utf-8');
                const doc = await vscode.workspace.openTextDocument(path.join(this._activeWorkspaceFolder, 'mision.js'));
                await vscode.window.showTextDocument(doc, { viewColumn: vscode.ViewColumn.One });
                vscode.window.showInformationMessage('Prueba tu código con: node mision.js');
            } else if (exercise.type === 'terminal') {
                fs.writeFileSync(path.join(this._activeWorkspaceFolder, 'respuestas.md'), exercise.html_template, 'utf-8');
                const doc = await vscode.workspace.openTextDocument(path.join(this._activeWorkspaceFolder, 'respuestas.md'));
                await vscode.window.showTextDocument(doc, { viewColumn: vscode.ViewColumn.One });
                const term = vscode.window.createTerminal({ name: 'Terminal Git', cwd: this._activeWorkspaceFolder });
                term.show();
            }

            this._send({
                command: 'exerciseStarted',
                exercise: { id: exercise.id, title: exercise.title, description: exercise.description, type: exercise.type, slug: exercise.slug },
            });
        } catch (err: any) {
            this._send({ command: 'error', text: err.message });
        }
    }

    // ─── Validate ─────────────────────────────────────────────────────────
    private async _validateExercise() {
        if (!this._activeExercise || !this._activeWorkspaceFolder) {
            this._send({ command: 'error', text: 'No hay misión activa.' });
            return;
        }
        const ex = this._activeExercise;
        const folder = this._activeWorkspaceFolder;
        let userCode = '';
        try {
            if (ex.type === 'html') {
                const html = fs.existsSync(path.join(folder, 'index.html')) ? fs.readFileSync(path.join(folder, 'index.html'), 'utf-8') : '';
                const css  = fs.existsSync(path.join(folder, 'style.css'))  ? fs.readFileSync(path.join(folder, 'style.css'), 'utf-8') : '';
                userCode = '<!-- HTML -->\n' + html + '\n\n/* CSS */\n' + css;
            } else if (ex.type === 'js') {
                const p = path.join(folder, 'mision.js');
                if (!fs.existsSync(p)) { throw new Error('No se encontró mision.js'); }
                userCode = fs.readFileSync(p, 'utf-8');
            } else {
                const p = path.join(folder, 'respuestas.md');
                if (!fs.existsSync(p)) { throw new Error('No se encontró respuestas.md'); }
                userCode = fs.readFileSync(p, 'utf-8');
            }
        } catch (err: any) {
            this._send({ command: 'error', text: err.message });
            return;
        }

        this._send({ command: 'validating' });
        try {
            const res = await fetch(API_BASE + '/evaluate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userCode,
                    exerciseInstruction: ex.instruction_for_ai,
                    exerciseId: ex.id,
                    githubUsername: this._githubUsername,
                    exerciseType: ex.type,
                }),
            });
            if (!res.ok) {
                const errBody = await res.json() as { error: string };
                throw new Error(errBody.error);
            }
            const result = await res.json() as { aprobado: boolean };
            this._send({ command: 'validationResult', result, exerciseSlug: ex.slug });
            if (result.aprobado) { setTimeout(() => this._loadAndSendModules(), 1200); }
        } catch (err: any) {
            this._send({ command: 'error', text: 'Error de validación: ' + err.message });
        }
    }

    // ─── Helper ───────────────────────────────────────────────────────────
    private _send(msg: Record<string, unknown>) {
        this._view?.webview.postMessage(msg);
    }

    // ─── HTML ─────────────────────────────────────────────────────────────
    private _buildHtml(webview: vscode.Webview): string {
        const csp = webview.cspSource;
        const scriptUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._context.extensionUri, 'media', 'webview.js')
        );
        return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline' ${csp}; script-src ${csp} 'unsafe-inline';">
<title>Launchpad</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: var(--vscode-sideBar-background, var(--vscode-editor-background)); color: var(--vscode-foreground); font-family: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif); font-size: var(--vscode-font-size, 13px); min-height: 100vh; }
  ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: var(--vscode-scrollbarSlider-background); border-radius: 2px; }
  .view { display: none; flex-direction: column; min-height: 100vh; } .view.active { display: flex; }
  .login-wrap { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px 16px; gap: 20px; }
  .launch-icon { font-size: 52px; text-align: center; line-height: 1; }
  .login-title { font-size: 17px; font-weight: 700; text-align: center; color: var(--vscode-textLink-foreground); }
  .login-sub { font-size: 12px; color: var(--vscode-descriptionForeground); text-align: center; line-height: 1.6; }
  .btn-github { width: 100%; padding: 10px 16px; background: var(--vscode-button-background); color: var(--vscode-button-foreground); border: none; border-radius: 4px; font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: background 0.15s; }
  .btn-github:hover { background: var(--vscode-button-hoverBackground); } .btn-github:disabled { opacity: 0.5; cursor: not-allowed; }
  .header { background: var(--vscode-sideBarSectionHeader-background, var(--vscode-sideBar-background)); border-bottom: 1px solid var(--vscode-sideBarSectionHeader-border, var(--vscode-widget-border)); padding: 10px 12px; display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-shrink: 0; }
  .brand { display: flex; align-items: center; gap: 8px; } .brand-icon { font-size: 16px; }
  .brand-title { font-weight: 600; font-size: 13px; color: var(--vscode-textLink-foreground); } .brand-sub { font-size: 10px; color: var(--vscode-descriptionForeground); }
  .btn-sm { background: none; border: 1px solid var(--vscode-button-secondaryBackground, var(--vscode-widget-border)); color: var(--vscode-descriptionForeground); border-radius: 3px; padding: 3px 8px; cursor: pointer; font-size: 11px; transition: all 0.15s; }
  .btn-sm:hover { border-color: var(--vscode-focusBorder); color: var(--vscode-foreground); }
  .mod-scroll { flex: 1; overflow-y: auto; padding: 8px; display: flex; flex-direction: column; gap: 6px; }
  .user-badge { display: flex; align-items: center; gap: 8px; background: var(--vscode-list-hoverBackground); border-radius: 4px; padding: 8px 10px; border: 1px solid var(--vscode-widget-border, transparent); }
  .avatar { width: 26px; height: 26px; border-radius: 50%; background: var(--vscode-button-background); color: var(--vscode-button-foreground); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0; }
  .user-name { font-weight: 600; font-size: 12px; } .user-stats { font-size: 10px; color: var(--vscode-descriptionForeground); }
  .global-prog { background: var(--vscode-list-hoverBackground); border-radius: 4px; padding: 8px 10px; border: 1px solid var(--vscode-widget-border, transparent); }
  .prog-label { display: flex; justify-content: space-between; font-size: 10px; color: var(--vscode-descriptionForeground); margin-bottom: 5px; }
  .track { background: var(--vscode-progressBar-background, #333); border-radius: 99px; height: 4px; overflow: hidden; filter: brightness(0.4); }
  .fill { height: 100%; border-radius: 99px; background: var(--vscode-progressBar-background); filter: brightness(2.5); transition: width 0.5s; }
  .mod-card { background: var(--vscode-list-hoverBackground); border: 1px solid var(--vscode-widget-border, transparent); border-radius: 4px; overflow: hidden; transition: border-color 0.15s; }
  .mod-card:hover { border-color: var(--vscode-focusBorder); }
  .mod-header { display: flex; align-items: center; gap: 8px; padding: 8px 10px; cursor: pointer; user-select: none; }
  .mod-icon { font-size: 15px; flex-shrink: 0; } .mod-meta { flex: 1; min-width: 0; }
  .mod-title { font-weight: 600; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mod-count { font-size: 10px; color: var(--vscode-descriptionForeground); margin-top: 1px; }
  .mini { width: 32px; } .mini .track { height: 2px; }
  .chevron { font-size: 8px; color: var(--vscode-descriptionForeground); transition: transform 0.2s; flex-shrink: 0; }
  .mod-card.open .chevron { transform: rotate(180deg); }
  .ex-list { display: none; border-top: 1px solid var(--vscode-widget-border, #333); } .mod-card.open .ex-list { display: block; }
  .ex-row { display: flex; align-items: center; gap: 7px; padding: 7px 10px; border-bottom: 1px solid var(--vscode-widget-border, #333); transition: background 0.1s; }
  .ex-row:last-child { border-bottom: none; } .ex-row:hover { background: var(--vscode-list-activeSelectionBackground, rgba(255,255,255,0.06)); }
  .ex-num { width: 18px; height: 18px; border-radius: 50%; background: var(--vscode-badge-background, #444); color: var(--vscode-badge-foreground, #fff); font-size: 9px; font-weight: 700; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
  .ex-num.done { background: var(--vscode-testing-iconPassed, #4CAF50); color: #fff; }
  .ex-info { flex: 1; min-width: 0; } .ex-title { font-size: 11px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .tag { font-size: 9px; border-radius: 3px; padding: 1px 5px; font-weight: 700; flex-shrink: 0; opacity: 0.85; }
  .tag-html { background: var(--vscode-symbolIcon-classForeground, #EF6C00); color: #fff; }
  .tag-js   { background: var(--vscode-symbolIcon-functionForeground, #A8994D); color: #fff; }
  .tag-terminal { background: var(--vscode-terminal-ansiGreen, #4CAF50); color: #fff; }
  .btn-start { padding: 3px 9px; font-size: 10px; font-weight: 600; background: var(--vscode-button-background); color: var(--vscode-button-foreground); border: none; border-radius: 3px; cursor: pointer; flex-shrink: 0; white-space: nowrap; transition: background 0.1s; }
  .btn-start:hover { background: var(--vscode-button-hoverBackground); }
  .btn-retry { background: transparent; color: var(--vscode-textLink-foreground); border: 1px solid var(--vscode-textLink-foreground); }
  .btn-retry:hover { background: var(--vscode-list-hoverBackground); }
  .ex-hdr { padding: 10px 12px; background: var(--vscode-sideBarSectionHeader-background, var(--vscode-sideBar-background)); border-bottom: 1px solid var(--vscode-widget-border, #333); flex-shrink: 0; }
  .ex-hdr-top { display: flex; align-items: center; gap: 7px; margin-bottom: 5px; }
  .btn-back { background: none; border: 1px solid var(--vscode-widget-border, #555); color: var(--vscode-descriptionForeground); border-radius: 3px; padding: 2px 7px; cursor: pointer; font-size: 11px; flex-shrink: 0; transition: all 0.1s; }
  .btn-back:hover { border-color: var(--vscode-focusBorder); color: var(--vscode-foreground); }
  .ex-title-txt { font-weight: 700; font-size: 13px; flex: 1; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
  .ex-desc-txt { font-size: 11px; color: var(--vscode-descriptionForeground); line-height: 1.5; }
  .ex-body { flex: 1; display: flex; flex-direction: column; gap: 10px; padding: 12px; overflow-y: auto; }
  .instr-box { background: var(--vscode-textBlockQuote-background, rgba(255,255,255,0.04)); border-left: 3px solid var(--vscode-textLink-foreground); border-radius: 0 4px 4px 0; padding: 10px 12px; font-size: 11px; color: var(--vscode-foreground); line-height: 1.6; }
  .instr-box strong { color: var(--vscode-textLink-foreground); }
  .btn-validate { width: 100%; padding: 10px; background: var(--vscode-button-background); color: var(--vscode-button-foreground); border: none; border-radius: 4px; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.15s; }
  .btn-validate:hover:not(:disabled) { background: var(--vscode-button-hoverBackground); } .btn-validate:disabled { opacity: 0.45; cursor: not-allowed; }
  .result-box { border-radius: 4px; padding: 10px; border-left: 3px solid var(--vscode-widget-border); }
  .result-box.pass { border-left-color: var(--vscode-testing-iconPassed, #4CAF50); background: var(--vscode-diffEditor-insertedLineBackground, rgba(76,175,80,0.08)); }
  .result-box.fail { border-left-color: var(--vscode-testing-iconFailed, #F44336); background: var(--vscode-diffEditor-removedLineBackground, rgba(244,67,54,0.08)); }
  .result-hdr { display: flex; align-items: center; gap: 7px; margin-bottom: 7px; }
  .result-icon { font-size: 18px; } .result-ttl { font-size: 13px; font-weight: 700; }
  .result-ttl.pass { color: var(--vscode-testing-iconPassed, #4CAF50); } .result-ttl.fail { color: var(--vscode-testing-iconFailed, #F44336); }
  .result-msg { font-size: 11px; color: var(--vscode-descriptionForeground); line-height: 1.5; margin-bottom: 8px; }
  .rs h4 { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .7px; margin-bottom: 4px; }
  .rs.good h4 { color: var(--vscode-testing-iconPassed, #4CAF50); } .rs.bad h4 { color: var(--vscode-testing-iconFailed, #F44336); } .rs.tip h4 { color: var(--vscode-textLink-foreground); }
  .rs ul { list-style: none; display: flex; flex-direction: column; gap: 3px; margin-bottom: 8px; }
  .rs li { font-size: 11px; color: var(--vscode-foreground); line-height: 1.4; padding-left: 12px; position: relative; opacity: 0.85; }
  .rs.good li::before { content: "\u2713"; position: absolute; left: 0; color: var(--vscode-testing-iconPassed, #4CAF50); }
  .rs.bad  li::before { content: "\u2717"; position: absolute; left: 0; color: var(--vscode-testing-iconFailed, #F44336); }
  .rs.tip  li::before { content: "\u2192"; position: absolute; left: 0; color: var(--vscode-textLink-foreground); }
  .loading-box { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; color: var(--vscode-descriptionForeground); padding: 40px; }
  .spinner { width: 22px; height: 22px; border: 2px solid var(--vscode-widget-border, #444); border-top-color: var(--vscode-progressBar-background, #007ACC); border-radius: 50%; animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .err-box { background: var(--vscode-inputValidation-errorBackground, rgba(255,0,0,0.1)); border: 1px solid var(--vscode-inputValidation-errorBorder, #F44336); border-radius: 4px; padding: 8px 10px; font-size: 11px; color: var(--vscode-inputValidation-errorForeground, #F44336); line-height: 1.5; margin-top: 8px; }
</style>
</head>
<body>

<!-- VIEW: LOGIN -->
<div class="view active" id="vLogin">
  <div class="login-wrap">
    <div class="launch-icon">\u{1F680}</div>
    <div class="login-title">Launchpad</div>
    <div class="login-sub">Tu plataforma de aprendizaje.<br>Con\u00e9ctate con GitHub para despegar.</div>
    <button id="loginBtn" class="btn-github">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
      </svg>
      Continuar con GitHub
    </button>
    <div id="loginErr"></div>
  </div>
</div>

<!-- VIEW: MODULES -->
<div class="view" id="vModules">
  <div class="header">
    <div class="brand">
      <span class="brand-icon">\u{1F680}</span>
      <div>
        <div class="brand-title">Launchpad</div>
        <div class="brand-sub">Misiones de aprendizaje</div>
      </div>
    </div>
    <button class="btn-sm" id="logoutBtn">Salir</button>
  </div>
  <div class="mod-scroll" id="modList">
    <div class="loading-box"><div class="spinner"></div><span>Cargando...</span></div>
  </div>
</div>

<!-- VIEW: EXERCISE -->
<div class="view" id="vExercise">
  <div class="ex-hdr">
    <div class="ex-hdr-top">
      <button class="btn-back" id="backBtn">\u2190 Misiones</button>
      <div class="ex-title-txt" id="exTitle"></div>
      <span class="tag" id="exTypePill"></span>
    </div>
    <div class="ex-desc-txt" id="exDesc"></div>
  </div>
  <div class="ex-body">
    <div class="instr-box" id="exInstr"></div>
    <button class="btn-validate" id="validateBtn">\u{1F6F8} Validar Misi\u00f3n</button>
    <div id="resultArea"></div>
  </div>
</div>

<!-- VIEW: LOADING -->
<div class="view" id="vLoading">
  <div class="loading-box"><div class="spinner"></div><span id="loadTxt">Cargando...</span></div>
</div>

<script src="${scriptUri}"></script>
</body>
</html>`;
    }
}
