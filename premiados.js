//SCRIPT PARA OTORGAR PREMIOS A ALUMNOS CON PROMEDIOS ALTOS:

//Función para ofrecer premios a los alumnos con promedios altos:
function ofrecerPremio(alumno) {
    promediar();
    alumno.promedio >= 9 ? mostrarPremios(alumno) : promedioInfo(alumno);
};

//Creo un formulario con las opciones de premios para que el usuario elija:
function premioForm() {
    let formularioPremios = document.createElement("premiar");
    formularioPremios.innerHTML = `
        <p>Por estar entre los alumnos con promedios altos, recibirás un premio en tu próxima clase. Seleccioná el premio que te gustaría recibir:</p>
        <form id="premiador">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="premio" id="option1" value="Un libro de regalo" required>
                <label class="form-check-label" for="option1">
                    Un libro de regalo
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="premio" id="option2" value="Un descuento en tu próximo curso" required>
                <label class="form-check-label" for="option2">
                    Un descuento en tu próximo curso
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="premio" id="option3" value="Una clase de práctica gratis" required>
                <label class="form-check-label" for="option3">
                    Una clase de práctica gratis antes de tu próximo examen
                </label>
            </div>
            <input type="submit" id="btnAceptar" value="Aceptar premio">
        </form>`;
    return formularioPremios;
};

//Función para confirmarle al alumno el premio elegido:
function mostrarPremios(alumno) {
    let divPromedio = document.createElement("div");
    divPromedio.innerHTML = `<h4>El promedio del alumno ${alumno.nombre} es ${alumno.promedio}</h4>`;
    document.body.append(divPromedio);
    let formularioPremios = premioForm();
    document.body.append(formularioPremios);
    document.getElementById("premiador").addEventListener("submit", (e) => {
        e.preventDefault();
        const opcionSeleccionada = document.querySelector('input[name="premio"]:checked').value;
        const nombreUsuario = alumno.nombre;
        guardarPremio(opcionSeleccionada, nombreUsuario);
        Swal.fire({
            title: `Felicitaciones, ${alumno.nombre}!`,
            icon: 'success',
            text: `Acercate a recepción antes de tu próxima clase para reclamar tu premio: ${opcionSeleccionada}.`,
        }).then(function () {
            window.location.href = "index.html";
        });
    });
    guardarPremiados();
};

//Guardo en mi local storage el premio elegido por el alumno:
function guardarPremio(opcionSeleccionada, nombreUsuario) {
    const premioUsuario = {
        opcion: opcionSeleccionada,
        usuario: nombreUsuario
    };
    localStorage.setItem('premioUsuario', JSON.stringify(premioUsuario));
};

//Guardo en mi local storage un array con los alumnos que pueden solicitar premio:
function guardarPremiados() {
    const alumnosPremio = ALUMNOS.filter(alumno => alumno.promedio >= 9);
    localStorage.setItem("alumnosPremiados", JSON.stringify(alumnosPremio));
};