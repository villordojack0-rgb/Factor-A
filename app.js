// PWA Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => console.log("Service Worker registrado."))
      .catch(err => console.log("Error al registrar SW:", err));
  });
}
