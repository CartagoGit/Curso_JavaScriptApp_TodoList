import { Todo } from "../classes";
import { todoList } from "../index";
// Referencias al html
const divTodoList = document.querySelector(".todo-list");
const inputNewTodo = document.querySelector(".new-todo");
const btnBorrarCompletados = document.querySelector(".clear-completed");
const ulFiltros = document.querySelector(".filters");
const anchorFiltros = document.querySelectorAll(".filtro");

export const crearTodoHtml = (todo) => {
	const htmlTodo = `
    <li class="${todo.completado ? "completed" : ""} " data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${
							todo.completado ? "checked" : ""
						}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

	const div = document.createElement("div");
	div.innerHTML = htmlTodo;
	divTodoList.append(div.firstElementChild);

	return div;
};

//Eventos
inputNewTodo.addEventListener("keyup", (event) => {
	if (event.keyCode !== 13 || inputNewTodo.value.length === 0) return; //Presiono enter y el input no esta vacio

	const nuevoTodo = new Todo(inputNewTodo.value);
	todoList.nuevoTodo(nuevoTodo);
	crearTodoHtml(nuevoTodo);
	inputNewTodo.value = "";
});

divTodoList.addEventListener("click", (event) => {
	const nombreElemento = event.target.localName;
	const todoElemento = event.target.parentElement.parentElement;
	const todoId = todoElemento.getAttribute("data-id");

	if (nombreElemento.includes("input")) {
		//click en el check
		todoList.marcarCompletado(todoId);
		todoElemento.classList.toggle("completed");
	} else if (nombreElemento.includes("button")) {
		todoList.eliminarTodo(todoId);
		divTodoList.removeChild(todoElemento);
	}
});

btnBorrarCompletados.addEventListener("click", () => {
	todoList.eliminarCompletados();
	for (let i = divTodoList.children.length - 1; i >= 0; i--) {
		const elemento = divTodoList.children[i];

		if (elemento.classList.contains("completed"))
			divTodoList.removeChild(elemento);
	}
});

ulFiltros.addEventListener("click", (evento) => {
	const filtro = evento.target.text;
	if (!filtro) return;
	anchorFiltros.forEach((elem) => elem.classList.remove("selected"));
	evento.target.classList.add("selected");
	for (const elemento of divTodoList.children) {
		elemento.classList.remove("hidden");
		const completado = elemento.classList.contains("completed");
		switch (filtro) {
			case "Pendientes":
				if (completado) elemento.classList.add("hidden");
				break;
			case "Hechos":
				if (!completado) elemento.classList.add("hidden");
				break;
		}
	}
});
