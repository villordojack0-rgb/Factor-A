const botonesMenu = document.querySelectorAll(".menu-btn");
const secciones = document.querySelectorAll(".section");
const configBtn = document.getElementById("configBtn");

botonesMenu.forEach(boton => {
  boton.addEventListener("click", () => {
    const sectionId = boton.dataset.section;
    mostrarSeccion(sectionId);
  });
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

// ===================== ESCUELA =====================
const materiaForm = document.getElementById("materiaForm");
const materiaLista = document.getElementById("materiaLista");
let materias = JSON.parse(localStorage.getItem("materias")) || [];

materiaForm.addEventListener("submit", e => {
  e.preventDefault();
  const nombre = document.getElementById("materiaNombre").value.trim();
  const dia = document.getElementById("materiaDia").value.trim();
  if (!nombre || !dia) return;

  const nueva = { nombre, dia };
  materias.push(nueva);
  localStorage.setItem("materias", JSON.stringify(materias));
  materiaForm.reset();
  renderMaterias();
});

function renderMaterias() {
  materiaLista.innerHTML = "";
  materias.forEach((m, i) => {
    const div = document.createElement("div");
    div.className = "tarjeta";
    div.innerHTML = `<strong>${m.nombre}</strong><br>${m.dia}`;
    materiaLista.appendChild(div);
  });
}
renderMaterias();

// ===================== MÉDICO =====================
const turnoForm = document.getElementById("turnoForm");
const turnoLista = document.getElementById("turnoLista");
let turnos = JSON.parse(localStorage.getItem("turnos")) || [];

turnoForm.addEventListener("submit", e => {
  e.preventDefault();
  const fecha = document.getElementById("turnoFecha").value.trim();
  const hora = document.getElementById("turnoHora").value.trim();
  const lugar = document.getElementById("turnoLugar").value.trim();
  if (!fecha || !hora || !lugar) return;

  const nuevo = { fecha, hora, lugar };
  turnos.push(nuevo);
  localStorage.setItem("turnos", JSON.stringify(turnos));
  turnoForm.reset();
  renderTurnos();
});

function renderTurnos() {
  turnoLista.innerHTML = "";
  turnos.forEach((t, i) => {
    const div = document.createElement("div");
    div.className = "tarjeta";
    div.innerHTML = `<strong>${t.fecha}</strong> - ${t.hora}<br>${t.lugar}`;
    turnoLista.appendChild(div);
  });
}
renderTurnos();

// ===================== CONFIGURACIÓN =====================
const modoSelect = document.getElementById("modoSelect");
const fuenteSelect = document.getElementById("fuenteSelect");

modoSelect.addEventListener("change", () => {
  const modo = modoSelect.value;
  document.body.classList.toggle("dark", modo === "oscuro");
  localStorage.setItem("modo", modo);
});

fuenteSelect.addEventListener("change", () => {
  const fuente = fuenteSelect.value;
  document.body.style.fontFamily = fuente;
  localStorage.setItem("fuente", fuente);
});

// Cargar preferencias
window.addEventListener("load", () => {
  const modo = localStorage.getItem("modo") || "claro";
  modoSelect.value = modo;
  if (modo === "oscuro") document.body.classList.add("dark");

  const fuente = localStorage.getItem("fuente") || "Consolas";
  fuenteSelect.value = fuente;
  document.body.style.fontFamily = fuente;
});
