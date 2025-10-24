const botonesMenu = document.querySelectorAll(".menu-btn");
const secciones = document.querySelectorAll(".section");
const configBtn = document.getElementById("configBtn");

botonesMenu.forEach(boton => {
  boton.addEventListener("click", () => mostrarSeccion(boton.dataset.section));
});
configBtn.addEventListener("click", () => mostrarSeccion("config"));

function mostrarSeccion(id) {
  secciones.forEach(sec => sec.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

function mostrarSubseccion(id) {
  document.querySelectorAll(".subsection").forEach(sub => sub.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// ======== ESCUELA ========
const materiaForm = document.getElementById("materiaForm");
const materiaLista = document.getElementById("materiaLista");
let materias = JSON.parse(localStorage.getItem("materias")) || [];

materiaForm?.addEventListener("submit", e => {
  e.preventDefault();
  const nombre = materiaNombre.value.trim();
  const dia = materiaDia.value.trim();
  if (!nombre || !dia) return;
  materias.push({ nombre, dia });
  localStorage.setItem("materias", JSON.stringify(materias));
  materiaForm.reset();
  renderMaterias();
});

function renderMaterias() {
  materiaLista.innerHTML = "";
  materias.forEach(m => {
    const div = document.createElement("div");
    div.className = "tarjeta";
    div.innerHTML = `<strong>${m.nombre}</strong><br>${m.dia}`;
    materiaLista.appendChild(div);
  });
}
renderMaterias();

// ======== MÉDICO ========
const turnoForm = document.getElementById("turnoForm");
const turnoLista = document.getElementById("turnoLista");
let turnos = JSON.parse(localStorage.getItem("turnos")) || [];

turnoForm?.addEventListener("submit", e => {
  e.preventDefault();
  const fecha = turnoFecha.value.trim();
  const hora = turnoHora.value.trim();
  const lugar = turnoLugar.value.trim();
  if (!fecha || !hora || !lugar) return;
  turnos.push({ fecha, hora, lugar });
  localStorage.setItem("turnos", JSON.stringify(turnos));
  turnoForm.reset();
  renderTurnos();
});

function renderTurnos() {
  turnoLista.innerHTML = "";
  turnos.forEach(t => {
    const div = document.createElement("div");
    div.className = "tarjeta";
    div.innerHTML = `<strong>${t.fecha}</strong> - ${t.hora}<br>${t.lugar}`;
    turnoLista.appendChild(div);
  });
}
renderTurnos();

// ======== CONFIG ========
const modoSelect = document.getElementById("modoSelect");
const fuenteSelect = document.getElementById("fuenteSelect");

modoSelect?.addEventListener("change", () => {
  const modo = modoSelect.value;
  document.body.classList.toggle("claro", modo === "claro");
  localStorage.setItem("modo", modo);
});

fuenteSelect?.addEventListener("change", () => {
  const fuente = fuenteSelect.value;
  document.body.style.fontFamily = fuente;
  localStorage.setItem("fuente", fuente);
});

window.addEventListener("load", () => {
  const modo = localStorage.getItem("modo") || "oscuro";
  if (modo === "claro") document.body.classList.add("claro");
  modoSelect.value = modo;
  const fuente = localStorage.getItem("fuente") || "Roboto";
  fuenteSelect.value = fuente;
  document.body.style.fontFamily = fuente;
});
