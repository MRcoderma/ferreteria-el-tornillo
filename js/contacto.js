"use strict";

const formulario = document.querySelector("#formulario-contacto");
const nombre = document.querySelector("#nombre");
const mensaje = document.querySelector("#mensaje");
const botonEnviar = document.querySelector("#enviar");
const contador = document.querySelector("#contador");
const estado = document.querySelector("#estado-formulario");
const anio = document.querySelector("#anio");

const limpiarTexto = (valor) => valor.replace(/\s+/g, " ").trim();

function evaluarCampos(mostrarErrores = false) {
  const nombreLimpio = limpiarTexto(nombre.value);
  const mensajeLimpio = limpiarTexto(mensaje.value);
  const nombreValido = nombreLimpio.length >= 2;
  const mensajeValido = mensajeLimpio.length >= 10;

  if (mostrarErrores || nombre.value.length > 0) {
    nombre.setAttribute("aria-invalid", String(!nombreValido));
    document.querySelector("#error-nombre").textContent = nombreValido
      ? ""
      : "El nombre debe tener al menos 2 caracteres.";
  }

  if (mostrarErrores || mensaje.value.length > 0) {
    mensaje.setAttribute("aria-invalid", String(!mensajeValido));
    document.querySelector("#error-mensaje").textContent = mensajeValido
      ? ""
      : "El mensaje debe tener al menos 10 caracteres.";
  }

  botonEnviar.disabled = !(nombreValido && mensajeValido);
  return nombreValido && mensajeValido;
}

nombre.addEventListener("input", () => {
  estado.textContent = "";
  evaluarCampos();
});

mensaje.addEventListener("input", () => {
  contador.textContent = String(mensaje.value.length);
  estado.textContent = "";
  evaluarCampos();
});

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  if (!evaluarCampos(true)) {
    estado.textContent = "Revisa los campos indicados antes de continuar.";
    nombre.focus();
    return;
  }

  const nombreCliente = limpiarTexto(nombre.value);
  estado.textContent = `Gracias, ${nombreCliente}. Tu consulta fue validada correctamente.`;
  formulario.reset();
  contador.textContent = "0";
  botonEnviar.disabled = true;
  nombre.removeAttribute("aria-invalid");
  mensaje.removeAttribute("aria-invalid");
});

anio.textContent = String(new Date().getFullYear());
