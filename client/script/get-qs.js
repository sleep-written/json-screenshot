/**
 * Busca en la URL actual el valor de una querystring indicada.
 * Si no existe, devolverá error.
 * @param {string} name Nombre de la querystring a capturar.
 */
export function getQs(name) {
    const urlParams = new URLSearchParams(window.location.search);
    const qsValue = urlParams.get(name)?.trim();
    
    if (typeof qsValue !== 'string' || qsValue.length === 0){
        throw new Error(`Pendejo, necesito la querystring llamada "${name}" >:c`);
    } else {
        return qsValue;
    }
}