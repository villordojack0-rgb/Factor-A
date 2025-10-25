import { cargarEscuela } from "../modulos/escuela-js/escuela.js";
import { cargarMedico } from "../modulos/medico.js";
import { cargarProyectos } from "../modulos/proyectos.js";

const views = document.querySelectorAll(".view");

function mostrarVista(id) {
  views.forEach(v => v.classList.add("hidden"));
  document.getElementById(id)?.classList.remove("hidden");
}

document.querySelectorAll(".nav-btn, .action-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const destino = btn.dataset.target;
    mostrarVista(destino);
    cargarModulo(destino);
  });
});

function cargarModulo(destino) {
  switch (destino) {
    case "escuela": cargarEscuela(); break;
    case "medico": cargarMedico(); break;
    case "proyectos": cargarProyectos(); break;
  }
}
