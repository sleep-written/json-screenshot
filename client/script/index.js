import { awaitForReady } from './await-for-ready.js';
import { getJson } from './get-json.js';
import { getQs } from './get-qs.js';

// Obtener los valores del JSON
await awaitForReady();
const jsonValue = getQs('json');
const jsonData = await getJson(jsonValue);

// Mostrar en la página los datos del JSON
const spanText = document.querySelector('span.json-text');
const spanValue = document.querySelector('span.json-value');

spanText.textContent = jsonData.text;
spanValue.textContent = jsonData.value;