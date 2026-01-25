const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

async function startVite() {
  const { createServer } = require('vite');
  const server = await createServer({
    root: process.cwd(),
    server: { port: 5173 }
  });
  await server.listen();
  const info = server.config.logger.info;
  console.log('Vite dev server started on port 3000');
  return server;
}

function findElectronExe() {
  try {
    const pkgPath = require.resolve('electron/package.json', { paths: [process.cwd()] });
    const pkgDir = path.dirname(pkgPath);
    // common location for electron binary in npm package
    const candidates = [
      path.join(pkgDir, 'dist', 'electron.exe'),
      path.join(pkgDir, 'dist', 'electron'),
      path.join(pkgDir, 'dist', 'Electron.exe'),
      path.join(pkgDir, 'electron.exe')
    ];
    for (const c of candidates) {
      if (fs.existsSync(c)) return c;
    }
    // fallback: use npx electron
    return null;
  } catch (e) {
    return null;
  }
}

async function startElectron(devUrl) {
  const electronExe = findElectronExe();
  const env = Object.assign({}, process.env);
  if (devUrl) env.DEV_SERVER_URL = devUrl;
  if (electronExe) {
    console.log('Launching Electron from', electronExe, 'with DEV_SERVER_URL=', env.DEV_SERVER_URL);
    const child = spawn(electronExe, ['.'], { stdio: 'inherit', env });
    child.on('exit', (code) => process.exit(code));
  } else {
    console.log('Electron binary not found in node_modules. Falling back to npx electron .');
    const child = spawn(process.execPath, [require.resolve('npx/bin/npx-cli.js'), 'electron', '.'], { stdio: 'inherit', env });
    child.on('exit', (code) => process.exit(code));
  }
}

(async () => {
  // Ensure COMSPEC exists on Windows
  if (process.platform === 'win32' && !process.env.ComSpec) {
    const system32 = path.join(process.env.WINDIR || 'C:\\Windows', 'System32', 'cmd.exe');
    if (fs.existsSync(system32)) process.env.ComSpec = system32;
  }

  try {
    const server = await startVite();
    // determine actual port used by Vite (config override or actual server port)
    const cfgPort = server.config && server.config.server && server.config.server.port;
    const candidatePorts = [cfgPort, 5173, 3000, 3001, 8080].filter(Boolean);
    const http = require('http');

    const checkPort = (port) => new Promise((resolve) => {
      const req = http.request({ method: 'GET', host: '127.0.0.1', port, path: '/' , timeout: 1000 }, (res) => {
        resolve(true);
      });
      req.on('error', () => resolve(false));
      req.on('timeout', () => { req.destroy(); resolve(false); });
      req.end();
    });

    let actualPort = null;
    for (const p of candidatePorts) {
      // try a few times in case server is still warming up
      const ok = await checkPort(p);
      if (ok) { actualPort = p; break; }
    }
    if (!actualPort) actualPort = candidatePorts[0] || 3000;
    const devUrl = `http://localhost:${actualPort}`;
    await startElectron(devUrl);
  } catch (err) {
    console.error('Dev runner error:', err);
    process.exit(1);
  }
})();
