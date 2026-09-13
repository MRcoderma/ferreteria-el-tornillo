"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");

class ElementoSimulado {
  constructor(valor = "") {
    this.value = valor;
    this.textContent = "";
    this.disabled = true;
    this.attributes = new Map();
    this.listeners = new Map();
    this.focused = false;
  }

  addEventListener(tipo, funcion) {
    this.listeners.set(tipo, funcion);
  }

  dispatch(tipo, evento = {}) {
    return this.listeners.get(tipo)?.({ preventDefault() {}, ...evento });
  }

  setAttribute(nombre, valor) {
    this.attributes.set(nombre, valor);
  }

  getAttribute(nombre) {
    return this.attributes.get(nombre) ?? null;
  }

  removeAttribute(nombre) {
    this.attributes.delete(nombre);
  }

  focus() {
    this.focused = true;
  }
}

const elementos = {
  "#formulario-contacto": new ElementoSimulado(),
  "#nombre": new ElementoSimulado(),
  "#mensaje": new ElementoSimulado(),
  "#enviar": new ElementoSimulado(),
  "#contador": new ElementoSimulado(),
  "#estado-formulario": new ElementoSimulado(),
  "#anio": new ElementoSimulado(),
  "#error-nombre": new ElementoSimulado(),
  "#error-mensaje": new ElementoSimulado()
};

elementos["#formulario-contacto"].reset = () => {
  elementos["#nombre"].value = "";
  elementos["#mensaje"].value = "";
};

const contexto = {
  document: {
    querySelector(selector) {
      return elementos[selector];
    }
  },
  Date,
  console
};

const archivo = path.join(__dirname, "..", "js", "contacto.js");
vm.runInNewContext(fs.readFileSync(archivo, "utf8"), contexto, { filename: archivo });

assert.equal(elementos["#enviar"].disabled, true, "El botón inicia deshabilitado");

elementos["#nombre"].value = "A";
elementos["#mensaje"].value = "Mensaje suficientemente largo";
elementos["#nombre"].dispatch("input");
elementos["#mensaje"].dispatch("input");
assert.equal(elementos["#nombre"].getAttribute("aria-invalid"), "true");
assert.equal(elementos["#enviar"].disabled, true, "Un nombre corto no habilita el envío");

elementos["#nombre"].value = "Adrián";
elementos["#nombre"].dispatch("input");
assert.equal(elementos["#enviar"].disabled, false, "Los datos válidos habilitan el envío");

elementos["#formulario-contacto"].dispatch("submit");
assert.match(elementos["#estado-formulario"].textContent, /validada correctamente/);
assert.equal(elementos["#enviar"].disabled, true, "El botón vuelve a deshabilitarse después del envío");
assert.equal(elementos["#contador"].textContent, "0");
assert.equal(elementos["#anio"].textContent, String(new Date().getFullYear()));

console.log("6 pruebas de lógica aprobadas");
