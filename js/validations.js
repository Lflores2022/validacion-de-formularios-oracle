export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMensajeDeError(tipoDeInput, input);
  }
}

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajesDeError = {
  name: {
    valueMissing: "Este campo nombre no puede estar vacio",
  },
  phone: {
    valueMissing: "Este campo télefono no puede estar vacio",
    patternMismatch:'El número telefonico tiene que ser de por lo menos 10 digitos sin letras ni caracteres especiales'
  },
  adress: {
    valueMissing: "Este campo dirección no puede estar vacio",
    patternMismatch: 'la direccion debe de incluir por lo menos 10 caracteres maximo 40'
  },
  city: {
    valueMissing: "Este campo ciudad no puede estar vacio",
    patternMismatch: 'la direccion debe de incluir por lo menos 4 caracteres maximo 20'
  },
  state: {
    valueMissing: "Este campo estado no puede estar vacio",
    patternMismatch: 'la direccion debe de incluir por lo menos 4 caracteres maximo 20'
  },
  email: {
    valueMissing: "Este campo email no puede estar vacio",
    typeMismatch: "El correno no es valido",
  },
  password: {
    valueMissing: "Este campo password no puede estar vacio",
    patternMismatch:
      "Al menos 6 caracteres, maximo 12, debe contener una letra minuscula, una mayuscula, un numero y no puede contener caracteres especiales",
  },
  nacimiento: {
    valueMissing: "Este campo dehca de nacimiento no puede estar vacio",
    customError: "debes de ser mayor de edad",
  },
};

//validacion mensajes de error
function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

//Validacion de edad
const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};
const validarNacimiento = (input) => {
  const userDate = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(userDate)) {
    mensaje = "debes de ser mayor de edad";
  }

  input.setCustomValidity(mensaje);
};

const mayorDeEdad = (date) => {
  const currentDate = new Date();
  const difereciaFechas = new Date(
    date.getUTCFullYear() + 18,
    date.getUTCMonth(),
    date.getUTCDate()
  );
  return difereciaFechas <= currentDate;
};
