"use strict";

const $formulario = document.getElementById("formulario");

const clearButton = document.createElement("span");
clearButton.style =
  "position: absolute; bottom: 2px; pointer-events: auto; cursor: pointer; font-weight: bold;";
clearButton.addEventListener("mousedown", (e) => {
  e.preventDefault();
  const element = clearButton.parentElement.getElementsByTagName(
    document.activeElement.tagName
  )[0];
  element.value = "";
  clearButton.remove();
});

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
  if (key === "fechaNacimiento" || key === "categoria") continue;

  $formulario[key].addEventListener("input", (e) => {
    removeErrorMessage(e.target);
    if (key !== "tel") addClearButton(key, e.target);
  });

  $formulario[key].addEventListener("focus", (e) => {
    addClearButton(key, e.target);
  });

  $formulario[key].addEventListener("blur", (e) => {
    clearButton.remove();
  });
}

$formulario.tel.addEventListener("input", (e) => {
  const number = "0123456789";
  e.target.value = e.target.value
    .split("")
    .filter((char) => number.includes(char))
    .slice(0, 10)
    .join("");
  addClearButton("tel", e.target);
});

$formulario.fechaNacimiento.addEventListener("change", (e) => {
  removeErrorMessage(e.target);
  if (getAge(e.target.value) < 18)
    addErrorMessage(
      e.target,
      "Tienes que ser mayor de edad para enviar este formulario",
      true
    );
});

$formulario.categoria.addEventListener("change", (e) => {
  removeErrorMessage(e.target);
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
    } else formData[key] = $formulario[key].value;
  }

  if (document.getElementsByClassName("errField").length === 0) {
    const thanksElement = document.getElementById("thanksMsg");
    thanksElement.className = "thanksVisible";

    const thanksTitle = thanksElement.getElementsByTagName("h2")[0];
    thanksTitle.textContent = thanksTitle.textContent.replace(
      "Nombre",
      formData.nombre.split(" ")[0]
    );

    $formulario.reset();
  }
});

document
  .getElementsByClassName("btn-light")[0]
  .addEventListener("click", (e) => {
    e.target.parentElement.parentElement.className = "thanksHidden";
    setTimeout(() => {
      document
        .getElementById("thanksMsg")
        .getElementsByTagName("h2")[0].textContent = "¡Gracias Nombre!";
    }, 300);
  });

function addClearButton(key, target) {
  if (target.value === "") {
    clearButton.remove();
    return;
  }

  if (key === "mensaje") {
    clearButton.innerHTML = "clear";
    clearButton.style.setProperty("left", "88%");
  } else {
    clearButton.innerHTML = "x";
    clearButton.style.setProperty("left", "71%");
  }

  target.after(clearButton);
}

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
