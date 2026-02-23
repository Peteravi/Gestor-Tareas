// ===============================
// Gestor de Tareas (JS)
// ===============================

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const msg = document.getElementById("msg");
const clearBtn = document.getElementById("clearBtn");

// Almacenamiento simple en memoria (pueden cambiar a localStorage si quieren)
let tareas = [];
let nextId = 1;

// Renderiza la lista
function renderTareas() {
    taskList.innerHTML = "";

    if (tareas.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No hay tareas todavía.";
        li.style.color = "#777";
        taskList.appendChild(li);
        return;
    }

    tareas.forEach((t) => {
        const li = document.createElement("li");
        li.className = "task-item";

        const span = document.createElement("span");
        span.textContent = `#${t.id} - ${t.texto}`;

        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = "Eliminar";
        btn.addEventListener("click", () => eliminarTarea(t.id));

        li.appendChild(span);
        li.appendChild(btn);
        taskList.appendChild(li);
    });
}

// Agrega una tarea
function agregarTarea(texto) {
    const nueva = {
        id: nextId++,
        texto: texto.trim()
    };

    tareas.push(nueva);
    msg.textContent = "✅ Tarea agregada correctamente.";
    renderTareas();
}

// Elimina una tarea por id
function eliminarTarea(id) {
    tareas = tareas.filter((t) => t.id !== id);
    msg.textContent = `🗑️ Tarea #${id} eliminada.`;
    renderTareas();
}

// Limpia todas las tareas
function limpiarTodo() {
    tareas = [];
    msg.textContent = "🧹 Se eliminaron todas las tareas.";
    renderTareas();
}

// Eventos
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const texto = taskInput.value;

    if (!texto.trim()) {
        msg.textContent = "⚠️ Escribe una tarea válida.";
        return;
    }

    agregarTarea(texto);
    taskInput.value = "";
    taskInput.focus();
});

clearBtn.addEventListener("click", () => {
    limpiarTodo();
});

// Inicial
renderTareas();