import { Todo } from "./todo.class";

export class TodoList {
	static fromJson({ id, tarea, completado, creado }) {
		const tempTodo = new Todo(tarea);
		tempTodo.id = id;
		tempTodo.completado = completado;
		tempTodo.creado = creado;
		return tempTodo;
	}

	constructor() {
		this.cargarLocalStorage();
	}

	nuevoTodo(todo) {
		this.todos.push(todo);
		this.guardarLocalStorage();
	}

	eliminarTodo(id) {
		this.todos = this.todos.filter(
			(elem) => elem.id.toString() !== id.toString()
		);
		this.guardarLocalStorage();
	}

	marcarCompletado(id) {
		for (const todo of this.todos) {
			if (todo.id.toString() === id.toString()) {
				todo.completado = !todo.completado;
				break;
			}
		}
		this.guardarLocalStorage();
	}

	eliminarCompletados() {
		this.todos = this.todos.filter((elem) => !elem.completado);
		this.guardarLocalStorage();
	}

	guardarLocalStorage() {
		localStorage.setItem("todo", JSON.stringify(this.todos));
	}

	cargarLocalStorage() {
		this.todos = localStorage.getItem("todo")
			? JSON.parse(localStorage.getItem("todo"))
			: [];
		this.todos = this.todos.map(TodoList.fromJson);
	}
}
