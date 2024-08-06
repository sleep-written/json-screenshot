import { resolve } from 'path';
import { chromium } from 'playwright';
import { setTimeout } from 'timers/promises';

export class Camera {
    #width: number;
    #height: number;

    constructor(width: number, height: number) {
        this.#width = width;
        this.#height = height;
    }

    /**
     * Saca una captura de pantalla.
     * @param url La url a la que le quieres sacar captura de pantalla.
     * @param destination Path en donde quieres dejar la captura.
     * @param timeout Tiempo de espera (en ms) entre que se abre la página, y se saca la captura de pantalla.
     */
    async capture(url: string, destination: string, timeout?: number): Promise<void> {
        // Launch a browser instance
        const browser = await chromium.launch();

        // Create a new browser context
        const context = await browser.newContext({
            viewport: {
                width: this.#width,
                height: this.#height
            }
        });

        // Create a new page
        const page = await context.newPage();

        // Navigate to the desired URL
        await page.goto(url);

        if (typeof timeout === 'number' && !isNaN(timeout)) {
            await setTimeout(timeout);
        }

        // Take a screenshot and save it to a file
        await page.screenshot({ path: resolve(destination) });

        // Close the browser
        await browser.close();
    }
}