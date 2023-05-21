"use strict";

const $formulario = document.getElementById("formulario");

const formData = {
  nombre: null,
  apellidos: null,
  fechaNacimiento: null,
  correo: null,
  tel: null,
  categoria: null,
  mensaje: null
};

for (const key in formData) {
  if (key === "fechaNacimiento") continue;
  $formulario[key].addEventListener("input", (e) => {
    removeErrorMessage(e.target);
    if (e.target.id === "tel") {
      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
    }
  });
}

$formulario.fechaNacimiento.addEventListener("change", (e) => {
  removeErrorMessage(e.target);
  if (getAge(e.target.value) < 18)
    addErrorMessage(
      e.target,
      "Tienes que ser mayor de edad para enviar este formulario",
      true
    );
});

$formulario.correo.addEventListener("change", (e) => {
  if (
    !(
      e.target.value.includes("@") &&
      e.target.value.includes(".") &&
      e.target.value.length >= 5
    )
  )
    addErrorMessage(e.target, "Direccion de correo no valida", true);
});

$formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  for (const key in formData) {
    removeErrorMessage($formulario[key]);
    let alreadyScrolled = false;

    if ($formulario[key].value === "") {
      addErrorMessage(
        $formulario[key],
        "Este campo es obligatorio",
        !alreadyScrolled
      );
      if (!alreadyScrolled) alreadyScrolled = true;
    }
  }

  if (document.getElementsByClassName("errField").length === 0) {
    const thanksElement = document.getElementById("thanksMsg");
    thanksElement.className = "thanksVisible";

    const thanksTitle = thanksElement.getElementsByTagName("h2")[0];
    thanksTitle.textContent = thanksTitle.textContent.replace(
      "Nombre",
      $formulario.nombre.value.split(" ")[0]
    );

    $formulario.reset();
  }
});

document
  .getElementsByClassName("btn-light")[0]
  .addEventListener("click", (e) => {
    e.target.parentElement.parentElement.className = "thanksHidden";
  });

function getAge(bDate) {
  return new Date().getFullYear() - new Date(bDate).getFullYear();
}

function addErrorMessage(element, msg, scrollTo) {
  const errMessage = document.createElement("p");
  errMessage.textContent = msg;
  errMessage.className = "errMsg";

  element.parentElement.insertBefore(errMessage, element);
  if (scrollTo) element.parentElement.scrollIntoView();

  element.classList.add("errField");
}

function removeErrorMessage(target) {
  target.classList.remove("errField");
  const errMsg = target.parentElement.getElementsByClassName("errMsg")[0];
  if (errMsg != null) errMsg.remove();
}
