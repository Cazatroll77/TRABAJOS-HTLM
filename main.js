// Crear elementos HTML dinámicamente
const body = document.body;

const titulo = document.createElement("h2");
titulo.textContent = "Lista de Tareas";
body.appendChild(titulo);

const input = document.createElement("input");
input.type = "text";
input.id = "nuevaTarea";
input.placeholder = "Escribe una tarea...";
body.appendChild(input);

const boton = document.createElement("button");
boton.textContent = "Agregar";
boton.onclick = agregarTarea;
body.appendChild(boton);

const lista = document.createElement("ul");
lista.id = "tareas";
body.appendChild(lista);

// Función para agregar tarea
function agregarTarea() {
    const texto = input.value.trim();

    if (texto === "") {
        alert("Por favor, escribe una tarea.");
        return;
    }

    const li = document.createElement("li");
    li.className = "tarea";
    li.textContent = texto;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.onclick = function () {
        lista.removeChild(li);
    };

    li.appendChild(btnEliminar);
    lista.appendChild(li);

    input.value = ""; 
}
