export function awaitForReady() {
    return new Promise(r => {
        document.addEventListener(
            'DOMContentLoaded',
            r
        );
    });
}