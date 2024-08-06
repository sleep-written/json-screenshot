import type { Server } from 'http';
import express from 'express';

export class StaticServer {
    #staticPath: string;
    
    #port: number;
    get port(): number {
        return this.#port;
    }

    constructor(staticPath: string, port: number) {
        this.#port = port;
        this.#staticPath = staticPath;
    }

    async listen(): Promise<() => Promise<void>> {
        const app = express();

        // Servir la carpeta estática
        app.use(express.static(this.#staticPath));

        // Desplegar el server usando this.#port
        const server = await new Promise<Server>(resolve => {
            const server = app.listen(this.#port, () => {
                console.log(`Server is running on port ${this.#port}`);
                resolve(server);
            });
        });

        // Crear callback para matar al servidor
        const callback = () => new Promise<void>(resolveCallback => {
            server.close(() => {
                resolveCallback();
            });
        });

        return callback;
    }
}
