// --- MANEJO DE LOCALSTORAGE ---
export function guardarDatos(clave, datos) {
  localStorage.setItem(clave, JSON.stringify(datos));
}

export function obtenerDatos(clave) {
  const datos = localStorage.getItem(clave);
  return datos ? JSON.parse(datos) : [];
}
