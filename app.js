// elementos del HTML
const formulario = document.getElementById("formulario-tarea");
const contenedorTareas = document.getElementById("contenedor-tareas");
const alertaFormulario = document.getElementById("alerta-formulario");
// Elementos de Nébula
const imagenNebula = document.getElementById("robot-nebula");
const mensajeNebula = document.getElementById("mensaje-nebula");

// Expresiones de Nébula
const expresionesNebula = {
    saludando: "IMG/nebula saludando.png",
    feliz: "IMG/nebula feliz.png",
    celebrando: "IMG/nebula celebrando.png",
    pensativa: "IMG/nebula pensativa.png",
    dormida: "IMG/nebula dormida.png"
};

// Función para cambiar la expresión y el mensaje
function cambiarNebula(expresion, mensaje) {
    imagenNebula.src = expresionesNebula[expresion];
    mensajeNebula.textContent = mensaje;
} function validFormFieldInput(data) {
    const errores = [];

    if (!data.nombre.trim()) {
        errores.push("El nombre de la tarea es obligatorio.");
    }

    if (!data.descripcion.trim()) {
        errores.push("La descripción es obligatoria.");
    }

    if (!data.fecha) {
        errores.push("La fecha de entrega es obligatoria.");
    }

    if (!data.estado) {
        errores.push("Debes seleccionar un estado para la tarea.");
    }

    return errores;
}

// Bienvenida al abrir el planificador
cambiarNebula(
    "saludando",
    "¡Hola! Qué alegría tenerte por aquí. 💜"
);

// tareas iniciales de ejemplo
const tareasIniciales = [
    {
        id: 1,
        nombre: "Estudiar JavaScript",
        descripcion: "Repasar funciones, arreglos y objetos para fortalecer mis conocimientos.",
        fecha: "2026-11-05",
        prioridad: "Media",
        categoria: "Estudio",
        completada: false
    },
    {
        id: 2,
        nombre: "Diseñar mi portafolio",
        descripcion: "Organizar las secciones y definir la presentación de mis proyectos.",
        fecha: "2026-11-07",
        prioridad: "Alta",
        categoria: "Personal",
        completada: false
    },
    {
        id: 3,
        nombre: "Practicar Bootstrap",
        descripcion: "Repasar los componentes y las clases de diseño responsive.",
        fecha: "2026-11-08",
        prioridad: "Media",
        categoria: "Estudio",
        completada: false
    },
    {
        id: 4,
        nombre: "Leer un capítulo",
        descripcion: "Dedicar tiempo a la lectura y registrar los avances.",
        fecha: "2026-11-09",
        prioridad: "Baja",
        categoria: "Personal",
        completada: true
    },
    {
        id: 5,
        nombre: "Organizar el proyecto Nébula",
        descripcion: "Revisar las actividades pendientes y organizar las próximas entregas.",
        fecha: "2026-11-10",
        prioridad: "Alta",
        categoria: "Trabajo",
        completada: false
    }
];

// para recuperar tareas guardadas
let tareas = JSON.parse(localStorage.getItem("tareasNebula")) || tareasIniciales;

// para guardar las tareas en el navegador
function guardarTareas() {
    localStorage.setItem("tareasNebula", JSON.stringify(tareas));
}

// para mostrar las tareas en pantalla
function mostrarTareas() {
    contenedorTareas.innerHTML = "";

    tareas.forEach(function (tarea) {

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("col-md-6", "col-lg-4", "mb-4");

        const card = document.createElement("div");
        card.classList.add("card", "h-100");

        const cuerpo = document.createElement("div");
        cuerpo.classList.add("card-body");

        const titulo = document.createElement("h5");
        titulo.classList.add("card-title");
        titulo.textContent = tarea.nombre;

        const descripcion = document.createElement("p");
        descripcion.classList.add("card-text");
        descripcion.textContent = tarea.descripcion;

        const fecha = document.createElement("p");
        fecha.classList.add("card-text");
        fecha.textContent = "Fecha de entrega: " + tarea.fecha;

        const prioridad = document.createElement("p");
        prioridad.classList.add("card-text");
        prioridad.textContent = "Prioridad: " + tarea.prioridad;

        const categoria = document.createElement("p");
        categoria.classList.add("card-text");
        categoria.textContent = "Categoría: " + tarea.categoria;

        const estado = document.createElement("span");
        estado.classList.add("badge");

        const estadoActual = tarea.estado || (tarea.completada ? "Completada" : "Pendiente");

        if (estadoActual === "Completada") {
            estado.classList.add("text-bg-success");
            titulo.style.textDecoration = "line-through";
        } else if (estadoActual === "En progreso") {
            estado.classList.add("text-bg-info");
        } else {
            estado.classList.add("text-bg-warning");
        }

        estado.textContent = estadoActual;

        // boton para cambiar el estado
        const botonCompletar = document.createElement("button");
        botonCompletar.classList.add("btn", "btn-primary", "mt-3", "me-2");
        botonCompletar.textContent = tarea.completada
            ? "Reabrir tarea"
            : "Completar";

        botonCompletar.addEventListener("click", function () {

            tarea.completada = !tarea.completada;
            tarea.estado = tarea.completada ? "Completada" : "Pendiente";

            guardarTareas();
            mostrarTareas();

            if (tarea.completada) {
                cambiarNebula(
                    "feliz",
                    "¡Lo lograste! Una misión menos. 💜"
                );
            } else {
                cambiarNebula(
                    "pensativa",
                    "¡Esta misión vuelve a estar pendiente! Vamos paso a paso."
                );
            }

        });

        // botonn para eliminar
        const botonEliminar = document.createElement("button");
        botonEliminar.classList.add("btn", "btn-danger", "mt-3");
        botonEliminar.textContent = "Eliminar";

        botonEliminar.addEventListener("click", function () {
            tareas = tareas.filter(function (elemento) {
                return elemento.id !== tarea.id;
            });

            guardarTareas();
            mostrarTareas();
        });

        // organizacion de la tarjeta
        cuerpo.append(
            titulo,
            descripcion,
            fecha,
            prioridad,
            categoria,
            estado,
            document.createElement("br"),
            botonCompletar,
            botonEliminar
        );

        card.appendChild(cuerpo);
        tarjeta.appendChild(card);
        contenedorTareas.appendChild(tarjeta);
    });
}

// rsgitro de la una nueva tarea
formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    const nombre = formulario.querySelector("#nombre-tarea").value;
    const descripcion = formulario.querySelector("#descripcion-tarea").value;
    const fecha = formulario.querySelector("#fecha-tarea").value;
    const estado = formulario.querySelector("#estado-tarea").value;

    console.log(nombre, descripcion, fecha, estado);
    const errores = validFormFieldInput({
        nombre,
        descripcion,
        fecha,
        estado
    });

    if (errores.length > 0) {
        alertaFormulario.textContent = errores.join(" ");
        alertaFormulario.classList.remove("d-none");
        return;
    }

    alertaFormulario.classList.add("d-none");

    const nuevaTarea = {
        id: Date.now(),
        nombre: document.getElementById("nombre-tarea").value.trim(),
        descripcion: document.getElementById("descripcion-tarea").value.trim(),
        fecha: document.getElementById("fecha-tarea").value,
        prioridad: document.getElementById("prioridad-tarea").value,
        categoria: document.getElementById("categoria-tarea").value,
        estado: estado,
        completada: estado === "Completada"
    };

    tareas.push(nuevaTarea);

    guardarTareas();
    mostrarTareas();

    cambiarNebula(
        "celebrando",
        "¡Una nueva misión! 🎉 Vamos con toda."
    );

    formulario.reset();

});
// Revisar si hay tareas próximas a vencer
function revisarFechasTareas() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const manana = new Date(hoy);
    manana.setDate(manana.getDate() + 1);

    const tareasProximas = tareas.filter(function (tarea) {
        if (tarea.completada || !tarea.fecha) {
            return false;
        }

        const fechaEntrega = new Date(tarea.fecha + "T00:00:00");

        return fechaEntrega.getTime() === hoy.getTime() ||
            fechaEntrega.getTime() === manana.getTime();
    });

    if (tareasProximas.length === 1) {
        cambiarNebula(
            "pensativa",
            "¡Atención! Tienes una misión próxima a vencer. ¡No la olvides! 💜"
        );

    } else if (tareasProximas.length > 1) {
        cambiarNebula(
            "pensativa",
            "¡Atención! Tienes " + tareasProximas.length +
            " misiones próximas a vencer. ¡Vamos con ellas! 💜"
        );
    }
}
// Control de inactividad de Nébula
let temporizadorNebula;

function reiniciarTemporizadorNebula() {
    clearTimeout(temporizadorNebula);

    if (imagenNebula.src.includes("nebula dormida.png")) {
        cambiarNebula(
            "saludando",
            "¡Oh! ¿Volviste? Ya estaba tomando una siestecita. 💜"
        );
    }

    temporizadorNebula = setTimeout(function () {
        cambiarNebula(
            "dormida",
            "Zzz... Me tomaré una siestecita. 😴💜"
        );
    }, 10000);
}

// Detectar actividad en la página
document.addEventListener("mousemove", reiniciarTemporizadorNebula);
document.addEventListener("keydown", reiniciarTemporizadorNebula);
document.addEventListener("scroll", reiniciarTemporizadorNebula);
window.addEventListener("pointerdown", reiniciarTemporizadorNebula);
window.addEventListener("pointerdown", function () {
    console.log("Detecté un clic en la página");
});
// Iniciar el temporizador
reiniciarTemporizadorNebula();
// Mostrar las tareas al abrir el planificador
mostrarTareas();

// Revisar las fechas de entrega
revisarFechasTareas();
