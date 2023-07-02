//SCRIPT PARA CALCULAR PROMEDIOS:

//Uso fetch para traer mi array de alumnos desde el archivo alumnos.json:
let ALUMNOS = [];
fetch("./alumnos.json")
    .then(res => res.json())
    .then(datos => {
        ALUMNOS = datos;
    });

//Creo una pantalla de bienvenida para que el usuario inicie sesión:
const bienvenida = document.createElement("div");
function iniciarSesion() {
    bienvenida.innerHTML = `
    <div class="idpass">
        <h4>Ingresá tu número de ID y contraseña para iniciar sesión: </h4> 
        <p>1: Jesse Pinkman</p> 
        <p>2: Hank Shrader</p> 
        <p>3: Walter White</p> 
        <p>4: Gustavo Fring</p> 
        <p>5: Saul Goodman</p>
    </div>`;
    document.body.append(bienvenida);
};

//Función para que el usuario vea su contraseña antes de iniciar sesión:
const mostrarContrasena = document.querySelector("#mostrarContrasena");
function verContrasena() {
    let alumnoContrasena = document.getElementById("alumnoContrasena");
    alumnoContrasena.type = (alumnoContrasena.type === "password") ? "text" : "password";
};
mostrarContrasena.addEventListener("click", verContrasena);

//Doto de contenido el formulario para que el usuario haga log in:
const formularioLogIn = document.getElementById("formularioLogIn");
formularioLogIn.onsubmit = (e) => {
    e.preventDefault();
    let datosForm = e.target;
    let alumnoID = datosForm.querySelector("#alumnoID");
    //Busco entre los alumnos a alguno cuyo ID coincida con el ingresado por el usuario:
    let alumnoCoincidencia = ALUMNOS.find(alumno => alumno.id == alumnoID.value);
    const divVerLogIn = document.getElementById("verLogIn");
    if (alumnoCoincidencia !== undefined) {
        //Si el metodo FIND encontró alguna coincidencia, evalúo la contraseña ingresada por el usuario:
        let alumnoContrasena = datosForm.querySelector("#alumnoContrasena");
        if (alumnoCoincidencia.contrasena == alumnoContrasena.value) {
            //Si pasa la validación de la contraseña, reemplazo el formulario de logueo por el nombre del alumno y le muestro las cards con todos los alumnos que pertenecen al curso:
            bienvenida.remove();
            formularioLogIn.remove();
            divVerLogIn.innerHTML = `<h4>Hola, ${alumnoCoincidencia.nombre}. Estos son los alumnos que pertenecen a tu curso, seleccioná uno para calcular su promedio:</h4>`;
            mostrarAlumnos();
        } else {
            //Si la contraseña ingresada es incorrecta, muestro un mensaje de error manteniendo la posibilidad de que el usuario intente nuevamente:
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Ingresaste una contraseña incorrecta, volvé a intentarlo.',
                showConfirmButton: false,
                timer: 2000,
            })
        };
    } else {
        //Si el ID ingresado no corresponde a ninguno de los objetos de mi array, muestro un mensaje de error manteniendo la posibilidad de que el usuario intente nuevamente:
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Ingresaste un ID incorrecto, volvé a intentarlo.',
            showConfirmButton: false,
            timer: 2000,
        })
    };
};
document.body.append(formularioLogIn);

//Creo una card por cada alumno de mi array:
function crearAlumnoCard(alumno) {
    return `
        <div class="card" style="width: 15rem;">
            <img class="foto" src="./media/${alumno.imagen}" alt="${alumno.nombre}" width="150px" height="150px">
            <div class="card-body">
                <h5 class="card-title">${alumno.nombre}</h5>
                <p class="card-text">Pertenece al nivel ${alumno.nivel}</p>
                <a href="#" id="btnCalcular" class="btn btn-primary">Calcular promedio</a>
            </div>
        </div>`;
};

//Función para mostrar las cards y que el usuario calcule el promedio al hacer click en el botón "calcular promedio":
function mostrarAlumnos() {
    ALUMNOS.forEach((alumno) => {
        let divCard = document.createElement("div");
        divCard.id = alumno.id;
        divCard.innerHTML = crearAlumnoCard(alumno);
        const btnCalcularPromedio = divCard.querySelector(".btn.btn-primary");
        btnCalcularPromedio.addEventListener("click", () => {
            ofrecerPremio(alumno);
        });
        document.getElementById("alumnoCard").append(divCard);
    });
};

//Función para calcular el promedio de los alumnos:
function promediar() {
    ALUMNOS.forEach(a => {
        a.promedio = (a.nota1 + a.nota2 + a.nota3) / 3;
        a.promedio = Math.round(a.promedio * 100) / 100;
    });
};

//Si el alumno no fue premiado, le muestro un mensaje para finalizar la ejecución una vez calculado su promedio:
function promedioInfo(alumno) {
    Swal.fire({
        icon: "info",
        text: `El promedio del alumno ${alumno.nombre} es ${alumno.promedio}. Cuando tu promedio sea 9 o 10, recibirás un premio. ¡A seguir esforzándote!`,
    }).then(function () {
        window.location.href = "index.html";
    });
};

//Evento para dar inicio al script cuando esté listo el DOM:
document.addEventListener("DOMContentLoaded", () => {
    iniciarSesion();
});