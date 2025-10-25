import { guardarDatos, obtenerDatos } from './storage.js';

/* --- ESCUELA --- */
document.addEventListener("DOMContentLoaded", () => {
  const formMateria = document.getElementById("formMateria");
  const listaMaterias = document.getElementById("listaMaterias");
  const formTurno = document.getElementById("formTurno");
  const listaTurnos = document.getElementById("listaTurnos");

  /* ---------- MATERIAS ---------- */
  if (formMateria && listaMaterias) {
    let materias = obtenerDatos("materias");

    const renderMaterias = () => {
      listaMaterias.innerHTML = "";
      materias.forEach((m, i) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span>${m.nombre} (${m.dia} ${m.hora})</span>
          <div>
            <button data-edit="${i}">✏️</button>
            <button data-del="${i}">🗑️</button>
          </div>
        `;
        listaMaterias.appendChild(li);
      });
    };

    formMateria.addEventListener("submit", e => {
      e.preventDefault();
      const nombre = document.getElementById("nombreMateria").value.trim();
      const dia = document.getElementById("diaMateria").value.trim();
      const hora = document.getElementById("horaMateria").value.trim();
      if (!nombre) return;

      materias.push({ nombre, dia, hora });
      guardarDatos("materias", materias);
      formMateria.reset();
      renderMaterias();
    });

    listaMaterias.addEventListener("click", e => {
      if (e.target.dataset.del !== undefined) {
        materias.splice(e.target.dataset.del, 1);
        guardarDatos("materias", materias);
        renderMaterias();
      } else if (e.target.dataset.edit !== undefined) {
        const i = e.target.dataset.edit;
        const m = materias[i];
        const nuevoNombre = prompt("Nuevo nombre:", m.nombre);
        const nuevoDia = prompt("Nuevo día:", m.dia);
        const nuevaHora = prompt("Nueva hora:", m.hora);
        if (nuevoNombre) {
          materias[i] = { nombre: nuevoNombre, dia: nuevoDia, hora: nuevaHora };
          guardarDatos("materias", materias);
          renderMaterias();
        }
      }
    });

    renderMaterias();
  }

  /* ---------- TURNOS MÉDICOS ---------- */
  if (formTurno && listaTurnos) {
    let turnos = obtenerDatos("turnos");

    const renderTurnos = () => {
      listaTurnos.innerHTML = "";
      turnos.forEach((t, i) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span>${t.motivo} - ${t.fecha} ${t.hora}</span>
          <div>
            <button data-edit="${i}">✏️</button>
            <button data-del="${i}">🗑️</button>
          </div>
        `;
        listaTurnos.appendChild(li);
      });
    };

    formTurno.addEventListener("submit", e => {
      e.preventDefault();
      const motivo = document.getElementById("motivoTurno").value.trim();
      const fecha = document.getElementById("fechaTurno").value;
      const hora = document.getElementById("horaTurno").value;
      if (!motivo) return;

      turnos.push({ motivo, fecha, hora });
      guardarDatos("turnos", turnos);
      formTurno.reset();
      renderTurnos();
    });

    listaTurnos.addEventListener("click", e => {
      if (e.target.dataset.del !== undefined) {
        turnos.splice(e.target.dataset.del, 1);
        guardarDatos("turnos", turnos);
        renderTurnos();
      } else if (e.target.dataset.edit !== undefined) {
        const i = e.target.dataset.edit;
        const t = turnos[i];
        const nuevoMotivo = prompt("Nuevo motivo:", t.motivo);
        const nuevaFecha = prompt("Nueva fecha (YYYY-MM-DD):", t.fecha);
        const nuevaHora = prompt("Nueva hora (HH:MM):", t.hora);
        if (nuevoMotivo) {
          turnos[i] = { motivo: nuevoMotivo, fecha: nuevaFecha, hora: nuevaHora };
          guardarDatos("turnos", turnos);
          renderTurnos();
        }
      }
    });

    renderTurnos();
  }
});
