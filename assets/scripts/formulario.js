"use strict";

const $formulario = document.getElementById('formulario');

const formData = {
    nombre: null,
    apellidos: null,
    fechaNacimiento: null,
    email: null,
    tel: null,
    categoria: null,
    mensaje: null
}

$formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    formData.nombre = $formulario.nombre.value;
    formData.apellidos = $formulario.apellidos.value;
    formData.fechaNacimiento = $formulario.fechaNacimiento.value;
    formData.nombre = $formulario.nombre.value;
    formData.nombre = $formulario.nombre.value;
    formData.nombre = $formulario.nombre.value;
    formData.nombre = $formulario.nombre.value;

    $formulario.reset();

    console.log(formData);
});