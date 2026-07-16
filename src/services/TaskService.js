import { createTask } from '../models/Task.js';

/**
 * Contiene toda la lógica de negocio sobre las tareas.
 * No sabe nada de DOM ni de localStorage: depende de un "repository"
 * con la forma { getAll(), saveAll(tasks) } (Dependency Inversion Principle).
 */
export class TaskService {
  constructor(repository) {
    this.repository = repository;
    this.tasks = this.repository.getAll();
    this.nextId = this._calculateNextId();
  }

  _calculateNextId() {
    return this.tasks.length > 0
      ? Math.max(...this.tasks.map((task) => task.id)) + 1
      : 1;
  }

  getTasks() {
    return [...this.tasks];
  }

  addTask(text) {
    const trimmedText = text.trim();

    if (!trimmedText) {
      throw new Error('Por favor escribe una tarea');
    }

    const newTask = createTask(this.nextId++, trimmedText);
    this.tasks.push(newTask);
    this._persist();

    return newTask;
  }

  toggleTask(id) {
    const task = this.tasks.find((currentTask) => currentTask.id === id);

    if (!task) {
      throw new Error(`No existe una tarea con id ${id}`);
    }

    task.completed = !task.completed;
    this._persist();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this._persist();
  }

  getStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter((task) => task.completed).length;

    return { total, completed, active: total - completed };
  }

  _persist() {
    this.repository.saveAll(this.tasks);
  }
}
