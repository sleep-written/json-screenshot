import { join, resolve } from 'path';
import { mkdir, readdir, rm } from 'fs/promises';

import { StaticServer } from './static-server.js';
import { Camera } from './camera.js';

// Limpiar carpeta de salida
const outputPath = resolve('..', 'output');
await rm(outputPath, {
    recursive: true,
    force: true
});

// Volver a crear la carpeta de salida
await mkdir(outputPath, { recursive: true });

// Levantar servidor estático
const staticPath = resolve('../client');
const staticServer = new StaticServer(staticPath, 8080);
const kill = await staticServer.listen();

// leer todos los JSON existentes
const jsonDirents = await readdir(
    resolve('../client/data'),
    { withFileTypes: true }
);

// Iterar por cada JSON
const camera = new Camera(320, 240);
for (const jsonDirent of jsonDirents) {
    const jsonPath = encodeURIComponent(join('./data', jsonDirent.name));
    const url = `localhost:${staticServer.port}?json=${jsonPath}`;
    const out = resolve('../output', jsonDirent.name.replace(/\.json$/gi, '.png'));

    await camera.capture(url, out, 1000);
}

// Matar servidor
await kill();