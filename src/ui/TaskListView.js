/**
 * Responsable únicamente de renderizar la lista de tareas en el DOM.
 * No conoce TaskService ni localStorage: recibe datos y callbacks (ISP/DIP).
 */
export class TaskListView {
  constructor(containerId, { onToggle, onDelete }) {
    this.container = document.getElementById(containerId);
    this.onToggle = onToggle;
    this.onDelete = onDelete;
  }

  render(tasks) {
    this.container.innerHTML = '';

    if (tasks.length === 0) {
      this._renderEmptyState();
      return;
    }

    tasks.forEach((task) => {
      this.container.appendChild(this._createTaskElement(task));
    });
  }

  _renderEmptyState() {
    const message = document.createElement('p');
    message.className = 'empty-state';
    message.textContent = 'No hay tareas para mostrar';
    this.container.appendChild(message);
  }

  _createTaskElement(task) {
    const taskDiv = document.createElement('div');
    taskDiv.className = task.completed ? 'task-item completed' : 'task-item';

    const label = document.createElement('span');
    label.textContent = task.text;

    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.className = 'task-buttons';

    const completeBtn = document.createElement('button');
    completeBtn.className = 'complete-btn';
    completeBtn.textContent = task.completed ? 'Reactivar' : 'Completar';
    completeBtn.addEventListener('click', () => this.onToggle(task.id));

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.addEventListener('click', () => this.onDelete(task.id));

    buttonsWrapper.append(completeBtn, deleteBtn);
    taskDiv.append(label, buttonsWrapper);

    return taskDiv;
  }
}
