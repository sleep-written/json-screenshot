/**
 * Lee en la carpeta estática un JSON y lo parsea.
 * @param {string} path Ruta del JSON a cargar.
 */
export async function getJson(path) {
    try {
        const json = await fetch(path).then(x => x.json());
        return json;
    } catch {
        throw new Error('Oye subnormal, el JSON que pasaste está malo >:C');
    }
}