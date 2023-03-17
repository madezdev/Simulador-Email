document.addEventListener("DOMContentLoaded", () => {
  const email = {
    email: "",
    asunto: "",
    mensaje: "",
  };

  const formulario = document.querySelector("#formulario");
  const inputEmail = document.querySelector("#email");
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#textarea");
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const spinner = document.querySelector('#spinner')

  inputEmail.addEventListener("input", validar);
  inputAsunto.addEventListener("input", validar);
  inputMensaje.addEventListener("input", validar);

  formulario.addEventListener("submit", enviarEmail);

  btnReset.addEventListener("click", (e) => {
    e.preventDefault();
    resetFormulario ()
  });

  function enviarEmail(e){
    e.preventDefault()

    spinner.classList.remove('visually-hidden')

    setTimeout(()=>{

        spinner.classList.add('visually-hidden')
        //Reinicio de objeto
        resetFormulario ()

        //Crear alerta
        const alertaExito = document.createElement('P');
        alertaExito.classList.add('alert', 'alert-success',"mt-2", "text-center",)
        alertaExito.textContent = 'Mensaje enviado correctamente'
        
        formulario.appendChild(alertaExito)

        setTimeout(() => {
            alertaExito.remove();
        }, 4000);

    },4000)

  }

  function validar(e) {
    if (e.target.value.trim() === "") {
      mostrarAlerta(
        `El campo ${e.target.id} es obligatorio`,
        e.target.parentElement
      );
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    if (e.target.id === "email" && !validarEmail(e.target.value)) {
      mostrarAlerta("El email no es válido", e.target.parentElement);
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    limpiarAlerta(e.target.parentElement);

    //Asignar los valores
    email[e.target.name] = e.target.value.trim().toLowerCase();

    //Comprobar el objeto de email
    comprobarEmail();
  }

  function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia);

    //Generar el alerta en HTML
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add(
      "alert",
      "alert-danger",
      "mt-2",
      "text-center",
      "text-bg-danger",
      "p-3"
    );
    //inyectar el error en el formulario
    referencia.appendChild(error);
  }

  function limpiarAlerta(referencia) {
    //Comprobar si ya existe un alerta
    const alerta = referencia.querySelector(".alert");
    if (alerta) {
      alerta.remove();
    }
  }

  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
  }

  function comprobarEmail() {
    if (Object.values(email).includes("")) {
      btnSubmit.disabled = true;
      return;
    }
    btnSubmit.disabled = false;
  }

  function resetFormulario (){

    //Reinicio de objeto
    email.email = "";
    email.asunto = "";
    email.mensaje = "";

    formulario.reset();
    comprobarEmail();
  }

});

// formulario.addEventListener('submit', (e) => {
//     console.log('me diste click');
//     e.preventDefault();

//     const dato = new FormData(formulario);

//     console.log('campo email', dato.get('emailCampo'));
//     console.log('campo asunto', dato.get('asuntoCampo'));
//     console.log('campo checkBox', dato.get('checkCampo'));

//     formulario.reset();
// })
